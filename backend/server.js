const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const scoreRoutes = express.Router();
const PORT = 5555;

let Score = require('./score.model');

app.use(cors());
app.use(bodyParser.json());

// Connect to Database
mongoose.connect('mongodb://127.0.0.1:27017/scores', { useNewUrlParser: true });
const connection = mongoose.connection;
// db sanity check
connection.once('open', function() {
    console.log('MongoDB database connection established successfully');
})

// SCORE : Route definitions
// Get all scores
scoreRoutes.route('/').get(function(req, res) {
    Score.find(function(err, scores) {
        if (err) {
            console.log(err);
        } else {
            res.json(scores);
        }
    });
});
// Get one score by :id
scoreRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Score.findById(id, function(err, score) {
        res.json(score);
    });
});
// Add a new score
scoreRoutes.route('/add').post(function(req, res) {
    let score = new Score(req.body);
    score.save()
        .then(score => {
            res.status(200).json({'score added: ': score});
        })
        .catch(err => {
            res.status(400).send('failed to add new score');
        });
});
// Update one score by :id
scoreRoutes.route('/update/:id').post(function(req, res) {
    Score.findById(req.params.id, function(err, score) {
        if (!score)
            res.status(404).send('data is not found');
        else
            score.score_value = req.body.score_value;
            score.score_game = req.body.score_game;
            score.score_multiplayer = req.body.score_multiplayer;
            score.score_player_num = req.body.score_player_num;

            score.save().then(score => {
                res.json('Score updated!');
            })
            .catch(err => {
                res.status(400).send('failed to update score');
            });
    });
});
// Delete one score by :id
scoreRoutes.route('/delete/:id').delete(function(req, res) {
    Score.findById(req.params.id, function(err, score) {
      score.delete()
          .then(score => {
              res.status(200).json({'score deleted: ': score});
          })
          .catch(err => {
              res.status(400).send('failed to delete score');
          })
    });
});

app.use('/scores', scoreRoutes);

app.listen(PORT, function() {
    console.log('Server is running on Port: ' + PORT);
});
