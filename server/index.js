// An express server, which handles incoming requests and responds with a json object. It will use bodyParser as well as cors.

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { verifyOpenAIConfigs } = require('./open-ai-config-handler');
const { createChatResponse } = require('./open-ai-chat-handler');
const { answerUserQuery } = require('./openai-completion-handler');
require('dotenv').config();

const PORT = process.env.SERVER_PORT || 4000;
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World');
});
app.post('/message', verifyOpenAIConfigs, answerUserQuery);
app.post('/chat', verifyOpenAIConfigs, createChatResponse);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
