import React, { useState, useEffect, useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';

// Your actual Supabase Credentials
const supabaseUrl = 'https://pzplzdgdlnjfwbklxbfd.supabase.co';
const supabaseAnonKey = 'sb_publishable_N3pli21Nl9PtLXeFkiuizg_W5Aw5MpM';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const siteData = {
  meta: {
    brand: 'The Chronicle',
    subBrand: 'The Farewell Issue · JNV Varanasi',
    issueLeft: 'EDITION 2025–26',
    issueRight: 'JNV VARANASI · ANNUAL ARCHIVE',
    kicker: 'JNV Varanasi · Class XII & Campus',
    heroTitlePre: 'A year ',
    heroTitleItalic: 'worth',
    heroTitlePost: ' remembering.',
    lede: 'A magazine of the people, places, and quiet spaces between the bells that made our school days ours.',
    coverImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop',
    coverCaption: 'Fig. 01 — The academic courtyard before the morning assembly bell.',
    footerBye: 'The year ends.',
    footerSign: "The memories don't.",
    finePrint: 'Made with love by JNV Varanasi · Edition 2025–26.',
  },
  intro: {
    pullQuote: '“Some years don’t just pass—they stay with you long after the last bell.”',
    pullCaption: 'Editorial Note · Page 01',
    paragraphs: [
      "This wasn't just another academic year. It was mornings that started too early, classrooms that got too loud, games that lasted longer than planned, and a hundred small moments nobody thought they'd remember.",
      'Twelve years of tiffin boxes, borrowed notebooks, and corridor laughter are turning into memories, and we didn’t want them to fade into a group chat that slowly goes quiet.',
      'So we made this: a small magazine of us. Our faces, our stories, our campus, and everything we created between the bells.',
    ],
    signOff: 'JNV Varanasi, with love',
  },
  timeline: [
    { num: '01', month: 'July', event: 'New Session Begins', desc: 'The campus wakes up from its summer slumber.' },
    { num: '02', month: 'August', event: 'Independence Day', desc: 'March pasts, tricolours, and the first taste of autumn.' },
    { num: '03', month: 'October', event: 'Cluster Meet', desc: 'Three days of fierce competition and new friendships.' },
    { num: '04', month: 'December', event: 'Alumni Meet', desc: 'Old faces returning to familiar corridors.' },
    { num: '05', month: 'February', event: 'Farewell', desc: 'Saying goodbye to the seniors. The hardest month.' },
  ],
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
      readTime: '3 min read',
      excerpt: 'At 5:30 AM, before the PT whistle blows, the campus belongs to the fog and the early risers.',
      fullText: [
        'At 5:30 AM, before the PT whistle echoes across the hostel quadrangle, JNV Varanasi belongs entirely to the morning mist and the earliest risers.',
        'The corridors are still, save for the clink of steel buckets and hurried footsteps toward the ground. For twenty quiet minutes, the campus feels suspended between night and the rush of classes, assemblies, and evening games.',
        'Those are the moments nobody writes down in the school calendar, yet they are the ones that stay clearest years after graduation.',
      ],
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop',
      featured: true,
    },
    {
      id: 2,
      title: 'Mess Duty Memoirs',
      category: 'Hostel Stories',
      author: 'Rahul M., Class XII',
      readTime: '2 min read',
      excerpt: 'Serving hundreds of students teaches you more about management than any textbook ever could.',
      fullText: [
        'Serving five hundred hungry classmates in under thirty minutes teaches you more about logistics, patience, and teamwork than any textbook ever could.',
        'From counting plates to negotiating the last serving of Sunday special, mess duty turned reluctant volunteers into a tight-knit crew.',
      ],
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop',
      featured: false,
    },
    {
      id: 3,
      title: 'Beyond the Whiteboard',
      category: 'Academics',
      author: 'Priya V., Class X',
      readTime: '2 min read',
      excerpt: 'When the syllabus ends, the real learning begins. A look at our late-night study circles.',
      fullText: [
        'When evening prep ends and the textbooks close, the real conversations begin on hostel verandas and classroom steps.',
        'Solved past papers, shared notes, and half-whispered debates before lights-out made exam season feel like a collective effort rather than a solo race.',
      ],
      image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop',
      featured: false,
    },
  ],
  creativeWorks: [
    {
      category: 'Poetry',
      title: 'The Last Bell',
      excerpt: '“The bell still rings inside my head, long after the corridors have emptied.”',
      fullText: 'The bell still rings inside my head,\nLong after the corridors have emptied.\nChalk dust settles on familiar desks,\nWhile our names remain carved in quiet corners.',
      author: 'JNV Student',
    },
    {
      category: 'Short Story',
      title: 'The Missing Spoon',
      excerpt: '“In a hostel of five hundred residents, every steel spoon has a secret life of its own.”',
      fullText: 'In a hostel of five hundred residents, no steel spoon truly belongs to one person. It travels from breakfast poha to midnight Maggi, carrying stories across every dormitory.',
      author: 'JNV Student',
    },
    {
      category: 'Illustration',
      title: 'Courtyard at Dusk',
      excerpt: 'Pencil and watercolour, sketched between evening games and night prep.',
      fullText: 'Drawn on the back page of a physics notebook just as the floodlights flickered on over the basketball court.',
      author: 'JNV Student',
    },
    {
      category: 'Essay',
      title: 'On Sharing a Room with Fifty People',
      excerpt: '“You can live with five hundred people and somehow still lose your own toothpaste.”',
      fullText: 'Living in a Navodaya dormitory teaches you an unspoken code: a phone charger belongs to the floor, alarms wake everyone except their owner, and silence is a rare group achievement.',
      author: 'JNV Student',
    },
  ],
  voices: [
    {
      quote: 'JNV gave me friendships I never expected. It gave me a second family.',
      author: 'Student, Class XII',
    },
    {
      quote: 'You can live with five hundred people and somehow still lose your own toothpaste.',
      author: 'Hostel Resident',
    },
  ],
};

const avatarShades = ['#2B3A5E', '#6E3B3B', '#2F5246', '#4E3D69', '#78512A', '#265361'];

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
        onSelect({
          kicker: subtitle,
          title: person.name,
          author: `Batch of 2025–26${roll ? ` · Roll ${roll}` : ''}`,
          paragraphs: [`“${tagline}”`],
          image: photoUrl,
        });
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
  const [activeModal, setActiveModal] = useState(null);

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

  const leadStory = siteData.stories[0];
  const secondaryStories = siteData.stories.slice(1);

  return (
    <div id="top" className="editorial-root">
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
          -webkit-font-smoothing: antialiased;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        a:focus-visible,
        button:focus-visible,
        input:focus-visible {
          outline: 2px solid #16213A;
          outline-offset: 3px;
        }

        .editorial-root {
          min-height: 100vh;
          background: #F5EFE3;
          color: #16213A;
        }

        .wrap {
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Masthead (exact claudeWhite1.html structure) */
        .masthead {
          max-width: 1120px;
          margin: 0 auto;
          padding: 18px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .brand-link {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
        }

        .brand-title {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 24px;
          font-weight: 600;
          letter-spacing: -0.01em;
        }

        .brand-sub {
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #4B5468;
          font-weight: 600;
          margin-top: 3px;
        }

        .masthead-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .desktop-links {
          display: none;
          align-items: center;
          gap: 24px;
          margin-right: 10px;
          font-size: 14px;
          font-weight: 500;
          color: #4B5468;
        }

        .desktop-links a:hover,
        .desktop-links a.active {
          color: #16213A;
          font-weight: 600;
        }

        .dark-pill {
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

        .dark-pill:hover {
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

        /* Full-width Dark Navy Drawer */
        .nav-drawer {
          background: #16213A;
          color: #F5EFE3;
          padding: 12px 20px 28px;
        }

        .nav-drawer-inner {
          max-width: 1120px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
        }

        .nav-drawer-inner a {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 30px;
          padding: 14px 0;
          border-bottom: 1px solid rgba(245, 239, 227, 0.18);
        }

        /* Dateline Bar */
        .dateline {
          border-top: 1px solid #16213A;
          border-bottom: 1px solid rgba(22, 33, 58, 0.2);
          padding: 10px 0;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #4B5468;
          font-weight: 600;
        }

        .dateline-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        /* Buttons (claudeWhite1.html) */
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
        .hero-section {
          padding: 36px 0 64px;
          border-bottom: 1px solid rgba(22, 33, 58, 0.16);
        }

        .kicker {
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #4B5468;
          font-weight: 600;
          margin-bottom: 14px;
        }

        .hero-title {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 48px;
          font-weight: 600;
          line-height: 0.96;
          letter-spacing: -0.025em;
          margin: 0 0 22px;
          max-width: 13ch;
        }

        .hero-title em {
          font-style: italic;
          font-weight: 400;
        }

        .hero-lede {
          font-size: 18px;
          line-height: 1.6;
          color: #4B5468;
          max-width: 48ch;
          margin: 0 0 28px;
        }

        .hero-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 40px;
        }

        .cover-frame {
          border-radius: 6px;
          overflow: hidden;
          border: 1px solid rgba(22, 33, 58, 0.16);
          background: #EAE2D3;
        }

        .cover-frame img {
          width: 100%;
          aspect-ratio: 16 / 9;
          object-fit: cover;
          display: block;
        }

        .cover-caption {
          padding: 12px 16px;
          font-family: 'Fraunces', Georgia, serif;
          font-style: italic;
          font-size: 14px;
          color: #4B5468;
          background: #FAF9F5;
          border-top: 1px solid rgba(22, 33, 58, 0.12);
        }

        /* Sections */
        .section-block {
          padding: 64px 0;
          border-bottom: 1px solid rgba(22, 33, 58, 0.16);
        }

        .sec-title {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 36px;
          font-weight: 600;
          line-height: 1.06;
          letter-spacing: -0.02em;
          margin: 0 0 10px;
        }

        .sec-sub {
          color: #4B5468;
          margin: 0 0 32px;
          font-size: 16px;
          max-width: 46ch;
        }

        /* Editorial Note & Dropcap (exact claudeWhite1.html rule) */
        .note-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }

        .pull-box {
          padding-top: 18px;
          border-top: 2px solid #16213A;
        }

        .pull-quote {
          font-family: 'Fraunces', Georgia, serif;
          font-style: italic;
          font-size: 22px;
          line-height: 1.35;
          margin: 0 0 12px;
        }

        .note-prose {
          font-size: 17px;
          line-height: 1.75;
          max-width: 62ch;
        }

        .note-prose p {
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

        .note-sign {
          font-family: 'Fraunces', Georgia, serif;
          font-style: italic;
          font-size: 20px;
          margin-top: 10px;
        }

        /* Year Index (Chronology) */
        .index-list {
          border-top: 1px solid #16213A;
        }

        .index-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4px;
          padding: 18px 0;
          border-bottom: 1px solid rgba(22, 33, 58, 0.16);
        }

        .index-meta {
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #4B5468;
          font-weight: 600;
        }

        .index-title {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 22px;
          font-weight: 600;
          margin: 0;
        }

        .index-desc {
          margin: 0;
          color: #4B5468;
          font-size: 15px;
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
          border: 1px solid rgba(22, 33, 58, 0.14);
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

        /* Search Input on /#people */
        .search-field {
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
        }

        /* Stories Feature Layout */
        .lead-story {
          display: grid;
          grid-template-columns: 1fr;
          background: #FAF9F5;
          border: 1px solid rgba(22, 33, 58, 0.16);
          border-radius: 6px;
          overflow: hidden;
          margin-bottom: 24px;
        }

        .lead-story-img img {
          width: 100%;
          height: 100%;
          aspect-ratio: 16 / 10;
          object-fit: cover;
          display: block;
        }

        .lead-story-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .lead-story-body h3 {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 28px;
          line-height: 1.12;
          margin: 4px 0 12px;
        }

        .lead-story-body p {
          margin: 0 0 18px;
          color: #4B5468;
        }

        .sub-stories-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }

        .story-card {
          display: block;
          background: #FAF9F5;
          border: 1px solid rgba(22, 33, 58, 0.16);
          border-radius: 6px;
          overflow: hidden;
        }

        .story-card img {
          width: 100%;
          aspect-ratio: 16 / 10;
          object-fit: cover;
          display: block;
        }

        .story-card-body {
          padding: 20px;
        }

        .story-card-body h3 {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 22px;
          line-height: 1.2;
          margin: 4px 0 8px;
        }

        .story-card-body p {
          margin: 0 0 14px;
          color: #4B5468;
          font-size: 15px;
        }

        .byline {
          font-size: 12px;
          font-weight: 600;
          color: #16213A;
        }

        /* Creative Anthology */
        .creative-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }

        .creative-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: #FAF9F5;
          border: 1px solid rgba(22, 33, 58, 0.16);
          border-radius: 6px;
          padding: 24px;
          transition: border-color 0.15s;
        }

        .creative-card:hover {
          border-color: #16213A;
        }

        .creative-card h3 {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 24px;
          margin: 4px 0 10px;
          line-height: 1.2;
        }

        .creative-card p {
          font-family: 'Fraunces', Georgia, serif;
          font-style: italic;
          color: #4B5468;
          margin: 0 0 18px;
          font-size: 16px;
        }

        /* Voices / Overheard */
        .voices-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px;
        }

        .voice-item {
          padding: 24px;
          border-left: 3px solid #16213A;
          background: #FAF9F5;
        }

        .voice-item blockquote {
          margin: 0 0 10px;
          font-family: 'Fraunces', Georgia, serif;
          font-style: italic;
          font-size: 21px;
          line-height: 1.35;
        }

        .voice-item cite {
          font-style: normal;
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #4B5468;
          font-weight: 600;
        }

        /* Footer */
        .ed-footer {
          background: #16213A;
          color: #F5EFE3;
          padding: 64px 0 48px;
        }

        .ed-footer h2 {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 38px;
          font-weight: 600;
          margin: 0 0 6px;
          line-height: 1.05;
        }

        .ed-footer-sign {
          font-family: 'Fraunces', Georgia, serif;
          font-style: italic;
          font-size: 22px;
          color: rgba(245, 239, 227, 0.78);
          margin: 0 0 32px;
        }

        .ed-footer-nav {
          display: flex;
          flex-wrap: wrap;
          gap: 22px;
          padding-bottom: 24px;
          margin-bottom: 24px;
          border-bottom: 1px solid rgba(245, 239, 227, 0.18);
          font-size: 14px;
          font-weight: 600;
        }

        .ed-footer-fine {
          margin: 0;
          font-size: 13px;
          color: rgba(245, 239, 227, 0.65);
        }

        /* Editorial Reading Modal */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 50;
          background: rgba(22, 33, 58, 0.65);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .modal-sheet {
          width: 100%;
          max-width: 600px;
          max-height: 85vh;
          overflow-y: auto;
          background: #F5EFE3;
          color: #16213A;
          border: 1.5px solid #16213A;
          border-radius: 8px;
          padding: 28px;
        }

        .modal-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 16px;
        }

        .modal-sheet h3 {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 28px;
          line-height: 1.15;
          margin: 0 0 8px;
        }

        .modal-sheet img {
          width: 100%;
          max-height: 280px;
          object-fit: cover;
          border-radius: 6px;
          margin-bottom: 18px;
        }

        .modal-sheet p {
          margin: 0 0 16px;
          font-size: 16px;
          line-height: 1.7;
        }

        @media (min-width: 720px) {
          .hero-title {
            font-size: 92px !important;
          }
          .sec-title {
            font-size: 52px !important;
          }
          .desktop-links {
            display: flex;
          }
          .note-layout {
            grid-template-columns: 280px 1fr;
            gap: 56px;
          }
          .index-row {
            grid-template-columns: 160px 240px 1fr;
            align-items: baseline;
            gap: 20px;
          }
          .people-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 36px 24px;
          }
          .lead-story {
            grid-template-columns: 1.15fr 1fr;
          }
          .sub-stories-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .creative-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .voices-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      ` }} />

      {/* MASTHEAD */}
      <header className="masthead">
        <a href="#top" className="brand-link" onClick={(e) => goHomeSection(e, null)}>
          <span className="brand-title">{siteData.meta.brand}</span>
          <span className="brand-sub">{siteData.meta.subBrand}</span>
        </a>

        <div className="masthead-right">
          <nav className="desktop-links" aria-label="Main">
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

          <a href="../" className="dark-pill" aria-label="Switch to Dark Version">
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

      {/* EXPANDABLE DARK NAVY MENU DRAWER */}
      {menuOpen && (
        <nav aria-label="Main" className="nav-drawer">
          <div className="nav-drawer-inner">
            <a href="#note" onClick={(e) => goHomeSection(e, 'note')}>Our note</a>
            <a href="#people" onClick={openPeoplePage}>People</a>
            <a href="#photos" onClick={(e) => goHomeSection(e, 'photos')}>Stories</a>
            <a href="#creative" onClick={(e) => goHomeSection(e, 'creative')}>Creative</a>
            <a href="../">Dark edition</a>
          </div>
        </nav>
      )}

      {/* ISSUE DATELINE */}
      <div className="dateline">
        <div className="wrap dateline-inner">
          <span>{siteData.meta.issueLeft}</span>
          <span>{siteData.meta.issueRight}</span>
        </div>
      </div>

      {activePage === 'people' ? (
        /* DEDICATED /#people DIRECTORY PAGE */
        <main className="wrap" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
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
            className="search-field"
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
                  onSelect={setActiveModal}
                />
              ))}
            </div>
          )}
        </main>
      ) : (
        /* MAIN EDITORIAL MAGAZINE PAGE */
        <main className="wrap">
          {/* HERO */}
          <section className="hero-section">
            <div className="kicker">{siteData.meta.kicker}</div>
            <h1 className="hero-title">
              {siteData.meta.heroTitlePre}
              <em>{siteData.meta.heroTitleItalic}</em>
              {siteData.meta.heroTitlePost}
            </h1>
            <p className="hero-lede">{siteData.meta.lede}</p>
            <div className="hero-ctas">
              <a className="btn-fill" href="#people" onClick={openPeoplePage}>
                Meet the batch
              </a>
              <a className="btn" href="#note" onClick={(e) => goHomeSection(e, 'note')}>
                Read our note
              </a>
            </div>

            <figure className="cover-frame" style={{ margin: 0 }}>
              <img src={siteData.meta.coverImage} alt="JNV Varanasi Campus" />
              <figcaption className="cover-caption">{siteData.meta.coverCaption}</figcaption>
            </figure>
          </section>

          {/* 01 / OUR NOTE WITH DROPCAP */}
          <section id="note" className="section-block">
            <div className="kicker">01 / Introduction</div>
            <h2 className="sec-title" style={{ marginBottom: '32px' }}>A note from us</h2>

            <div className="note-layout">
              <aside className="pull-box">
                <p className="pull-quote">{siteData.intro.pullQuote}</p>
                <div className="kicker" style={{ marginBottom: 0 }}>{siteData.intro.pullCaption}</div>
              </aside>

              <div className="note-prose">
                {siteData.intro.paragraphs.map((para, idx) => (
                  <p key={idx} className={idx === 0 ? 'dropcap' : ''}>
                    {para}
                  </p>
                ))}
                <p className="note-sign">— {siteData.intro.signOff}</p>
              </div>
            </div>
          </section>

          {/* 02 / THE YEAR IN CHAPTERS */}
          <section className="section-block">
            <div className="kicker">02 / Chronology</div>
            <h2 className="sec-title">The academic year</h2>
            <p className="sec-sub">Five milestones that shaped the calendar from July to February.</p>

            <div className="index-list">
              {siteData.timeline.map((item) => (
                <div key={item.num} className="index-row">
                  <span className="index-meta">{item.num} · {item.month}</span>
                  <h3 className="index-title">{item.event}</h3>
                  <p className="index-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 03 / PEOPLE PREVIEW */}
          <section id="people-preview" className="section-block">
            <div className="kicker">03 / The Batch</div>
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
                    onSelect={setActiveModal}
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

          {/* 04 / CAMPUS STORIES */}
          <section id="photos" className="section-block">
            <div className="kicker">04 / Campus Chronicles</div>
            <h2 className="sec-title">Stories &amp; moments</h2>
            <p className="sec-sub">Campus corners and small moments we want to keep.</p>

            {/* Featured Story */}
            <a
              className="lead-story"
              href="#photos"
              onClick={(e) => {
                e.preventDefault();
                setActiveModal({
                  kicker: `${leadStory.category} · ${leadStory.readTime}`,
                  title: leadStory.title,
                  author: `By ${leadStory.author}`,
                  paragraphs: leadStory.fullText,
                  image: leadStory.image,
                });
              }}
            >
              <div className="lead-story-img">
                <img src={leadStory.image} alt={leadStory.title} loading="lazy" />
              </div>
              <div className="lead-story-body">
                <div className="kicker" style={{ marginBottom: '6px' }}>
                  Featured · {leadStory.category}
                </div>
                <h3>{leadStory.title}</h3>
                <p>{leadStory.excerpt}</p>
                <span className="byline">By {leadStory.author} · {leadStory.readTime} →</span>
              </div>
            </a>

            {/* Secondary Stories */}
            <div className="sub-stories-grid">
              {secondaryStories.map((story) => (
                <a
                  key={story.id}
                  className="story-card"
                  href="#photos"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveModal({
                      kicker: `${story.category} · ${story.readTime}`,
                      title: story.title,
                      author: `By ${story.author}`,
                      paragraphs: story.fullText,
                      image: story.image,
                    });
                  }}
                >
                  <img src={story.image} alt={story.title} loading="lazy" />
                  <div className="story-card-body">
                    <div className="kicker" style={{ marginBottom: '4px' }}>{story.category}</div>
                    <h3>{story.title}</h3>
                    <p>{story.excerpt}</p>
                    <span className="byline">By {story.author} →</span>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* 05 / CREATIVE ANTHOLOGY */}
          <section id="creative" className="section-block">
            <div className="kicker">05 / Margins</div>
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
                    setActiveModal({
                      kicker: work.category,
                      title: work.title,
                      author: `By ${work.author}`,
                      paragraphs: [work.fullText],
                    });
                  }}
                >
                  <div>
                    <div className="kicker" style={{ marginBottom: '4px' }}>{work.category}</div>
                    <h3>{work.title}</h3>
                    <p>{work.excerpt}</p>
                  </div>
                  <span className="byline">By {work.author} · Read piece →</span>
                </a>
              ))}
            </div>
          </section>

          {/* 06 / VOICES */}
          <section className="section-block" style={{ borderBottom: 'none' }}>
            <div className="kicker">06 / Overheard</div>
            <h2 className="sec-title">Campus voices</h2>
            <p className="sec-sub">Lines heard in corridors, classrooms, and hostel rooms.</p>

            <div className="voices-grid">
              {siteData.voices.map((v, idx) => (
                <div key={idx} className="voice-item">
                  <blockquote>“{v.quote}”</blockquote>
                  <cite>— {v.author}</cite>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* FOOTER */}
      <footer className="ed-footer">
        <div className="wrap">
          <h2>{siteData.meta.footerBye}</h2>
          <p className="ed-footer-sign">{siteData.meta.footerSign}</p>
          <nav className="ed-footer-nav">
            <a href="#people" onClick={openPeoplePage}>People</a>
            <a href="#photos" onClick={(e) => goHomeSection(e, 'photos')}>Stories</a>
            <a href="#creative" onClick={(e) => goHomeSection(e, 'creative')}>Creative</a>
            <a href="../">Dark Edition</a>
          </nav>
          <p className="ed-footer-fine">{siteData.meta.finePrint}</p>
        </div>
      </footer>

      {/* EDITORIAL READING MODAL */}
      {activeModal && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveModal(null)}
        >
          <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top">
              <div>
                <div className="kicker" style={{ marginBottom: '6px' }}>{activeModal.kicker}</div>
                <h3>{activeModal.title}</h3>
                <div className="byline">{activeModal.author}</div>
              </div>
              <button
                type="button"
                className="menu-circle"
                aria-label="Close"
                onClick={() => setActiveModal(null)}
                style={{ width: '40px', height: '40px', flexShrink: 0 }}
              >
                ✕
              </button>
            </div>
            {activeModal.image && <img src={activeModal.image} alt={activeModal.title} />}
            {activeModal.paragraphs.map((line, i) => (
              <p key={i} style={{ whiteSpace: 'pre-line' }}>{line}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
