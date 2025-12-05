# Interview Question Platform

A full-stack web platform that generates AI-powered interview questions by topic and evaluates spoken answers in real-time using Google Gemini API and Web Speech API.

## 🚀 Features

- **User Authentication**: Secure registration and login with JWT tokens
- **AI-Powered Questions**: Dynamic interview question generation using Google Gemini API
- **Voice Recognition**: Real-time speech-to-text conversion with Web Speech API
- **Smart Evaluation**: AI-based answer evaluation with detailed feedback
- **Progress Tracking**: Comprehensive session history and performance statistics
- **Multiple Topics**: Practice interviews on JavaScript, React, Node.js, Python, and more
- **Difficulty Levels**: Choose from Easy, Medium, or Hard difficulty levels
- **Personalized Dashboard**: Track your improvement over time

## 🛠️ Technologies Used

### Frontend
- **React.js** - UI framework
- **React Router** - Navigation
- **Axios** - HTTP client
- **Web Speech API** - Voice recognition

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Google Gemini API** - AI question generation and evaluation
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- MongoDB installed and running locally, or a MongoDB Atlas account
- Google Gemini API key ([Get it here](https://makersuite.google.com/app/apikey))
- A modern web browser (Chrome or Edge recommended for best speech recognition support)

## 🔧 Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd interview_question_p
```

### 2. Install dependencies
```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Set up environment variables

#### Server Environment (.env)
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/interview_platform
JWT_SECRET=your_jwt_secret_key_here_change_this_in_production
GEMINI_API_KEY=your_gemini_api_key_here
```

#### Client Environment (.env)
Create a `.env` file in the `client` directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# On Windows (if MongoDB is installed as a service)
net start MongoDB

# On macOS/Linux
mongod
```

Or use MongoDB Atlas cloud database and update the `MONGODB_URI` in server `.env` file.

### 5. Run the application

#### Option 1: Run both frontend and backend together (from root directory)
```bash
npm run dev
```

#### Option 2: Run separately

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📱 Usage

1. **Register/Login**: Create an account or sign in
2. **Select Topic**: Choose from predefined topics or enter a custom topic
3. **Choose Difficulty**: Select Easy, Medium, or Hard
4. **Start Interview**: Click "Start Interview" button
5. **Answer Questions**: 
   - Type your answer, OR
   - Click "Voice Answer" and speak your response
6. **Submit & Review**: Get AI-powered feedback on each answer
7. **Track Progress**: View your session history and statistics

## 🎤 Voice Recognition Tips

- Use Chrome or Edge browser for best results
- Allow microphone permissions when prompted
- Speak clearly at a normal pace
- You can pause and resume recording anytime
- Review your transcript before submitting

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Questions
- `POST /api/questions/generate` - Generate interview questions
- `POST /api/questions/evaluate` - Evaluate user answer

### Progress
- `POST /api/progress` - Save session progress
- `GET /api/progress` - Get user's progress history
- `GET /api/progress/stats` - Get user statistics
- `GET /api/progress/:id` - Get specific session details

## 🔐 Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Protected API routes with middleware
- Input validation on all endpoints
- Secure HTTP headers

## 🎨 Project Structure

```
interview_question_p/
├── client/                  # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/       # Login & Register
│   │   │   ├── Dashboard/  # Main dashboard
│   │   │   ├── Interview/  # Interview session
│   │   │   ├── Navbar/     # Navigation
│   │   │   ├── Progress/   # Progress tracking
│   │   │   └── SpeechRecognition/  # Voice input
│   │   ├── services/       # API service
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server/                  # Node.js backend
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Auth middleware
│   ├── server.js           # Entry point
│   └── package.json
└── package.json            # Root package.json
```

## 🚧 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check the `MONGODB_URI` in `.env` file
- For MongoDB Atlas, whitelist your IP address

### Gemini API Errors
- Verify your API key is correct
- Check API quota/limits
- Ensure you have an active Google Cloud project

### Speech Recognition Not Working
- Use Chrome or Edge browser
- Check microphone permissions
- Ensure HTTPS (localhost is exempt)

### CORS Errors
- Verify the backend is running on port 5000
- Check the `REACT_APP_API_URL` in client `.env`

## 📝 Future Enhancements

- [ ] Support for multiple languages
- [ ] Video recording for mock interviews
- [ ] Peer comparison and leaderboards
- [ ] Custom question sets
- [ ] Export progress reports as PDF
- [ ] Mobile app version

## 👨‍💻 Development

Built with ❤️ using React, Node.js, MongoDB, and Google Gemini API.

**Project Timeline**: June 2025

## 📄 License

MIT License - feel free to use this project for learning and development.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

**Note**: This is a portfolio/learning project. For production use, implement additional security measures and error handling.
