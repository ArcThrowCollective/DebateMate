import './Header.css';
import { FaUserCircle } from 'react-icons/fa';
export default function Header() {
  return (
    <>
      <div id="header">
        <img src={''} alt="logo" />
        <div className="flex gap-4">
          <button>Login</button>
          <button>Sign Up</button>
          <FaUserCircle className="avatar" size="2rem" />
        </div>
      </div>
    </>
  );
}
