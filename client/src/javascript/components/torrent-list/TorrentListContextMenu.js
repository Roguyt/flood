import React from 'react';

import ConfigStore from '../../stores/ConfigStore';
import PriorityMeter from '../general/filesystem/PriorityMeter';
import TorrentActions from '../../actions/TorrentActions';
import TorrentContextMenuItems from '../../constants/TorrentContextMenuItems';
import TorrentStore from '../../stores/TorrentStore';
import UIActions from '../../actions/UIActions';

const priorityMeterRef = React.createRef();
let prioritySelected = 1;

const handleDetailsClick = (torrent, event) => {
  UIActions.handleDetailsClick({
    hash: torrent.hash,
    event,
  });

  UIActions.displayModal({
    id: 'torrent-details',
    options: {hash: torrent.hash},
  });
};

const handleTorrentDownload = (torrent, event) => {
  event.preventDefault();
  const baseURI = ConfigStore.getBaseURI();
  const link = document.createElement('a');
  link.download = torrent.isMultiFile ? `${torrent.name}.tar` : torrent.name;
  link.href = `${baseURI}api/torrents/${torrent.hash}/contents/all/data`;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
};

const handleItemClick = (action, event, torrent) => {
  const selectedTorrents = TorrentStore.getSelectedTorrents();
  switch (action) {
    case 'check-hash':
      TorrentActions.checkHash({
        hashes: selectedTorrents,
      });
      break;
    case 'set-taxonomy':
      UIActions.displayModal({id: 'set-taxonomy'});
      break;
    case 'set-tracker':
      UIActions.displayModal({id: 'set-tracker'});
      break;
    case 'start':
      TorrentActions.startTorrents({
        hashes: selectedTorrents,
      });
      break;
    case 'stop':
      TorrentActions.stopTorrents({
        hashes: selectedTorrents,
      });
      break;
    case 'remove':
      UIActions.displayModal({id: 'remove-torrents'});
      break;
    case 'move':
      UIActions.displayModal({id: 'move-torrents'});
      break;
    case 'torrent-details':
      handleDetailsClick(torrent, event);
      break;
    case 'torrent-download-tar':
      handleTorrentDownload(torrent, event);
      break;
    case 'set-priority':
      priorityMeterRef.current.handleClick();
      TorrentActions.setPriority({
        hashes: selectedTorrents,
        priority: prioritySelected,
      });
      break;
    default:
      break;
  }
};

const getContextMenuItems = (intl, torrent, settings) => {
  const clickHandler = handleItemClick;

  const ret = [];

  [
    {
      action: 'start',
      clickHandler,
    },
    {
      action: 'stop',
      clickHandler,
    },
    {
      action: 'remove',
      clickHandler,
    },
    {
      action: 'check-hash',
      clickHandler,
    },
    {
      type: 'separator',
    },
    {
      action: 'set-taxonomy',
      clickHandler,
    },
    {
      action: 'move',
      clickHandler,
    },
    {
      action: 'set-tracker',
      clickHandler,
    },
    {
      type: 'separator',
    },
    {
      action: 'torrent-details',
      clickHandler: (action, event) => {
        clickHandler(action, event, torrent);
      },
    },
    {
      action: 'torrent-download-tar',
      clickHandler: (action, event) => {
        clickHandler(action, event, torrent);
      },
    },
    {
      action: 'set-priority',
      clickHandler,
      dismissMenu: false,
      labelAction: (
        <PriorityMeter
          id={torrent.hash}
          key={torrent.hash}
          ref={priorityMeterRef}
          level={torrent.priority}
          maxLevel={3}
          priorityType="torrent"
          onChange={(_id, level) => {
            prioritySelected = level;
          }}
          showLabel={false}
          clickHandled
        />
      ),
    },
  ].forEach((item) => {
    if (item.action != null) {
      const hidden = settings.some((setting) => {
        if (item.action === setting.id) {
          return !setting.visible;
        }
        return false;
      });

      if (hidden) {
        return;
      }

      item.label = intl.formatMessage({id: TorrentContextMenuItems[item.action].id});
    }

    ret.push(item);
  });

  return ret;
};

export default {
  getContextMenuItems,
  handleDetailsClick,
};
