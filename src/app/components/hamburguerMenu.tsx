import { useState } from "react";

function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu =  () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Hamburger icon */}
      <div className="hamburger" onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      {/* Menu */}
      {isOpen && (
        <nav className="menu">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      )}

      {/* CSS */}
      <style jsx>{`
        .hamburger {
          width: 30px;
          cursor: pointer;
        }

        .line {
          width: 100%;
          height: 3px;
          background-color: black;
          margin: 5px 0;
        }

        .menu {
          background-color: #f0f0f0;
          padding: 10px;
          position: absolute;
          top: 50px;
          right: 0;
          width: 200px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .menu ul {
          list-style: none;
          padding: 0;
        }

        .menu li {
          margin-bottom: 10px;
        }

        .menu a {
          text-decoration: none;
          color: black;
        }
      `}</style>
    </div>
  );
}
