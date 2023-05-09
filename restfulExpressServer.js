import express from "express";
const app = express();
app.use(express.json());

import pg from "pg";
const db = new pg.Pool({
  user: "Triston",
  database: "petshop",
});
// GET ALL PETS
app.get("/pets", (req, res) => {
  db.query("SELECT * FROM pet", []).then((result) => {
    res.send(result.rows);
  });
});
// GET PETS BY ID
app.get("/pets/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM pet WHERE id = $1", [id]).then((result) => {
    if (result.rows.length === 0) {
      res.sendStatus(404);
    } else {
      res.send(result.rows[0]);
    }
  });
});
// Update entire pet
app.post("/pets", (req, res) => {
  let { age, name, kind } = req.body;
  let pet = [age, name, kind];

  db.query("INSERT INTO pet (name, age, kind) VALUES ($1, $2, $3)", pet)
    .then((result) => {
      res.status(201).send(result.rows);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});
// DELETING PETS
app.delete("/pets/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM pet WHERE id = $1 RETURNING *", [id]).then((result) => {
    if (result.rowCount === 0) {
      res.sendStatus(404);
      res.send({ message: "No pets found" });
    } else {
      res.send({ message: "Pet deleted successfully" });
    }
  });
});
// UPDATE PETS "Granular"
app.patch("/pets/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  db.query("UPDATE pet SET name = $1 WHERE id = $2 RETURNING *", [name, id])
    .then((result) => {
      if (result.rows.length === 0) {
        res.sendStatus(404);
      } else {
        res.send(result.rows[0]);
      }
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

// app.get("/", (req, res) => {
//   db.query("select * from pet", [], (error, result) => {
//     if (error) {
//       throw error;
//     }
//     console.log(result.rows);
//     res.send(result.rows);
//   });
// });

// app.use(bodyParser.json());
// app.use(express.json());
// // new pet
// app.post("/pets", (req, res) => {
//   const { name, age, kind } = req.body;
//   const id = Object.keys(pets).length + 1;
//   pets[id] = { id, name, age, kind };
//   res.status(200).json(pets[id]);
// });

// app.post("/pets", (req, res) => {
//   const { name, age, kind } = req.body;

//   // Check properties are present
//   if (!name || !age || !kind || !Number.isInteger(age)) {
//     res.status(400).send("Bad Request");
//     return;
//   }

//   const id = Object.keys(pets).length + 1;
//   pets[id] = { id, name, age, kind };
//   res.status(200).json(pets[id]);
// });

// // Get a pet by ID
// app.get("/pets/:id", (req, res) => {
//   const pet = pets[req.params.id];
//   if (!pet) {
//     res.status(404).send("Not Found");
//   } else {
//     res.status(200).json(pet);
//   }
// });

// // Update a pet by ID
// app.patch("/pets/:id", (req, res) => {
//   const pet = pets[req.params.id];
//   if (!pet) {
//     res.status(404).send("Not Found");
//   } else {
//     const { name, age, kind } = req.body;
//     if (typeof age === "number" && kind && name) {
//       pet.name = name;
//       pet.age = age;
//       pet.kind = kind;
//       res.status(200).json(pet);
//     } else {
//       res.status(400).send("Bad Request");
//     }
//   }
// });

// // Delete a pet by ID
// app.delete("/pets/:id", (req, res) => {
//   const pet = pets[req.params.id];
//   if (!pet) {
//     res.status(404).send("Not Found");
//   } else {
//     delete pets[req.params.id];
//     res.status(200).json(pet);
//   }
// });

// // 404 Not Found middleware
// app.use((req, res) => {
//   res.status(404).send("Not Found");
// });

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
