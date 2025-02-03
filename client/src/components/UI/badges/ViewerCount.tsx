import { FaRegEye } from 'react-icons/fa';
import './ViewerCount.css';

interface ViewerProps {
  viewers: number;
}

export default function ViewerCount({ viewers }: ViewerProps): JSX.Element {
  return (
    <div id="viewerCountLabel">
      <div className="icon">
        <FaRegEye size="1rem" />
      </div>
      <div className="count">{viewers}</div>
    </div>
  );
}
