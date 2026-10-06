import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

// Your actual Supabase Credentials
const supabaseUrl = 'https://pzplzdgdlnjfwbklxbfd.supabase.co';
const supabaseAnonKey = 'sb_publishable_N3pli21Nl9PtLXeFkiuizg_W5Aw5MpM';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const siteData = {
  meta: {
    title: "THE CHRONICLE",
    subtitle: "JNV VARANASI",
    edition: "2025–26",
    tagline: "A YEAR WORTH REMEMBERING",
  },
  coverImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop",
  intro: {
    label: "01 / THE YEAR",
    headline: "This wasn't just another academic year.",
    body: "It was mornings that started too early, classrooms that got too loud, games that lasted longer than planned, and a hundred small moments nobody thought they'd remember. This edition captures the people, the stories, and the quiet spaces between the bells."
  },
  timeline: [
    { month: "JULY", event: "New Session Begins", desc: "The campus wakes up from its summer slumber." },
    { month: "AUGUST", event: "Independence Day", desc: "March pasts, tricolours, and the first taste of autumn." },
    { month: "OCTOBER", event: "Cluster Meet", desc: "Three days of fierce competition and new friendships." },
    { month: "DECEMBER", event: "Alumni Meet", desc: "Old faces returning to familiar corridors." },
    { month: "FEBRUARY", event: "Farewell", desc: "Saying goodbye to the seniors. The hardest month." },
  ],
  stories: [
    {
      id: 1,
      title: "The Quiet Before the Bell",
      category: "CAMPUS LIFE",
      author: "Ananya S., Class XI",
      excerpt: "At 5:30 AM, before the PT whistle blows, the campus belongs to the fog and the early risers.",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop",
      featured: true,
    },
    {
      id: 2,
      title: "Mess Duty Memoirs",
      category: "HOSTEL STORIES",
      author: "Rahul M., Class XII",
      excerpt: "Serving hundreds of students teaches you more about management than any textbook ever could.",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop",
      featured: false,
    },
    {
      id: 3,
      title: "Beyond the Whiteboard",
      category: "ACADEMICS",
      author: "Priya V., Class X",
      excerpt: "When the syllabus ends, the real learning begins. A look at our late-night study circles.",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop",
      featured: false,
    }
  ],
  voices: [
    {
      quote: "JNV gave me friendships I never expected. It gave me a second family.",
      author: "Student, Class XII"
    },
    {
      quote: "You can live with five hundred people and somehow still lose your own toothpaste.",
      author: "Hostel resident"
    }
  ],
  people: [
    { name: "Aarav Sharma", role: "School Captain", quote: "Lead by example.", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop" },
    { name: "Dr. K. Singh", role: "Principal", quote: "Excellence is a habit.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" },
    { name: "Neha Verma", role: "Sports Secretary", quote: "Leave it on the field.", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop" },
    { name: "Vikram R.", role: "Cultural Sec", quote: "Art speaks.", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop" },
  ],
  achievements: [
    { year: "2025", title: "National Science Exhibition", distinction: "1st Position — Regional", category: "ACADEMICS" },
    { year: "2025", title: "SGFI Athletics Championship", distinction: "2 Gold, 1 Silver", category: "SPORTS" },
    { year: "2026", title: "Youth Parliament", distinction: "Best Speaker Award", category: "CULTURAL" },
  ],
  creativeWorks: [
    { category: "POETRY", title: "The Last Bell", author: "STUDENT NAME" },
    { category: "SHORT STORY", title: "The Missing Spoon", author: "STUDENT NAME" },
    { category: "ART", title: "Courtyard at Dusk", author: "STUDENT NAME" },
    { category: "ESSAY", title: "On Sharing a Room with Fifty People", author: "STUDENT NAME" },
  ],
  humour: [
    "The mess menu says 'special'. Nobody knows what it means.",
    "\"Page 47, open it, silently.\" — every teacher, always.",
    "A charger passed around the hostel is community property.",
    "If you are seen outside after 10 PM, you are basically a phantom."
  ]
};

const Reveal = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const SectionHeader = ({ number, title }) => (
  <div className="flex items-center gap-6 mb-16 border-b border-[#1C1C1C]/10 pb-4">
    <span className="font-sans text-xs tracking-[0.2em] text-[#1C1C1C]/50">{number}</span>
    <h2 className="font-sans text-xs tracking-[0.2em] uppercase text-[#1C1C1C]">{title}</h2>
  </div>
);

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b border-[#1C1C1C]/10 backdrop-blur-md ${isScrolled ? 'bg-[#F9F8F6]/90 py-4' : 'bg-transparent py-6 border-transparent'}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="font-serif text-sm tracking-widest font-bold">{siteData.meta.title}</div>
        <div className="hidden lg:flex gap-8 font-sans text-[10px] tracking-[0.2em] uppercase">
          <a href="#home" className="hover:text-[#8B2E2E] transition-colors">01 Home</a>
          <a href="#stories" className="hover:text-[#8B2E2E] transition-colors">02 Stories</a>
          <a href="#people" className="hover:text-[#8B2E2E] transition-colors">03 People</a>
          <a href="#achievements" className="hover:text-[#8B2E2E] transition-colors">04 Achievements</a>
          <a href="#creative" className="hover:text-[#8B2E2E] transition-colors">05 Creative</a>
        </div>
        <div className="hidden lg:flex gap-4 font-sans text-[10px] tracking-[0.2em] uppercase items-center">
           <span>05 / 06</span>
           <button className="hover:text-[#8B2E2E] transition-colors flex items-center gap-2">
             Search
           </button>
        </div>
        <div className="lg:hidden font-sans text-[10px] tracking-widest uppercase">Menu</div>
      </div>
    </nav>
  );
};

export default function App() {
  const [peopleData, setPeopleData] = useState([]);
  const [loadingPeople, setLoadingPeople] = useState(true);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const { data, error } = await supabase.from('students').select('*');
        if (error) throw error;
        
        if (data && data.length > 0) {
          setPeopleData(data);
        } else {
          setPeopleData(siteData.people.map((p, i) => ({ ...p, id: i, image_url: p.image })));
        }
      } catch (error) {
        console.error("Exception fetching students:", error);
        setPeopleData(siteData.people.map((p, i) => ({ ...p, id: i, image_url: p.image })));
      } finally {
        setLoadingPeople(false);
      }
    };
    fetchPeople();
  }, []);

  return (
    <div className="bg-[#F9F8F6] text-[#1C1C1C] min-h-screen relative overflow-x-hidden selection:bg-[#0A192F] selection:text-[#F9F8F6]">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
      `}} />

      <Navigation />

      {/* 1. COVER EXPERIENCE */}
      <section id="home" className="min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 md:px-12 border-b border-[#1C1C1C]/20">
        <Reveal>
          <div className="text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
            <div>
              <h1 className="font-serif text-6xl md:text-8xl lg:text-[10rem] leading-none tracking-tighter mb-4">
                {siteData.meta.title}
              </h1>
              <div className="font-sans text-sm md:text-base tracking-[0.3em] uppercase ml-1">
                {siteData.meta.subtitle} <span className="text-[#8B2E2E]">—</span> {siteData.meta.edition}
              </div>
            </div>
            <div className="hidden md:block font-sans text-xs tracking-widest max-w-[200px] text-right text-[#1C1C1C]/60">
              {siteData.meta.tagline}
            </div>
          </div>
        </Reveal>

        <Reveal delay={200} className="flex-grow w-full relative overflow-hidden group">
          <img 
            src={siteData.coverImage} 
            alt="Campus Cover" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[20s] ease-linear group-hover:scale-105 filter grayscale-[20%]"
          />
          <div className="absolute inset-0 bg-[#1C1C1C]/10 mix-blend-multiply"></div>
        </Reveal>
        
        <Reveal delay={400}>
           <div className="mt-12 flex justify-between items-center font-sans text-xs tracking-[0.2em] uppercase">
            <span>Scroll to explore</span>
            <span className="animate-bounce">↓</span>
          </div>
        </Reveal>
      </section>

      {/* 2. INTRODUCTION */}
      <section className="py-24 md:py-40 px-6 md:px-12 border-b border-[#1C1C1C]/20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
          <Reveal className="md:col-span-4">
            <div className="font-sans text-xs tracking-[0.2em] uppercase sticky top-32">
              {siteData.intro.label}
            </div>
          </Reveal>
          <Reveal className="md:col-span-8" delay={200}>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tight mb-12">
              {siteData.intro.headline}
            </h2>
            <p className="font-sans text-lg md:text-xl leading-relaxed max-w-2xl text-[#1C1C1C]/80">
              {siteData.intro.body}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3. STORIES */}
      <section id="stories" className="py-24 md:py-32 px-6 md:px-12">
        <SectionHeader number="02" title="Stories" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {siteData.stories.map((story, idx) => (
            <Reveal key={story.id} className={story.featured ? "md:col-span-2" : "col-span-1"} delay={idx * 150}>
              <div className="group cursor-pointer">
                <div className={`overflow-hidden mb-6 ${story.featured ? 'aspect-[21/9]' : 'aspect-[4/3]'}`}>
                  <img src={story.image} alt={story.title} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105" />
                </div>
                <div className="font-sans text-[10px] tracking-[0.2em] text-[#8B2E2E] uppercase mb-3">{story.category}</div>
                <h3 className="font-serif text-2xl md:text-4xl mb-4 group-hover:text-[#8B2E2E] transition-colors">{story.title}</h3>
                <p className="font-sans text-sm text-[#1C1C1C]/70 mb-4">{story.excerpt}</p>
                <div className="font-sans text-xs italic text-[#1C1C1C]/50">By {story.author}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 4. PEOPLE */}
      <section id="people" className="py-24 px-6 md:px-12 bg-[#0A192F] text-white">
        <div className="mb-16 border-b border-white/10 pb-4 flex items-center gap-6">
          <span className="font-sans text-xs tracking-[0.2em] text-white/50">03</span>
          <h2 className="font-sans text-xs tracking-[0.2em] uppercase text-white">The People</h2>
        </div>
        
        {loadingPeople ? (
          <div className="py-20 text-white/40 font-sans text-xs tracking-[0.2em] uppercase animate-pulse">Loading portraits...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {peopleData.map((person, idx) => (
              <Reveal key={person.id || idx} delay={idx * 100}>
                <div className="group cursor-pointer">
                  <div className="aspect-[3/4] overflow-hidden mb-6 bg-white/5">
                    {/* Maps to both your schema variants seamlessly */}
                    {(person.image_url || person.photo_url) ? (
                      <img src={person.image_url || person.photo_url} alt={person.name} className="w-full h-full object-cover filter grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-serif text-4xl opacity-20">{person.name ? person.name.charAt(0) : '?'}</div>
                    )}
                  </div>
                  <h4 className="font-sans font-medium text-lg tracking-wide">{person.name}</h4>
                  <div className="font-sans text-xs tracking-widest uppercase text-white/50 mt-1 mb-3">{person.role || `Class ${person.class || ''}`}</div>
                  <p className="font-serif text-sm italic text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">"{person.quote || person.favourite_quote}"</p>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* 5. CREATIVE */}
      <section id="creative" className="bg-[#111111] text-[#F9F8F6] py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="font-sans text-xs tracking-widest text-gray-400 uppercase mb-8">04 / Creative Corner</div>
            <h2 className="font-serif text-6xl md:text-8xl lg:text-[7rem] mb-6 tracking-tight">Creative</h2>
            <p className="font-serif italic text-gray-400 text-xl md:text-2xl max-w-md mb-24">Poems, sketches and essays, written between classes.</p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteData.creativeWorks.map((work, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="border border-[#333333] p-8 h-full flex flex-col justify-between min-h-[280px] group hover:border-[#555555] transition-colors">
                  <div>
                    <div className="font-sans text-[10px] tracking-widest text-[#E05A3D] font-bold mb-8 uppercase">{work.category}</div>
                    <h3 className="font-serif text-2xl md:text-3xl text-white mb-8 group-hover:text-gray-300 transition-colors leading-tight">{work.title}</h3>
                  </div>
                  <div className="font-sans text-xs tracking-widest text-gray-500 uppercase mt-8">{work.author}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. HUMOUR */}
      <section id="humour" className="bg-[#8da5d3] text-white py-32 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="font-sans text-xs tracking-widest text-white/70 uppercase mb-8">05 / Lighter Side</div>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-[6.5rem] leading-[1.1] max-w-4xl mb-24">Things only a Navodayan would understand</h2>
          </Reveal>

          <div className="flex flex-col">
            {siteData.humour.map((joke, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="flex items-start gap-8 py-8 border-t border-white/20">
                  <span className="font-sans text-sm font-bold text-white/60 pt-2 shrink-0">{(idx + 1).toString().padStart(2, '0')}</span>
                  <p className="font-serif italic text-2xl md:text-3xl lg:text-4xl leading-snug">{joke}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      
      {/* 7. FOOTER */}
      <footer className="pt-32 pb-12 px-6 md:px-12 bg-[#1C1C1C] text-[#F9F8F6]">
        <Reveal>
          <div className="text-center mb-32">
            <h2 className="font-serif text-4xl md:text-7xl lg:text-[8rem] leading-none mb-8">THE YEAR ENDS.<br /><span className="text-[#F9F8F6]/50 italic">THE MEMORIES DON'T.</span></h2>
          </div>
        </Reveal>
      </footer>
    </div>
  );
}
