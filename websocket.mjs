'use strict';

//const WebSocketServer = require('ws');
//const WebSocket = require('ws');
//const wss = new WebSocket('wss://stagetext.emfcamp.app/socket/a');
//wss.on('error', console.error);


import WebSocket, { createWebSocketStream } from 'ws';
const ws = new WebSocket('wss://stagetext.emfcamp.app/socket/a');

const duplex = createWebSocketStream(ws, { encoding: 'utf8' });

duplex.pipe(process.stdout);
process.stdin.pipe(duplex);

duplex.on('error', console.error);
