"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Particles from "./components/particles";

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);

  // This tracks how far the user has scrolled down the page
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = window.scrollY;
      const windowHeight = window.innerHeight;
      // Normalizes scroll into a 0 to 1 percentage
      const progress = Math.min(totalScroll / (windowHeight * 0.8), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-[200vh] bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      
      {/* STICKY CONTAINER: Locks the view in place while we scroll the 200vh invisible body */}
      <div className="sticky top-0 flex flex-col items-center justify-center w-screen h-screen overflow-hidden">
        
        {/* Navigation */}
        <nav className="absolute top-16 animate-fade-in z-50">
          <ul className="flex items-center justify-center gap-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm duration-500 text-zinc-500 hover:text-zinc-300"
              >
                {item.name}
              </Link>
            ))}
          </ul>
        </nav>

        {/* Particle Background */}
        <Particles
          className="absolute inset-0 -z-10 animate-fade-in"
          quantity={100}
        />

        {/* MAIN TITLE - Scales up and fades out as you scroll */}
        <div 
          className="absolute flex flex-col items-center justify-center w-full transition-transform duration-75"
          style={{
            opacity: 1 - scrollProgress * 2.5, 
            transform: `scale(${1 + scrollProgress * 0.8})`, 
            pointerEvents: scrollProgress > 0.5 ? 'none' : 'auto'
          }}
        >
          <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
          <h1 className="py-3.5 px-0.5 z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text">
            THE CAT GUY
          </h1>
          <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
        </div>

        {/* BIO TEXT - Slides up and fades in as you scroll */}
        <div 
          className="absolute flex flex-col items-center justify-center w-full max-w-2xl px-4 text-center transition-all duration-75"
          style={{
            opacity: scrollProgress < 0.2 ? 0 : (scrollProgress - 0.2) * 2, 
            transform: `translateY(${60 - scrollProgress * 60}px)`, 
            pointerEvents: scrollProgress < 0.5 ? 'none' : 'auto'
          }}
        >
          <h2 className="text-sm sm:text-base text-zinc-400 leading-relaxed drop-shadow-md">
            Cinematic Video Editor specializing in high-energy post-production using{" "}
            <span className="text-white font-semibold">DaVinci Resolve, Adobe Premiere Pro, After Effects</span>, and <span className="text-white font-semibold">Apple Motion</span>. 
            <br /><br />
            Also a tech enthusiast and developer proficient in backend and frontend structures like{" "}
            <span className="text-white font-semibold">C, C++, Java, Python, HTML, CSS, JavaScript,</span> and <span className="text-white font-semibold">MySQL</span>, matching technical precision with creative assets like dynamic presentation layouts and high-vibrancy posters crafted in{" "}
            <span className="text-white font-semibold">Apple Keynote</span> and <span className="text-white font-semibold">Canva</span>.
          </h2>
        </div>
        
      </div>

      {/* Subtle Scroll Down Prompt at the bottom of the first screen */}
      <div 
        className="fixed bottom-10 left-1/2 -translate-x-1/2 text-zinc-600 text-xs tracking-widest uppercase animate-pulse pointer-events-none"
        style={{ opacity: 1 - scrollProgress * 4 }}
      >
        Scroll Down
      </div>
      
    </div>
  );
}
