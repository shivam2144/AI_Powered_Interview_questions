const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
  try {
    console.log('Fetching available models...\n');
    console.log('API Key:', process.env.GEMINI_API_KEY ? 'Set (length: ' + process.env.GEMINI_API_KEY.length + ')' : 'NOT SET');
    console.log('\nTrying to list models via fetch API...\n');
    
    const apiKey = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.error) {
      console.error('API Error:', data.error);
      console.log('\n❌ Your API key may be invalid or expired.');
      console.log('Please get a new API key from: https://makersuite.google.com/app/apikey');
    } else if (data.models) {
      console.log('✓ Available models:\n');
      data.models.forEach(model => {
        if (model.supportedGenerationMethods && model.supportedGenerationMethods.includes('generateContent')) {
          console.log(`  - ${model.name} (${model.displayName})`);
        }
      });
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

listModels();
