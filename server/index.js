// An express server, which handles incoming requests and responds with a json object. It will use bodyParser as well as cors.

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { verifyOpenAIConfigs, answerUserQuery } = require('./open-ai.handler');
require('dotenv').config();

const PORT = process.env.SERVER_PORT || 4000;
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World');
});
app.post('/message', verifyOpenAIConfigs, answerUserQuery);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
