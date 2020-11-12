const mongoose = require("mongoose");
mongoose.set('debug', true);

console.log({ MONGODB_URI });
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/fitness', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    day: {
      type: Date,
      default: Date.now
    },
    exercises: [{
      type: {
        type: String,
        trim: true,
        required: "Enter an exercise type"
      },
      name: {
        type: String,
        trim: true,
        required: "Enter an exercise name"
      },
      duration: {
        type: Number,
        required: "Enter an exercise duration in minutes"
      },
      weight: {
        type: Number
      },
      reps: {
        type: Number
      },
      sets: {
        type: Number
      },
      distance: {
        type: Number
      }
    }]
  });

workoutSchema.virtual("totalDuration").get(function () {
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;




