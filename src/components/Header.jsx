import PaperPiece from "./PaperPiece";

function Header() {
  return (
    <header className="site-header">
      <a className="brand-mark" href="#home">
        <strong>TH</strong>
        <small>26</small>
      </a>

      <nav className="header-links" aria-label="Main menu">
        <a href="#about">About</a>
        <a href="#dates">Dates</a>
        <a href="#registration">Registration</a>
        <a href="#faq">FAQ</a>
      </nav>

      <PaperPiece
        as="a"
        href="#registration"
        className="header-register"
      >
        Register
      </PaperPiece>
    </header>
  );
}

export default Header;