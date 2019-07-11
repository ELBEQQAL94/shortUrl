const express  = require('express');
const routes   = express.Router();
const validUrl = require('valid-url');
const shortId  = require('shortid');
const config   = require('config');

// modules
const Url      = require('../modules/Url');

// @route POST /api/url/shorten
// @desc Create short url
routes.post('/shorten', async (req,res) => {
    const { longUrl } = req.body;
    const baseUrl = config.get('baseUrl');

    // check base uri
    if(!validUrl.isUri(baseUrl)){
        return res.status(401).json({
            message: new Error('Invalid Uri')
        });
    };

    // create url code
    const urlCode = shortId.generate();

    // check long url is not valid
    if(!validUrl.isHttpsUri(longUrl)){
        return res.status(401).json({
            message: 'Invalid Url'
        });
        // check url is valid
    } else {
        try {
            let url = await Url.findOne({ longUrl });

            // is url found
            if(url) res.json(url);

            // is url not found
            else {
                // create short url
                const shortUrl = baseUrl + '/' + urlCode;

                // create new url object
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: Date.now()
                });

                // save url
                await url.save();

                // return our url
                return res.json(url);

            };

        } catch(err) {
            console.error('Error :', err.message);
            res.status(500).json('Server error');
        }
    }

});


module.exports = routes;