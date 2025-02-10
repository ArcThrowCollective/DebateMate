import './Avatar.css';
function splitName(name: string): string[] {
  const parts = name.split(/(?=[A-Z])|\s+/);
  return parts.slice(0, 2);
}

interface AvatarProps {
  userName: string;
}

export default function Avatar({ userName }: AvatarProps): JSX.Element {
  const initials = splitName(userName)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');

  return <p className="avatar__small ">{initials}</p>;
}
