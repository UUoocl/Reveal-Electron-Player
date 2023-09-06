const obsSlideNavigation = {
  id: "obsSlideNavigation",
  init: (reveal) => { 
   

  //Get websocket connection info
  var manualSceneChange= true;
   
  //check if the connection request is coming from the speaker view iframe
 // const svConnectionElement = document.querySelector("body");
 // const svConnection = svConnectionElement.getAttribute('data-speaker-layout');
  //console.log("Speaker View:" + svConnection)
  
  console.log(document.URL)

  // connect to OBS websocket

 

  /*   try {
    const {
      obsWebSocketVersion,
      negotiatedRpcVersion
    } = obs.connect(`ws://${websocketIP}:${websocketPort}`, websocketPassword, {
      rpcVersion: 1
    });
    console.log(`Connected to server ${obsWebSocketVersion} (using RPC ${negotiatedRpcVersion})`)
    document.title = "connection set";
    } catch (error) {
    console.error('Failed to connect', error.code, error.message);
    }
    obs.on('error', err => {
      console.error('Socket error:', err)
    }) */

/*   //OBS Slide Navigation  
  //listen for Advanced Scene Switcher websocket events
  obs.on('VendorEvent', function(event) {
    switch (event.eventData.message) {
      case "Next":
        reveal.next();
        break;
      case "Previous":
        reveal.prev();
        break;
      case "Left":
        reveal.left();
        break;
      case "Right":
        reveal.right();
        break;
      case "Up":
        reveal.up();
        break;
      case "Down":
        reveal.down();
        break;
      case "Overview":
        reveal.toggleOverview();
        break;        
    }}) */

  //OBS Slide Navigation  
  //listen for custom websocket events
/*   obs.on('CustomEvent', function(event) {
    console.log("CustomEvent " + event.eventData)
    let SceneName = event.eventData;
    let slideToFind = document.querySelector("[data-slide-name='" + SceneName + "']") || false;
    //slideToFind = slideToFind ? slideToFind : false;
    if (slideToFind != false){
      let slideIndex = reveal.getIndices(slideToFind);
      console.log(slideIndex)
      reveal.slide(slideIndex.h, slideIndex.v || 0);      
    }}) */


  //OBS Jump to Slide
/*   obs.on('CurrentProgramSceneChanged', function(event) {
    let SceneName = event.sceneName;
    let slideToFind = document.querySelector("[data-slide-name='" + SceneName + "']") || false;
    //slideToFind = slideToFind ? slideToFind : false;
    if (slideToFind != false){
      let slideIndex = reveal.getIndices(slideToFind);
      console.log(slideIndex)
      reveal.slide(slideIndex.h, slideIndex.v || 0);
  }}) */

  //Change OBS scene on slide show events
  reveal.on('overviewshown', event => {
    let overviewshownScene = document.querySelector("[data-overview-shown]");
    if(overviewshownScene){
      obs.call('SetCurrentProgramScene', {sceneName: overviewshownScene.getAttribute('data-overview-shown')});
    }});
    
  reveal.on('overviewhidden', event => {
    switch(true){
      case event.currentSlide.hasAttribute("data-slide-changed"):
        obs.call('SetCurrentProgramScene', {sceneName: event.currentSlide.attributes.getNamedItem("data-slide-changed").value});
        break;
      case event.currentSlide.hasAttribute("data-slide-transitioned"):
        obs.call('SetCurrentProgramScene', {sceneName: event.currentSlide.attributes.getNamedItem("data-slide-transitioned").value});
        break;
    }});

  reveal.on('slidechanged', event => {
    if(event.currentSlide.hasAttribute("data-slide-changed")  && !Reveal.isOverview()){
      obs.call('SetCurrentProgramScene', {sceneName: event.currentSlide.attributes.getNamedItem("data-slide-changed").value});
      console.log("Sending Custom WS message")
      //obs.call("CallVendorRequest", {vendorName:"AdvancedSceneSwitcher",requestType:"AdvancedSceneSwitcherMessage",requestData:{message:"testing"}});
      //obs.call('BroadcastCustomEvent',{eventData:{eventData:"Slide 1"}});
    //send custom broadcast message
    /*    
    if(event.currentSlide.hasAttribute("data-ws-custom-message")  && !Reveal.isOverview()){
    console.log("Sending Custom WS message")
    obs.call("CallVendorRequest", {vendorName:"AdvancedSceneSwitcher",requestType:"AdvancedSceneSwitcherMessage",requestData:{message:"Testing"}});
    //obs.call('BroadcastCustomEvent', {eventData:{hello:"world"}});
    //event.currentSlide.attributes.getNamedItem("data-slide-changed").value
    }
    */
    }});

  reveal.on('slidetransitionend', event => {
    if(event.currentSlide.hasAttribute("data-slide-transitioned")){
      obs.call('SetCurrentProgramScene', {sceneName: event.currentSlide.attributes.getNamedItem("data-ws-custom-message").value});
    }});

  reveal.on('fragmentshown', event => {
    if(event.fragment.hasAttribute("data-fragment-shown")){
      obs.call('SetCurrentProgramScene', {sceneName: event.fragment.attributes.getNamedItem("data-fragment-shown").value});
    }});
          
  reveal.on('fragmenthidden', event => {
    if(event.fragment.hasAttribute("data-fragment-hidden")){
      obs.call('SetCurrentProgramScene', {sceneName: event.fragment.attributes.getNamedItem("data-fragment-hidden").value});
    }});
  }};


