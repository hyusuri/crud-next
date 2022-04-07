import Link from 'next/link';

const Navbar = () => (
  <nav className="navbar">
    <Link href="/">
      <a className="navbar-brand">People</a>
    </Link>
    <Link href="/add">
    <a className="create">Add Person</a>
    </Link>
  </nav>
)

export default Navbar;