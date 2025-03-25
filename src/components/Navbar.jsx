import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full py-5 h-10 items-center mb-5 bg-primary text-amber-50">
      <ul className="flex gap-2 justify-around">
        {/* <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li> */}
      </ul>
    </nav>
  );
}
