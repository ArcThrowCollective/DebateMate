import './Card.css';
import { FaRegEye } from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa';
export default function Card(): JSX.Element {
  return (
    <>
      <div className="card__container">
        <div className="card__image">
          <img src="" alt="" className="" id="card__room--image" />

          <div id="liveLabel">LIVE</div>

          <div id="viewerCountLabel">
            <div className="icon">
              <FaRegEye size="1rem" />
            </div>
            <div className="count">100</div>
          </div>
        </div>

        <div className="card__textArea">
          <FaUserCircle id="Avatar" />

          <h2 id="topic__title">The world is flatdsaddasdsada</h2>
        </div>
        <button className="btn__join">Join</button>
      </div>
    </>
  );
}
