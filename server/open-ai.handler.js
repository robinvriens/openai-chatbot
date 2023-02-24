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

const answerUserQuery = async (req, res) => {
  try {
    const {message,persona} = req.body;
    const prompt =generatePromptForPersonas(message, persona);
    const completion = await openai.createCompletion({
      prompt,
      temperature: 0.5,
      max_tokens: 100,
      // top_p: 1,
      // frequency_penalty: 0,
      model: 'text-davinci-003',
    });
    console.log(completion.data?.choices);
    res.status(200).json({ message: completion.data?.choices?.[0].text });
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        },
      });
    }
  }
};

const generatePromptForPersonas = (message, persona) => {    
    switch(persona?.trim().toLowerCase()) {
        case 'stevejobs':
            return generatePromptForSteveJobs(message);
        case 'chandlerbing':
            return generatePromptForChandlerBing(message);
        case 'fr-esp-translator':
            return promptForSpanishAndFrenchTranslations(message);
        default:
            break;

    }
}

const generatePromptForSteveJobs = (prompt) => {
  return `Pretend that you are Steve Jobs. Answer with motivational,inspiring and bright ideas.
  Person: ${prompt} ?
  Steve: `;
};

const generatePromptForChandlerBing = (prompt) => {
  return `Pretend that you are Chandler Bing. Answer with humourous sarcasm.
    Person: ${prompt} 
    Chandler: `;
};

const promptForSpanishAndFrenchTranslations = (prompt) => {
  return `Translate this into French and Spanish:
     ${prompt}`;
};

// Person: Why is the bottle hot?
// Chandler: Because you forgot to turn the fridge off.
module.exports = {
  verifyOpenAIConfigs,
  answerUserQuery,
};
