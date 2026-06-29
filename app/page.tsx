"use client";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import Particles from "./components/particles";
import dynamic from "next/dynamic";

// Dynamically import the 3D Lanyard to prevent Next.js server-side rendering errors
const Lanyard = dynamic(() => import('./components/lanyard'), { ssr: false });

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Home() {
  // We use Refs to talk directly to the browser, bypassing React's bulky render cycle
  const titleRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const promptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentScroll = 0;
    let targetScroll = 0;
    let animationFrameId: number;

    // Just capture the target position on scroll
    const handleScroll = () => {
      targetScroll = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // The animation loop that runs 60 frames per second
    const updateAnimation = () => {
      // LERP (Linear Interpolation): This creates that smooth, heavy Apple-style gliding inertia
      currentScroll += (targetScroll - currentScroll) * 0.08;

      const windowHeight = window.innerHeight;
      let progress = Math.min(currentScroll / (windowHeight * 0.8), 1);
      progress = Math.max(0, progress); 

      // Apply the math directly to the elements
      if (titleRef.current) {
        titleRef.current.style.opacity = Math.max(1 - progress * 2.5, 0).toString();
        titleRef.current.style.transform = `scale(${1 + progress * 0.8})`;
        titleRef.current.style.pointerEvents = progress > 0.5 ? 'none' : 'auto';
      }

      if (bioRef.current) {
        const bioOpacity = progress < 0.2 ? 0 : Math.min((progress - 0.2) * 2, 1);
        bioRef.current.style.opacity = bioOpacity.toString();
        bioRef.current.style.transform = `translateY(${60 - progress * 60}px)`;
        bioRef.current.style.pointerEvents = progress < 0.5 ? 'none' : 'auto';
      }

      if (promptRef.current) {
        promptRef.current.style.opacity = Math.max(1 - progress * 4, 0).toString();
      }

      animationFrameId = requestAnimationFrame(updateAnimation);
    };

    updateAnimation();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative min-h-[200vh] bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      
      <div className="sticky top-0 flex flex-col items-center justify-center w-screen h-screen overflow-hidden">
        
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

        <Particles
          className="absolute inset-0 -z-10 animate-fade-in"
          quantity={100}
        />

        {/* 3D LANYARD COMPONENT INSTALLED HERE */}
        <div className="absolute inset-0 z-10">
          <Lanyard />
        </div>

        {/* MAIN TITLE */}
        {/* Notice we removed the conflicting CSS transitions so JS can do its job flawlessly */}
        <div 
          ref={titleRef}
          className="absolute flex flex-col items-center justify-center w-full z-20 pointer-events-none"
        >
          <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
          <h1 className="py-3.5 px-0.5 z-10 text-4xl text-transparent bg-white cursor-default text-edge-outline font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text drop-shadow-2xl">
            THE CAT GUY
          </h1>
          <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
        </div>

        {/* BIO TEXT */}
        <div 
          ref={bioRef}
          className="absolute flex flex-col items-center justify-center w-full max-w-2xl px-4 text-center opacity-0 z-30 pointer-events-none"
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

      {/* Scroll Down Prompt */}
      <div 
        ref={promptRef}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 text-zinc-600 text-xs tracking-widest uppercase animate-pulse pointer-events-none"
      >
        Scroll Down
      </div>
      
    </div>
  );
}
