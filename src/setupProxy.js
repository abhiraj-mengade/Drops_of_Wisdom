const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
    app.use(
        "/auth", 
        createProxyMiddleware({
            target: "http://localhost:8080",
            changeOrigin: true
        })
    );
    app.use(
        "/post", 
        createProxyMiddleware({
            target: "http://localhost:8080",
            changeOrigin: true
        })
    );
    app.use(
        "/user", 
        createProxyMiddleware({
            target: "http://localhost:8080",
            changeOrigin: true
        })
    );
};