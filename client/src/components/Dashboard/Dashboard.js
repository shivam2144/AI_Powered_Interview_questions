import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [customTopic, setCustomTopic] = useState('');
  const [useCustomInput, setUseCustomInput] = useState(false);

  const topics = [
    'JavaScript',
    'React',
    'Node.js',
    'Python',
    'Data Structures',
    'Algorithms',
    'System Design',
    'Database',
    'HTML/CSS',
    'TypeScript'
  ];

  const difficulties = ['Easy', 'Medium', 'Hard'];

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setUseCustomInput(false);
    setCustomTopic('');
  };

  const handleCustomInputToggle = () => {
    setUseCustomInput(true);
    setSelectedTopic('');
  };

  const handleStartInterview = () => {
    const topic = useCustomInput ? customTopic : selectedTopic;
    
    if (!topic || !selectedDifficulty) {
      alert('Please enter a topic and select difficulty');
      return;
    }

    navigate('/interview', {
      state: {
        topic,
        difficulty: selectedDifficulty
      }
    });
  };

  return (
    <div className="container">
      <div className="dashboard-header">
        <h1>Start Your Interview Practice</h1>
        <p>Choose a topic and difficulty level to begin</p>
      </div>

      <div className="dashboard-content">
        <div className="card">
          <h2>Select Interview Topic</h2>
          
          <div className="topic-grid">
            {topics.map((topic) => (
              <button
                key={topic}
                className={`topic-card ${selectedTopic === topic && !useCustomInput ? 'selected' : ''}`}
                onClick={() => handleTopicSelect(topic)}
              >
                {topic}
              </button>
            ))}
          </div>

          <div className="custom-topic-section">
            <div className="or-divider">
              <span>OR</span>
            </div>
            
            <div className="input-group">
              <label htmlFor="customTopic">Enter Your Own Topic</label>
              <input
                type="text"
                id="customTopic"
                value={customTopic}
                onChange={(e) => {
                  setCustomTopic(e.target.value);
                  if (e.target.value) {
                    handleCustomInputToggle();
                  }
                }}
                onFocus={handleCustomInputToggle}
                placeholder="e.g., Machine Learning, DevOps, Cloud Computing, etc."
                className={useCustomInput ? 'active' : ''}
              />
            </div>
          </div>

          <div className="input-group" style={{ marginTop: '30px' }}>
            <label>Select Difficulty</label>
            <div className="difficulty-buttons">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty}
                  className={`btn-difficulty ${selectedDifficulty === difficulty ? 'selected' : ''} ${difficulty.toLowerCase()}`}
                  onClick={() => setSelectedDifficulty(difficulty)}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>

          <button
            className="btn btn-primary btn-block btn-large"
            onClick={handleStartInterview}
            disabled={(!selectedTopic && !customTopic) || !selectedDifficulty}
          >
            Start Interview 🚀
          </button>
        </div>

        <div className="card info-card">
          <h3>📌 How It Works</h3>
          <ul className="info-list">
            <li>✅ Select your topic and difficulty level</li>
            <li>✅ AI generates personalized interview questions</li>
            <li>✅ Answer using voice or text</li>
            <li>✅ Get instant AI-powered feedback</li>
            <li>✅ Track your progress over time</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
