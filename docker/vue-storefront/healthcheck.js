var http = require("http");

var options = {
  host: "localhost",
  port: "3000",
  timeout: 10000
};

var request = http.request(options, res => {
  if (res.statusCode == 200) {
    process.exit(0);
  } else {
    process.exit(1);
  }
});

request.on("error", function (err) {
  process.exit(1);
});

request.end();
