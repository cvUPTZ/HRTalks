// routes/episodes.js
const router = require('express').Router();
let Episode = require('../models/episode.model');

router.route('/').get((req, res) => {
  Episode.find()
    .then(episodes => res.json(episodes))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const { title, description, releaseDate, duration } = req.body;

  const newEpisode = new Episode({
    title,
    description,
    releaseDate,
    duration,
  });

  newEpisode.save()
    .then(() => res.json('Episode added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// routes/episodes.js
router.route('/:id').get((req, res) => {
  Episode.findById(req.params.id)
    .then(episode => res.json(episode))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Episode.findByIdAndDelete(req.params.id)
    .then(() => res.json('Episode deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Episode.findById(req.params.id)
    .then(episode => {
      episode.title = req.body.title;
      episode.description = req.body.description;
      episode.releaseDate = Date.parse(req.body.releaseDate);
      episode.duration = Number(req.body.duration);

      episode.save()
        .then(() => res.json('Episode updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;