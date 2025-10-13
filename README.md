# AI Shamba Guide 

This project is the frontend for the AI Shamba Guide, a tool designed to assist farmers with agricultural information and guidance using AI technology.

## Project Structure
- `index.html` - Main HTML file
- `script.js` - JavaScript logic for the frontend
- `styles.css` - Styling for the frontend

## Getting Started
1. Open `index.html` in your browser to launch the application.
2. Make sure `script.js` and `styles.css` are in the same directory for full functionality and styling.

## Features
- User-friendly interface for accessing AI-powered agricultural advice
- Responsive design for desktop and mobile

## Contributing
Feel free to fork this repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.



BACKENED FEATURES

land-monitoring/
├── frontend/
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   ├── config.js
│   └── api.js                    ⭐ NEW (talks to backend)
│
├── backend/
│   ├── config/
│   │   ├── database.js           🔌 Connects to MongoDB
│   │   └── env.js                ⚙️ Settings
│   │
│   ├── models/
│   │   ├── User.js               👤 User structure
│   │   ├── Land.js               🌾 Farm structure
│   │   ├── Weather.js            🌡️ Weather structure
│   │   ├── Prediction.js         🔮 Prediction structure
│   │   └── Alert.js              ⚠️ Alert structure
│   │
│   ├── routes/
│   │   ├── users.js              📖 User endpoints
│   │   ├── lands.js              📖 Land endpoints
│   │   ├── weather.js            📖 Weather endpoints
│   │   ├── predictions.js        📖 Prediction endpoints
│   │   └── alerts.js             📖 Alert endpoints
│   │
│   ├── controllers/
│   │   ├── userController.js     🎮 User logic
│   │   ├── landController.js     🎮 Land logic
│   │   ├── weatherController.js  🎮 Weather logic
│   │   ├── predictionController.js 🎮 Prediction logic
│   │   └── alertController.js    🎮 Alert logic
│   │
│   ├── middleware/
│   │   ├── auth.js               🔐 Authentication check
│   │   ├── errorHandler.js       ⚠️ Error handling
│   │   └── validation.js         ✓ Data validation
│   │
│   ├── utils/
│   │   ├── ai.js                 🤖 AI calculations
│   │   ├── validators.js         ✓ Validators
│   │   └── helpers.js            🛠️ Helper functions
│   │
│   ├── server.js                 🚀 Main server file
│   ├── .env                      🔐 Secrets (DON'T SHARE!)
│   ├── .gitignore                🚫 What to ignore
│   ├── package.json              📦 Dependencies
│   └── README.md                 📖 Instructions
│
└── README.md

