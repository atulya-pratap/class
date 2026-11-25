import React, { useState, useEffect, useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';

// Your actual Supabase Credentials
const supabaseUrl = 'https://pzplzdgdlnjfwbklxbfd.supabase.co';
const supabaseAnonKey = 'sb_publishable_N3pli21Nl9PtLXeFkiuizg_W5Aw5MpM';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const siteData = {
  meta: {
    brand: 'Class XII',
    subBrand: 'The Farewell Issue · JNV Varanasi',
    heroTitle: 'A year worth remembering.',
    lede: 'A magazine of the people, places, and quiet spaces between the bells that made our school days ours.',
    footerBye: 'The year ends.',
    footerSign: "The memories don't.",
    finePrint: 'Made with love by JNV Varanasi · Edition 2025–26.',
  },
  intro: {
    paragraphs: [
      "This wasn't just another academic year. It was mornings that started too early, classrooms that got too loud, games that lasted longer than planned, and a hundred small moments nobody thought they'd remember.",
      'Twelve years of tiffin boxes, borrowed notebooks, and corridor laughter are turning into memories, and we didn’t want them to fade into a group chat that slowly goes quiet.',
      'So we made this: a small magazine of us. Our faces, our stories, our campus, and everything we created between the bells.',
    ],
    signOff: 'JNV Varanasi, with love',
  },
  peopleFallback: [
    { id: 1, name: 'Aarav Sharma', role: 'School Captain', roll_no: 1, quote: 'Lead by example.', image_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop' },
    { id: 2, name: 'Dr. K. Singh', role: 'Principal', roll_no: 2, quote: 'Excellence is a habit.', image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop' },
    { id: 3, name: 'Neha Verma', role: 'Sports Secretary', roll_no: 3, quote: 'Leave it on the field.', image_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop' },
    { id: 4, name: 'Vikram R.', role: 'Cultural Sec', roll_no: 4, quote: 'Art speaks.', image_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop' },
  ],
  stories: [
    {
      id: 1,
      title: 'The Quiet Before the Bell',
      category: 'Campus Life',
      author: 'Ananya S., Class XI',
      excerpt: 'At 5:30 AM, before the PT whistle blows, the campus belongs to the fog and the early risers.',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop',
    },
    {
      id: 2,
      title: 'Mess Duty Memoirs',
      category: 'Hostel Stories',
      author: 'Rahul M., Class XII',
      excerpt: 'Serving hundreds of students teaches you more about management than any textbook ever could.',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop',
    },
    {
      id: 3,
      title: 'Beyond the Whiteboard',
      category: 'Academics',
      author: 'Priya V., Class X',
      excerpt: 'When the syllabus ends, the real learning begins. A look at our late-night study circles.',
      image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop',
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
    },
    {
      category: 'Essay',
      title: 'On Sharing a Room with Fifty People',
      excerpt: '“You can live with five hundred people and somehow still lose your own toothpaste.”',
      author: 'JNV Student',
    },
  ],
};

const avatarShades = ['#2B3A5E', '#7A3E3E', '#2F5A4A', '#5C4578', '#8C5B27', '#265E6E'];

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

function PortraitCard({ person, index, onSelect }) {
  const [imgFailed, setImgFailed] = useState(false);
  const photoUrl = !imgFailed ? getPhotoUrl(person) : null;
  const roll = getRollNumber(person);
  const bgShade = avatarShades[index % avatarShades.length];

  const baseRole = person.role || (person.class ? `Class ${person.class}` : '');
  const subtitle = [baseRole, roll ? `Roll ${roll}` : ''].filter(Boolean).join(' · ') || 'JNV Varanasi';
  const tagline = person.quote || person.favourite_quote || 'Batch of 2025–26';

  return (
    <a
      className="person-card"
      href="#people"
      onClick={(e) => {
        e.preventDefault();
        onSelect(`${person.name}${roll ? ` (Roll ${roll})` : ''}: "${tagline}"`);
      }}
    >
      <div className="portrait-box" style={{ backgroundColor: bgShade }}>
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
      <div className="person-meta">
        <small>{subtitle}</small>
        <h3>{person.name}</h3>
        <p>“{tagline}”</p>
      </div>
    </a>
  );
}

export default function LightApp() {
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
    <div id="top" className="editorial-app">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400..700;1,9..40,400..600&family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..600&display=swap');

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #F5EFE3;
          color: #16213A;
          font-family: 'DM Sans', system-ui, -apple-system, sans-serif;
          font-size: 16px;
          line-height: 1.6;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        a:focus-visible,
        button:focus-visible {
          outline: 2px solid #16213A;
          outline-offset: 3px;
        }

        .editorial-app {
          min-height: 100vh;
          background: #F5EFE3;
          color: #16213A;
        }

        .container {
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Masthead */
        .masthead {
          max-width: 1120px;
          margin: 0 auto;
          padding: 18px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .masthead-brand {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
        }

        .masthead-title {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 24px;
          font-weight: 600;
          letter-spacing: -0.01em;
        }

        .masthead-sub {
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #4B5468;
          font-weight: 600;
          margin-top: 3px;
        }

        .masthead-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .desktop-nav {
          display: none;
          gap: 24px;
          margin-right: 12px;
          font-size: 15px;
          font-weight: 500;
          color: #4B5468;
        }

        .desktop-nav a:hover,
        .desktop-nav a.active {
          color: #16213A;
          font-weight: 600;
        }

        .dark-link {
          height: 44px;
          padding: 0 16px;
          border-radius: 999px;
          border: 1.5px solid #16213A;
          background: transparent;
          color: #16213A;
          font-size: 13px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: background 0.15s, color 0.15s;
        }

        .dark-link:hover {
          background: #16213A;
          color: #F5EFE3;
        }

        .menu-circle {
          width: 48px;
          height: 48px;
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

        .menu-circle:hover {
          background: #16213A;
          color: #F5EFE3;
        }

        /* Mobile Drawer */
        .mobile-drawer {
          background: #16213A;
          color: #F5EFE3;
          padding: 12px 20px 28px;
        }

        .mobile-drawer-inner {
          max-width: 1120px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
        }

        .mobile-drawer-inner a {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 30px;
          padding: 14px 0;
          border-bottom: 1px solid rgba(245, 239, 227, 0.18);
          color: #F5EFE3;
        }

        /* Buttons */
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 0 24px;
          border: 1.5px solid #16213A;
          border-radius: 999px;
          background: transparent;
          color: #16213A;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
        }

        .btn:hover {
          background: #16213A;
          color: #F5EFE3;
        }

        .btn-fill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 0 24px;
          border: 1.5px solid #16213A;
          border-radius: 999px;
          background: #16213A;
          color: #F5EFE3;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.15s;
        }

        .btn-fill:hover {
          background: #2B3A5E;
          border-color: #2B3A5E;
        }

        /* Hero */
        .hero-sec {
          padding: 40px 0 64px;
          border-bottom: 1px solid rgba(22, 33, 58, 0.15);
        }

        .kicker {
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #4B5468;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .hero-title {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 48px;
          font-weight: 600;
          line-height: 0.98;
          letter-spacing: -0.025em;
          margin: 0 0 22px;
          max-width: 13ch;
        }

        .hero-lede {
          font-size: 18px;
          line-height: 1.6;
          color: #4B5468;
          max-width: 48ch;
          margin: 0 0 30px;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        /* Sections */
        .ed-sec {
          padding: 64px 0;
          border-bottom: 1px solid rgba(22, 33, 58, 0.15);
        }

        .sec-title {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 36px;
          font-weight: 600;
          line-height: 1.06;
          letter-spacing: -0.02em;
          margin: 0 0 8px;
        }

        .sec-sub {
          color: #4B5468;
          margin: 0 0 32px;
          font-size: 16px;
        }

        /* Dropcap Letter */
        .letter-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }

        .letter-copy {
          max-width: 64ch;
          font-size: 17px;
          line-height: 1.75;
        }

        .letter-copy p {
          margin: 0 0 20px;
        }

        .dropcap::first-letter {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 68px;
          line-height: 0.85;
          float: left;
          padding: 6px 10px 0 0;
          color: #16213A;
        }

        .letter-sign {
          font-family: 'Fraunces', Georgia, serif;
          font-style: italic;
          font-size: 20px;
          margin-top: 8px;
        }

        /* People Grid */
        .people-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 28px 16px;
        }

        .person-card {
          display: block;
        }

        .portrait-box {
          aspect-ratio: 4 / 5;
          border-radius: 6px;
          overflow: hidden;
          display: grid;
          place-items: center;
          margin-bottom: 12px;
        }

        .portrait-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.35s ease;
        }

        .person-card:hover .portrait-box img {
          transform: scale(1.03);
        }

        .portrait-box span {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 46px;
          font-weight: 600;
          color: #F5EFE3;
        }

        .person-meta small {
          display: block;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #4B5468;
          font-weight: 600;
        }

        .person-meta h3 {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 20px;
          font-weight: 600;
          margin: 4px 0;
          line-height: 1.2;
        }

        .person-meta p {
          margin: 0;
          font-size: 14px;
          font-style: italic;
          color: #4B5468;
        }

        /* Search bar on /#people */
        .search-input {
          width: 100%;
          max-width: 440px;
          height: 48px;
          padding: 0 20px;
          margin-bottom: 32px;
          border-radius: 999px;
          border: 1.5px solid #16213A;
          background: #FAF9F5;
          color: #16213A;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          outline: none;
        }

        /* Stories Grid */
        .stories-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px;
        }

        .story-card {
          display: block;
          background: #FAF9F5;
          border: 1px solid rgba(22, 33, 58, 0.14);
          border-radius: 8px;
          overflow: hidden;
        }

        .story-thumb {
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: #16213A;
        }

        .story-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .story-content {
          padding: 20px;
        }

        .story-content h3 {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 22px;
          margin: 6px 0 8px;
          line-height: 1.2;
        }

        .story-content p {
          margin: 0 0 12px;
          color: #4B5468;
          font-size: 15px;
        }

        .story-by {
          font-size: 12px;
          font-weight: 600;
        }

        /* Creative Grid */
        .creative-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }

        .creative-card {
          display: block;
          background: #FAF9F5;
          border: 1px solid rgba(22, 33, 58, 0.14);
          border-radius: 8px;
          padding: 24px;
        }

        .creative-card h3 {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 24px;
          margin: 6px 0 10px;
        }

        .creative-card p {
          margin: 0 0 14px;
          color: #4B5468;
        }

        /* Footer */
        .ed-footer {
          background: #16213A;
          color: #F5EFE3;
          padding: 56px 0 44px;
        }

        .ed-footer h2 {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 36px;
          font-weight: 600;
          margin: 0 0 6px;
        }

        .ed-footer-sub {
          font-family: 'Fraunces', Georgia, serif;
          font-style: italic;
          font-size: 20px;
          color: rgba(245, 239, 227, 0.75);
          margin: 0 0 28px;
        }

        .ed-footer-nav {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 24px;
          font-weight: 600;
          font-size: 14px;
        }

        .ed-footer-fine {
          margin: 0;
          font-size: 13px;
          color: rgba(245, 239, 227, 0.65);
        }

        /* Toast */
        .toast {
          position: fixed;
          left: 50%;
          bottom: 22px;
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

        .toast.on {
          opacity: 1;
          transform: translate(-50%, 0);
        }

        @media (min-width: 720px) {
          .hero-title {
            font-size: 92px !important;
          }
          .sec-title {
            font-size: 52px !important;
          }
          .desktop-nav {
            display: flex;
          }
          .menu-circle {
            display: none;
          }
          .letter-layout {
            grid-template-columns: 280px 1fr;
            gap: 48px;
          }
          .people-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 36px 24px;
          }
          .stories-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .creative-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      ` }} />

      {/* MASTHEAD */}
      <header className="masthead">
        <a className="masthead-brand" href="#top" onClick={(e) => goHomeSection(e, null)}>
          <span className="masthead-title">{siteData.meta.brand}</span>
          <span className="masthead-sub">{siteData.meta.subBrand}</span>
        </a>

        <div className="masthead-actions">
          <nav className="desktop-nav" aria-label="Main">
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

          <a href="../" className="dark-link" aria-label="Switch to Dark Version">
            ☾ Dark
          </a>

          <button
            type="button"
            className="menu-circle"
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

      {/* MOBILE DRAWER */}
      {menuOpen && (
        <nav aria-label="Main" className="mobile-drawer">
          <div className="mobile-drawer-inner">
            <a href="#note" onClick={(e) => goHomeSection(e, 'note')}>Our note</a>
            <a href="#people" onClick={openPeoplePage}>People</a>
            <a href="#photos" onClick={(e) => goHomeSection(e, 'photos')}>Stories</a>
            <a href="#creative" onClick={(e) => goHomeSection(e, 'creative')}>Creative</a>
            <a href="../">Dark edition</a>
          </div>
        </nav>
      )}

      {activePage === 'people' ? (
        /* FULL /#people DIRECTORY PAGE */
        <main className="container" style={{ paddingTop: '36px', paddingBottom: '72px' }}>
          <div style={{ marginBottom: '28px' }}>
            <a href="#top" className="btn" onClick={(e) => goHomeSection(e, null)}>
              ← Back to magazine
            </a>
          </div>

          <div className="kicker">Batch Directory · {sortedPeople.length} Members</div>
          <h2 className="sec-title">People</h2>
          <p className="sec-sub">Sorted by uploaded photos first, then alphabetically by name.</p>

          <input
            type="search"
            className="search-input"
            placeholder="Search by name, roll number, or class..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search students"
          />

          {loadingPeople ? (
            <p className="sec-sub">Loading batch directory...</p>
          ) : filteredAllPeople.length === 0 ? (
            <p className="sec-sub">No matching students found for “{searchQuery}”.</p>
          ) : (
            <div className="people-grid">
              {filteredAllPeople.map((person, idx) => (
                <PortraitCard
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
        /* EDITORIAL HOME PAGE */
        <main className="container">
          {/* HERO */}
          <section className="hero-sec">
            <div className="kicker">JNV Varanasi · Edition 2025–26</div>
            <h1 className="hero-title">{siteData.meta.heroTitle}</h1>
            <p className="hero-lede">{siteData.meta.lede}</p>
            <div className="hero-actions">
              <a className="btn-fill" href="#people" onClick={openPeoplePage}>
                Meet the batch
              </a>
              <a className="btn" href="#note" onClick={(e) => goHomeSection(e, 'note')}>
                Read our note
              </a>
            </div>
          </section>

          {/* NOTE WITH DROPCAP */}
          <section id="note" className="ed-sec">
            <div className="letter-layout">
              <div>
                <div className="kicker">01 / Introduction</div>
                <h2 className="sec-title">A note from us</h2>
                <p className="sec-sub">Written by all of us, on the last page of the year.</p>
              </div>
              <div className="letter-copy">
                {siteData.intro.paragraphs.map((para, idx) => (
                  <p key={idx} className={idx === 0 ? 'dropcap' : ''}>
                    {para}
                  </p>
                ))}
                <p className="letter-sign">— {siteData.intro.signOff}</p>
              </div>
            </div>
          </section>

          {/* PEOPLE PREVIEW */}
          <section id="people-preview" className="ed-sec">
            <div className="kicker">02 / The Batch</div>
            <h2 className="sec-title">People</h2>
            <p className="sec-sub">The faces behind the batch. Powered live by our directory.</p>

            {loadingPeople ? (
              <p className="sec-sub">Loading batch directory...</p>
            ) : (
              <div className="people-grid">
                {sortedPeople.slice(0, 6).map((person, idx) => (
                  <PortraitCard
                    key={person.id || `${person.name}-${idx}`}
                    person={person}
                    index={idx}
                    onSelect={triggerToast}
                  />
                ))}
              </div>
            )}

            <div style={{ marginTop: '36px' }}>
              <a className="btn" href="#people" onClick={openPeoplePage}>
                View all people ({sortedPeople.length})
              </a>
            </div>
          </section>

          {/* STORIES */}
          <section id="photos" className="ed-sec">
            <div className="kicker">03 / Campus Chronicles</div>
            <h2 className="sec-title">Stories &amp; moments</h2>
            <p className="sec-sub">Campus corners and small moments we want to keep.</p>

            <div className="stories-grid">
              {siteData.stories.map((story) => (
                <a
                  key={story.id}
                  className="story-card"
                  href="#photos"
                  onClick={(e) => {
                    e.preventDefault();
                    triggerToast(`${story.title} — ${story.author}`);
                  }}
                >
                  <div className="story-thumb">
                    <img src={story.image} alt={story.title} loading="lazy" />
                  </div>
                  <div className="story-content">
                    <div className="kicker" style={{ marginBottom: 0 }}>{story.category}</div>
                    <h3>{story.title}</h3>
                    <p>{story.excerpt}</p>
                    <span className="story-by">By {story.author}</span>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* CREATIVE WORK */}
          <section id="creative" className="ed-sec" style={{ borderBottom: 'none' }}>
            <div className="kicker">04 / Margins</div>
            <h2 className="sec-title">Creative work</h2>
            <p className="sec-sub">Poems, stories and sketches from the margins of our notebooks.</p>

            <div className="creative-grid">
              {siteData.creativeWorks.map((work, idx) => (
                <a
                  key={idx}
                  className="creative-card"
                  href="#creative"
                  onClick={(e) => {
                    e.preventDefault();
                    triggerToast(`Full ${work.category.toLowerCase()} coming soon`);
                  }}
                >
                  <div className="kicker" style={{ marginBottom: 0 }}>{work.category}</div>
                  <h3>{work.title}</h3>
                  <p>{work.excerpt}</p>
                  <span className="story-by">By {work.author}</span>
                </a>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* FOOTER */}
      <footer className="ed-footer">
        <div className="container">
          <h2>{siteData.meta.footerBye}</h2>
          <p className="ed-footer-sub">{siteData.meta.footerSign}</p>
          <nav className="ed-footer-nav">
            <a href="#people" onClick={openPeoplePage}>People</a>
            <a href="#photos" onClick={(e) => goHomeSection(e, 'photos')}>Stories</a>
            <a href="#creative" onClick={(e) => goHomeSection(e, 'creative')}>Creative</a>
            <a href="../">Dark Edition</a>
          </nav>
          <p className="ed-footer-fine">{siteData.meta.finePrint}</p>
        </div>
      </footer>

      <div className={`toast ${toastVisible ? 'on' : ''}`} role="status" aria-live="polite">
        {toastMessage}
      </div>
    </div>
  );
}
