import React, { useState, useEffect } from "react";
// import { ReactComponent as ArrowRight } from '../assets/arrow-right.svg';
import Logo from "../assets/logosaas.png";
// import { ReactComponent as MenuIcon } from '../assets/menu.svg';
import { NavLink } from "react-router-dom";
import Button from "./Button"

const Header = () => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-20 ${
        scroll ? "bg-[#0E0C17]" : "bg-[#0E0C17]"
      } transition-colors text-white `}
    >
      <div className="py-5 flex justify-center items-center bg-black text-white text-sm gap-3 ">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex justify-center items-center">
              <img src={Logo} alt="saaslogo" height={40} width={40} />
              <h1 className="font-bold text-[1.4rem] ml-1">E-verify</h1>
            </div>
            {/* <MenuIcon className='h-5 w-5 md:hidden' /> */}
            <nav className="hidden md:flex gap-10 text-white/60 items-center">
              <NavLink to="/">Home</NavLink>
              <a href="#customer">About</a>
              <a href="#help">Help</a>
              <NavLink to="/loginAdmin">
                {/* <button className="bg-white text-black px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center tracking-tight">
                  Login
                </button> */}
                <Button>Login</Button>
              </NavLink>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
