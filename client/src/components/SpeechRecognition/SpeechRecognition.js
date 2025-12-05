import React, { useState, useEffect, useRef } from 'react';
import './SpeechRecognition.css';

function SpeechRecognition({ onTranscript, currentAnswer }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState(currentAnswer || '');
  const [error, setError] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check if browser supports Speech Recognition
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognitionAPI();
    
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptPiece = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptPiece + ' ';
        } else {
          interimTranscript += transcriptPiece;
        }
      }

      const newTranscript = transcript + finalTranscript;
      setTranscript(newTranscript);
      onTranscript(newTranscript);
    };

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'no-speech') {
        setError('No speech detected. Please try again.');
      } else if (event.error === 'not-allowed') {
        setError('Microphone access denied. Please allow microphone access.');
      } else {
        setError(`Error: ${event.error}`);
      }
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    setTranscript(currentAnswer || '');
  }, [currentAnswer]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      setError('');
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (err) {
        console.error('Error starting recognition:', err);
        setError('Failed to start speech recognition');
      }
    }
  };

  const clearTranscript = () => {
    setTranscript('');
    onTranscript('');
  };

  return (
    <div className="speech-recognition">
      <div className="speech-controls">
        <button
          className={`btn-mic ${isListening ? 'listening' : ''}`}
          onClick={toggleListening}
          disabled={!!error && error.includes('not supported')}
        >
          {isListening ? '🎤 Stop Recording' : '🎤 Start Recording'}
        </button>
        
        {transcript && (
          <button className="btn btn-secondary" onClick={clearTranscript}>
            Clear
          </button>
        )}
      </div>

      {error && (
        <div className="speech-error">
          ⚠️ {error}
        </div>
      )}

      {isListening && (
        <div className="listening-indicator">
          <div className="pulse-ring"></div>
          <div className="pulse-ring pulse-ring-delayed"></div>
          <span>Listening...</span>
        </div>
      )}

      <div className="transcript-display">
        {transcript || 'Click "Start Recording" and speak your answer...'}
      </div>

      <div className="speech-tips">
        💡 <strong>Tips:</strong> Speak clearly and at a normal pace. You can pause and resume recording anytime.
      </div>
    </div>
  );
}

export default SpeechRecognition;
