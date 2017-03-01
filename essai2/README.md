# Second test to control a led with node.js"

This try uses the `formidable` module

Composition :

* `index.js` : Start the server. Handles indicate pages accpeted and treated by requestHandlers.js
* `server.js` : launch server and serve pathname query to router.js
* `router.js` : treats pathname query and identifies handle to execute in requestHandlers.js
* `requestHandlers.js` : code to execute and display web pages to client

To control the led, I use `fs` module and write directly on the GPIO port.

There is a problem if the GPIO is not exported first. Node js try to write in the `direction`file in `gpio21` directory but the file does not extist. We have to wait some little delay before doing this operation. 
