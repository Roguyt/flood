import bencode from 'bencode';
import fs from 'fs';
import path from 'path';

import type {LibTorrentResume, RTorrentFile, TorrentFile} from '@shared/types/TorrentFile';

const getContentSize = (info: TorrentFile['info']): number => {
  if (info.length != null) {
    // Single file torrent
    return info.length;
  }

  if (info.files != null) {
    // Multi file torrent
    let totalLength = 0;
    info.files.forEach(({length}) => {
      totalLength += length;
    });
    return totalLength;
  }

  // Things are not right
  return 0;
};

const setTracker = (torrent: string, tracker: string) => {
  fs.readFile(torrent, (err, data) => {
    if (err) {
      return;
    }

    const torrentData: TorrentFile = bencode.decode(data);

    if (torrentData.announce != null) {
      torrentData.announce = Buffer.from(tracker);

      fs.writeFileSync(torrent, bencode.encode(torrentData));
    }
  });
};

const setCompleted = (torrent: string, destination: string) => {
  fs.readFile(torrent, (err, data) => {
    if (err) {
      return;
    }

    const torrentData: Readonly<TorrentFile> = bencode.decode(data);
    if (torrentData == null) {
      return;
    }

    const {info} = torrentData;
    if (info == null || info.files == null) {
      return;
    }

    const contentSize = getContentSize(info);
    const pieceSize = Number(info['piece length']);
    if (contentSize === 0 || pieceSize == null || pieceSize === 0) {
      return;
    }

    const completedFileResumeTree: LibTorrentResume['files'] = info.files.map((file) => {
      const filePath = path.resolve(path.join(destination, file.path.join('/')));
      if (!fs.existsSync(filePath)) {
        return {
          completed: 0,
          mtime: 0,
          priority: 1,
        };
      }

      const fileStat = fs.lstatSync(filePath);
      if (!fileStat.isFile() || fileStat.size !== file.length) {
        return {
          completed: 0,
          mtime: 0,
          priority: 0,
        };
      }

      return {
        completed: Math.ceil(file.length / pieceSize),
        mtime: Math.trunc(fileStat.mtimeMs / 1000),
        priority: 0,
      };
    });

    const completedResume: LibTorrentResume = {
      bitfield: Math.ceil(contentSize / pieceSize),
      files: completedFileResumeTree,
      'uncertain_pieces.timestamp': Math.trunc(Date.now() / 1000),
    };

    const torrentDataWithResume: RTorrentFile = Object.assign(torrentData, completedResume);
    fs.writeFileSync(torrent, bencode.encode(torrentDataWithResume));
  });
};

const torrentFileUtil = {
  getContentSize,
  setTracker,
  setCompleted,
};

export default torrentFileUtil;
