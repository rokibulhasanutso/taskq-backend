// Basic Lib Import
const express = require('express');
const router = require('./src/routes/api');
const app = new express();
const bodyParser = require('body-parser');

// Security Middleware Lib Import
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

// Database Lib Import
const mongoose = require('mongoose');

// Security Middleware Implement
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());
app.use(xss());
// Body Parser Implement for JSON Data
app.use(bodyParser.json());

// Request Rate Limit (3000 requests per day || 24 hours)
const limiter = rateLimit({
    windowMs: 24 * 60 * 1000, // 1 day || 24 hours
    max: 5000, // limit each IP to 5000 requests per window Ms
	validate: {xForwardedForHeader: false}
});
app.use(limiter)

// Connecting To MongoDB Server
const username = 'taskq';
const password = 'taskq1234';
const dbname = 'TaskQDB';
const URI = `mongodb+srv://${username}:${password}@cluster0.hrwg09t.mongodb.net/${dbname}?retryWrites=true&w=majority&appName=Cluster0`;
const options = { autoIndex: true };

mongoose
	.connect(URI, options)
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((err) => {
		console.error(err);
	});

// Routes Implementation
app.use('/api/v1', router);

// Undefined Route Implement
app.use('*', (req, res) => {
	res.status(404).send({ status: 'fail', message: "Not Found" })
});

module.exports = app;