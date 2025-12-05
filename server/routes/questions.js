const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const authMiddleware = require('../middleware/auth');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate interview questions
router.post('/generate', authMiddleware, async (req, res) => {
  try {
    const { topic, difficulty, numberOfQuestions = 5 } = req.body;

    if (!topic || !difficulty) {
      return res.status(400).json({ message: 'Topic and difficulty are required' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `Generate ${numberOfQuestions} interview questions about ${topic} at ${difficulty} difficulty level. 
    Return ONLY a JSON array of objects with this exact format: 
    [{"question": "question text here", "id": 1}, {"question": "question text here", "id": 2}]
    Do not include any markdown formatting or additional text. Just the JSON array.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Clean up the response to extract JSON
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();

    let questions;
    try {
      questions = JSON.parse(text);
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', text);
      return res.status(500).json({ message: 'Failed to parse questions from AI' });
    }

    res.json({ questions, topic, difficulty });
  } catch (error) {
    console.error('Error generating questions:', error);
    res.status(500).json({ message: 'Error generating questions', error: error.message });
  }
});

// Evaluate answer using Gemini
router.post('/evaluate', authMiddleware, async (req, res) => {
  try {
    const { question, answer, topic, difficulty } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ message: 'Question and answer are required' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `You are an interview evaluator. 
    Topic: ${topic}
    Difficulty: ${difficulty}
    Question: ${question}
    Candidate's Answer: ${answer}
    
    Evaluate the answer and provide:
    1. A score from 0-10
    2. Brief feedback (2-3 sentences)
    
    Return ONLY a JSON object with this exact format:
    {"score": <number>, "feedback": "<feedback text>"}
    Do not include any markdown formatting or additional text.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Clean up the response to extract JSON
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();

    let evaluation;
    try {
      evaluation = JSON.parse(text);
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', text);
      return res.status(500).json({ message: 'Failed to parse evaluation from AI' });
    }

    res.json(evaluation);
  } catch (error) {
    console.error('Error evaluating answer:', error);
    res.status(500).json({ message: 'Error evaluating answer', error: error.message });
  }
});

module.exports = router;
