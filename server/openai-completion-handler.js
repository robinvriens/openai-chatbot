const {
  generateCompletionRequestParams,
} = require('./completion_request_generator');
const { NO_OF_CONTEXT_MESSAGES } = require('./config/open_ai.config.json');
const { openai } = require('./open-ai-config-handler');

let context = [];

const pushToContext = (messages) => {
  context.push(...messages);
  while (context.length > NO_OF_CONTEXT_MESSAGES) {
    context.shift();
  }
};

const answerUserQuery = async (req, res) => {
  try {
    const { message, persona } = req.body;
    // const prompt = generatePromptForPersonas(message, persona);
    const completionRequestParams = {
      ...generateCompletionRequestParams(message, persona),
    };
    const originalPrompt = completionRequestParams.prompt;
    const prompt = completionRequestParams.prompt.replace(
      '{{context}}',
      context
    );
    const completion = await openai.createCompletion({
      ...completionRequestParams,
      prompt,
    });
    pushToContext([
      originalPrompt.substring(
        originalPrompt.indexOf('{{context}}') + 11,
        originalPrompt.length - 1
      ),
      completion.data?.choices?.[0].text,
    ]);
    console.log(prompt);
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

module.exports = { answerUserQuery };
