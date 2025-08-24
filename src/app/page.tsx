import { Header } from "@/sections/Header";
import { HeroSection } from "@/sections/Hero";
import { ProjectsSection } from "@/sections/Projects";
import { TapeSection } from "@/sections/Tape";
import { TestimonialsSection } from "@/sections/Testimonials";
import { AboutSection } from "@/sections/About";
import { ContactSection } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";

export default async function Home() {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return (
    <div>
      <Header />

      {/* Add top padding so content doesn't sit under the fixed header */}
      <main className="pt-20">
        <section id="home">
          <HeroSection />
        </section>

        <section id="projects">
          <ProjectsSection />
        </section>

        <TapeSection />
        <TestimonialsSection />

        <section id="about">
          <AboutSection />
        </section>

        <section id="contact">
          <ContactSection />
        </section>
      </main>

      <Footer />
    </div>
  );
}

