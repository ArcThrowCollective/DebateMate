import { Form } from './components/views/forms/Form.tsx';
import './App.css';
import Header from './components/main/header/Header.tsx';
// import { RoomList } from './components/UI/cards/RoomList.tsx';
import { Dashboard } from './components/main/dashboard/Dashboard.tsx';
import DebateRoom from './pages/DebateRoom.tsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// const roomData = [
//   {
//     topic: 'The Universe is Infinite',
//     imageUrl:
//       'https://www.nwpc.com/wp-content/uploads/2022/05/placeholder-image-gray-3x2-1.png',
//     channelInfo: {
//       name: 'AstroTalks',
//       avatarUrl: '',
//     },
//   },
//   {
//     topic: 'The Universe is Infinite',
//     imageUrl:
//       'https://www.nwpc.com/wp-content/uploads/2022/05/placeholder-image-gray-3x2-1.png',
//     channelInfo: {
//       name: 'AstroTalks',
//       avatarUrl: '',
//     },
//   },
//   {
//     topic: 'The Future of AI',
//     imageUrl:
//       'https://www.nwpc.com/wp-content/uploads/2022/05/placeholder-image-gray-3x2-1.png',
//     channelInfo: {
//       name: 'TechNow',
//       avatarUrl: '',
//     },
//   },
//   {
//     topic: 'Debunking Flat Earth',
//     imageUrl:
//       'https://www.nwpc.com/wp-content/uploads/2022/05/placeholder-image-gray-3x2-1.png',
//     channelInfo: {
//       name: 'ScienceDaily',
//       avatarUrl: '',
//     },
//   },
// ];

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard>
              <Header />
              <div className="flex flex-col self-center w-[90vw] gap-10 text-center">
                {/* <h1 className="text-3xl font-bold">Active Topics</h1> */}
                <Form type="channel" />
                {/* <RoomList rooms={roomData} /> */}
              </div>
              <Header />
            </Dashboard>
          }
        />
        <Route path="/debate" element={<DebateRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
