const http = require("http");
const app = require("../app");

let localPORT = 8080;
let PORT = process.env.PORT | localPORT;
let server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
