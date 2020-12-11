const router = require("express").Router();
const fitness = require("../models").fitness;

router.get("/api/workouts", (req, res) => {
    fitness.find()
    .then(workouts => res.json(workouts))
    .cath(err => res.json(err));
});

router.put("/api/workouts/:id", (req, res) => {
    fitness.findByIDAndUpdate(
        req.params.id, { $push: { exercises: req.body } },
        { new: true }
    ).then(fitness => res.json(fitness))
    .catch(err => res.json(err));
});

router.post("/api/workouts", (req, res) => {
    fitness.create({
        day: Date.now()
    }).then(newWorkout => {
        res.json(newWorkout);
    }).catch(err => res.json(err));
});

router.get("/api/workouts/range", (req, res) => {
    fitness.find({}).then(workouts => {
        res.json(workouts);
    }).catch(err => res.json(err));
});

module.exports = router;