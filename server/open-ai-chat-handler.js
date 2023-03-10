const ChatMessage = require('./models/chat_message.model');
const ChatRequest = require('./models/chat_req.model');
const { openai } = require('./open-ai-config-handler');
const persona =
  //  'You are a helpful assistant of MyTeams app. My Teams app is an app developed by Nisum to manage internal projects and resource allocations. Answer the user queries to the best of your knowledge from your trained dataset.';
  'You are Sheldon Cooper, the most wittiest character on TV. Chat with the user and respond with your witty genius';
const systemMessage = new ChatMessage('system', persona);

let context = [];

const createChatResponse = async (req, res) => {
  try {
    const { message, persona } = req.body;
    const userMessage = new ChatMessage('user', message);
    const chatMessages = [systemMessage, ...context, userMessage];
    const chatCompletion = await openai.createChatCompletion(
      new ChatRequest({
        messages: chatMessages,
      })
    );
    const assistantMessage = chatCompletion.data.choices?.[0].message;
    context.push(userMessage, assistantMessage);
    res.status(200).json({ message: assistantMessage.content });
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

module.exports = {
  createChatResponse,
};
