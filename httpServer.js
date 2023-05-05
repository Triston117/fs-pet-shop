import http from "http";
import fs from "fs";

http
  .createServer((request, response) => {
    const urlParts = request.url.split("/");
    if (request.method === "GET" && urlParts[1] === "pets") {
      fs.readFile("pets.json", "utf-8", (error, string) => {
        if (error) {
          console.error(error);
          response.statusCode = 500;
          response.setHeader("Content-Type", "text/plain");
          response.end("Server Error");
        } else {
          const pets = JSON.parse(string);
          if (urlParts.length === 2) {
            response.statusCode = 200;
            response.setHeader("Content-Type", "application/json");
            response.end(JSON.stringify(pets));
          } else if (urlParts.length === 3) {
            const index = Number(urlParts[2]);
            if (Number.isNaN(index) || index < 0 || index >= pets.length) {
              response.statusCode = 404;
              response.setHeader("Content-Type", "text/plain");
              response.end("Not Found");
            } else {
              response.statusCode = 200;
              response.setHeader("Content-Type", "application/json");
              response.end(JSON.stringify(pets[index]));
            }
          } else {
            response.statusCode = 404;
            response.setHeader("Content-Type", "text/plain");
            response.end("Not Found");
          }
        }
      });
    } else {
      response.statusCode = 404;
      response.setHeader("Content-Type", "text/plain");
      response.end("Not Found");
    }
  })
  .listen(3000, () => {
    console.log("Listening on port 3000");
  });
