import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './Progress.css';

function Progress() {
  const [progressHistory, setProgressHistory] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState(null);

  useEffect(() => {
    fetchProgressData();
  }, []);

  const fetchProgressData = async () => {
    setLoading(true);
    try {
      const [historyResponse, statsResponse] = await Promise.all([
        api.get('/progress'),
        api.get('/progress/stats')
      ]);

      setProgressHistory(historyResponse.data);
      setStats(statsResponse.data);
    } catch (error) {
      console.error('Error fetching progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getScoreColor = (score) => {
    if (score >= 7) return '#28a745';
    if (score >= 4) return '#ffc107';
    return '#dc3545';
  };

  if (loading) {
    return (
      <div className="container">
        <div className="card">
          <div className="loading">Loading your progress...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="progress-title">My Progress</h1>

      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-value">{stats.totalSessions}</div>
            <div className="stat-label">Total Sessions</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-value">{stats.averageScore.toFixed(1)}</div>
            <div className="stat-label">Average Score</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-value">{Object.keys(stats.topicBreakdown).length}</div>
            <div className="stat-label">Topics Practiced</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-value">
              {Math.max(stats.difficultyBreakdown.Easy, 
                        stats.difficultyBreakdown.Medium, 
                        stats.difficultyBreakdown.Hard) === stats.difficultyBreakdown.Hard ? 'Hard' :
               Math.max(stats.difficultyBreakdown.Easy, 
                        stats.difficultyBreakdown.Medium, 
                        stats.difficultyBreakdown.Hard) === stats.difficultyBreakdown.Medium ? 'Medium' : 'Easy'}
            </div>
            <div className="stat-label">Most Practiced</div>
          </div>
        </div>
      )}

      {stats && Object.keys(stats.topicBreakdown).length > 0 && (
        <div className="card">
          <h3>Topics Breakdown</h3>
          <div className="topic-breakdown">
            {Object.entries(stats.topicBreakdown).map(([topic, count]) => (
              <div key={topic} className="topic-bar-container">
                <div className="topic-bar-label">{topic}</div>
                <div className="topic-bar">
                  <div
                    className="topic-bar-fill"
                    style={{
                      width: `${(count / stats.totalSessions) * 100}%`
                    }}
                  ></div>
                </div>
                <div className="topic-bar-count">{count}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card">
        <h3>Session History</h3>
        {progressHistory.length === 0 ? (
          <div className="no-data">
            <p>No interview sessions yet. Start practicing to see your progress!</p>
          </div>
        ) : (
          <div className="history-list">
            {progressHistory.map((session) => (
              <div
                key={session._id}
                className="history-item"
                onClick={() => setSelectedSession(selectedSession?._id === session._id ? null : session)}
              >
                <div className="history-header">
                  <div>
                    <h4>{session.topic}</h4>
                    <span className={`difficulty-badge ${session.difficulty.toLowerCase()}`}>
                      {session.difficulty}
                    </span>
                  </div>
                  <div className="history-score" style={{ color: getScoreColor(session.totalScore) }}>
                    {session.totalScore.toFixed(1)}/10
                  </div>
                </div>
                <div className="history-meta">
                  <span>📅 {formatDate(session.completedAt)}</span>
                  <span>❓ {session.questions.length} questions</span>
                </div>

                {selectedSession?._id === session._id && (
                  <div className="session-details">
                    <h5>Questions & Answers:</h5>
                    {session.questions.map((q, index) => (
                      <div key={index} className="question-detail">
                        <div className="question-detail-header">
                          <strong>Q{index + 1}:</strong>
                          <span className={`detail-score score-${Math.floor(q.score)}`}>
                            {q.score}/10
                          </span>
                        </div>
                        <p className="detail-question">{q.question}</p>
                        <p className="detail-answer"><strong>Your Answer:</strong> {q.userAnswer}</p>
                        <p className="detail-feedback"><strong>Feedback:</strong> {q.evaluation}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Progress;
