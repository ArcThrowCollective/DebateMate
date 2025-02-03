import { FaUserCircle } from 'react-icons/fa';
<<<<<<< HEAD
=======
import './ProfilePage.css';
>>>>>>> 41c665d404bb1604eb3d3142677e0e84265aec7b

interface ProfilePageProps {
  profileId: string;
}

export default function ChannelPage({ profileId }: ProfilePageProps) {
  return (
<<<<<<< HEAD
    <div>
      <FaUserCircle className="avatar" size="2rem" />
      <h1 className="text-3xl">{profileId}</h1>
      <p>Stats and stuff</p>
    </div>
=======
    <>
      <div className="background__shape"></div>
      <div id="profilePage">
        <img
          src="https://github.com/dripstaltd.png"
          alt="avatar"
          className="profile__picture"
        />
        {/* Stars */}
        <div className="profile__stars">⭐⭐⭐⭐</div>
        <h1 className="text-3xl">{profileId}</h1>
        <div className="totals__wrapper">
          <div className="totals__topics stats__card">
            <div className="totals__topics--value">20</div>
            <div className="totals__topics--title">Total Topics</div>
          </div>
          <div className="totals__viewers stats__card">
            <div className="totals__viewers--value">400</div>
            <div className="totals__viewers--title">Total Viewers</div>
          </div>
        </div>
        <div className="recent__topics">
          <h2 className="recent__topics--title text-3xl">Recent Topics</h2>
          <div className="recent__topics--list"></div>
        </div>
      </div>
    </>
>>>>>>> 41c665d404bb1604eb3d3142677e0e84265aec7b
  );
}
