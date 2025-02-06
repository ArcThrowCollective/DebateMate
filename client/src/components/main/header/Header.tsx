import { useState } from 'react';
import './Header.css';
import { FaUserCircle } from 'react-icons/fa';
import { Modal } from '../../UI/modal/ShowModal';
import svg from '../../../assets/55Debate_logo_dark-1573x237.svg';
import { useDispatch } from 'react-redux';
import {
  navigateToHome,
  navigateToProfile,
} from '../../../state/navigation/navigationSlice';

export default function Header() {
  const dispatch = useDispatch();

  const [overlayType, setOverlayType] = useState<
    'signup' | 'login' | 'channel' | 'topic' | null
  >(null);

  const closeOverlay = () => {
    setOverlayType(null);
  };

  return (
    <>
      <div>
        <header className="flex h-20 items-center">
          <img
            src={svg}
            alt="logo"
            className="h-7 logo"
            onClick={() => dispatch(navigateToHome())}
          />
          <span className="flex-1"></span>
          <div className="flex gap-4">
            <button onClick={() => setOverlayType('login')}>Login</button>
            <button onClick={() => setOverlayType('signup')}>Sign Up</button>

            <img
              src="https://github.com/dripstaltd.png"
              alt=""
              className="avatar w-10 rounded-full "
              onClick={() => dispatch(navigateToProfile('Number1 User'))}
            />
          </div>
        </header>
        <div className="border-bottom__purple"></div>
        <Modal type={overlayType} onClose={closeOverlay}></Modal>
      </div>

      <Modal type={overlayType} onClose={closeOverlay}></Modal>
    </>
  );
}
