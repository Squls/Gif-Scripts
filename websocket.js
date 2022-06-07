'use strict';

const WebSocketServer = require('ws');

const wss = new WebSocketServer('wss://demo.piesocket.com/v3/channel_1?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self');
wss.on('message', function message(data) {
  console.log('received: %s', data);
});

wss.on('error', console.error);
