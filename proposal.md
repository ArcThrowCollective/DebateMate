## Project name

Choose a name for your project. Don’t worry, it doesn’t need to be fancy, it’s just a way to identify it (e.g. “Hipstacam”, or “Woofie”).

**Answer:**

DebateMate (working title)

## Team members

Add a list of all the members in your team.

**Answer:**

- JP
- Ben
- Jesus
- Philipp

## Repository

Create a public GitHub repo to host your project, give write access to all team mebers, and paste its URL here.

**Answer:**

https://github.com/ArcThrowCollective/DebateMate

## One liner

Write a very short sentence (< 10 words) that describes what your app is about (e.g. “Airbnb for boats”, or “Movies recommendation engine”).

**Answer:**

(Political) debating platform based on real-time video/audio comms.

## Project description

Provide a short description of what the app does (< 1000 characters).

**Answer:**

The landing page presents a list of channels as tiles. Guests can join public channels, or register to become Members. Members can create channels, and within a channel can create and manage debate rooms, as well as create announcements.

In debate rooms, members can debate using real-time peer-to-peer audio/video streaming (using WebRTC) and/or text chat. Members must have a "speaking permission" to speak, and can request permission using a button. Optionally, a member with the role Moderator handles those requests, controls a speech timer, etc.

## MVP

Choose the core feature that most defines your app and you’ll start to tackle first (e.g. “Users should be able to take a picture of a food item with their smartphone and receive a list of recipes based on that ingredient”).

**Answer:**

Platform:

- member sign-up
- create channel
- open debate room from channel
- some pre-created channels (e.g. by admin)

Debate rooms:

- live video chat
- dynamic permission system with queueing

## Additional features

Add a list of other features you’d like to add once the MVP is working.

**Answer:**

- Platform features
  - customize profile (avatar, nickname, ...)
  - channel search
  - invitation system
  - up-/ downviting channel

- Channel features
  - announcements
  - up-/ downviting speakers

- Debate room features
  - voting
  - moderator role
  - text chat

- Skin gambling

## Tech stack

Does your app have a client, a server, or both? If it has a client, is it web or mobile? What frameworks, databases, or relevant libraries are you going to use? Fill the fields here below as needed.

**Front End:**

- Typescript
- Framework: React, React Router (landing page) - possibly React Native?
- State management: Redux toolkit / Context ?
- Wireframing: Figma
- Authentication: Clerk
- Styling: Tailwind CSS
- Axios or JS Fetch or superagent for REST API Interactions
- Testing: Cypress

**Back End:**

- Typescript
- Authentication: Clerk / Supabase
- Server: express REST, CRUD
- Audio/Video streaming: WebRTC Client ?
- Notfications/Chat: Websocket Client (Socket.IO)
- Media Storage: Cloudinary?
- Database: PostgreSQL
- ORM: Prisma

## Data sources

In case your app relies on some data to work properly, where are you planning to get that data from?

**Answer:**

Perhaps news items (RSS / scraper) for initializing pre-created channel topics.