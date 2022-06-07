#!/usr/bin/env python3

import pyglet, requests, random, os
from dotenv import load_dotenv

load_dotenv()

print('Mic word on or off?')
micState = input()
if micState == 'on':
	print('Enter simple phrase or word')
	phrase = input()
	wordlist = phrase.split()
	word = wordlist[len(wordlist) - 1]
elif micState == 'off':
	url = 'https://random-word-api.herokuapp.com/word?number=1'
	response = requests.get(url)
	json = response.json()
	word = json[0]
apiKey = os.getenv('GIPHYKEY')
url = 'http://api.giphy.com/v1/gifs/search?q=' + word + '&api_key=' + apiKey + '&limit=100'
response = requests.get(url)
json = response.json()
count = len(json['data'])
print(count)
rdm = random.randrange(0,count)
gifUrl = json['data'][rdm]['images']['fixed_width']['url']
gifData = requests.get(gifUrl)
with open('display.gif', 'wb') as f:
    f.write(gifData.content)
gifFile = "display.gif"
animation = pyglet.resource.animation(gifFile)
sprite = pyglet.sprite.Sprite(animation)
win = pyglet.window.Window(width=sprite.width, height=sprite.height)
green = 0, 1, 0, 1
pyglet.gl.glClearColor(*green)
@win.event
def on_draw():
    win.clear()
    sprite.draw()
pyglet.app.run()
