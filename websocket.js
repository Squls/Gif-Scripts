'use strict';

const WebSocketServer = require('ws');
require('dotenv').config();
const giphy = require('giphy-api')(process.env.GIPHYKEY);
const fs = require('fs');
const client = require('https');

const wss = new WebSocketServer('wss://demo.piesocket.com/v3/channel_1?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self');
let counter = 0;
wss.on('message', function message(data) {

  if (data.includes("oioi")) {
    counter = counter + 1;
    if (counter == 10) {
      let searchstring = data.toString().replace("oioi","");
      giphy.random(searchstring).then(function (res) {
        let url = res['data']['images']['fixed_width']['url'];
        client.get(url, (result) => {
            result.pipe(fs.createWriteStream('./display.gif'));
        });
        counter = 0;
      })
    }
  }
});

wss.on('error', console.error);
