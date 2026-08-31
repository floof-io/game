import http from "http";
import fs from "fs";

// Get the content type based on the file extension
const getContentType = path => {
    const ext = path.split(".").at(-1);
    switch (ext) {
        case "js":
            return "text/javascript";
        case "css":
            return "text/css";
        case "png":
            return "image/png";
        case "jpg":
            return "image/jpg";
        case "svg":
            return "image/svg+xml";
        case "json":
            return "application/json";
        case "txt":
            return "text/plain";
        case "html":
        default:
            return "text/html";
        }
};

// Serve the /build directory
const server = http.createServer((req, res) => {
    const path = `./build${req.url}`;
    const filePath = fs.existsSync(path) && fs.lstatSync(path).isDirectory() ? path + ( path.endsWith("/") ? '' : '/' ) + "index.html" : path;
    const contentType = getContentType(path);
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end("Not Found");
        } else {
            res.setHeader("Content-Type", contentType);
            res.writeHead(200);
            res.end(data);
        }
    });
});

server.listen(process.env.GAME_SERVER_PORT);
