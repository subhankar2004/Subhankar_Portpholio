import LightRays from "@/blocks/Backgrounds/LightRays/LightRays";
import BlurText from "@/blocks/TextAnimations/BlurText/BlurText";
import prisma from "../../../lib/prisma";

const page = () => {
  return (
    <div className="relative min-h-screen">
      {/* Full Background LightRays */}
      <div className="fixed inset-0 w-full h-full">
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays w-full h-full"
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center text-center py-12">
          <BlurText
            text="Want to contact me !? Here is the form"
            delay={150}
            animateBy="words"
            direction="top"
            className="text-4xl font-bold mb-6 text-white"
          />
          <hr className="w-1/2 mx-auto border-white/30" />
        </div>

        {/* Form Section */}
        <div className="flex justify-center items-center py-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 w-full max-w-md">
            {/* Your form will go here */}
            <p className="text-white text-center">Your form goes here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
