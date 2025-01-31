import './App.css';
import Header from './components/main/header/Header.tsx';
import { RoomList } from './components/UI/cards/RoomList.tsx';
import { Dashboard } from './components/main/dashboard/Dashboard.tsx';
import Footer from './components/main/footer/Footer.tsx';
import { useSelector } from 'react-redux';
import { RootState } from './state/store.ts';
import ChannelPage from './components/views/channel/ChannelPage.tsx';
import ProfilePage from './components/views/profile/ProfilePage.tsx';

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
  const { currentPage, channelId, profileId } = useSelector(
    (state: RootState) => state.navigation
  ); // add roomId

  return (
    <Dashboard>
      <Header />
      <section className="flex flex-col self-center w-[90vw] gap-10 text-center">
        {currentPage === 'home' && (
          <>
            <h1 className="text-3xl font-bold">Active Topics</h1>
            <RoomList rooms={roomData} />
          </>
        )}

        {currentPage === 'channel' && <ChannelPage channelId={channelId!} />}
        {currentPage === 'profile' && <ProfilePage profileId={profileId!} />}
        {/* {currentPage === 'room' && <Room roomId={roomId!} />} */}
      </section>
      <Footer />
    </Dashboard>
  );
}

export default App;
