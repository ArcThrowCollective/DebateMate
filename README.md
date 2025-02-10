# 🗣️ 55Debate – Real-Time Debate Platform

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

**A (Political) Debating Platform based on Real-Time Video/Audio Communication.**

🚀 **Engage in structured debates, track rankings, and compete in real time.**

---

## 🌍 What is 55Debate?

55Debate is a **real-time debate platform** that allows users to join **public and private channels**, create **debate rooms**, and engage in **live peer-to-peer video debates** using **WebRTC**.

- **Join a channel** and step into a debate room.
- **Set a topic**, hit start, and battle it out **live**.
- **55 seconds per turn** – Get your point across before time runs out!
- **Track rankings and climb the leaderboard**.

🔹 **Built for thinkers, challengers, and anyone who loves a good argument.**

---

## 🛠️ Tech Stack

### **Frontend**

- **Framework:** React, TypeScript
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **GraphQL API:** Apollo Client
- **Real-Time Communication:** Socket.io
- **Video Streaming:** WebRTC
- **Testing:** Cypress

### **Backend**

- **Framework:** Express, TypeScript
- **Database:** PostgreSQL (Managed with Prisma ORM)
- **Authentication:** JSON Web Tokens (JWT)
- **Real-Time Communication:** WebSockets (Socket.io)
- **Video Streaming:** WebRTC
- **GraphQL API:** Apollo Server
- **Testing:** Jest

---

## 🚀 Getting Started

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/ArcThrowCollective/DebateMate.git
cd DebateMate
```

### **2️⃣ Set Up Environment Variables**

You'll need `.env` files for both the **frontend** and **backend**.

- The backend requires `.env`, `.env.dev`, and `.env.prod`.
- The frontend requires `.env`.

Create the necessary `.env` files based on `.env.example` in each directory.

### **3️⃣ Install Dependencies**

```sh
# Install dependencies for both frontend and backend
npm install
```

### **4️⃣ Start the Backend**

```sh
cd backend
npm run start
```

### **5️⃣ Start the Frontend**

```sh
cd frontend
npm run dev
```

🎉 **Your app should now be running locally!**

---

## 👥 Project Team

| Member  | GitHub Profile                               |
| ------- | -------------------------------------------- |
| JP      | [@dripstaltd](https://github.com/dripstaltd) |
| Ben     | [@nortonph](https://github.com/nortonph)     |
| Jesus   | [@j7sus](https://github.com/j7sus)           |
| Philipp | [@toldpixel](https://github.com/toldpixel)   |

---

## 📜 Scripts

### **Frontend**

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Starts the frontend with Vite      |
| `npm run build`   | Builds the frontend for production |
| `npm run lint`    | Runs ESLint                        |
| `npm run preview` | Previews the production build      |
| `npm run test`    | Runs Cypress tests                 |

### **Backend**

| Command                | Description                          |
| ---------------------- | ------------------------------------ |
| `npm run start`        | Starts the backend server            |
| `npm run build`        | Compiles TypeScript to JavaScript    |
| `npm run migrate:dev`  | Runs Prisma migrations (development) |
| `npm run migrate:prod` | Runs Prisma migrations (production)  |
| `npm run seed:dev`     | Seeds the database (development)     |
| `npm run seed:prod`    | Seeds the database (production)      |
| `npm run test`         | Runs Jest tests                      |
| `npm run lint`         | Runs ESLint                          |

---

## 💡 Features & Roadmap

### **Implemented Features**

- ✅ Live **peer-to-peer video debates** (WebRTC)
- ✅ **Public & Private Channels** for debate organization
- ✅ **Rankings & Statistics** to track debate performance
- ✅ **Real-time chat & notifications** (Socket.io)
- ✅ **Moderator controls** for structured debates

### **Planned Features**

- 🔜 User **profile customization** (avatars, nicknames, etc.)
- 🔜 **Voting system** to rank debate performances
- 🔜 **Moderator tools** for structured debates
- 🔜 **Mobile-friendly UI**

---

## 🛠️ Contributing

We appreciate contributions! If you'd like to **fix bugs**, **add features**, or **improve documentation**, feel free to fork the repo and open a **pull request**.

1. **Fork the repository**
2. **Create a new branch** (`feature/your-feature`)
3. **Commit your changes** (`git cz`)
4. **Push your branch** (`git push origin feature/your-feature`)
5. **Open a pull request**

---
