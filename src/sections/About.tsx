import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";
import StarIcon from '@/assets/icons/star.svg';
import bookImage from '@/assets/images/book-cover.png';
import Image from "next/image";
import JavascriptIcon from '@/assets/icons/square-js.svg';
import HTMLIcon from '@/assets/icons/html5.svg';
import CssIcon from '@/assets/icons/css3.svg';
import ReactIcon from '@/assets/icons/react.svg';
import ChromeIcon from '@/assets/icons/chrome.svg';
import GithubIcon from '@/assets/icons/github.svg';

import MapImage from '@/assets/images/map.png';
import memoji from '@/assets/images/memoji-smile.png'
import { CardHeader } from "@/components/CardHeader";
import { ToolboxItems } from "@/components/ToolBoxItems";

const toolboxItems = [
  {
    title: 'JavaScript',
    iconType: JavascriptIcon
  },
  {
    title: 'HTML5',
    iconType: HTMLIcon
  },
  {
    title: 'React',
    iconType: ReactIcon
  },
  {
    title: 'CSS3',
    iconType: CssIcon
  },
  {
    title: 'Chrome',
    iconType: ChromeIcon
  },
  {
    title: 'GitHub',
    iconType: GithubIcon
  }
];

const hobbies = [
  {
    title: 'Cricket',
    emoji: '🏏',
    left: '5%',
    top: '5%'
  },
  {
    title: 'Photography',
    emoji: '📷',
    left: '50%',
    top: '10%'
  },
  {
    title: 'Gaming',
    emoji: '🎮',
    left: '10%',
    top: '35%'
  },
  {
    title: 'Reading',
    emoji: '📚',
    left: '35%',
    top: '40%'
  },
  {
    title: 'Music',
    emoji: '🎵',
    left: '70%',
    top: '45%'
  },
  {
    title: 'Travel',
    emoji: '✈️',
    left: '5%',
    top: '65%'
  },
  {
    title: 'Travel',
    emoji: '✈️',
    left: '45%',
    top: '0%'
  }
];

export const AboutSection = () => {
  return (
    <div className="py-20">
      <div className="container">
        <SectionHeader 
          eyebrow="About Me" 
          title="A Glimpse Into My World" 
          description="Learn who I am, what I do, and what inspires me."
        />
        <div className="mt-20 flex flex-col gap-8">
          {/* My Reads Card */}
          <Card className="h-[320px]">
            <CardHeader 
              title="My Reads" 
              description="Explore the books shaping my perspectives"
            />
            <div className="w-40 mx-auto mt-8">
              <Image src={bookImage} alt="book cover" />
            </div>
          </Card>

          {/* My Toolbox Card */}
          <Card className="h-[320px]">
            <CardHeader 
              title="My Toolbox" 
              description="Explore the technologies and tools I use to create digital experiences."
              className="px-6 pt-6"
            />
            <ToolboxItems toolboxItems={toolboxItems} className="mt-6" />
            <ToolboxItems 
              toolboxItems={toolboxItems} 
              className="mt-6" 
              itemsWrapperClassName="-translate-x-1/2"
            />
          </Card>

          {/* Beyond the Code Card */}
          <Card className="h-[320px] p-0 flex flex-col">
            <CardHeader 
              title="Beyond the Code" 
              description="Explore my hobbies beyond the digital world!"
              className="px-6 py-6"
            />
            <div className="relative flex-1 overflow-hidden">
              {hobbies.map((hobby, index) => (
                <div 
                  key={`${hobby.title}-${index}`} 
                  className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-emerald-300 to-sky-400 rounded-full absolute whitespace-nowrap"
                  style={{
                    left: hobby.left,
                    top: hobby.top,
                  }}
                >
                  <span className="text-lg">{hobby.emoji}</span>
                  <span className="font-medium text-gray-950 text-sm">{hobby.title}</span>
                </div>
              ))}
            </div>
          </Card>

          
          <Card className="h-[320px] p-0 relative overflow-hidden">
            <Image 
              src={MapImage} 
              alt="map" 
              className="h-full w-full object-cover"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-300 to-sky-400 rounded-full p-2 flex items-center justify-center">
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
  );
};
