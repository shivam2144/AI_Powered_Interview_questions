import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import SpeechRecognition from '../SpeechRecognition/SpeechRecognition';
import './Interview.css';

function Interview() {
  const location = useLocation();
  const navigate = useNavigate();
  const { topic, difficulty } = location.state || {};

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [evaluating, setEvaluating] = useState(false);
  const [sessionData, setSessionData] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [useVoice, setUseVoice] = useState(false);

  useEffect(() => {
    if (!topic || !difficulty) {
      navigate('/dashboard');
      return;
    }

    generateQuestions();
  }, [topic, difficulty, navigate]);

  const generateQuestions = async () => {
    setLoading(true);
    try {
      const response = await api.post('/questions/generate', {
        topic,
        difficulty,
        numberOfQuestions: 5
      });
      setQuestions(response.data.questions);
    } catch (error) {
      console.error('Error generating questions:', error);
      alert('Failed to generate questions. Please try again.');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceInput = (transcript) => {
    setAnswer(transcript);
  };

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) {
      alert('Please provide an answer');
      return;
    }

    setEvaluating(true);

    try {
      const response = await api.post('/questions/evaluate', {
        question: questions[currentQuestionIndex].question,
        answer,
        topic,
        difficulty
      });

      const newSessionData = [...sessionData, {
        question: questions[currentQuestionIndex].question,
        userAnswer: answer,
        evaluation: response.data.feedback,
        score: response.data.score
      }];

      setSessionData(newSessionData);
      setAnswer('');

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Save progress and show results
        await saveProgress(newSessionData);
        setShowResults(true);
      }
    } catch (error) {
      console.error('Error evaluating answer:', error);
      alert('Failed to evaluate answer. Please try again.');
    } finally {
      setEvaluating(false);
    }
  };

  const saveProgress = async (data) => {
    try {
      const totalScore = data.reduce((sum, item) => sum + item.score, 0);
      const averageScore = (totalScore / data.length).toFixed(1);

      await api.post('/progress', {
        topic,
        difficulty,
        questions: data,
        totalScore: parseFloat(averageScore)
      });
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const handleSkipQuestion = () => {
    if (!window.confirm('Are you sure you want to skip this question? You will receive 0 points.')) {
      return;
    }

    const newSessionData = [...sessionData, {
      question: questions[currentQuestionIndex].question,
      userAnswer: 'Skipped',
      evaluation: 'Question was skipped',
      score: 0
    }];

    setSessionData(newSessionData);
    setAnswer('');

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      saveProgress(newSessionData);
      setShowResults(true);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="card">
          <div className="loading">Generating interview questions...</div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const totalScore = sessionData.reduce((sum, item) => sum + item.score, 0);
    const averageScore = (totalScore / sessionData.length).toFixed(1);
    const percentage = ((averageScore / 10) * 100).toFixed(0);

    return (
      <div className="container">
        <div className="card results-card">
          <h1>Interview Complete! 🎉</h1>
          
          <div className="score-summary">
            <div className="score-circle">
              <div className="score-value">{averageScore}</div>
              <div className="score-label">Average Score</div>
            </div>
            <div className="score-percentage">{percentage}%</div>
          </div>

          <div className="session-info">
            <p><strong>Topic:</strong> {topic}</p>
            <p><strong>Difficulty:</strong> {difficulty}</p>
            <p><strong>Questions Answered:</strong> {sessionData.length}</p>
          </div>

          <h3>Question Review</h3>
          <div className="review-list">
            {sessionData.map((item, index) => (
              <div key={index} className="review-item">
                <div className="review-header">
                  <h4>Question {index + 1}</h4>
                  <span className={`score-badge score-${Math.floor(item.score)}`}>
                    {item.score}/10
                  </span>
                </div>
                <p className="review-question">{item.question}</p>
                <p className="review-answer"><strong>Your Answer:</strong> {item.userAnswer}</p>
                <p className="review-feedback"><strong>Feedback:</strong> {item.evaluation}</p>
              </div>
            ))}
          </div>

          <div className="results-actions">
            <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
              Start New Interview
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/progress')}>
              View Progress
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container">
      <div className="interview-header">
        <h2>{topic} - {difficulty}</h2>
        <div className="progress-indicator">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="card interview-card">
        <h3 className="question-text">{currentQuestion.question}</h3>

        <div className="answer-section">
          <div className="input-method-toggle">
            <button
              className={`toggle-btn ${!useVoice ? 'active' : ''}`}
              onClick={() => setUseVoice(false)}
            >
              ⌨️ Type Answer
            </button>
            <button
              className={`toggle-btn ${useVoice ? 'active' : ''}`}
              onClick={() => setUseVoice(true)}
            >
              🎤 Voice Answer
            </button>
          </div>

          {useVoice ? (
            <SpeechRecognition onTranscript={handleVoiceInput} currentAnswer={answer} />
          ) : (
            <textarea
              className="answer-textarea"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here..."
              rows="8"
            />
          )}
        </div>

        <div className="interview-actions">
          <button 
            className="btn btn-secondary" 
            onClick={handleSkipQuestion}
            disabled={evaluating}
          >
            ⏭️ Skip Question
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSubmitAnswer}
            disabled={evaluating || !answer.trim()}
          >
            {evaluating ? '⏳ Evaluating...' : '✅ Submit Answer'}
          </button>
        </div>

        {evaluating && (
          <div className="evaluating-message">
            ✨ AI is evaluating your answer...
          </div>
        )}
      </div>

      <div className="answered-count">
        Answered: {sessionData.length} / {questions.length}
      </div>
    </div>
  );
}

export default Interview;
