const express   = require('express');
const app       = express();
const connectDB = require('./config/db');

app.use(express.json({extented:false}));

const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Define routes
app.use('/', require('./routes'));
app.use('/api/url', require('./routes/url'));

app.listen(PORT, () => console.log(`Server runing at ${PORT}`))