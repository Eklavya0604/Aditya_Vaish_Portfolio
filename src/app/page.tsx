import Header from "@/components/navigation/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full overflow-clip">
      <Header />
      <Hero />
      <About />
      <Skills />
      <Projects />
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
