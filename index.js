// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Timestamp microservice route
app.get("/api/:date_string?", function (req, res) {
  let dateString = req.params.date_string;

  // If no date string is provided, use current date
  if (!dateString) {
    dateString = new Date().toISOString();
  }

  let date;

  // Try to parse the date string
  if (/^\d+$/.test(dateString)) {
    // If date string is a number, assume it's a Unix timestamp
    date = new Date(parseInt(dateString));
  } else {
    // Otherwise, parse as a regular date string
    date = new Date(dateString);
  }

  // Check if the parsed date is valid
  if (isNaN(date.getTime())) {
    res.json({ error: 'Invalid Date' });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
