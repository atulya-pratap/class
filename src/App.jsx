import React, { useState, useEffect, useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';

// Your actual Supabase Credentials
const supabaseUrl = 'https://pzplzdgdlnjfwbklxbfd.supabase.co';
const supabaseAnonKey = 'sb_publishable_N3pli21Nl9PtLXeFkiuizg_W5Aw5MpM';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const siteData = {
  meta: {
    brand: 'The Chronicle',
    editionTag: 'JNV Varanasi · 2025–26',
    note: 'jnv varanasi · 2025–26, with love',
    lightTitle: 'A year worth remembering.',
    darkHeadline: ['A year', 'worth', 'remem-', 'bering.'],
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

const sortStudents = (list) => {
  return [...list].sort((a, b) => {
    const aHasPhoto = getPhotoUrl(a) ? 1 : 0;
    const bHasPhoto = getPhotoUrl(b) ? 1 : 0;

    // 1. Prefer students who have uploaded a photo
    if (aHasPhoto !== bHasPhoto) {
      return bHasPhoto - aHasPhoto;
    }

    // 2. Then sort alphabetically by name (dictionary order)
    const aName = (a?.name || '').trim();
    const bName = (b?.name || '').trim();
    return aName.localeCompare(bName, undefined, { sensitivity: 'base' });
  });
};

function StudentCard({ person, index, theme, onSelect }) {
  const [imgFailed, setImgFailed] = useState(false);
  const photoUrl = !imgFailed ? getPhotoUrl(person) : null;
  const roll = getRollNumber(person);
  const colorClass = badgeColors[index % badgeColors.length];

  const baseRole = person.role || (person.class ? `Class ${person.class}` : '');
  const subtitle = [baseRole, roll ? `Roll ${roll}` : ''].filter(Boolean).join(' · ') || 'JNV Varanasi';
  const tagline = person.quote || person.favourite_quote || 'batch of 2025–26';

  if (theme === 'light') {
    return (
      <a
        className="ed-person-card"
        href="#people"
        onClick={(e) => {
          e.preventDefault();
          onSelect(`${person.name}${roll ? ` (Roll ${roll})` : ''}: "${tagline}"`);
        }}
      >
        <div className={`ed-portrait ${colorClass}`}>
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={person.name}
              loading="lazy"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <span>{person.name ? person.name.charAt(0).toUpperCase() : '?'}</span>
          )}
        </div>
        <div className="ed-person-meta">
          <small>{subtitle}</small>
          <h3>{person.name}</h3>
          <p>“{tagline}”</p>
        </div>
      </a>
    );
  }

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
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('chronicle_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'light';
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const [peopleData, setPeopleData] = useState([]);
  const [loadingPeople, setLoadingPeople] = useState(true);
  const [activePage, setActivePage] = useState(() =>
    typeof window !== 'undefined' && window.location.hash === '#people' ? 'people' : 'home'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('chronicle_theme', theme);
      document.body.style.backgroundColor = theme === 'light' ? '#F5EFE3' : '#0D1124';
    }
  }, [theme]);

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

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const openPeoplePage = (e) => {
    if (e) e.preventDefault();
    setMenuOpen(false);
    if (window.location.hash !== '#people') {
      window.location.hash = 'people';
    }
    setActivePage('people');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHomeSection = (e, sectionId) => {
    if (e) e.preventDefault();
    setMenuOpen(false);
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
    <div id="top" className="chronicle-app" data-mode={theme}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Caveat:wght@600;700&family=DM+Sans:ital,opsz,wght@0,9..40,400..700;1,9..40,400..600&family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..600&display=swap');

        html {
          scroll-padding-top: 68px;
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
        }

        .chronicle-app *, .chronicle-app *::before, .chronicle-app *::after {
          box-sizing: border-box;
        }

        /* Shared Color Swatches */
        .c1 { --c: #2338D0; }
        .c2 { --c: #E23B3B; }
        .c3 { --c: #16875A; }
        .c4 { --c: #7A3FD1; }
        .c5 { --c: #E58A00; }
        .c6 { --c: #0E8FA6; }

        /* =========================================================
           1. LIGHT THEME — Warm Cream Editorial (claudeWhite1.html)
           ========================================================= */
        .chronicle-app[data-mode="light"] {
          min-height: 100vh;
          background: #F5EFE3;
          color: #16213A;
          font-family: 'DM Sans', system-ui, -apple-system, sans-serif;
          font-size: 16px;
          line-height: 1.6;
        }

        .ed-wrap {
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .ed-header {
          max-width: 1120px;
          margin: 0 auto;
          padding: 18px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          border-bottom: 1px solid rgba(22, 33, 58, 0.14);
        }

        .ed-brand {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
          text-decoration: none;
          color: #16213A;
        }
        .ed-brand-title {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 24px;
          font-weight: 600;
          letter-spacing: -0.01em;
        }
        .ed-brand-sub {
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #4B5468;
          font-weight: 600;
          margin-top: 3px;
        }

        .ed-header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .ed-desktop-nav {
          display: none;
          gap: 24px;
          margin-right: 12px;
          font-size: 14px;
          font-weight: 500;
          color: #4B5468;
        }
        .ed-desktop-nav a {
          text-decoration: none;
          color: inherit;
          transition: color 0.15s;
        }
        .ed-desktop-nav a:hover,
        .ed-desktop-nav a.active {
          color: #16213A;
          font-weight: 600;
        }

        .ed-theme-btn {
          height: 44px;
          padding: 0 16px;
          border-radius: 999px;
          border: 1.5px solid #16213A;
          background: transparent;
          color: #16213A;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
        }
        .ed-theme-btn:hover {
          background: #16213A;
          color: #F5EFE3;
        }

        .ed-menu-btn {
          width: 44px;
          height: 44px;
          border-radius: 999px;
          border: 1.5px solid #16213A;
          background: transparent;
          color: #16213A;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          padding: 0;
          transition: background 0.15s, color 0.15s;
        }
        .ed-menu-btn:hover {
          background: #16213A;
          color: #F5EFE3;
        }

        .ed-drawer {
          background: #16213A;
          color: #F5EFE3;
          padding: 12px 20px 28px;
        }
        .ed-drawer-inner {
          max-width: 1120px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
        }
        .ed-drawer-inner a {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 28px;
          padding: 14px 0;
          border-bottom: 1px solid rgba(245, 239, 227, 0.18);
          color: #F5EFE3;
          text-decoration: none;
        }

        .ed-hero {
          padding: 48px 0 56px;
          border-bottom: 1px solid rgba(22, 33, 58, 0.14);
        }
        .ed-eyebrow {
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #4B5468;
          font-weight: 600;
          margin: 0 0 14px;
        }
        .ed-hero-title {
          font-family: 'Fraunces', Georgia, serif;
          font-size: clamp(2.8rem, 11vw, 5.4rem);
          font-weight: 600;
          line-height: 0.98;
          letter-spacing: -0.025em;
          margin: 0 0 22px;
          max-width: 14ch;
          color: #16213A;
        }
        .ed-hero-lede {
          font-size: 18px;
          line-height: 1.6;
          color: #4B5468;
          max-width: 52ch;
          margin: 0 0 28px;
        }
        .ed-cta {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .ed-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 46px;
          padding: 0 22px;
          border: 1.5px solid #16213A;
          border-radius: 999px;
          background: transparent;
          color: #16213A;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
        }
        .ed-btn:hover {
          background: #16213A;
          color: #F5EFE3;
        }
        .ed-btn-fill {
          background: #16213A;
          color: #F5EFE3;
        }
        .ed-btn-fill:hover {
          background: #2B3A5E;
          border-color: #2B3A5E;
        }

        .ed-section {
          padding: 64px 0;
          border-bottom: 1px solid rgba(22, 33, 58, 0.14);
        }
        .ed-sec-head {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-end;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 32px;
        }
        .ed-sec-title {
          font-family: 'Fraunces', Georgia, serif;
          font-size: clamp(2rem, 7vw, 3.2rem);
          font-weight: 600;
          line-height: 1.05;
          letter-spacing: -0.02em;
          margin: 0;
          color: #16213A;
        }
        .ed-sec-sub {
          margin: 6px 0 0;
          color: #4B5468;
          font-size: 15px;
        }

        /* Editorial Note with Dropcap */
        .ed-note-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        .ed-note-body {
          max-width: 64ch;
          font-size: 17px;
          line-height: 1.75;
          color: #16213A;
        }
        .ed-note-body p {
          margin: 0 0 20px;
        }
        .dropcap::first-letter {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 68px;
          line-height: 0.85;
          float: left;
          padding: 6px 12px 0 0;
          color: #16213A;
          font-weight: 600;
        }
        .ed-signoff {
          font-family: 'Fraunces', Georgia, serif;
          font-style: italic;
          font-size: 20px;
          color: #16213A;
          margin-top: 8px;
        }

        /* Editorial People Grid */
        .ed-people-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 28px 16px;
        }
        .ed-person-card {
          display: block;
          text-decoration: none;
          color: #16213A;
        }
        .ed-portrait {
          aspect-ratio: 4 / 5;
          border-radius: 6px;
          overflow: hidden;
          background: var(--c);
          display: grid;
          place-items: center;
          margin-bottom: 12px;
          border: 1px solid rgba(22, 33, 58, 0.12);
        }
        .ed-portrait img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.35s ease;
        }
        .ed-person-card:hover .ed-portrait img {
          transform: scale(1.03);
        }
        .ed-portrait span {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 44px;
          font-weight: 600;
          color: #F5EFE3;
        }
        .ed-person-meta small {
          display: block;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #4B5468;
          font-weight: 600;
        }
        .ed-person-meta h3 {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 20px;
          font-weight: 600;
          margin: 4px 0;
          line-height: 1.2;
        }
        .ed-person-meta p {
          margin: 0;
          font-size: 14px;
          font-style: italic;
          color: #4B5468;
        }

        /* Editorial Search */
        .ed-search {
          width: 100%;
          max-width: 440px;
          height: 46px;
          padding: 0 18px;
          margin-bottom: 28px;
          border-radius: 999px;
          border: 1.5px solid #16213A;
          background: #FAF9F5;
          color: #16213A;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          outline: none;
        }

        /* Editorial Stories */
        .ed-stories-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px;
        }
        .ed-story-card {
          display: block;
          text-decoration: none;
          color: #16213A;
          background: #FAF9F5;
          border: 1px solid rgba(22, 33, 58, 0.14);
          border-radius: 8px;
          overflow: hidden;
          transition: transform 0.2s ease;
        }
        .ed-story-card:hover {
          transform: translateY(-2px);
        }
        .ed-story-img {
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: #16213A;
        }
        .ed-story-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .ed-story-body {
          padding: 20px;
        }
        .ed-story-body h3 {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 22px;
          margin: 6px 0 8px;
          line-height: 1.2;
        }
        .ed-story-body p {
          margin: 0 0 12px;
          color: #4B5468;
          font-size: 15px;
        }
        .ed-story-author {
          font-size: 12px;
          font-weight: 600;
          color: #16213A;
        }

        /* Editorial Creative Grid */
        .ed-creative-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        .ed-creative-card {
          display: block;
          text-decoration: none;
          color: #16213A;
          background: #FAF9F5;
          border: 1px solid rgba(22, 33, 58, 0.14);
          border-radius: 8px;
          padding: 24px;
          transition: border-color 0.15s;
        }
        .ed-creative-card:hover {
          border-color: #16213A;
        }
        .ed-creative-card h3 {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 24px;
          margin: 8px 0 10px;
        }
        .ed-creative-card p {
          margin: 0 0 14px;
          color: #4B5468;
        }

        /* Editorial Footer */
        .ed-footer {
          background: #16213A;
          color: #F5EFE3;
          padding: 56px 0 44px;
        }
        .ed-footer h2 {
          font-family: 'Fraunces', Georgia, serif;
          font-size: clamp(2rem, 7vw, 3.2rem);
          margin: 0 0 8px;
          font-weight: 600;
        }
        .ed-footer-sign {
          font-family: 'Fraunces', Georgia, serif;
          font-style: italic;
          font-size: 20px;
          color: rgba(245, 239, 227, 0.78);
          margin: 0 0 28px;
        }
        .ed-footer-nav {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 24px;
          font-size: 14px;
          font-weight: 600;
        }
        .ed-footer-nav a {
          color: #F5EFE3;
          text-decoration: none;
        }
        .ed-footer-fine {
          margin: 0;
          font-size: 13px;
          color: rgba(245, 239, 227, 0.65);
        }

        @media (min-width: 720px) {
          .ed-desktop-nav {
            display: flex;
          }
          .ed-menu-btn {
            display: none;
          }
          .ed-note-grid {
            grid-template-columns: 260px 1fr;
            gap: 48px;
          }
          .ed-people-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 36px 24px;
          }
          .ed-stories-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .ed-creative-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* =========================================================
           2. DARK THEME — Scrapbook Yearbook (Previous Version)
           ========================================================= */
        .chronicle-app[data-mode="dark"] {
          --bg: #0D1124;
          --card: #161B36;
          --ink: #EEF0FA;
          --muted: #9AA2C8;
          --blue: #8FA2FF;
          --on-blue: #0D1124;
          --red: #FF7B84;
          --yellow: #FFE14D;
          --rule: rgba(143, 162, 255, 0.2);
          --line: rgba(238, 240, 250, 0.17);
          --sans: "Bricolage Grotesque", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
          --hand: "Caveat", "Segoe Print", "Bradley Hand", cursive;

          min-height: 100vh;
          background: var(--bg);
          color: var(--ink);
          font: 400 1rem/1.6 var(--sans);
          padding-bottom: env(safe-area-inset-bottom, 0px);
        }

        .chronicle-app[data-mode="dark"] .wrap {
          max-width: 720px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .chronicle-app[data-mode="dark"] .bar {
          position: sticky;
          top: 0;
          z-index: 20;
          background: var(--bg);
          border-bottom: 1px solid var(--line);
        }
        .chronicle-app[data-mode="dark"] .bar .wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          height: 60px;
        }
        .chronicle-app[data-mode="dark"] .brand {
          font: 800 1.2rem/1 var(--sans);
          letter-spacing: -0.03em;
          color: var(--blue);
          text-decoration: none;
        }
        .chronicle-app[data-mode="dark"] .bar-right {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .chronicle-app[data-mode="dark"] .bar nav {
          display: flex;
          gap: 14px;
          font-size: 0.85rem;
          font-weight: 500;
        }
        .chronicle-app[data-mode="dark"] .bar nav a {
          text-decoration: none;
          color: var(--muted);
          transition: color 0.15s;
        }
        .chronicle-app[data-mode="dark"] .bar nav a:hover,
        .chronicle-app[data-mode="dark"] .bar nav a.active {
          color: var(--blue);
          font-weight: 700;
        }

        .dk-theme-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          min-height: 36px;
          padding: 0 12px;
          border: 2px solid var(--ink);
          border-radius: 8px;
          background: var(--card);
          color: var(--ink);
          font: 700 0.8rem/1 var(--sans);
          cursor: pointer;
          box-shadow: 2px 2px 0 var(--ink);
        }
        .dk-theme-btn:active {
          transform: translate(1px, 1px);
          box-shadow: 1px 1px 0 var(--ink);
        }

        .chronicle-app[data-mode="dark"] .hero {
          padding: 34px 0 0;
        }
        .chronicle-app[data-mode="dark"] .note {
          display: inline-block;
          margin: 0 0 10px;
          font: 700 1.4rem/1 var(--hand);
          color: var(--red);
          transform: rotate(-3deg);
        }
        .chronicle-app[data-mode="dark"] h1 {
          margin: 0 0 18px;
          font: 800 clamp(3.4rem, 17vw, 4.8rem)/0.9 var(--sans);
          letter-spacing: -0.05em;
          color: var(--blue);
        }
        .chronicle-app[data-mode="dark"] .lede {
          margin: 0 0 24px;
          max-width: 32ch;
          font-size: 1.15rem;
          line-height: 1.5;
        }
        .chronicle-app[data-mode="dark"] .cta {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
        }
        .chronicle-app[data-mode="dark"] .btn {
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
        .chronicle-app[data-mode="dark"] .btn:active {
          transform: translate(2px, 2px);
          box-shadow: 1px 1px 0 var(--ink);
        }
        .chronicle-app[data-mode="dark"] .btn.solid {
          background: var(--blue);
          color: var(--on-blue);
        }
        .chronicle-app[data-mode="dark"] .btn.small {
          min-height: 40px;
          padding: 0 16px;
          font-size: 0.88rem;
        }

        .chronicle-app[data-mode="dark"] .wall {
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
        .chronicle-app[data-mode="dark"] .wall span {
          font: 700 1.75rem/1.15 var(--hand);
          color: var(--c);
          transform: rotate(var(--r));
          display: inline-block;
        }

        .chronicle-app[data-mode="dark"] .chronicle-section {
          padding-top: 68px;
        }
        .chronicle-app[data-mode="dark"] .people-page {
          padding-top: 32px;
        }
        .chronicle-app[data-mode="dark"] h2 {
          margin: 0 0 6px;
          font: 800 clamp(2.3rem, 11vw, 3.4rem)/1 var(--sans);
          letter-spacing: -0.045em;
          color: var(--blue);
        }
        .chronicle-app[data-mode="dark"] .sub {
          margin: 0 0 28px;
          color: var(--muted);
        }
        .chronicle-app[data-mode="dark"] .more {
          display: flex;
          justify-content: center;
          margin-top: 36px;
        }

        .chronicle-app[data-mode="dark"] .search-bar {
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
        .chronicle-app[data-mode="dark"] .search-bar::placeholder {
          color: var(--muted);
        }

        .chronicle-app[data-mode="dark"] .ph {
          background: repeating-linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.13) 0 9px,
              transparent 9px 18px
            ),
            var(--c);
          overflow: hidden;
        }

        .chronicle-app[data-mode="dark"] .paper {
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
        .chronicle-app[data-mode="dark"] .paper::before {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 38px;
          width: 2px;
          background: var(--red);
          opacity: 0.55;
        }
        .chronicle-app[data-mode="dark"] .paper p {
          margin: 0 0 30px;
        }
        .chronicle-app[data-mode="dark"] .paper p:last-child {
          margin-bottom: 0;
        }
        .chronicle-app[data-mode="dark"] .hand {
          font: 700 1.7rem/30px var(--hand);
          color: var(--blue);
        }

        .chronicle-app[data-mode="dark"] .people {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px 14px;
        }
        .chronicle-app[data-mode="dark"] .id {
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
        .chronicle-app[data-mode="dark"] .id:nth-child(odd) {
          transform: rotate(-1deg);
        }
        .chronicle-app[data-mode="dark"] .id:nth-child(even) {
          transform: rotate(1deg);
        }
        .chronicle-app[data-mode="dark"] .id:hover {
          transform: rotate(0deg) translateY(-2px);
        }
        .chronicle-app[data-mode="dark"] .slot {
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
        .chronicle-app[data-mode="dark"] .id .ph {
          display: grid;
          place-items: center;
          aspect-ratio: 1;
          border-radius: 4px;
        }
        .chronicle-app[data-mode="dark"] .id .ph img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .chronicle-app[data-mode="dark"] .id .ph b {
          font: 800 3.4rem/1 var(--sans);
          color: rgba(255, 255, 255, 0.92);
        }
        .chronicle-app[data-mode="dark"] .id strong {
          display: block;
          margin-top: 10px;
          font-size: 1rem;
          line-height: 1.2;
          font-weight: 700;
        }
        .chronicle-app[data-mode="dark"] .id small {
          display: block;
          color: var(--muted);
          font-size: 0.8rem;
          margin-top: 2px;
        }
        .chronicle-app[data-mode="dark"] .id em {
          display: block;
          margin-top: 4px;
          font: 700 1.25rem/1 var(--hand);
          font-style: normal;
          color: var(--red);
        }

        .chronicle-app[data-mode="dark"] .snaps {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px 16px;
          padding-top: 12px;
        }
        .chronicle-app[data-mode="dark"] .snap {
          position: relative;
          display: block;
          padding: 8px 8px 36px;
          background: #ffffff;
          color: #2B2F55;
          text-decoration: none;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2), 0 12px 18px -12px rgba(0, 0, 0, 0.4);
          transition: transform 0.2s ease;
        }
        .chronicle-app[data-mode="dark"] .snap::before {
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
        .chronicle-app[data-mode="dark"] .snap:nth-child(odd) {
          transform: rotate(-1.6deg);
        }
        .chronicle-app[data-mode="dark"] .snap:nth-child(even) {
          transform: rotate(1.4deg);
        }
        .chronicle-app[data-mode="dark"] .snap:hover {
          transform: rotate(0deg) translateY(-2px);
        }
        .chronicle-app[data-mode="dark"] .snap:first-child {
          grid-column: span 2;
        }
        .chronicle-app[data-mode="dark"] .snap .ph {
          aspect-ratio: 4 / 5;
        }
        .chronicle-app[data-mode="dark"] .snap:first-child .ph {
          aspect-ratio: 16 / 10;
        }
        .chronicle-app[data-mode="dark"] .snap .ph img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .chronicle-app[data-mode="dark"] .snap span {
          position: absolute;
          left: 8px;
          right: 8px;
          bottom: 7px;
          text-align: center;
          font: 700 1.2rem/1 var(--hand);
        }

        .chronicle-app[data-mode="dark"] .works {
          display: grid;
          gap: 44px;
        }
        .chronicle-app[data-mode="dark"] .work {
          display: block;
          color: inherit;
          text-decoration: none;
        }
        .chronicle-app[data-mode="dark"] .tab {
          position: absolute;
          top: -13px;
          left: 56px;
          padding: 7px 12px 6px;
          background: var(--yellow);
          color: #141A3C;
          font: 700 0.8rem/1 var(--sans);
          transform: rotate(-2deg);
        }
        .chronicle-app[data-mode="dark"] .work h3 {
          margin: 0;
          font: 800 1.5rem/30px var(--sans);
          letter-spacing: -0.03em;
        }
        .chronicle-app[data-mode="dark"] .art {
          height: 150px;
          margin: 0 0 30px;
          border-radius: 4px;
        }

        .chronicle-app[data-mode="dark"] .chronicle-footer {
          margin-top: 84px;
          padding: 40px 0 44px;
          border-top: 2px solid var(--blue);
        }
        .chronicle-app[data-mode="dark"] .bye {
          margin: 0 0 4px;
          font: 800 clamp(2.3rem, 11vw, 3.4rem)/0.95 var(--sans);
          letter-spacing: -0.045em;
          color: var(--blue);
        }
        .chronicle-app[data-mode="dark"] .sign {
          margin: 0 0 22px;
          font: 700 1.7rem/1 var(--hand);
          color: var(--red);
        }
        .chronicle-app[data-mode="dark"] .chronicle-footer nav {
          display: flex;
          gap: 18px;
          margin-bottom: 18px;
          font-weight: 600;
        }
        .chronicle-app[data-mode="dark"] .chronicle-footer nav a {
          text-decoration: none;
          color: var(--ink);
        }
        .chronicle-app[data-mode="dark"] .fine {
          margin: 0;
          color: var(--muted);
          font-size: 0.85rem;
        }

        @media (min-width: 600px) {
          .chronicle-app[data-mode="dark"] .people,
          .chronicle-app[data-mode="dark"] .snaps {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* Shared Toast */
        .toast {
          position: fixed;
          left: 50%;
          bottom: calc(env(safe-area-inset-bottom, 0px) + 22px);
          z-index: 40;
          max-width: 90vw;
          padding: 12px 18px;
          border-radius: 8px;
          background: #16213A;
          color: #F5EFE3;
          font-size: 0.9rem;
          opacity: 0;
          pointer-events: none;
          transform: translate(-50%, 16px);
          transition: opacity 0.25s, transform 0.25s;
        }
        .chronicle-app[data-mode="dark"] .toast {
          background: #EEF0FA;
          color: #0D1124;
        }
        .toast.on {
          opacity: 1;
          transform: translate(-50%, 0);
        }
      ` }} />

      {theme === 'light' ? (
        /* =========================================================
           LIGHT MODE VIEW (Warm Cream Editorial — claudeWhite1.html)
           ========================================================= */
        <>
          <header className="ed-header">
            <a className="ed-brand" href="#top" onClick={(e) => goHomeSection(e, null)}>
              <span className="ed-brand-title">{siteData.meta.brand}</span>
              <span className="ed-brand-sub">{siteData.meta.editionTag}</span>
            </a>

            <div className="ed-header-actions">
              <nav className="ed-desktop-nav" aria-label="Main">
                <a href="#note" onClick={(e) => goHomeSection(e, 'note')}>Our note</a>
                <a
                  href="#people"
                  className={activePage === 'people' ? 'active' : ''}
                  onClick={(e) =>
                    activePage === 'people' ? openPeoplePage(e) : goHomeSection(e, 'people-preview')
                  }
                >
                  People
                </a>
                <a href="#photos" onClick={(e) => goHomeSection(e, 'photos')}>Stories</a>
                <a href="#creative" onClick={(e) => goHomeSection(e, 'creative')}>Creative</a>
              </nav>

              <button
                type="button"
                className="ed-theme-btn"
                onClick={toggleTheme}
                aria-label="Switch to dark theme"
              >
                <span aria-hidden="true">☾</span> Dark
              </button>

              <button
                type="button"
                className="ed-menu-btn"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                onClick={() => setMenuOpen((prev) => !prev)}
              >
                {menuOpen ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M4 8h16M4 16h16" />
                  </svg>
                )}
              </button>
            </div>
          </header>

          {menuOpen && (
            <nav className="ed-drawer" aria-label="Mobile Navigation">
              <div className="ed-drawer-inner">
                <a href="#note" onClick={(e) => goHomeSection(e, 'note')}>Our note</a>
                <a href="#people" onClick={openPeoplePage}>People</a>
                <a href="#photos" onClick={(e) => goHomeSection(e, 'photos')}>Stories</a>
                <a href="#creative" onClick={(e) => goHomeSection(e, 'creative')}>Creative</a>
              </div>
            </nav>
          )}

          {activePage === 'people' ? (
            <main className="ed-wrap" style={{ paddingTop: '36px', paddingBottom: '72px' }}>
              <div style={{ marginBottom: '24px' }}>
                <a href="#top" className="ed-btn" onClick={(e) => goHomeSection(e, null)}>
                  ← Back to magazine
                </a>
              </div>

              <p className="ed-eyebrow">Batch Directory · {sortedPeople.length} Members</p>
              <h2 className="ed-sec-title" style={{ marginBottom: '8px' }}>People</h2>
              <p className="ed-sec-sub" style={{ marginBottom: '24px' }}>
                Sorted by uploaded photos first, then alphabetically by name.
              </p>

              <input
                type="search"
                className="ed-search"
                placeholder="Search by name, roll number, or class..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search students"
              />

              {loadingPeople ? (
                <p className="ed-sec-sub">Loading batch directory...</p>
              ) : filteredAllPeople.length === 0 ? (
                <p className="ed-sec-sub">No matching students found for “{searchQuery}”.</p>
              ) : (
                <div className="ed-people-grid">
                  {filteredAllPeople.map((person, idx) => (
                    <StudentCard
                      key={person.id || `${person.name}-${idx}`}
                      person={person}
                      index={idx}
                      theme="light"
                      onSelect={triggerToast}
                    />
                  ))}
                </div>
              )}
            </main>
          ) : (
            <main className="ed-wrap">
              {/* HERO */}
              <section className="ed-hero">
                <p className="ed-eyebrow">The Farewell Issue · {siteData.meta.editionTag}</p>
                <h1 className="ed-hero-title">{siteData.meta.lightTitle}</h1>
                <p className="ed-hero-lede">{siteData.meta.lede}</p>
                <div className="ed-cta">
                  <a className="ed-btn ed-btn-fill" href="#people" onClick={openPeoplePage}>
                    Meet the batch
                  </a>
                  <a className="ed-btn" href="#note" onClick={(e) => goHomeSection(e, 'note')}>
                    Read our note
                  </a>
                </div>
              </section>

              {/* EDITORIAL NOTE WITH DROPCAP */}
              <section id="note" className="ed-section">
                <div className="ed-note-grid">
                  <div>
                    <p className="ed-eyebrow">01 / Introduction</p>
                    <h2 className="ed-sec-title">A note from us</h2>
                    <p className="ed-sec-sub">Written by all of us, on the last page of the year.</p>
                  </div>
                  <div className="ed-note-body">
                    {siteData.intro.paragraphs.map((para, idx) => (
                      <p key={idx} className={idx === 0 ? 'dropcap' : ''}>
                        {para}
                      </p>
                    ))}
                    <p className="ed-signoff">— {siteData.intro.signOff}</p>
                  </div>
                </div>
              </section>

              {/* PEOPLE PREVIEW */}
              <section id="people-preview" className="ed-section">
                <div className="ed-sec-head">
                  <div>
                    <p className="ed-eyebrow">02 / The Batch</p>
                    <h2 className="ed-sec-title">People</h2>
                    <p className="ed-sec-sub">The faces behind the batch. Powered live by our directory.</p>
                  </div>
                  <a className="ed-btn" href="#people" onClick={openPeoplePage}>
                    View all people ({sortedPeople.length})
                  </a>
                </div>

                {loadingPeople ? (
                  <p className="ed-sec-sub">Loading batch directory...</p>
                ) : (
                  <div className="ed-people-grid">
                    {sortedPeople.slice(0, 6).map((person, idx) => (
                      <StudentCard
                        key={person.id || `${person.name}-${idx}`}
                        person={person}
                        index={idx}
                        theme="light"
                        onSelect={triggerToast}
                      />
                    ))}
                  </div>
                )}
              </section>

              {/* STORIES */}
              <section id="photos" className="ed-section">
                <div className="ed-sec-head">
                  <div>
                    <p className="ed-eyebrow">03 / Campus Chronicles</p>
                    <h2 className="ed-sec-title">Stories &amp; moments</h2>
                    <p className="ed-sec-sub">Campus corners and small moments we want to keep.</p>
                  </div>
                </div>

                <div className="ed-stories-grid">
                  {siteData.stories.map((story) => (
                    <a
                      key={story.id}
                      className="ed-story-card"
                      href="#photos"
                      onClick={(e) => {
                        e.preventDefault();
                        triggerToast(`${story.title} — ${story.author}`);
                      }}
                    >
                      <div className="ed-story-img">
                        <img src={story.image} alt={story.title} loading="lazy" />
                      </div>
                      <div className="ed-story-body">
                        <span className="ed-eyebrow" style={{ marginBottom: 0 }}>{story.category}</span>
                        <h3>{story.title}</h3>
                        <p>{story.excerpt}</p>
                        <span className="ed-story-author">By {story.author}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </section>

              {/* CREATIVE WORK */}
              <section id="creative" className="ed-section" style={{ borderBottom: 'none' }}>
                <div className="ed-sec-head">
                  <div>
                    <p className="ed-eyebrow">04 / Margins</p>
                    <h2 className="ed-sec-title">Creative work</h2>
                    <p className="ed-sec-sub">Poems, stories and sketches from the margins of our notebooks.</p>
                  </div>
                </div>

                <div className="ed-creative-grid">
                  {siteData.creativeWorks.map((work, idx) => (
                    <a
                      key={idx}
                      className="ed-creative-card"
                      href="#creative"
                      onClick={(e) => {
                        e.preventDefault();
                        triggerToast(`Full ${work.category.toLowerCase()} coming soon`);
                      }}
                    >
                      <span className="ed-eyebrow" style={{ marginBottom: 0 }}>{work.category}</span>
                      <h3>{work.title}</h3>
                      <p>{work.excerpt}</p>
                      <span className="ed-story-author">By {work.author}</span>
                    </a>
                  ))}
                </div>
              </section>
            </main>
          )}

          <footer className="ed-footer">
            <div className="ed-wrap">
              <h2>{siteData.meta.footerBye}</h2>
              <p className="ed-footer-sign">{siteData.meta.footerSign}</p>
              <nav className="ed-footer-nav">
                <a href="#people" onClick={openPeoplePage}>People</a>
                <a href="#photos" onClick={(e) => goHomeSection(e, 'photos')}>Stories</a>
                <a href="#creative" onClick={(e) => goHomeSection(e, 'creative')}>Creative</a>
                <a href="#top" onClick={(e) => goHomeSection(e, null)}>Top</a>
              </nav>
              <p className="ed-footer-fine">{siteData.meta.finePrint}</p>
            </div>
          </footer>
        </>
      ) : (
        /* =========================================================
           DARK MODE VIEW (Scrapbook Yearbook — Previous Version)
           ========================================================= */
        <>
          <header className="bar">
            <div className="wrap">
              <a className="brand" href="#top" onClick={(e) => goHomeSection(e, null)}>
                {siteData.meta.brand}
              </a>
              <div className="bar-right">
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
                <button
                  type="button"
                  className="dk-theme-btn"
                  onClick={toggleTheme}
                  aria-label="Switch to light theme"
                >
                  <span aria-hidden="true">☀</span> Light
                </button>
              </div>
            </div>
          </header>

          {activePage === 'people' ? (
            <main className="wrap people-page">
              <div style={{ marginBottom: '22px' }}>
                <a href="#top" className="btn small" onClick={(e) => goHomeSection(e, null)}>
                  ← Back to magazine
                </a>
              </div>

              <p className="note">batch directory · {sortedPeople.length} members</p>
              <h2>People</h2>
              <p className="sub">Sorted by uploaded photos first, then alphabetically by name.</p>

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
                      theme="dark"
                      onSelect={triggerToast}
                    />
                  ))}
                </div>
              )}
            </main>
          ) : (
            <main className="wrap">
              {/* HERO */}
              <section className="hero">
                <p className="note">{siteData.meta.note}</p>
                <h1>
                  {siteData.meta.darkHeadline.map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < siteData.meta.darkHeadline.length - 1 && <br />}
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

              {/* PEOPLE PREVIEW */}
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
                        theme="dark"
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

              {/* STORIES & MOMENTS */}
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

              {/* CREATIVE WORK */}
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

          <footer className="chronicle-footer">
            <div className="wrap">
              <p className="bye">{siteData.meta.footerBye}</p>
              <p className="sign">{siteData.meta.footerSign}</p>
              <nav>
                <a href="#people" onClick={openPeoplePage}>People</a>
                <a href="#photos" onClick={(e) => goHomeSection(e, 'photos')}>Stories</a>
                <a href="#creative" onClick={(e) => goHomeSection(e, 'creative')}>Creative</a>
                <a href="#top" onClick={(e) => goHomeSection(e, null)}>Top</a>
              </nav>
              <p className="fine">{siteData.meta.finePrint}</p>
            </div>
          </footer>
        </>
      )}

      <div className={`toast ${toastVisible ? 'on' : ''}`} role="status" aria-live="polite">
        {toastMessage}
      </div>
    </div>
  );
}
