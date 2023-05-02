import fs from "fs";
import process from "process";

const subcommand = process.argv[2];

if (subcommand === "read") {
  let petIndex = process.argv[3];
  fs.readFile("pets.json", "utf-8", (error, string) => {
    if (error) {
      throw error;
    }
    let pets = JSON.parse(string);
    let petIndex = Number(petIndex);
    if (petIndex >= pets.length || petIndex < 0 || isNaN(petIndex)) {
      console.error("Usage: node pets.js read index");
      process.exit(1);
    }

    if (isNaN(petIndex)) {
      console.log(pets);
    } else {
      console.log(pets[petIndex]);
    }
  });
} else if (subcommand === "create") {
  // implement create subcommand
  let age = Number(process.argv[3]);
  let name = process.argv[4];
  let kind = process.argv[5];

  if (isNaN(age) || !name || !kind) {
    console.error("Usage: node pets.js create [age] [name] [kind]");
    process.exit(1);
  }

  let newPet = { age, name, kind };
  fs.readFile("pets.json", "utf-8", (error, string) => {
    if (error) {
      throw error;
    }
    let pets = JSON.parse(string);
    pets.push(newPet);
    fs.writeFile("pets.json", JSON.stringify(pets), (error) => {
      if (error) {
        throw error;
      }
      console.log(newPet);
    });
  });
} else if (subcommand === "update") {
  // implement update subcommand
} else if (subcommand === "destroy") {
  // implement destroy subcommand
} else {
  console.error("Usage: node pets.js [read | create | update | destroy]");
  process.exit(1);
}
