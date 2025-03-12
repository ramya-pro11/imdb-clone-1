import React, { useState } from "react";
import { Film, Menu, X, User } from "lucide-react"; // Import User icon
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Movies", path: "/movies" },
    { label: "Top Rated", path: "/top-rated" },
    { label: "Coming Soon", path: "/coming-soon" },
  ];

  return (
    <nav className="bg-black/70 backdrop-blur-md border-b border-zinc-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 hover-glow">
            <Film className="w-8 h-8 text-yellow-500" />
            <span className="text-xl font-bold text-glow">MovieDB</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="text-zinc-300 hover:text-white transition-colors hover-glow"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/profile"
              className="text-zinc-300 hover:text-white transition-colors flex items-center gap-2 hover-glow"
            >
              <User className="w-5 h-5" /> Profile
            </Link>
          </div>

          <button
            className="md:hidden text-zinc-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="text-zinc-300 hover:text-white transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/profile"
                className="text-zinc-300 hover:text-white transition-colors flex items-center gap-2 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-5 h-5" /> Profile
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

