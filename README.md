# Reveal-Electron-Player

An Electron js app to play Reveal js slides and contorl OBS scene transitions.  Use Reveal slides to send web socket messages to OBS.   


## Creating slides

It is recommend to create Reveal js slides using Slides.com or [Obsidian](https://obsidian.md/) with the [advanced slides plug-in](https://github.com/MSzturc/obsidian-advanced-slides).
When the slides are complete export the deck to HTML.

## Add OBS commands to each slide

Add tags to send Scnee change messages to OBS.  

|Message      |Obsidian Markdown tag      |HTML Element attribute
|:-----|:-----|:-----
|When a slide transition starts, then change OBS Scene       | `<!-- .slide: data-slide-changed="scene name" -->`     | section attribute data-slide-changed="scene name" 
|When a slide transition ends, then change OBS Scene | `<!-- .slide: data-slide-transitioned="scene name" -->`| section attribute data-slide-transitioned="scene name"
|When a fragment is shown, then change OBS Scene | `<!-- element class data-fragment-shown="scene name" -->`| section attribute data-fragment-shown="scene name"
|When a fragment is hidden, then change OBS Scene | `<!-- element class data-fragment-hidden="scene name" -->`| section attribute data-fragment-hidden="scene name"

## Add Scripts and Reveal Initialization

  Next add the OBS websocket javascript libraries to the HTML file. 
  Add 3 script elements towards the bottom of the HTML file. 
    `<script src="obs-ws.js"></script>`
    `<script src="OBSconnect.js"></script>`
    `<script src="obs-slide-navigation.js"></script>`
![image](https://github.com/UUoocl/Reveal-Electron-Player/assets/99063397/75ba7315-9dac-414e-bb15-ed69954488c7)


In the plugins: array add "obsSlideNavigation", and after the closing brackek add "obsSlideNavigation"

![image](https://github.com/UUoocl/Reveal-Electron-Player/assets/99063397/171d7c6c-0d8e-4a46-a950-d56a95ec9d00)

## Copy the javascript files from this repo

## Open the HTML file using the Reveal Election Player. 
Download and install the [Electron Fiddle tool](https://www.electronjs.org/fiddle) to run the Reveal player. 

Copy the gist link and load it in Electron Fiddle.

https://gist.github.com/UUoocl/d2edd826cdf7ca4493c7359b76a1df70

## Setup OBS Scenes
In OBS enable the WebSocket Server. 

Create Scenes that match the names in the slide deck. 




