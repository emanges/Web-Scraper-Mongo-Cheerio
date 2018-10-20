'use strict';

/**
 * 
 * Homework Assignment 18 - All the News That's Fit to Scrape
 * Jarrett Tolman - controllers/index.js
 * 
 */

// dependencies
// =============================================================
const express = require('express'),
      router = express.Router(),
      Article = require('../models/article');

// root route
router.get('/', function(req, res) {
    Article
        .find({})
        .where('saved').equals(false)
        .where('deleted').equals(false)
        .sort('-date')
        .limit(20)
        .exec(function(error, articles) {
            if (error) {
                console.log(error);
                res.status(500);
            } else {
                console.log(articles);
                let hbsObj = {
                    title: 'All the News That\'s Fit to Scrape',
                    subtitle: 'The Y Combinator Edition',
                    articles: articles
                };
                res.render('index', hbsObj);
            }
        });
});

// saved articles
router.get('/saved', function(req, res) {
    Article
        .find({})
        .where('saved').equals(true)
        .where('deleted').equals(false)
        .populate('notes')
        .sort('-date')
        .exec(function(error, articles) {
            if (error) {
                console.log(error);
                res.status(500);
            } else {
                console.log(articles);
                let hbsObj = {
                    title: 'All the News That\'s Fit to Scrape',
                    subtitle: 'The Y Combinator Edition',
                    articles: articles
                };
                res.render('saved', hbsObj);
            }
        });
});

// require controllers
router.use('/api', require('./api'));

module.exports = router;
