const {Schema,model} = require('mongoose');

const UrlSchema = Schema({
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    date: {
        type: String, default: Date.now()
    }
});

module.exports = model('Url', UrlSchema);