// load up server and basic routes
const express = require('express');
const helpers = require('./server_helpers/middleware');
const requestHandler = require('./server_helpers/request-handler');
const bodyParser = require('body-parser');

const app = express();

const port = 4000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(helpers.logger);
app.use(express.static(__dirname.concat('/../public')));


app.post('/api/categorize', requestHandler.categorize.post);
app.get('/api/quotes', requestHandler.getQuotes.get);

app.listen(port, () => {
  console.log('Listening on port:', port, '!');
});

module.exports = app;
