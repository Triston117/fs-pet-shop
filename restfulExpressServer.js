import fs from "fs";
import express from "express";
app.use(express.json());

const app = express();

// Use middleware to parse request bodies
app.use(bodyParser.json());

const pets = {};

// Create a new pet
app.post("/pets", (req, res) => {
  const { name, age, kind } = req.body;
  const id = Object.keys(pets).length + 1;
  pets[id] = { id, name, age, kind };
  res.status(200).json(pets[id]);
});

app.post("/pets", (req, res) => {
  const { name, age, kind } = req.body;

  // Check that all required properties are present
  if (!name || !age || !kind || !Number.isInteger(age)) {
    res.status(400).send("Bad Request");
    return;
  }

  const id = Object.keys(pets).length + 1;
  pets[id] = { id, name, age, kind };
  res.status(200).json(pets[id]);
});

// Get a pet by ID
app.get("/pets/:id", (req, res) => {
  const pet = pets[req.params.id];
  if (!pet) {
    res.status(404).send("Not Found");
  } else {
    res.status(200).json(pet);
  }
});

// Update a pet by ID
app.patch("/pets/:id", (req, res) => {
  const pet = pets[req.params.id];
  if (!pet) {
    res.status(404).send("Not Found");
  } else {
    const { name, age, kind } = req.body;
    if (typeof age === "number" && kind && name) {
      pet.name = name;
      pet.age = age;
      pet.kind = kind;
      res.status(200).json(pet);
    } else {
      res.status(400).send("Bad Request");
    }
  }
});

// Delete a pet by ID
app.delete("/pets/:id", (req, res) => {
  const pet = pets[req.params.id];
  if (!pet) {
    res.status(404).send("Not Found");
  } else {
    delete pets[req.params.id];
    res.status(200).json(pet);
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
