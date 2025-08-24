"use client";
import memojiImage from "@/assets/images/memoji-computer.png";
import Image from "next/image";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import grainImage from "@/assets/images/grain.jpg";
import StarIcon from "@/assets/icons/star.svg";
import { HeroOrbit } from "@/components/HeroOrbit";
import SparkelIcon from "@/assets/icons/sparkle.svg";
import ProfileImage from "@/assets/images/profile.jpeg";
import Download from "@/assets/icons/download.svg";

import { useHideOnScroll } from "@/hooks/useHideOnScroll";
import { useCallback, useEffect } from "react";
import { label } from "motion/react-client";

const link = {
  label: "Projects",
  id: "projects",
};

export const HeroSection = () => {
  const hidden = useHideOnScroll({ threshold: 6, showAt: 40 });

  // Measure the navbar height and add the 12px top gap from `top-3`
  const getOffset = useCallback(() => {
    const nav = document.getElementById("site-navbar");
    const navH = nav?.getBoundingClientRect().height ?? 0;
    const topGap = 12; // from class `top-3`
    return navH + topGap;
  }, []);

  const scrollToId = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY - getOffset();
      window.scrollTo({ top: y, behavior: "smooth" });

      // Update the URL hash without triggering the native jump
      history.replaceState(null, "", `#${id}`);
    },
    [getOffset]
  );

  // Handle deep links like /#projects on first load
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      // Run after layout settles
      setTimeout(() => scrollToId(id), 0);
    }
  }, [scrollToId]);

  // Handle "Explore My Work" button click
  const handleExploreWork = () => {
    console.log("Explore My Work clicked!"); // Debug log
    scrollToId("projects");
  };

  return (
    <div className="py-32 md:py-48 lg:py-60 relative z-0 overflow-x-clip">
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_70%,transparent)]">
        <div
          className="absolute inset-0 -z-30 opacity-5"
          style={{ backgroundImage: `url(${grainImage.src})` }}
        ></div>
        <div className="size-[620px] hero-ring"></div>
        <div className="size-[820px] hero-ring"></div>
        <div className="size-[1020px] hero-ring"></div>
        <div className="size-[1220px] hero-ring"></div>

        <HeroOrbit
          size={430}
          rotation={-14}
          shouldOrbit
          orbitDuration="30s"
          shouldSpin
          spinDuration="7s"
        >
          <SparkelIcon className="size-8 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit
          size={440}
          rotation={80}
          shouldOrbit
          orbitDuration="32s"
          shouldSpin
          spinDuration="7s"
        >
          <SparkelIcon className="size-5 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit
          size={520}
          rotation={-43}
          shouldOrbit
          orbitDuration="34s"
          shouldSpin
          spinDuration="7s"
        >
          <div className="size-2 bg-emerald-300/20 rounded-full" />
        </HeroOrbit>
        <HeroOrbit
          size={530}
          rotation={178}
          shouldOrbit
          orbitDuration="36s"
          shouldSpin
          spinDuration="7s"
        >
          <SparkelIcon className="size-10 text-emerald-300/20" />
        </HeroOrbit>

        <HeroOrbit
          size={550}
          rotation={20}
          shouldOrbit
          orbitDuration="38s"
          shouldSpin
          spinDuration="7s"
        >
          <StarIcon className="size-12 text-emerald-300" />
        </HeroOrbit>
        <HeroOrbit
          size={590}
          rotation={98}
          shouldOrbit
          orbitDuration="40s"
          shouldSpin
          spinDuration="7s"
        >
          <StarIcon className="size-8 text-emerald-300" />
        </HeroOrbit>
        <HeroOrbit
          size={650}
          rotation={-5}
          shouldOrbit
          orbitDuration="42s"
          shouldSpin
          spinDuration="7s"
        >
          <div className="size-3 bg-emerald-300/20 rounded-full" />
        </HeroOrbit>

        <HeroOrbit
          size={710}
          rotation={144}
          shouldOrbit
          orbitDuration="44s"
          shouldSpin
          spinDuration="7s"
        >
          <SparkelIcon className="size-14 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit
          size={721}
          rotation={85}
          shouldOrbit
          orbitDuration="46s"
          shouldSpin
          spinDuration="7s"
        >
          <div className="size-3 bg-emerald-300/20 rounded-full" />
        </HeroOrbit>

        <HeroOrbit
          size={800}
          rotation={-72}
          shouldOrbit
          orbitDuration="48s"
          shouldSpin
          spinDuration="7s"
        >
          <StarIcon className="size-28 text-emerald-300" />
        </HeroOrbit>
      </div>
      <div className="container">
        <div className="flex flex-col items-center gap-0">
          {/* Wrapper defines the size; children overlap exactly */}
          <div className="relative w-72 h-[160px]">
            {" "}
            {/* 288px wide → 150px tall for a larger semicircle */}
            <div
              aria-hidden
              className="absolute inset-0 rounded-t-full bg-emerald-300/20 origin-bottom animate-pingSmall opacity-60 z-0 -translate-y-4"
            />
            <div className="absolute inset-0 z-10 rounded-t-full overflow-hidden">
              <Image
                src={ProfileImage}
                alt="profile_image"
                fill
                className="object-cover object-[20%_10%]" // try 55–70% for lower framing
                sizes="288px"
                priority
              />
            </div>
          </div>

          <div className="bg-gray-950 border border-gray-800 px-6 py-2 w-80 rounded-lg inline-flex items-center justify-center gap-4 ">
            <div className="bg-green-500 size-2.5 rounded-full relative">
              <div className="bg-green-500 absolute inset-0 animate-pingLarge rounded-full"></div>
            </div>
            <div className="text-sm font-medium">
              Available for new Projects
            </div>
          </div>
        </div>
        <div className="max-w-lg mx-auto">
          <h1 className="font-serif text-3xl md:text-5xl text-center mt-8 tracking-wide">
            Subhankar Patra 👋 Full‑Stack Developer
          </h1>
          <p className="mt-4 text-center text-white/60 md:text-lg">
            I craft high‑performing web applications using the MERN stack &
            Next.js, blending clean design with robust engineering. Available
            for exciting new projects.
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center mt-8 gap-4">
          {/* Your "Explore My Work" button remains the same */}
          <button
            onClick={(e) => {
              e.preventDefault();
              handleExploreWork();
            }}
            type="button"
            className="inline-flex items-center gap-2 border border-white/15 px-6 h-12 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
          >
            <span className="font-semibold">Explore My Work</span>
            <ArrowDown className="size-4" />
          </button>

          {/* DELETE your old resume button/link and PASTE this one.
           */}
          <a
            href="/Subhankar_resume.pdf"
            download="Subhankar_resume.pdf"
            className="inline-flex items-center gap-2 border border-white bg-white text-gray-900 px-6 h-12 rounded-xl hover:scale-105 active:scale-100 transition-transform cursor-pointer"
          >
            <Download className="size-6 text-red-900" />
            <span className="font-semibold">My Resume</span>
          </a>
        </div>
      </div>
    </div>
  );
};
