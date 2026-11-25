import React, { useState, useEffect, useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';

// Your actual Supabase Credentials
const supabaseUrl = 'https://pzplzdgdlnjfwbklxbfd.supabase.co';
const supabaseAnonKey = 'sb_publishable_N3pli21Nl9PtLXeFkiuizg_W5Aw5MpM';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const siteData = {
  meta: {
    brand: 'The Chronicle',
    note: 'jnv varanasi · 2025–26, with love',
    headline: ['A year', 'worth', 'remem-', 'bering.'],
    lede: 'A magazine of the people, places, and quiet spaces between the bells that made our school days ours.',
    footerBye: 'The year ends.',
    footerSign: "The memories don't.",
    finePrint: 'Made with love by JNV Varanasi · Edition 2025–26.',
  },
  wallScribbles: [
    { text: 'stay in touch!!', color: '#E8384F', rotate: '-4deg', size: '2.1rem' },
    { text: "mess menu says 'special'", color: '#12A150', rotate: '3deg' },
    { text: 'last bench gang', color: '#8A4DFF', rotate: '-2deg' },
    { text: '5:30 AM PT whistle', color: '#E5780A', rotate: '4deg', size: '1.95rem' },
    { text: 'Page 47, open it silently', color: '#3B6CFF', rotate: '-3deg' },
    { text: 'second family', color: '#D6338A', rotate: '2deg' },
    { text: 'hostel charger = public property', color: '#0E8FA6', rotate: '-3deg', size: '1.9rem' },
    { text: 'don’t forget us', color: '#E8384F', rotate: '3deg' },
    { text: 'see you at the reunion', color: '#12A150', rotate: '-2deg' },
  ],
  intro: {
    greeting: 'Dear reader,',
    paragraphs: [
      "This wasn't just another academic year. It was mornings that started too early, classrooms that got too loud, games that lasted longer than planned, and a hundred small moments nobody thought they'd remember.",
      'Twelve years of tiffin boxes, borrowed notebooks, and corridor laughter are turning into memories, and we didn’t want them to fade into a group chat that slowly goes quiet.',
      'So we made this: a small magazine of us. Our faces, our stories, our campus, and everything we created between the bells.',
    ],
    signOff: 'JNV Varanasi, with love',
  },
  peopleFallback: [
    { id: 1, name: 'Aarav Sharma', role: 'School Captain', roll_no: 1, quote: 'lead by example', image_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop' },
    { id: 2, name: 'Dr. K. Singh', role: 'Principal', roll_no: 2, quote: 'excellence is a habit', image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop' },
    { id: 3, name: 'Neha Verma', role: 'Sports Secretary', roll_no: 3, quote: 'leave it on the field', image_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop' },
    { id: 4, name: 'Vikram R.', role: 'Cultural Sec', roll_no: 4, quote: 'art speaks', image_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop' },
  ],
  stories: [
    {
      id: 1,
      title: 'The Quiet Before the Bell',
      caption: '5:30 AM, before the PT whistle',
      category: 'Campus Life',
      author: 'Ananya S., Class XI',
      excerpt: 'At 5:30 AM, before the PT whistle blows, the campus belongs to the fog and the early risers.',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop',
      colorClass: 'c6',
    },
    {
      id: 2,
      title: 'Mess Duty Memoirs',
      caption: 'mess duty chronicles',
      category: 'Hostel Stories',
      author: 'Rahul M., Class XII',
      excerpt: 'Serving hundreds of students teaches you more about management than any textbook ever could.',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop',
      colorClass: 'c5',
    },
    {
      id: 3,
      title: 'Beyond the Whiteboard',
      caption: 'late-night study circles',
      category: 'Academics',
      author: 'Priya V., Class X',
      excerpt: 'When the syllabus ends, the real learning begins. A look at our late-night study circles.',
      image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop',
      colorClass: 'c2',
    },
  ],
  creativeWorks: [
    {
      category: 'Poem',
      title: 'The Last Bell',
      excerpt: '“The bell still rings inside my head, long after the corridors have emptied.”',
      author: 'JNV Student',
    },
    {
      category: 'Short story',
      title: 'The Missing Spoon',
      excerpt: '“In a hostel of five hundred residents, every steel spoon has a secret life of its own.”',
      author: 'JNV Student',
    },
    {
      category: 'Illustration',
      title: 'Courtyard at Dusk',
      excerpt: 'Pencil and watercolour, sketched between evening games and night prep.',
      author: 'JNV Student',
      artColor: 'c5',
    },
    {
      category: 'Essay',
      title: 'On Sharing a Room with Fifty People',
      excerpt: '“You can live with five hundred people and somehow still lose your own toothpaste.”',
      author: 'JNV Student',
    },
  ],
};

const badgeColors = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];

const getPhotoUrl = (person) => {
  const url =
    person?.image_url ||
    person?.photo_url ||
    person?.avatar_url ||
    person?.photo ||
    person?.image;
  return typeof url === 'string' && url.trim() !== '' ? url.trim() : null;
};

const getRollNumber = (person) => {
  const raw =
    person?.roll_no ??
    person?.roll ??
    person?.rollNo ??
    person?.roll_number ??
    person?.rollnumber;
  if (raw === null || raw === undefined || String(raw).trim() === '') {
    return null;
  }
  return String(raw).trim();
};

const parseRollNumeric = (rollStr) => {
  if (!rollStr) return Number.POSITIVE_INFINITY;
  const digits = rollStr.replace(/\D/g, '');
  if (!digits) return Number.POSITIVE_INFINITY;
  return parseInt(digits, 10);
};

const sortStudents = (list) => {
  return [...list].sort((a, b) => {
    const aHasPhoto = getPhotoUrl(a) ? 1 : 0;
    const bHasPhoto = getPhotoUrl(b) ? 1 : 0;

    // 1. Prefer students who have uploaded a photo
    if (aHasPhoto !== bHasPhoto) {
      return bHasPhoto - aHasPhoto;
    }

    // 2. Then sort by roll number (ascending)
    const aRoll = parseRollNumeric(getRollNumber(a));
    const bRoll = parseRollNumeric(getRollNumber(b));
    if (aRoll !== bRoll) {
      return aRoll - bRoll;
    }

    // 3. Fallback alphabetical by name
    return (a?.name || '').localeCompare(b?.name || '');
  });
};

function StudentCard({ person, index, onSelect }) {
  const [imgFailed, setImgFailed] = useState(false);
  const photoUrl = !imgFailed ? getPhotoUrl(person) : null;
  const roll = getRollNumber(person);
  const colorClass = badgeColors[index % badgeColors.length];

  const baseRole = person.role || (person.class ? `Class ${person.class}` : '');
  const subtitle = [baseRole, roll ? `Roll ${roll}` : ''].filter(Boolean).join(' · ') || 'JNV Varanasi';
  const tagline = person.quote || person.favourite_quote || 'batch of 2025–26';

  return (
    <a
      className="id"
      href="#people"
      onClick={(e) => {
        e.preventDefault();
        onSelect(`${person.name}${roll ? ` (Roll ${roll})` : ''}: "${tagline}"`);
      }}
    >
      <i className="slot" />
      <div className={`ph ${colorClass}`}>
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={person.name}
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <b>{person.name ? person.name.charAt(0).toUpperCase() : '?'}</b>
        )}
      </div>
      <strong>{person.name}</strong>
      <small>{subtitle}</small>
      <em>{tagline}</em>
    </a>
  );
}

export default function App() {
  const [peopleData, setPeopleData] = useState([]);
  const [loadingPeople, setLoadingPeople] = useState(true);
  const [activePage, setActivePage] = useState(() =>
    typeof window !== 'undefined' && window.location.hash === '#people' ? 'people' : 'home'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#people') {
        setActivePage('people');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setActivePage('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const { data, error } = await supabase.from('student').select('*');
        if (error) throw error;

        if (data && data.length > 0) {
          setPeopleData(data);
        } else {
          setPeopleData(siteData.peopleFallback);
        }
      } catch (error) {
        console.error('Exception fetching student:', error);
        setPeopleData(siteData.peopleFallback);
      } finally {
        setLoadingPeople(false);
      }
    };
    fetchPeople();
  }, []);

  const sortedPeople = useMemo(() => sortStudents(peopleData), [peopleData]);

  const filteredAllPeople = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return sortedPeople;
    return sortedPeople.filter((p) => {
      const name = (p.name || '').toLowerCase();
      const role = (p.role || '').toLowerCase();
      const cls = String(p.class || '').toLowerCase();
      const roll = String(getRollNumber(p) || '').toLowerCase();
      return name.includes(q) || role.includes(q) || cls.includes(q) || roll.includes(q);
    });
  }, [sortedPeople, searchQuery]);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setToastVisible(true);
  };

  useEffect(() => {
    if (!toastVisible) return;
    const timer = setTimeout(() => setToastVisible(false), 2400);
    return () => clearTimeout(timer);
  }, [toastVisible, toastMessage]);

  const openPeoplePage = (e) => {
    if (e) e.preventDefault();
    if (window.location.hash !== '#people') {
      window.location.hash = 'people';
    }
    setActivePage('people');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHomeSection = (e, sectionId) => {
    if (e) e.preventDefault();
    if (activePage !== 'home') {
      window.history.pushState(null, '', window.location.pathname + window.location.search);
      setActivePage('home');
      setTimeout(() => {
        if (sectionId) {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 40);
    } else if (sectionId) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div id="top" className="chronicle-app">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Caveat:wght@600;700&display=swap');

        :root {
          --bg: #F3F5FA;
          --card: #ffffff;
          --ink: #141A3C;
          --muted: #5B6285;
          --blue: #2338D0;
          --on-blue: #ffffff;
          --red: #D92D3A;
          --yellow: #FFE14D;
          --rule: rgba(35, 56, 208, 0.17);
          --line: rgba(20, 26, 60, 0.15);
          --sans: "Bricolage Grotesque", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
          --hand: "Caveat", "Segoe Print", "Bradley Hand", cursive;
          color-scheme: light;
        }

        @media (prefers-color-scheme: dark) {
          :root:not([data-theme="light"]) {
            --bg: #0D1124;
            --card: #161B36;
            --ink: #EEF0FA;
            --muted: #9AA2C8;
            --blue: #8FA2FF;
            --on-blue: #0D1124;
            --red: #FF7B84;
            --rule: rgba(143, 162, 255, 0.2);
            --line: rgba(238, 240, 250, 0.17);
            color-scheme: dark;
          }
        }

        html {
          scroll-padding-top: 64px;
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: var(--bg);
          color: var(--ink);
          font: 400 1rem/1.6 var(--sans);
        }

        .chronicle-app {
          min-height: 100vh;
          background: var(--bg);
          color: var(--ink);
          font-family: var(--sans);
          padding-bottom: env(safe-area-inset-bottom, 0px);
        }

        .chronicle-app *, .chronicle-app *::before, .chronicle-app *::after {
          box-sizing: border-box;
        }

        .wrap {
          max-width: 720px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Sticky Header */
        .bar {
          position: sticky;
          top: 0;
          z-index: 20;
          background: var(--bg);
          border-bottom: 1px solid var(--line);
        }
        .bar .wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          height: 56px;
        }
        .brand {
          font: 800 1.2rem/1 var(--sans);
          letter-spacing: -0.03em;
          color: var(--blue);
          text-decoration: none;
        }
        .bar nav {
          display: flex;
          gap: 16px;
          font-size: 0.85rem;
          font-weight: 500;
        }
        .bar nav a {
          text-decoration: none;
          color: var(--muted);
          transition: color 0.15s;
        }
        .bar nav a:hover,
        .bar nav a.active {
          color: var(--blue);
          font-weight: 700;
        }

        /* Hero */
        .hero {
          padding: 34px 0 0;
        }
        .note {
          display: inline-block;
          margin: 0 0 10px;
          font: 700 1.4rem/1 var(--hand);
          color: var(--red);
          transform: rotate(-3deg);
        }
        .chronicle-app h1 {
          margin: 0 0 18px;
          font: 800 clamp(3.4rem, 17vw, 4.8rem)/0.9 var(--sans);
          letter-spacing: -0.05em;
          color: var(--blue);
        }
        .lede {
          margin: 0 0 24px;
          max-width: 32ch;
          font-size: 1.15rem;
          line-height: 1.5;
        }
        .cta {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
        }
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 0 22px;
          border: 2px solid var(--ink);
          border-radius: 8px;
          background: var(--card);
          color: var(--ink);
          font: 700 0.95rem/1 var(--sans);
          text-decoration: none;
          cursor: pointer;
          box-shadow: 3px 3px 0 var(--ink);
          transition: transform 0.1s, box-shadow 0.1s;
        }
        .btn:active {
          transform: translate(2px, 2px);
          box-shadow: 1px 1px 0 var(--ink);
        }
        .btn.solid {
          background: var(--blue);
          color: var(--on-blue);
        }
        .btn.small {
          min-height: 40px;
          padding: 0 16px;
          font-size: 0.88rem;
        }

        /* Autograph / Scribble Wall */
        .wall {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 6px 20px;
          margin-top: 38px;
          padding: 26px 16px;
          background: var(--card);
          border: 1px solid var(--line);
          border-radius: 4px;
        }
        .wall span {
          font: 700 1.75rem/1.15 var(--hand);
          color: var(--c);
          transform: rotate(var(--r));
          display: inline-block;
        }

        /* Sections */
        .chronicle-section {
          padding-top: 68px;
        }
        .people-page {
          padding-top: 32px;
        }
        .chronicle-app h2 {
          margin: 0 0 6px;
          font: 800 clamp(2.3rem, 11vw, 3.4rem)/1 var(--sans);
          letter-spacing: -0.045em;
          color: var(--blue);
        }
        .sub {
          margin: 0 0 28px;
          color: var(--muted);
        }
        .more {
          display: flex;
          justify-content: center;
          margin-top: 36px;
        }

        /* Search Input for /#people page */
        .search-bar {
          width: 100%;
          min-height: 46px;
          padding: 0 16px;
          margin-bottom: 26px;
          border: 2px solid var(--ink);
          border-radius: 8px;
          background: var(--card);
          color: var(--ink);
          font: 500 0.95rem/1 var(--sans);
          box-shadow: 3px 3px 0 var(--ink);
          outline: none;
        }
        .search-bar::placeholder {
          color: var(--muted);
        }

        /* Placeholder & Striped Colors */
        .ph {
          background: repeating-linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.13) 0 9px,
              transparent 9px 18px
            ),
            var(--c);
          overflow: hidden;
        }
        .c1 { --c: #2338D0; }
        .c2 { --c: #E23B3B; }
        .c3 { --c: #16875A; }
        .c4 { --c: #7A3FD1; }
        .c5 { --c: #E58A00; }
        .c6 { --c: #0E8FA6; }

        /* Ruled Notebook Paper */
        .paper {
          position: relative;
          padding: 30px 18px 30px 56px;
          background: var(--card)
            repeating-linear-gradient(
              to bottom,
              transparent 0 29px,
              var(--rule) 29px 30px
            );
          border: 1px solid var(--line);
          line-height: 30px;
        }
        .paper::before {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 38px;
          width: 2px;
          background: var(--red);
          opacity: 0.55;
        }
        .paper p {
          margin: 0 0 30px;
        }
        .paper p:last-child {
          margin-bottom: 0;
        }
        .hand {
          font: 700 1.7rem/30px var(--hand);
          color: var(--blue);
        }

        /* Lanyard ID Badges (People) */
        .people {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px 14px;
        }
        .id {
          position: relative;
          display: block;
          padding: 24px 10px 14px;
          background: var(--card);
          border: 1px solid var(--line);
          border-radius: 12px;
          text-align: center;
          text-decoration: none;
          color: var(--ink);
          transition: transform 0.2s ease;
        }
        .id:nth-child(odd) {
          transform: rotate(-1deg);
        }
        .id:nth-child(even) {
          transform: rotate(1deg);
        }
        .id:hover {
          transform: rotate(0deg) translateY(-2px);
        }
        .slot {
          position: absolute;
          top: 9px;
          left: 50%;
          width: 36px;
          height: 7px;
          margin-left: -18px;
          border-radius: 9px;
          background: var(--bg);
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.3);
        }
        .id .ph {
          display: grid;
          place-items: center;
          aspect-ratio: 1;
          border-radius: 4px;
        }
        .id .ph img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .id .ph b {
          font: 800 3.4rem/1 var(--sans);
          color: rgba(255, 255, 255, 0.92);
        }
        .id strong {
          display: block;
          margin-top: 10px;
          font-size: 1rem;
          line-height: 1.2;
          font-weight: 700;
        }
        .id small {
          display: block;
          color: var(--muted);
          font-size: 0.8rem;
          margin-top: 2px;
        }
        .id em {
          display: block;
          margin-top: 4px;
          font: 700 1.25rem/1 var(--hand);
          font-style: normal;
          color: var(--red);
        }

        /* Polaroid Snaps (Stories / Photos) */
        .snaps {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px 16px;
          padding-top: 12px;
        }
        .snap {
          position: relative;
          display: block;
          padding: 8px 8px 36px;
          background: #ffffff;
          color: #2B2F55;
          text-decoration: none;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2), 0 12px 18px -12px rgba(0, 0, 0, 0.4);
          transition: transform 0.2s ease;
        }
        .snap::before {
          content: "";
          position: absolute;
          top: -10px;
          left: 50%;
          width: 64px;
          height: 20px;
          margin-left: -32px;
          background: rgba(255, 225, 77, 0.78);
          transform: rotate(-3deg);
          z-index: 2;
        }
        .snap:nth-child(odd) {
          transform: rotate(-1.6deg);
        }
        .snap:nth-child(even) {
          transform: rotate(1.4deg);
        }
        .snap:hover {
          transform: rotate(0deg) translateY(-2px);
        }
        .snap:first-child {
          grid-column: span 2;
        }
        .snap .ph {
          aspect-ratio: 4 / 5;
        }
        .snap:first-child .ph {
          aspect-ratio: 16 / 10;
        }
        .snap .ph img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .snap span {
          position: absolute;
          left: 8px;
          right: 8px;
          bottom: 7px;
          text-align: center;
          font: 700 1.2rem/1 var(--hand);
        }

        /* Creative Work */
        .works {
          display: grid;
          gap: 44px;
        }
        .work {
          display: block;
          color: inherit;
          text-decoration: none;
        }
        .tab {
          position: absolute;
          top: -13px;
          left: 56px;
          padding: 7px 12px 6px;
          background: var(--yellow);
          color: #141A3C;
          font: 700 0.8rem/1 var(--sans);
          transform: rotate(-2deg);
        }
        .work h3 {
          margin: 0;
          font: 800 1.5rem/30px var(--sans);
          letter-spacing: -0.03em;
        }
        .art {
          height: 150px;
          margin: 0 0 30px;
          border-radius: 4px;
        }

        /* Footer */
        .chronicle-footer {
          margin-top: 84px;
          padding: 40px 0 44px;
          border-top: 2px solid var(--blue);
        }
        .bye {
          margin: 0 0 4px;
          font: 800 clamp(2.3rem, 11vw, 3.4rem)/0.95 var(--sans);
          letter-spacing: -0.045em;
          color: var(--blue);
        }
        .sign {
          margin: 0 0 22px;
          font: 700 1.7rem/1 var(--hand);
          color: var(--red);
        }
        .chronicle-footer nav {
          display: flex;
          gap: 18px;
          margin-bottom: 18px;
          font-weight: 600;
        }
        .chronicle-footer nav a {
          text-decoration: none;
          color: var(--ink);
        }
        .fine {
          margin: 0;
          color: var(--muted);
          font-size: 0.85rem;
        }

        /* Toast */
        .toast {
          position: fixed;
          left: 50%;
          bottom: calc(env(safe-area-inset-bottom, 0px) + 22px);
          z-index: 40;
          max-width: 90vw;
          padding: 12px 18px;
          border-radius: 8px;
          background: var(--ink);
          color: var(--bg);
          font-size: 0.9rem;
          opacity: 0;
          pointer-events: none;
          transform: translate(-50%, 16px);
          transition: opacity 0.25s, transform 0.25s;
        }
        .toast.on {
          opacity: 1;
          transform: translate(-50%, 0);
        }

        @media (min-width: 600px) {
          .people,
          .snaps {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      ` }} />

      {/* TOP BAR */}
      <header className="bar">
        <div className="wrap">
          <a className="brand" href="#top" onClick={(e) => goHomeSection(e, null)}>
            {siteData.meta.brand}
          </a>
          <nav>
            <a
              href="#people"
              className={activePage === 'people' ? 'active' : ''}
              onClick={(e) =>
                activePage === 'people' ? openPeoplePage(e) : goHomeSection(e, 'people-preview')
              }
            >
              People
            </a>
            <a href="#photos" onClick={(e) => goHomeSection(e, 'photos')}>
              Stories
            </a>
            <a href="#creative" onClick={(e) => goHomeSection(e, 'creative')}>
              Creative
            </a>
          </nav>
        </div>
      </header>

      {activePage === 'people' ? (
        /* FULL /#people DIRECTORY PAGE */
        <main className="wrap people-page">
          <div style={{ marginBottom: '22px' }}>
            <a href="#top" className="btn small" onClick={(e) => goHomeSection(e, null)}>
              ← Back to magazine
            </a>
          </div>

          <p className="note">batch directory · {sortedPeople.length} members</p>
          <h2>People</h2>
          <p className="sub">Sorted by uploaded photos first, then by roll number.</p>

          <input
            type="search"
            className="search-bar"
            placeholder="Search by name, roll number, or class..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search students"
          />

          {loadingPeople ? (
            <p className="sub">Loading batch directory...</p>
          ) : filteredAllPeople.length === 0 ? (
            <p className="sub">No matching students found for “{searchQuery}”.</p>
          ) : (
            <div className="people">
              {filteredAllPeople.map((person, idx) => (
                <StudentCard
                  key={person.id || `${person.name}-${idx}`}
                  person={person}
                  index={idx}
                  onSelect={triggerToast}
                />
              ))}
            </div>
          )}
        </main>
      ) : (
        /* MAIN MAGAZINE HOME PAGE */
        <main className="wrap">
          {/* HERO */}
          <section className="hero">
            <p className="note">{siteData.meta.note}</p>
            <h1>
              {siteData.meta.headline.map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < siteData.meta.headline.length - 1 && <br />}
                </React.Fragment>
              ))}
            </h1>
            <p className="lede">{siteData.meta.lede}</p>
            <div className="cta">
              <a className="btn solid" href="#people" onClick={openPeoplePage}>
                Meet the batch
              </a>
              <a className="btn" href="#note" onClick={(e) => goHomeSection(e, 'note')}>
                Read our note
              </a>
            </div>

            <div className="wall" aria-label="Last-day messages and Navodayan memories">
              {siteData.wallScribbles.map((item, idx) => (
                <span
                  key={idx}
                  style={{
                    '--c': item.color,
                    '--r': item.rotate,
                    ...(item.size ? { fontSize: item.size } : {}),
                  }}
                >
                  {item.text}
                </span>
              ))}
            </div>
          </section>

          {/* NOTE ON RULED PAPER */}
          <section id="note" className="chronicle-section">
            <h2>A note from us</h2>
            <p className="sub">Written by all of us, on the last page of the year.</p>
            <article className="paper">
              <p className="hand">{siteData.intro.greeting}</p>
              {siteData.intro.paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
              <p className="hand">{siteData.intro.signOff}</p>
            </article>
          </section>

          {/* PEOPLE PREVIEW (SORTED BY PHOTO THEN ROLL NO) */}
          <section id="people-preview" className="chronicle-section">
            <h2>People</h2>
            <p className="sub">The faces behind the batch. Powered live by our directory.</p>

            {loadingPeople ? (
              <p className="sub">Loading batch directory...</p>
            ) : (
              <div className="people">
                {sortedPeople.slice(0, 6).map((person, idx) => (
                  <StudentCard
                    key={person.id || `${person.name}-${idx}`}
                    person={person}
                    index={idx}
                    onSelect={triggerToast}
                  />
                ))}
              </div>
            )}

            <div className="more">
              <a className="btn" href="#people" onClick={openPeoplePage}>
                View all people ({sortedPeople.length})
              </a>
            </div>
          </section>

          {/* STORIES & MOMENTS (POLAROID SNAPS) */}
          <section id="photos" className="chronicle-section">
            <h2>Stories &amp; moments</h2>
            <p className="sub">Campus corners and small moments we want to keep.</p>
            <div className="snaps">
              {siteData.stories.map((story) => (
                <a
                  key={story.id}
                  className="snap"
                  href="#photos"
                  onClick={(e) => {
                    e.preventDefault();
                    triggerToast(`${story.title} — ${story.author}`);
                  }}
                >
                  <div className={`ph ${story.colorClass}`}>
                    {story.image && <img src={story.image} alt={story.title} />}
                  </div>
                  <span>{story.caption}</span>
                </a>
              ))}
            </div>
          </section>

          {/* CREATIVE WORK (NOTEBOOK SHEETS WITH STICKY TABS) */}
          <section id="creative" className="chronicle-section">
            <h2>Creative work</h2>
            <p className="sub">Poems, stories and sketches from the margins of our notebooks.</p>
            <div className="works">
              {siteData.creativeWorks.map((work, idx) => (
                <a
                  key={idx}
                  className="paper work"
                  href="#creative"
                  onClick={(e) => {
                    e.preventDefault();
                    triggerToast(`Full ${work.category.toLowerCase()} coming soon`);
                  }}
                >
                  <span className="tab">{work.category}</span>
                  {work.artColor && <div className={`ph art ${work.artColor}`} />}
                  <h3>{work.title}</h3>
                  <p>{work.excerpt}</p>
                  <p className="hand">by {work.author}</p>
                </a>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* FOOTER */}
      <footer className="chronicle-footer">
        <div className="wrap">
          <p className="bye">{siteData.meta.footerBye}</p>
          <p className="sign">{siteData.meta.footerSign}</p>
          <nav>
            <a href="#people" onClick={openPeoplePage}>
              People
            </a>
            <a href="#photos" onClick={(e) => goHomeSection(e, 'photos')}>
              Stories
            </a>
            <a href="#creative" onClick={(e) => goHomeSection(e, 'creative')}>
              Creative
            </a>
            <a href="#top" onClick={(e) => goHomeSection(e, null)}>
              Top
            </a>
          </nav>
          <p className="fine">{siteData.meta.finePrint}</p>
        </div>
      </footer>

      <div className={`toast ${toastVisible ? 'on' : ''}`} role="status" aria-live="polite">
        {toastMessage}
      </div>
    </div>
  );
}
