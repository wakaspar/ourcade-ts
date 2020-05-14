import express, { Router } from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import { connect, connection as _connection } from 'mongoose';
import Score, { find, findById } from './score.model';

const app = express();
const scoreRoutes = Router();
const PORT = 5555;

//Prevent CORS errors
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  
    //Remove caching
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });
  
app.use(json());

// SCORE : Route definitions
// Get all scores
scoreRoutes.route('/').get(function(req, res) {
    find(function(err, scores) {
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
    findById(id, function(err, score) {
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
    findById(req.params.id, function(err, score) {
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
    findById(req.params.id, function(err, score) {
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
