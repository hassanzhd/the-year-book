const http = require("http");
const app = require("../app");

let PORT = process.env.PORT | 5000;
let server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
