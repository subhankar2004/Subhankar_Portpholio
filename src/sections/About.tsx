import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";
import StarIcon from '@/assets/icons/star.svg';
import bookImage from '@/assets/images/book-cover.png';
import Image from "next/image";
import JavascriptIcon from '@/assets/icons/square-js.svg';
import HTMLIcon from '@/assets/icons/html5.svg';
import CssIcon from '@/assets/icons/css3.svg';
import ReactIccon from '@/assets/icons/react.svg';
import ChromeIcon from '@/assets/icons/chrome.svg';
import GithubIcon from '@/assets/icons/github.svg';

import MapImage from '@/assets/images/map.png';
import memoji from '@/assets/images/memoji-smile.png'
import { CardHeader } from "@/components/CardHeader";
import { ToolboxItems } from "@/components/ToolBoxItems";


const toolboxItems=[
  {
    title:'javascript',
    iconType:JavascriptIcon

  },
  {
    title:'HTML5',
    iconType:HTMLIcon

  },
  {
    title:'React',
    iconType:ReactIccon

  },
  {
    title:'CSS3',
    iconType:CssIcon

  },
  {
    title:'Chrome',
    iconType:ChromeIcon

  },
  {
    title:'GitHub',
    iconType:GithubIcon

  }
  
]

const hobbies=[
  {
    title:'Cricket',
    emoji:'🏏'
  },
  {
    title:'Photography',
    emoji:'📷'
  },
   {
    title:'Cricket',
    emoji:'🏏'
  },
  {
    title:'Photography',
    emoji:'📷'
  },
   {
    title:'Cricket',
    emoji:'🏏'
  },
  {
    title:'Photography',
    emoji:'📷'
  },
   {
    title:'Cricket',
    emoji:'🏏'
  },
  
]

export const AboutSection = () => {
  return <div className="py-20">
    <div className="container">
    <SectionHeader eyebrow="About Me " title="A Glimpse Into My World" description="Learn Who I am  What i Do  What inspires me."/>
    <div className="mt-20 flex flex-col gap-8">
       <Card className="h-[320px]">
        <CardHeader title="My Reads" description="Explore the books shaping my perspectives"/>
        <div className="w-40 mx-auto mt-8">
        <Image src={bookImage} alt="book cover" />
        </div>
       </Card>
       <Card className="h-[380px]">
        <CardHeader 
        title="My Toolbox" 
        description="Explore the technologies and tools I use to create digital experiences."
        className="px-6 pt-6"
        />
        
        
        <ToolboxItems toolboxItems={toolboxItems} className="mt-6 -mx-6" />
        <ToolboxItems toolboxItems={toolboxItems} className="mt-6" itemsWrapperClassName="-translate-x-1/2"/>
        
       </Card>
       <Card>
        <CardHeader title="Beyond the Code" description="Explore my hobbies beyond my digital world!!"/>
        
        <div>
          {hobbies.map(hobby=>(
            <div key={hobby.title}>
              <span>{hobby.emoji}</span>
              <span>{hobby.title}</span>
            </div>
          ))}
        </div>
        <Image src={bookImage} alt="book cover" />
       </Card>
       <Card>
         <Image src={MapImage} alt="map"/>
         <Image src={memoji} alt='smiling emoji'/>
       </Card>
    </div>
    </div>
  </div>;
};
