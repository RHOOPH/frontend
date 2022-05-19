const dotenv = require("dotenv");
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

// .env config
dotenv.config();

const app = express();
const port = process.env.PORT;
const url = process.env.PROXY_URL;
const target = process.env.PROXY_TARGET;

app.use(
  url,
  createProxyMiddleware({
    target,
    changeOrigin: true,
    cookieDomainRewrite: "",
    cookiePathRewrite: "/",
  })
);

app.listen(port, function () {
  console.log("Server running on port : ", port);
});
