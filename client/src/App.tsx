import './App.css';
import Header from './components/main/header/Header.tsx';
import { RoomList } from './components/UI/cards/RoomList.tsx';
import { Dashboard } from './components/main/dashboard/Dashboard.tsx';

const roomData = [
  {
    topic: 'The Universe is Infinite',
    imageUrl:
      'https://www.nwpc.com/wp-content/uploads/2022/05/placeholder-image-gray-3x2-1.png',
    channelInfo: {
      name: 'AstroTalks',
      avatarUrl: '',
    },
  },
  {
    topic: 'The Universe is Infinite',
    imageUrl:
      'https://www.nwpc.com/wp-content/uploads/2022/05/placeholder-image-gray-3x2-1.png',
    channelInfo: {
      name: 'AstroTalks',
      avatarUrl: '',
    },
  },
];

function App() {
  return (
    <Dashboard>
      <Header />
      <div className="flex flex-col self-center w-[90vw] gap-10 text-center">
        <h1 className="text-3xl font-bold">Active Topics</h1>
        <RoomList rooms={roomData} />
      </div>
      <Header />
    </Dashboard>
  );
}

export default App;
