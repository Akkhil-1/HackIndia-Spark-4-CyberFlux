"use client";
import React, { useRef } from "react";
import { ReactComponent as ArrowRight } from "../assets/arrow-right.svg";
import AdminLandingPage from "../../AdminLandingPage/LandingPage";
import Corgs from "../assets/cog.png";
import bye from "../assets/bye.png"
import cylinderImage from "../assets/small1.jpg";
import noodleImage from "../assets/small2.jpg";
import { motion, useScroll, useTransform } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import productImage from "../assets/product-image.png";
import { FaRegUser } from "react-icons/fa";
import { FaChalkboardUser } from "react-icons/fa6";

const Hero = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section
      ref={heroRef}
      className="pt-8 pb-20 md:pt-5 md:pb-10 bg-[radial-gradient(ellipse_at_bottom_center,#591B5F_10%,#FFFFFF_100%)] overflow-x-clip"
    >
      <div className="container">
        <div className=" relative z-1 max-w-[62rem] mx-auto text-center ">
          <div className="text-sm inline-flex border border-[#222]/10 px-3 py-1 rounded-lg tracking-tight mx-24 ">
          Empowering scholarships with next-gen innovation!
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#591B5F] text-transparent bg-clip-text mt-6 relative z-1 max-w-[62rem] mx-auto text-center  ">
            PaperLess ScholarShip
          </h1>
          <p className="text-xl text-[#000000] tracking-tight mt-6 mx-24">
          Unlock opportunities, streamline the process – Your paperless blockchain solution for securing student scholarships.
          </p>
          <div className="flex justify-center gap-1 items-center mt-[30px]">
            <button
              className="px-7 py-4 rounded-lg font-medium w-[150px] inline-flex items-center justify-center tracking-tight bg-[#0F0C17]
        text-white"
            >
              <span className="pr-1">
                <FaRegUser size={17} />
              </span>
                Student
            </button>
            <NavLink to={"/"}>
              <button
                className="px-7 py-4 rounded-lg font-medium w-[150px] inline-flex items-center justify-center tracking-tight bg-[#0F0C17] ml-7
        text-white"
              >
                <span className="pr-1">
                  <FaChalkboardUser size={17.4} />
                </span>
                Sag
              </button>
            </NavLink>
            <button
                className="px-7 py-4 rounded-lg font-medium w-[150px] inline-flex items-center justify-center tracking-tight bg-[#0F0C17] ml-7
        text-white"
              >
                <span className="pr-1">
                  <FaChalkboardUser size={17.4} />
                </span>
                Finance
              </button>
          </div>
        </div>
      </div>
      <div className="mt-40 md:mt-0 md:h-[648px] md:flex-1 relative mx-4 ml-[17.5rem]">
        <motion.img
          src={bye}
          alt="Cog"
          className="md:absolute md:h-full md:w-auto md:max-w-none md:-left-6 lg:left-0 "
          animate={{
            y: [-20, 20],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 3,
            ease: "easeInOut",
          }}
        />
        <motion.img
          src={cylinderImage}
          width={220}
          height={220}
          alt="cylinder"
          className="hidden md:block -top-8 -left-32 md:absolute rounded-lg"
          style={{ translateY }}
        />
        <motion.img
          src={noodleImage}
          alt="noodleImage"
          width={220}
          className="hidden lg:block absolute top-[524px] left-[910px] rotate-[30deg] rounded-lg"
          style={{ translateY }}
        />
      </div>
      {/* </div> */}
    </section>
  );
};

export default Hero;
