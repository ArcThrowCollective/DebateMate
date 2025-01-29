import Search from '../../UI/inputs/Search';

export default function Header() {
  return (
    <>
      <div id="header" className="flex">
        <img src="" alt="logo" />
        <Search />
        <div className="flex gap-2">
          <button>Login</button>
          <button>Sign Up</button>
        </div>
      </div>
    </>
  );
}
