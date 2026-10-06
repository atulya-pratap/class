import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Search, Menu, X, ArrowRight } from 'lucide-react';

const supabaseUrl = 'https://pzplzdgdlnjfwbklxbfd.supabase.co';
const supabaseKey = 'sb_publishable_N3pli21Nl9PtLXeFkiuizg_W5Aw5MpM';
const supabase = createClient(supabaseUrl, supabaseKey);

const SITE_CONFIG = {
  magazineTitle: "THE CHRONICLE",
  schoolName: "JNV VARANASI",
  edition: "2025–26",
  tagline: "Made by students, for the students."
};

const Navigation = ({ isMenuOpen, setIsMenuOpen }) => (
  <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-6 py-4 mix-blend-difference text-white">
    <div className="font-serif tracking-widest text-sm uppercase">{SITE_CONFIG.magazineTitle}</div>
    <div className="hidden md:flex gap-8 text-xs font-sans tracking-widest">
      <span className="hover:opacity-70 cursor-pointer transition-opacity">01 HOME</span>
      <span className="hover:opacity-70 cursor-pointer transition-opacity">02 STORIES</span>
      <span className="hover:opacity-70 cursor-pointer transition-opacity">03 PEOPLE</span>
    </div>
    <div className="flex items-center gap-4">
      <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
    {isMenuOpen && (
      <div className="absolute top-0 left-0 w-full h-screen bg-[#0A192F] text-[#F9F8F6] flex flex-col justify-center items-start pl-12 gap-8 z-40">
        {['HOME', 'STORIES', 'PEOPLE', 'CAMPUS', 'CREATIVE'].map((item, i) => (
          <h2 key={item} className="font-serif text-4xl md:text-6xl tracking-wide cursor-pointer hover:opacity-50">
            <span className="text-sm font-sans mr-4 opacity-50">0{i + 1} —</span> {item}
          </h2>
        ))}
      </div>
    )}
  </nav>
);

const MagazineCover = () => (
  <section className="relative h-screen w-full flex flex-col justify-between p-6 md:p-12 bg-[#F9F8F6] text-[#1A1A1A]">
    <div className="pt-20 z-30">
      <p className="text-xs font-sans tracking-[0.2em] uppercase mb-4">{SITE_CONFIG.schoolName} — {SITE_CONFIG.edition}</p>
      <h1 className="font-serif text-6xl md:text-[9rem] leading-[0.9] tracking-tight">THE YEAR<br />WE LIVED.</h1>
    </div>
    <div className="flex justify-between items-end z-30 pb-4">
      <p className="hidden md:block max-w-sm text-sm font-sans leading-relaxed">Stories • People • Memories • Achievements</p>
      <p className="text-xs font-sans tracking-widest uppercase flex items-center gap-2">Scroll <ArrowRight size={14} className="rotate-90" /></p>
    </div>
  </section>
);

const PeopleSection = ({ students, loading }) => (
  <section className="py-24 px-6 md:px-12 bg-[#1A1A1A] text-[#F9F8F6]">
    <div className="mb-16 border-b border-white/20 pb-8">
      <p className="text-xs font-sans tracking-widest uppercase text-white/50 mb-4">03 / PEOPLE</p>
      <h2 className="font-serif text-5xl md:text-7xl">The Faces of JNV</h2>
    </div>
    {loading ? (
      <div className="text-center py-20 text-white/50 font-serif text-xl animate-pulse">Loading archive...</div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {students.map((student, idx) => (
          <div key={idx} className="group cursor-pointer">
            <div className="aspect-[3/4] bg-white/5 mb-4 overflow-hidden">
              {student.photo_url ? (
                <img src={student.photo_url} alt={student.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-serif text-4xl opacity-20">{student.name ? student.name.charAt(0) : '?'}</div>
              )}
            </div>
            <h3 className="font-serif text-xl mb-1">{student.name}</h3>
            <p className="font-sans text-xs uppercase tracking-widest text-white/50">Class {student.class} {student.section}</p>
          </div>
        ))}
      </div>
    )}
  </section>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      const { data, error } = await supabase.from('students').select('*');
      if (!error) setStudents(data || []);
      setLoading(false);
    };
    fetchStudents();
  }, []);

  return (
    <div className="bg-[#F9F8F6] min-h-screen selection:bg-[#0A192F] selection:text-white antialiased">
      <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main>
        <MagazineCover />
        <PeopleSection students={students} loading={loading} />
      </main>
    </div>
  );
}
