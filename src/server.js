const http = require("http");
const httpProxy = require("http-proxy");
const SocksProxyAgent = require("socks-proxy-agent");

require("dotenv").config();

const info = {
  host: process.env.SERVER_IP,
  userId: process.env.USER_ID,
  password: process.env.PASS,
};

let handleRequest;
try {
  const httpsAgent = new SocksProxyAgent(info);
  const proxy = httpProxy.createProxyServer({
    ws: true,
  });
  handleRequest = (req, res) => {
    delete req.headers.host;
    proxy.web(req, res, {
      target: req.url,
      agent: httpsAgent,
    });
  };
} catch (err) {
  console.log(err);
}

http.createServer(handleRequest).listen(3023);
