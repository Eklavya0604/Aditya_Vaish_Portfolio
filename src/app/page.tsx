import Header from "@/components/navigation/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full overflow-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Aditya Kumar Vaish",
            "url": "https://adityavaish.dev",
            "jobTitle": "Backend Engineer",
            "alumniOf": {
              "@type": "CollegeOrUniversity",
              "name": "ABES Engineering College"
            },
            "sameAs": [
              "https://github.com/Eklavya0604",
              "https://www.linkedin.com/in/aditya-vaish-482a11281/",
              "https://www.instagram.com/aditya_k.__/?__pwa=1"
            ],
            "knowsAbout": ["Java", "Spring Boot", "React", "Distributed Systems", "SQL"]
          })
        }}
      />
      <Header />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />

      {/* Basic Footer for closure */}
      <footer className="w-full py-8 border-t border-border bg-white flex flex-col items-center justify-center">
        <div className="font-mono text-[10px] text-muted tracking-widest uppercase">
          SYS.END // ADITYA_K_V
        </div>
      </footer>
    </main>
  );
}
