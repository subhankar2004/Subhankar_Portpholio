"use client";

import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";
import StarIcon from "@/assets/icons/star.svg";
import bookImage from "@/assets/images/book-cover.png";
import Image from "next/image";
import JavascriptIcon from "@/assets/icons/square-js.svg";
import HTMLIcon from "@/assets/icons/html5.svg";
import CssIcon from "@/assets/icons/css3.svg";
import ReactIcon from "@/assets/icons/react.svg";
import ChromeIcon from "@/assets/icons/chrome.svg";
import GithubIcon from "@/assets/icons/github.svg";
import AWSIcon from "@/assets/icons/AWS.svg";
import DockerIcon from "@/assets/icons/Docker.svg";
import MongoIcon from "@/assets/icons/MongoDB.svg";
import NextIcon from "@/assets/icons/NextJs.svg";
import NestIcon from "@/assets/icons/NestJs.svg";
import NodeIcon from "@/assets/icons/NodeJs.svg";
import SQLIcon from "@/assets/icons/SQL.svg";
import { motion } from "framer-motion";
import MapImage from "@/assets/images/map1.png";
import memoji from "@/assets/images/memoji-smile.png";
import { CardHeader } from "@/components/CardHeader";
import { ToolboxItems } from "@/components/ToolBoxItems";
import { useRef } from "react";

const toolboxItems = [
  {
    title: "JavaScript",
    iconType: JavascriptIcon,
  },
  {
    title: "HTML5",
    iconType: HTMLIcon,
  },
  {
    title: "React",
    iconType: ReactIcon,
  },
  {
    title: "CSS3",
    iconType: CssIcon,
  },
  {
    title: "Chrome",
    iconType: ChromeIcon,
  },
  {
    title: "GitHub",
    iconType: GithubIcon,
  },
  {
    title: "AWS",
    iconType: AWSIcon,
  },
  {
    title: "Docker",
    iconType: DockerIcon,
  },
  {
    title: "MongoDB",
    iconType: MongoIcon,
  },
  {
    title: "Next.js",
    iconType: NextIcon,
  },
  {
    title: "Nest.js",
    iconType: NestIcon,
  },
  {
    title: "Node.js",
    iconType: NodeIcon,
  },
  {
    title: "SQL",
    iconType: SQLIcon,
  },
];

const hobbies = [
  {
    title: "Cricket",
    emoji: "🏏",
    left: "5%",
    top: "5%",
  },
  {
    title: "Photography",
    emoji: "📷",
    left: "50%",
    top: "10%",
  },
  {
    title: "Gaming",
    emoji: "🎮",
    left: "10%",
    top: "35%",
  },
  {
    title: "Reading",
    emoji: "📚",
    left: "35%",
    top: "40%",
  },
  {
    title: "Music",
    emoji: "🎵",
    left: "70%",
    top: "45%",
  },
  {
    title: "Travel",
    emoji: "✈️",
    left: "5%",
    top: "65%",
  },
  {
    title: "Fitness",
    emoji: "💪",
    left: "45%",
    top: "70%",
  },
];

export const AboutSection = () => {
  const constraintRef = useRef(null);
  return (
    <div className="py-20 lg:py-28">
      <div className="container">
        <SectionHeader
          eyebrow="About Me"
          title="A Glimpse Into My World"
          description="Learn who I am, what I do, and what inspires me."
        />
        <div className="mt-20 flex flex-col gap-8">
          {/* My Reads Card */}
          <div className="grid grid-cols-1 gap-8 md:grid md:grid-cols-5 md:gap-8 lg:grid lg:grid-cols-3 lg:gap-10">
            <Card className="h-[340px] md:col-span-2 lg:col-span-1">
              <CardHeader
                title="My Reads"
                description="Explore the books shaping my perspectives"
                className="px-6 pt-6"
              />
              <div className="w-40 mx-auto -mt-2">
                <Image src={bookImage} alt="book cover" />
              </div>
            </Card>

            {/* My Toolbox Card */}
            <Card className="h-[340px] md:col-span-3 lg:col-span-2">
              <CardHeader
                title="My Toolbox"
                description="Explore the technologies and tools I use to create digital experiences."
                className="px-6 pt-6"
              />
              <div className="-mt-2 flex flex-col gap-2">
                <ToolboxItems
                  toolboxItems={toolboxItems}
                  className="mt-3"
                  itemsWrapperClassName="animate-moveLeft [animation-duration:60s]"
                />
                <ToolboxItems
                  toolboxItems={toolboxItems}
                  className="mt-2"
                  itemsWrapperClassName="animate-moveRight [animation-duration:60s]"
                />
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid md:grid-cols-5 md:gap-8 lg:grid lg:grid-cols-3 lg:gap-10">
            {/* Beyond the Code Card */}
            <Card className="h-[360px] flex flex-col md:col-span-3 lg:col-span-2">
              <CardHeader
                title="Beyond the Code"
                description="Explore my hobbies beyond the digital world!"
                className="px-6 pt-6"
              />
              <div
                className="relative flex-1 overflow-hidden"
                ref={constraintRef}
              >
                {hobbies.map((hobby, index) => (
                  <motion.div
                    key={`${hobby.title}-${index}`}
                    className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-emerald-300 to-sky-400 rounded-full absolute whitespace-nowrap"
                    style={{
                      left: hobby.left,
                      top: hobby.top,
                    }}
                    drag
                    dragConstraints={constraintRef} // Add drag constraints to the card element {}
                  >
                    <span className="text-lg">{hobby.emoji}</span>
                    <span className="font-medium text-gray-950 text-sm">
                      {hobby.title}
                    </span>
                  </motion.div>
                ))}
              </div>
            </Card>

            <Card className="h-[360px] p-0 relative overflow-hidden md:col-span-2 lg:col-span-1">
              <Image
                src={MapImage}
                alt="map"
                className="h-full w-full object-cover"
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 after:content-[''] after:absolute after:inset-0 after:outline after:outline-2 after:outline-offset-2 after:outline-gray-950/30">
                <div className="w-20 h-20 bg-gradient-to-r from-emerald-300 to-sky-400 rounded-full p-2 flex items-center justify-center -z-20">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 mix-blend-multiply -z-10 animate-ping [animation-duration:2s]"></div>
                  <Image
                    src={memoji}
                    alt="smiling emoji"
                    className="w-16 h-16"
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
