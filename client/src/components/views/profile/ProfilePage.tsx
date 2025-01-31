import { FaUserCircle } from 'react-icons/fa';

interface ProfilePageProps {
  profileId: string;
}

export default function ChannelPage({ profileId }: ProfilePageProps) {
  return (
    <div>
      <FaUserCircle className="avatar" size="2rem" />
      <h1 className="text-3xl">{profileId}</h1>
      <p>Stats and stuff</p>
    </div>
  );
}
