const fs = require("fs");
const process = require("process");

const subcommand = process.argv[2];

if (!subcommand) {
  console.error("Usage: node pets.js [read | create | update | destroy]");
  process.exit(1);
}

if (subcommand === "read") {
  const petIndex = process.argv[3];
  fs.readFile("pets.json", "utf8", (err, data) => {
    if (err) {
      throw err;
    }
    const pets = JSON.parse(data);
    if (!petIndex) {
      console.log(pets);
    } else if (petIndex >= pets.length || petIndex < 0 || isNaN(petIndex)) {
      console.error("Usage: node pets.js read INDEX");
      process.exit(1);
    } else {
      console.log(pets[petIndex]);
    }
  });
} else if (subcommand === "create") {
  const age = parseInt(process.argv[3]);
  const kind = process.argv[4];
  const name = process.argv[5];

  if (isNaN(age) || !kind || !name) {
    console.error("Usage: node pets.js create AGE KIND NAME");
    process.exit(1);
  }

  fs.readFile("pets.json", "utf8", (err, data) => {
    if (err) {
      throw err;
    }
    const pets = JSON.parse(data);
    const newPet = { age, kind, name };
    pets.push(newPet);
    fs.writeFile("pets.json", JSON.stringify(pets), (err) => {
      if (err) {
        throw err;
      }
      console.log(newPet);
    });
  });
} else {
  console.error("Usage: node pets.js [read | create | update | destroy]");
  process.exit(1);
}
