const express = require('express');
const routes  = express.Router();
const Url     = require('../modules/Url');

// @routes GET /:code
// @desc Redirect to long/original Url

routes.get('/:code', async (req,res) => {
    try{
        // find url
        const url = await Url.findOne({urlCode: req.params.code });

        // Redirect long url
        if(url){
            return res.redirect(url.longUrl);
        } else {
            return res.status(400).json('Url Not Found!');
        }
    } catch(err){
        console.error('Error :', err.message);
        res.status(500).json('Server error :', err.message);
    }

});

module.exports = routes;