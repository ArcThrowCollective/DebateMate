import './App.css';
import Header from './components/main/header/Header.tsx';
import { RoomList } from './components/UI/cards/RoomList.tsx';
import { Dashboard } from './components/main/dashboard/Dashboard.tsx';
import Footer from './components/main/footer/Footer.tsx';
import { useSelector } from 'react-redux';
import { RootState } from './state/store.ts';
import ChannelPage from './components/views/channel/ChannelPage.tsx';
import ProfilePage from './components/views/profile/ProfilePage.tsx';
import Room from './components/views/room/room.tsx';
import DebateLobby from './components/views/debate/DebateLobby.tsx';
import DebateScreen from './components/views/debate/DebateScreen.tsx';

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
  const { currentPage, channelId, profileId, roomId } = useSelector(
    (state: RootState) => state.navigation
  );

  return (
    <Dashboard>
      <Header />
      <section className="">
        {currentPage === 'home' && <RoomList rooms={roomData} />}
        {currentPage === 'channel' && <ChannelPage channelId={channelId!} />}
        {currentPage === 'profile' && <ProfilePage profileId={profileId!} />}
        {currentPage === 'room' && <Room roomId={roomId!} />}
        {/* This are test navigations */}
        {currentPage === 'debatelobby' && <DebateLobby />}
        {currentPage === 'debatescreen' && <DebateScreen />}
      </section>
      <Footer />
    </Dashboard>
  );
}

export default App;
