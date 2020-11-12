const express = require("express");
const logger = require("morgan");

const PORT = process.env.PORT || 3000;

const User = require("./seeders/seed"); // Uncomment this to seed
const db = require("./models");           // Comment this to seed

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Served html
app.get("/stats", (req, res) => {
  res.sendFile(__dirname + '/public/stats.html');
});

app.get("/exercise", (req, res) => {
  res.sendFile(__dirname + '/public/exercise.html');
});


// Api
app.get("/api/workouts/range", (req, res) => {
  db.Workout.find().then(function (data) {
    res.json(data);
  });
});

app.get("/api/workouts", (req, res) => {
  db.Workout.find()
    .then(data => {
      var newData = data.map(d => d.toJSON({ virtuals: true }));
      res.json(newData);
    });
});

app.put("/api/workouts/:id", (req, res) => {
  db.Workout.updateOne(
    {
      _id: req.params.id
    },
    {
      $push: { exercises: { ...req.body } }
    },
    (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.send(data);
      }
    }
  );
});

app.post("/api/workouts", (req, res) => {
  let data = req.body;

  db.Workout.create({
    day: new Date()
  }).then(dbUpdate => {
    res.json(dbUpdate);
  }).catch(err => {
    res.json(err);
  });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
