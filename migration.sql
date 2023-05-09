DROP TABLE IF EXISTS pet;

CREATE TABLE pet (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    kind TEXT NOT NULL
);


INSERT INTO pets (name, age, kind) VALUES ('Cookie', 3, 'Bird');
INSERT INTO pets (name, species, age, owner)
VALUES ('Fido', 'Dog', 3, 'John'),
       ('Fluffy', 'Cat', 2, 'Jane'),
       ('Buddy', 'Dog', 5, 'Sam');
