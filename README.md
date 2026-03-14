# NeoPet AI 🧠🐾

*A Futuristic Interactive Virtual Pet Companion*

## Overview

NeoPet AI is a **futuristic virtual pet web application** that simulates a living digital companion inside the browser. The pet interacts with users through **animations, voice, AI conversation, and emotional reactions**, creating the experience of a smart digital companion.

The application combines **modern web technologies and AI capabilities** to provide an immersive and interactive environment where users can talk to, play with, and care for their virtual pet.

NeoPet AI focuses on **minimalist futuristic UI/UX design**, smooth animations, and intelligent interactions to make the pet feel alive and engaging.

---

## Features

### Interactive AI Pet

* A floating digital pet displayed at the center of the interface.
* The pet reacts to user actions such as clicking, dragging, or hovering.
* Displays animated behaviors like floating, blinking, bouncing, and reacting emotionally.

### Emotion System

The pet can express multiple emotional states:

* Happy
* Curious
* Hungry
* Sleepy
* Excited

Pet emotions dynamically change based on user interactions and activity.

---

### AI Chat Companion

Users can **chat with the virtual pet** using natural language.

The AI pet can:

* Answer questions
* Start conversations
* Remember user preferences
* React emotionally to messages

Example:

User:

> How are you today?

Pet:

> I'm feeling energetic! Want to play a game?

---

### Voice Interaction

The application supports **voice-based communication**.

Users can:

* Speak to the pet using the microphone
* Receive voice responses from the AI pet

Technologies used:

* Web Speech API
* AI conversational models

---

### Pet Status System

The pet maintains multiple status indicators:

* Energy
* Happiness
* Hunger
* Intelligence

These values change over time and influence the pet’s behavior.

---

### Feeding System

Users can feed the pet using different options:

* Snacks
* Energy drinks
* Treats

Feeding improves happiness and energy levels.

---

### Play and Activities

Users can interact with the pet through activities:

* Play ball
* Activate dance mode
* Trigger special animations

These activities increase the pet’s happiness and experience points.

---

### Pet Growth System

The virtual pet evolves as users interact with it.

Growth stages include:

1. Baby AI
2. Teen AI
3. Advanced AI Companion

The evolution depends on user interaction frequency and experience points.

---

### Experience and Leveling

The pet gains **XP (experience points)** through:

* Daily interactions
* Playing games
* Completing tasks

Leveling up unlocks:

* New animations
* New skins
* Additional abilities

---

### Customization System

Users can personalize their pet with different visual options.

Customization includes:

* Pet colors
* Body shapes
* Accessories
* Special effects

Examples:

* Holographic wings
* Robot helmets
* Glowing halos

---

### Mini Games

The application includes small games to interact with the pet.

Examples:

* Catch the floating orb
* Memory card game
* Reaction speed challenge

Winning games increases the pet's happiness.

---

### Notifications

The pet occasionally sends notifications to the user:

Examples:

* “I'm hungry!”
* “Let's play!”
* “I learned something new today!”

---

### Memory System

The pet can remember user preferences.

Example:

User says:

> My favorite color is blue.

Later:

Pet responds:

> I remember you like blue!

This makes the interaction feel more personal.

---

## UI / UX Design

NeoPet AI features a **futuristic minimalist interface**.

### Design Characteristics

* Dark cyber-AI theme
* Neon accent colors (cyan, purple)
* Glassmorphism panels
* Smooth animations
* Floating holographic elements

### Visual Effects

* Particle glow effects
* Holographic UI elements
* Smooth transitions
* Responsive layouts

---

## Technology Stack

### Frontend

* React.js
* Framer Motion
* Styled Components or Tailwind CSS

### AI Integration

* Gemini API for conversational responses

### Voice Interaction

* Web Speech API

### State Management

* React State or Zustand

### Storage

* LocalStorage for saving pet progress

---

## Project Structure

```
neopet-ai
│
├── public
│   └── assets
│       ├── pet_images
│       └── sounds
│
├── src
│   ├── components
│   │   ├── PetAvatar.jsx
│   │   ├── StatusPanel.jsx
│   │   ├── ChatInterface.jsx
│   │   ├── Controls.jsx
│   │
│   ├── pages
│   │   ├── Dashboard.jsx
│   │
│   ├── styles
│   │   └── globalStyles.js
│
│   ├── utils
│   │   └── petStateManager.js
│
│   └── App.jsx
│
├── package.json
└── README.md
```

---

## Installation

### Clone the repository

```
git clone https://github.com/yourusername/neopet-ai.git
```

### Navigate to project folder

```
cd neopet-ai
```

### Install dependencies

```
npm install
```

### Run development server

```
npm start
```

The app will start at:

```
http://localhost:3000
```

---

## Future Improvements

Possible enhancements include:

* Multiplayer pets interacting with each other
* Cloud-based pet progress syncing
* Mobile app version
* AI emotion detection using webcam
* AR pet projection using WebXR

---

## License

This project is open source and available under the **MIT License**.

---

## Author

Developed as an experimental project exploring **AI companions, interactive UI design, and conversational systems**.

---

## Inspiration

NeoPet AI draws inspiration from:

* Tamagotchi digital pets
* AI assistants
* Futuristic cyberpunk interfaces
* Interactive AI companions
