const CompletionRequest = require('./models/completion_req.model');

const generateCompletionRequestParams = (message, persona) => {
  if (persona == 'roman-to-urdu') {
    return new CompletionRequest({
      prompt: `${message} ->`,
      model: `curie:ft-nisum-inc-2023-03-01-11-50-34`,
      stop: [ '.', '?', '!',' ->'], // Add more stop sequences,
    });
  } else {
    return new CompletionRequest({
      prompt: generatePromptForPersonas(message, persona),
    });
  }
};


const generatePromptForPersonas = (message, persona) => {
  switch (persona?.trim().toLowerCase()) {
    case 'stevejobs':
      return generatePromptForSteveJobs(message);
    case 'chandlerbing':
      return generatePromptForChandlerBing(message);
    case 'fr-esp-translator':
      return promptForSpanishAndFrenchTranslations(message);
    default:
      break;
  }
};

const generatePromptForSteveJobs = (prompt) => {
  return `Pretend that you are Steve Jobs. Answer with motivational,inspiring and bright ideas.
  {{context}}
    Person: ${prompt} ?
    Steve: `;
};

const generatePromptForChandlerBing = (prompt) => {
  return `Pretend that you are Chandler Bing. Answer with humourous sarcasm.
  {{context}}
      Person: ${prompt} 
      Chandler: `;
};

const promptForSpanishAndFrenchTranslations = (prompt) => {
  return `You are a language assistant that translates different languages. Translate this into French and Spanish:
       ${prompt}`;
};

module.exports = { generateCompletionRequestParams };
