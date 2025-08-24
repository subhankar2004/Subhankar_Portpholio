import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";

const footerLinks = [
  {
    title: "Github",
    href: "https://github.com/subhankar2004",
  },
  {
    title: "Twitter",
    href: "https://x.com/SubhankarP1809",
  },
  {
    title: "Instagram",
    href: "https://www.instagram.com/subhankar_patra22?igsh=MXJjemZ2c2x1MGcydA==",
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/subhankar-patra-400519291/",
  },
];

export const Footer = () => {
  return (
    <footer className="relative -z-10 overflow-x-clip">
      <div className="absolute h-[400px] w-[1600px] md:h-[200px] md:w-[1800px] lg:h-[600px] lg:w-[2000px]  bottom-0 left-1/2 -translate-x-1/2 bg-emerald-300/20 [mask-image:radial-gradient(50%_50%at_bottom_center,black,transparent)] -z-10 "></div>
      <div className="container">
        <div className="border-t border-white/15 py-6 text-sm flex flex-col md:flex-row md:justify-between gap-8 items-center">
          <div className="text-white/40">&copy; 2025. All rights reserved.</div>
          <nav className="flex flex-col md:flex-row items-center gap-8">
            {footerLinks.map((link) => (
              <a
                href="#"
                key={link.title}
                className="inline-flex items-center gap-1.5"
              >
                <span className="font-semibold">{link.title}</span>
                <ArrowUpRightIcon className="" size-4 />
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};
