import { useState } from 'react';
import './Header.css';
import { FaUserCircle } from 'react-icons/fa';
import { Modal } from '../../UI/modal/ShowModal';
import svg from '../../../assets/55Debate_logo_dark-1573x237.svg';
import { useDispatch } from 'react-redux';
import { navigateToProfile, navigateToHome } from '../../../state/store';

export default function Header() {
  const dispatch = useDispatch();

  const [overlayType, setOverlayType] = useState<
    'signup' | 'login' | 'channel' | 'topic' | null
  >(null);

  const closeOverlay = () => {
    console.log('🛑 Closing overlay');
    setOverlayType(null);
  };

  return (
    <>
      <div id="header">
        <img
          src={svg}
          alt="logo"
          className="header_logo"
          onClick={() => dispatch(navigateToHome())}
        />
        <div className="flex gap-4">
          <button onClick={() => setOverlayType('login')}>Login</button>
          <button onClick={() => setOverlayType('signup')}>Sign Up</button>
          <FaUserCircle
            className="avatar"
            size="2rem"
            onClick={() => dispatch(navigateToProfile('Number1 User'))}
          />
        </div>
      </div>

      <Modal type={overlayType} onClose={closeOverlay} />
    </>
  );
}
