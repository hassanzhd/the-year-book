const http = require("http");
const app = require("../app");

let PORT;
if (process.env.NODE_ENV === "development") {
  PORT = 5000;
} else {
  PORT = process.env.PORT;
}

let server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
