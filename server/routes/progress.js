const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Progress = require('../models/Progress');

// Save interview session progress
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { topic, difficulty, questions, totalScore } = req.body;

    const progress = new Progress({
      userId: req.userId,
      topic,
      difficulty,
      questions,
      totalScore
    });

    await progress.save();

    res.status(201).json({ message: 'Progress saved successfully', progress });
  } catch (error) {
    console.error('Error saving progress:', error);
    res.status(500).json({ message: 'Error saving progress' });
  }
});

// Get user's progress history
router.get('/', authMiddleware, async (req, res) => {
  try {
    const progressHistory = await Progress.find({ userId: req.userId })
      .sort({ completedAt: -1 })
      .limit(20);

    res.json(progressHistory);
  } catch (error) {
    console.error('Error fetching progress:', error);
    res.status(500).json({ message: 'Error fetching progress' });
  }
});

// Get user statistics
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const progressHistory = await Progress.find({ userId: req.userId });

    const stats = {
      totalSessions: progressHistory.length,
      averageScore: progressHistory.length > 0
        ? progressHistory.reduce((sum, p) => sum + p.totalScore, 0) / progressHistory.length
        : 0,
      topicBreakdown: {},
      difficultyBreakdown: { Easy: 0, Medium: 0, Hard: 0 }
    };

    progressHistory.forEach(session => {
      // Count by topic
      stats.topicBreakdown[session.topic] = (stats.topicBreakdown[session.topic] || 0) + 1;
      
      // Count by difficulty
      stats.difficultyBreakdown[session.difficulty]++;
    });

    res.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ message: 'Error fetching statistics' });
  }
});

// Get specific session details
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const progress = await Progress.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!progress) {
      return res.status(404).json({ message: 'Session not found' });
    }

    res.json(progress);
  } catch (error) {
    console.error('Error fetching session:', error);
    res.status(500).json({ message: 'Error fetching session' });
  }
});

module.exports = router;
