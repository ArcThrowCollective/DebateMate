import { useState } from 'react';
import './Footer.css';
import { Modal } from '../../UI/modal/ShowModal';

export default function Footer() {
  const [overlayType, setOverlayType] = useState<
    'signup' | 'login' | 'channel' | 'topic' | null
  >(null);

  const closeOverlay = () => {
    setOverlayType(null);
  };

  return (
    <>
      <div>
        <div className="footer__banner flex justify-between">
          <p>
            Ready to start debating? Become a member and create your own channel
          </p>
          <button onClick={() => setOverlayType('signup')}>Sign Up</button>
        </div>
        <div id="footer">
          <div className="flex gap-4 ">
            <button onClick={() => setOverlayType('channel')}>
              Create a Channel
            </button>
            <button onClick={() => setOverlayType('topic')}>
              Start a debate
            </button>
          </div>
        </div>

        <Modal type={overlayType} onClose={closeOverlay} />
      </div>
    </>
  );
}
