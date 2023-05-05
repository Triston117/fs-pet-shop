const { isUtf8 } = require("buffer");
import express from "express";
const app = express();
import fs from "fs";

app.get("/pets", (req, res) => {
  fs.readFile("pets.json", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server Error");
      return;
    }
    const pets = JSON.parse(data);
    res.status(200).json(pets);
  });
});

app.get("/pets/:index", (req, res) => {
  fs.readFile("pets.json", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server Error");
      return;
    }
    const pets = JSON.parse(data);
    const index = parseInt(req.params.index);
    if (isNaN(index) || index < 0 || index >= pets.length) {
      res.status(404).send("Not Found");
      return;
    }
    res.status(200).json(pets[index]);
  });
});

app.use((req, res) => {
  res.status(404).send("Not Found");
});

app.post("/pets", (req, res) => {
  let newPet = req.body;
  fs.readFile("pets.json", "utf-8")
    .then((string) => {
      let pets = JSON.parse(string);
      pets.push(newPet);
      return fs.writeFile("pets.json", JSON.stringify(pets));
    })
    .then(() => {
      res.sendStatus(201);
    });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
