const express = require('express');
const app = express();

// Set body-parser limit to a higher value (e.g. 10mb) to avoid PayloadTooLargeError
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ...existing code...