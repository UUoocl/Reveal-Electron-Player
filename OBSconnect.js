const obs = new OBSWebSocket();
function connectOBS(){
    
    setTimeout(() => {
    const websocketIPelement = document.querySelector("[data-websocket-ip]");
    const websocketIP = websocketIPelement ? websocketIPelement.getAttribute('data-websocket-ip') : false;
    const websocketPortElement = document.querySelector("[data-websocket-port]");
    const websocketPort = websocketPortElement ? websocketPortElement.getAttribute('data-websocket-port') : false;
    const websocketPasswordElement = document.querySelector("[data-websocket-password]");
    const websocketPassword = websocketPasswordElement ? websocketPasswordElement.getAttribute('data-websocket-password') : false;
    
    
    try {
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
      })
      console.log(`ws://${websocketIP}:${websocketPort}`)
  }, 5000);

}
 
document.addEventListener("DOMContentLoaded", (event) => {
    connectOBS();
    
    //setTimeout(() => {  connectOBS;}, 5000);
  })
