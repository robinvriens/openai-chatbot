const OPENAI_CONFIG = require('../config/open_ai.config.json');
class CompletionRequest {
  constructor(config) {
    this.prompt = config.prompt;
    this.model = config.model || OPENAI_CONFIG.DEFAULT_MODEL;
    this.max_tokens = config.max_tokens || OPENAI_CONFIG.MAX_TOKENS;
    this.temperature = config.temperature || OPENAI_CONFIG.DEFAULT_TEMPERATURE;
    this.stop = config.stop 
  }
}

module.exports = CompletionRequest;
