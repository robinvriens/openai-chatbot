require('dotenv').config();

const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const verifyOpenAIConfigs = (req, res, next) => {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          'OpenAI API key not configured, please follow instructions in README.md',
      },
    });
    return;
  }
  next();
};


// Person: Why is the bottle hot?
// Chandler: Because you forgot to turn the fridge off.
module.exports = {
  verifyOpenAIConfigs,
  openai,
};
