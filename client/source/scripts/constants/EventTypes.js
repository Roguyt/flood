const EventTypes = {
  CLIENT_ADD_TORRENT_ERROR: 'CLIENT_ADD_TORRENT_ERROR',
  CLIENT_ADD_TORRENT_SUCCESS: 'CLIENT_ADD_TORRENT_SUCCESS',
  CLIENT_SET_THROTTLE_ERROR: 'CLIENT_SET_THROTTLE_ERROR',
  CLIENT_SET_THROTTLE_SUCCESS: 'CLIENT_SET_THROTTLE_SUCCESS',
  CLIENT_MOVE_TORRENTS_REQUEST_ERROR: 'CLIENT_MOVE_TORRENTS_REQUEST_ERROR',
  CLIENT_MOVE_TORRENTS_SUCCESS: 'CLIENT_MOVE_TORRENTS_SUCCESS',
  CLIENT_TORRENTS_REQUEST_ERROR: 'CLIENT_TORRENTS_REQUEST_ERROR',
  CLIENT_TORRENT_STATUS_COUNT_CHANGE: 'CLIENT_TORRENT_STATUS_COUNT_CHANGE',
  CLIENT_TORRENT_STATUS_COUNT_REQUEST_ERROR: 'CLIENT_TORRENT_STATUS_COUNT_REQUEST_ERROR',
  CLIENT_TORRENT_TRACKER_COUNT_CHANGE: 'CLIENT_TORRENT_TRACKER_COUNT_CHANGE',
  CLIENT_TORRENT_TRACKER_COUNT_REQUEST_ERROR: 'CLIENT_TORRENT_TRACKER_COUNT_REQUEST_ERROR',
  CLIENT_TORRENTS_REQUEST_SUCCESS: 'CLIENT_TORRENTS_REQUEST_SUCCESS',
  CLIENT_TORRENT_DETAILS_CHANGE: 'CLIENT_TORRENT_DETAILS_CHANGE',
  CLIENT_TRANSFER_DATA_REQUEST_SUCCESS: 'CLIENT_TRANSFER_DATA_REQUEST_SUCCESS',
  CLIENT_TRANSFER_DATA_REQUEST_ERROR: 'CLIENT_TRANSFER_DATA_REQUEST_ERROR',
  CLIENT_TRANSFER_HISTORY_REQUEST_SUCCESS: 'CLIENT_TRANSFER_HISTORY_REQUEST_SUCCESS',
  CLIENT_TRANSFER_HISTORY_REQUEST_ERROR: 'CLIENT_TRANSFER_HISTORY_REQUEST_ERROR',
  UI_CONTEXT_MENU_CHANGE: 'UI_CONTEXT_MENU_CHANGE',
  UI_DEPENDENCIES_LOADED: 'UI_DEPENDENCIES_LOADED',
  UI_MODAL_CHANGE: 'UI_MODAL_CHANGE',
  UI_LATEST_TORRENT_LOCATION_CHANGE: 'UI_LATEST_TORRENT_LOCATION_CHANGE',
  UI_TORRENT_DETAILS_HASH_CHANGE: 'UI_TORRENT_DETAILS_HASH_CHANGE',
  UI_TORRENT_DETAILS_OPEN_CHANGE: 'UI_TORRENT_DETAILS_OPEN_CHANGE',
  UI_TORRENT_SELECTION_CHANGE: 'UI_TORRENT_SELECTION_CHANGE',
  UI_TORRENTS_FILTER_CHANGE: 'UI_TORRENTS_FILTER_CHANGE',
  UI_TORRENTS_FILTER_STATUS_CHANGE: 'UI_TORRENTS_FILTER_STATUS_CHANGE',
  UI_TORRENTS_FILTER_TRACKER_CHANGE: 'UI_TORRENTS_FILTER_TRACKER_CHANGE',
  UI_TORRENTS_FILTER_SEARCH_CHANGE: 'UI_TORRENTS_FILTER_SEARCH_CHANGE',
  UI_TORRENTS_SORT_CHANGE: 'UI_TORRENTS_SORT_CHANGE'
};

export default EventTypes;