'use client';
import React from 'react';
import avatar1 from "../assets/avatar-1.png";
import avatar2 from "../assets/avatar-2.png";
import avatar3 from "../assets/avatar-3.png";
import avatar4 from "../assets/avatar-4.png";
import avatar5 from "../assets/avatar-5.png";
import avatar6 from "../assets/avatar-6.png";
import avatar7 from "../assets/avatar-7.png";
import avatar8 from "../assets/avatar-8.png";
import avatar9 from "../assets/avatar-9.png";
import { motion } from 'framer-motion';

const testimonials = [
  {
    text: "This platform made my scholarship application process smooth and secure. I couldn't have done it without it!",
    imageSrc: avatar1,
    name: "Aarav Sharma",
    state: "Uttar Pradesh",
    username: "@aaravsharmaUP",
  },
  {
    text: "Thanks to this app, I was able to track my application at every step. It’s a game-changer for students!",
    imageSrc: avatar2,
    name: "Pooja Reddy",
    state: "Telangana",
    username: "@poojareddyTS",
  },
  {
    text: "I felt confident using this platform because of its strong security features. Now I can focus on my studies.",
    imageSrc: avatar3,
    name: "Neha Patel",
    state: "Gujarat",
    username: "@nehapatelGJ",
  },
  {
    text: "The ease of use and secure document submission helped me apply for multiple scholarships effortlessly.",
    imageSrc: avatar4,
    name: "Vikram Singh",
    state: "Rajasthan",
    username: "@vikramsinghRJ",
  },
  {
    text: "I was worried about missing deadlines, but this platform kept me on track throughout the entire scholarship process.",
    imageSrc: avatar5,
    name: "Ananya Das",
    state: "West Bengal",
    username: "@ananyadasWB",
  },
  {
    text: "Submitting my scholarship applications has never been easier. The platform’s security ensured my data stayed safe.",
    imageSrc: avatar6,
    name: "Rahul Nair",
    state: "Kerala",
    username: "@rahulnairKL",
  },
  {
    text: "Thanks to the platform's user-friendly interface, I could easily navigate through the application process.",
    imageSrc: avatar7,
    name: "Ishita Singh",
    state: "Maharashtra",
    username: "@ishitasinghMH",
  },
  {
    text: "The platform’s reliability and secure system gave me the confidence to apply for scholarships without stress.",
    imageSrc: avatar8,
    name: "Amit Choudhary",
    state: "Bihar",
    username: "@amitchoudharyBR",
  },
  {
    text: "Applying for scholarships across multiple universities was easy, and I felt safe with their secure encryption.",
    imageSrc: avatar9,
    name: "Radhika Menon",
    state: "Karnataka",
    username: "@radhikamenonKA",
  },
  
];

const TestimonialsColumn = ({ className, testimonials, duration }) => (
  <div className={className}>
     <motion.div
      animate={{ translateY: ["0%", "-100%"] }} 
      transition={{
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
        duration: duration || 10,
      }}
      className="flex flex-col gap-6"
    >
      {testimonials.map(({ text, imageSrc, name, username }, i) => (
        <div key={`${username}-${i}`} className="p-10 border border-solid border-[#222222]/10 rounded-3xl shadow-[0_7px_14px_#EAEAEA] max-w-xs w-full">
          <div className="text-black">{text}</div> {/* Test Text added for debugging */}
          <div className="flex items-center gap-2 mt-5">
            <img src={imageSrc} alt={name} width={40} height={40} className="h-10 w-10 rounded-full" />
            <div className="flex flex-col text-black"> {/* Changed to red for visibility */}
              <div className="font-medium tracking-tight leading-5">{name}</div>
              <div className="leading-5 tracking-tight">{username}</div>
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  </div>
);

const Testimonials = () => {
  return (
    <section className="bg-white">
      <div className="container mx-auto">
        {/* Section heading */}
        <div className="max-w-[540px] mx-auto">
          <div className="flex justify-center">
            <div className="text-sm inline-flex border border-[#222]/10 px-3 py-1 rounded-lg tracking-tight text-black">Testimonials</div>
          </div>
          {/* Section title */}
          <h2 className="text-center text-3xl md:text-[54px] md:leading-[60px] font-bold tracking-tighter bg-gradient-to-b from-black to-[#591B5F] text-transparent bg-clip-text mt-5">
            Here's what our students are saying
          </h2>
          {/* Description */}
          <p className="text-center text-[22px] leading-[30px] tracking-tight text-[#000000] mt-5">
              From seamless design to cutting-edge features, our platform has become a must-have tool for students worldwide.
          </p>
        </div>
        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] mt-10 max-h-[738px] overflow-hidden">
          <TestimonialsColumn testimonials={testimonials.slice(0, 3)} duration={15} />
          <TestimonialsColumn testimonials={testimonials.slice(3, 6)} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={testimonials.slice(6, 9)} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
