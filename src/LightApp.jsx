import React, { useState, useEffect, useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';

// Your actual Supabase Credentials
const supabaseUrl = 'https://pzplzdgdlnjfwbklxbfd.supabase.co';
const supabaseAnonKey = 'sb_publishable_N3pli21Nl9PtLXeFkiuizg_W5Aw5MpM';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const ACCENT = '#B8381D';
const CARD_TINTS = ['#E3D6BC', '#D5DCE3', '#EBCFC0', '#D9E0CC'];
const CREATIVE_TINTS = ['#EBCFC0', '#D5DCE3', '#D9E0CC'];

const siteData = {
  meta: {
    brand: 'The Chronicle',
    subBrand: 'The Farewell Issue',
    eyebrow: 'JNV Varanasi · 2025–26',
    heroLine1: 'A year',
    heroLine2: 'worth',
    heroAccent: 'remembering.',
    lede: 'A magazine of the people, places, and quiet spaces between the bells that made our school days ours.',
    coverImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop',
    stickerLine1: 'Batch of',
    stickerLine2: '2025–26',
    coverCaptionPrefix: 'JNV Varanasi, one last time.',
    coverCaptionTag: 'Edition 2025–26',
    footerHeadline1: 'Until we',
    footerHeadline2: 'meet again.',
    footerBody: 'Made with love, late nights and a lot of memories by the students of JNV Varanasi.',
    copyright: '© 2025–26 The Chronicle · JNV Varanasi',
  },
  note: {
    label: 'A note from us',
    titlePre: 'Before we all ',
    titleEm: 'scatter.',
    paragraphs: [
      "This wasn't just another academic year. It was mornings that started too early, classrooms that got too loud, games that lasted longer than planned, and a hundred small moments nobody thought they'd remember.",
      'Twelve years of tiffin boxes, borrowed notebooks and corridor laughter are turning into memories, and we didn’t want them to fade into a group chat that slowly goes quiet.',
      'So we made this: a small magazine of us. Our faces, our campus, and everything we created between the bells.',
    ],
    signOff: 'With love, JNV Varanasi',
    signSub: 'Edition 2025–26, on behalf of everyone',
  },
  peopleFallback: [
    { id: 1, name: 'Aarav Sharma', role: 'School Captain', quote: 'Lead by example.', image_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop' },
    { id: 2, name: 'Dr. K. Singh', role: 'Principal', quote: 'Excellence is a habit.', image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop' },
    { id: 3, name: 'Neha Verma', role: 'Sports Secretary', quote: 'Leave it on the field.', image_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop' },
    { id: 4, name: 'Vikram R.', role: 'Cultural Sec', quote: 'Art speaks.', image_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop' },
  ],
  photos: [
    {
      id: 1,
      cap: 'The quiet before the bell',
      ratio: '4/5',
      bg: '#E3D6BC',
      author: 'Ananya S., Class XI',
      category: 'Campus Life',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop',
      story: 'At 5:30 AM, before the PT whistle blows, the campus belongs to the fog and the early risers.',
    },
    {
      id: 2,
      cap: 'Beyond the whiteboard',
      ratio: '1/1',
      bg: '#D5DCE3',
      author: 'Priya V., Class X',
      category: 'Academics',
      image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop',
      story: 'When the syllabus ends, the real learning begins. A look at our late-night study circles.',
    },
    {
      id: 3,
      cap: 'Mess duty memoirs',
      ratio: '3/4',
      bg: '#EBCFC0',
      author: 'Rahul M., Class XII',
      category: 'Hostel Stories',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop',
      story: 'Serving hundreds of students teaches you more about management than any textbook ever could.',
    },
    {
      id: 4,
      cap: 'Morning assembly',
      ratio: '1/1',
      bg: '#D9E0CC',
      author: 'Campus Archive',
      category: 'Daily Rituals',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop',
      story: 'Rows of crisp uniforms, morning prayers, and announcements echoing across the quadrangle.',
    },
    {
      id: 5,
      cap: 'Campus corridor',
      ratio: '3/4',
      bg: '#E3D6BC',
      author: 'Campus Archive',
      category: 'Spaces',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop',
      story: 'Where between-period conversations turned into lifelong friendships.',
    },
    {
      id: 6,
      cap: 'Cluster & sports meet',
      ratio: '4/5',
      bg: '#D5DCE3',
      author: 'Sports Committee',
      category: 'Athletics',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070&auto=format&fit=crop',
      story: 'Three days of fierce competition, house flags, and cheering until our voices gave out.',
    },
  ],
  works: [
    {
      tag: 'Poetry',
      title: 'The Last Bell',
      excerpt: '“The bell still rings inside my head, long after the corridors have emptied.”',
      fullText: 'The bell still rings inside my head,\nLong after the corridors have emptied.\nChalk dust settles on familiar desks,\nWhile our names remain carved in quiet corners.',
      author: 'JNV Student',
      bg: '#EBCFC0',
    },
    {
      tag: 'Short Story',
      title: 'The Missing Spoon',
      excerpt: '“In a hostel of five hundred residents, every steel spoon has a secret life of its own.”',
      fullText: 'In a hostel of five hundred residents, no steel spoon truly belongs to one person. It travels from breakfast poha to midnight Maggi, carrying stories across every dormitory.',
      author: 'JNV Student',
      bg: '#D5DCE3',
    },
    {
      tag: 'Sketch',
      title: 'Courtyard at Dusk',
      excerpt: 'Pencil and watercolour, sketched between evening games and night prep.',
      fullText: 'Drawn on the back page of a physics notebook just as the floodlights flickered on over the basketball court.',
      author: 'JNV Student',
      bg: '#D9E0CC',
    },
    {
      tag: 'Essay',
      title: 'On Sharing a Room with Fifty People',
      excerpt: '“You can live with five hundred people and somehow still lose your own toothpaste.”',
      fullText: 'Living in a Navodaya dormitory teaches you an unspoken code: a phone charger belongs to the floor, alarms wake everyone except their owner, and silence is a rare group achievement.',
      author: 'JNV Student',
      bg: '#EBCFC0',
    },
  ],
};

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

function ArchPersonCard({ person, index, onSelect }) {
  const [imgFailed, setImgFailed] = useState(false);
  const photoUrl = !imgFailed ? getPhotoUrl(person) : null;
  const roll = getRollNumber(person);
  const bg = CARD_TINTS[index % CARD_TINTS.length];

  const kind = person.role || (person.class ? `Class ${person.class}` : 'Student');
  const quote = person.quote || person.favourite_quote || 'Batch of 2025–26';
  const line = [roll ? `Roll ${roll}` : '', quote].filter(Boolean).join(' · ');

  return (
    <a
      href="#people"
      style={{ display: 'block' }}
      onClick={(e) => {
        e.preventDefault();
        onSelect({
          tag: kind,
          title: person.name,
          sub: roll ? `Roll ${roll} · JNV Varanasi` : 'JNV Varanasi · Batch of 2025–26',
          body: `“${quote}”`,
          image: photoUrl,
          bg,
        });
      }}
    >
      <div
        style={{
          aspectRatio: '3/4',
          borderRadius: '999px 999px 16px 16px',
          display: 'flex',
          alignItems: photoUrl ? 'stretch' : 'flex-end',
          justifyContent: 'center',
          paddingBottom: photoUrl ? 0 : '18px',
          color: '#16213A',
          background: bg,
          overflow: 'hidden',
        }}
      >
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={person.name}
            loading="lazy"
            onError={() => setImgFailed(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <svg
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="8.5" r="3.5" />
            <path d="M5 20c.8-4 3.6-6 7-6s6.2 2 7 6" />
          </svg>
        )}
      </div>
      <div
        style={{
          marginTop: '14px',
          fontSize: '11px',
          letterSpacing: '.16em',
          textTransform: 'uppercase',
          fontWeight: 600,
          color: ACCENT,
        }}
      >
        {kind}
      </div>
      <div
        style={{
          marginTop: '2px',
          fontFamily: "'Fraunces',Georgia,serif",
          fontSize: '21px',
          lineHeight: 1.2,
        }}
      >
        {person.name}
      </div>
      <div style={{ marginTop: '2px', fontSize: '14px', color: '#4B5468' }}>{line}</div>
    </a>
  );
}

function PhotoTile({ item, onSelect }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() =>
        onSelect({
          tag: item.category,
          title: item.cap,
          sub: `By ${item.author}`,
          body: item.story,
          image: !imgFailed ? item.image : null,
          bg: item.bg,
        })
      }
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect({
            tag: item.category,
            title: item.cap,
            sub: `By ${item.author}`,
            body: item.story,
            image: !imgFailed ? item.image : null,
            bg: item.bg,
          });
        }
      }}
      style={{
        breakInside: 'avoid',
        marginBottom: '12px',
        position: 'relative',
        borderRadius: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#16213A',
        aspectRatio: item.ratio,
        background: item.bg,
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      {item.image && !imgFailed ? (
        <img
          src={item.image}
          alt={item.cap}
          loading="lazy"
          onError={() => setImgFailed(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      ) : (
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 8h3l2-2.5h6L17 8h3v11H4z" />
          <circle cx="12" cy="13" r="3.5" />
        </svg>
      )}
      <span
        style={{
          position: 'absolute',
          left: '8px',
          bottom: '8px',
          background: '#F5EFE3',
          color: '#16213A',
          fontSize: '12px',
          fontWeight: 600,
          padding: '5px 11px',
          borderRadius: '999px',
        }}
      >
        {item.cap}
      </span>
    </div>
  );
}

export default function LightApp() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [coverFailed, setCoverFailed] = useState(false);
  const [peopleData, setPeopleData] = useState([]);
  const [loadingPeople, setLoadingPeople] = useState(true);
  const [activePage, setActivePage] = useState(() =>
    typeof window !== 'undefined' && window.location.hash === '#people' ? 'people' : 'home'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [modalItem, setModalItem] = useState(null);

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

  return (
    <div
      style={{
        background: '#F5EFE3',
        color: '#16213A',
        fontFamily: "'DM Sans',system-ui,sans-serif",
        fontSize: '16px',
        lineHeight: 1.6,
        minHeight: '100vh',
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,400;1,9..144,500&family=DM+Sans:wght@400;500;600&display=swap');
        body { margin: 0; background: #F5EFE3; }
        * { box-sizing: border-box; }
        a { color: inherit; text-decoration: none; }
        a:focus-visible, button:focus-visible, input:focus-visible { outline: 2px solid #16213A; outline-offset: 3px; }
        .btn:hover { background: #16213A !important; color: #F5EFE3 !important; }
        .btn-fill:hover { background: #2B3A5E !important; }
        .dropcap::first-letter {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 68px;
          line-height: .85;
          float: left;
          padding: 6px 10px 0 0;
          color: #16213A;
        }
        .masonry-grid { column-count: 2; column-gap: 12px; }
        @media (min-width: 720px) {
          .hero-title { font-size: 92px !important; }
          .sec-title { font-size: 52px !important; }
          .masonry-grid { column-count: 3; column-gap: 16px; }
        }
      ` }} />

      {/* Masthead */}
      <header
        style={{
          maxWidth: '1120px',
          margin: '0 auto',
          padding: '18px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        <a
          href="#top"
          onClick={(e) => goHomeSection(e, null)}
          style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}
        >
          <span
            style={{
              fontFamily: "'Fraunces',Georgia,serif",
              fontSize: '24px',
              fontWeight: 600,
              letterSpacing: '-.01em',
            }}
          >
            {siteData.meta.brand}
          </span>
          <span
            style={{
              fontSize: '10px',
              letterSpacing: '.22em',
              textTransform: 'uppercase',
              color: '#4B5468',
              fontWeight: 600,
              marginTop: '3px',
            }}
          >
            {siteData.meta.subBrand}
          </span>
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <a
            href="../"
            className="btn"
            aria-label="Switch to dark version"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              height: '48px',
              padding: '0 18px',
              borderRadius: '999px',
              border: '1.5px solid #16213A',
              background: 'transparent',
              color: '#16213A',
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            <span aria-hidden="true">☾</span> Dark
          </a>

          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="btn"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '999px',
              border: '1.5px solid #16213A',
              background: 'transparent',
              color: '#16213A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              padding: 0,
            }}
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

      {/* Expandable Dark Navy Menu */}
      {menuOpen && (
        <nav aria-label="Main" style={{ background: '#16213A', color: '#F5EFE3', padding: '12px 20px 28px' }}>
          <div style={{ maxWidth: '1120px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
            <a
              href="#note"
              onClick={(e) => goHomeSection(e, 'note')}
              style={{
                fontFamily: "'Fraunces',Georgia,serif",
                fontSize: '30px',
                padding: '14px 0',
                borderBottom: '1px solid rgba(245,239,227,.18)',
              }}
            >
              Our note
            </a>
            <a
              href="#people"
              onClick={openPeoplePage}
              style={{
                fontFamily: "'Fraunces',Georgia,serif",
                fontSize: '30px',
                padding: '14px 0',
                borderBottom: '1px solid rgba(245,239,227,.18)',
              }}
            >
              People
            </a>
            <a
              href="#photos"
              onClick={(e) => goHomeSection(e, 'photos')}
              style={{
                fontFamily: "'Fraunces',Georgia,serif",
                fontSize: '30px',
                padding: '14px 0',
                borderBottom: '1px solid rgba(245,239,227,.18)',
              }}
            >
              Photos
            </a>
            <a
              href="#creative"
              onClick={(e) => goHomeSection(e, 'creative')}
              style={{
                fontFamily: "'Fraunces',Georgia,serif",
                fontSize: '30px',
                padding: '14px 0',
                borderBottom: '1px solid rgba(245,239,227,.18)',
              }}
            >
              Creative work
            </a>
            <a
              href="../"
              style={{
                fontFamily: "'Fraunces',Georgia,serif",
                fontSize: '30px',
                padding: '14px 0',
                color: '#F2A794',
              }}
            >
              Dark edition ↗
            </a>
          </div>
        </nav>
      )}

      {activePage === 'people' ? (
        /* DEDICATED /#people DIRECTORY PAGE */
        <main id="top" style={{ maxWidth: '1120px', margin: '0 auto', padding: '28px 20px 88px' }}>
          <div style={{ marginBottom: '28px' }}>
            <a
              href="#top"
              className="btn"
              onClick={(e) => goHomeSection(e, null)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                minHeight: '48px',
                padding: '0 24px',
                border: '1.5px solid #16213A',
                borderRadius: '999px',
                fontWeight: 600,
                fontSize: '15px',
                color: '#16213A',
              }}
            >
              ← Back to magazine
            </a>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '16px' }}>
            <span style={{ fontFamily: "'Fraunces',Georgia,serif", fontStyle: 'italic', fontSize: '20px', color: ACCENT }}>
              01
            </span>
            <span style={{ fontSize: '12px', letterSpacing: '.2em', textTransform: 'uppercase', fontWeight: 600 }}>
              People · {sortedPeople.length} Members
            </span>
            <span style={{ flex: 1, height: '1px', background: 'rgba(22,33,58,.2)' }} />
          </div>

          <h1
            className="sec-title"
            style={{
              margin: '0 0 12px',
              fontFamily: "'Fraunces',Georgia,serif",
              fontWeight: 400,
              fontSize: '38px',
              lineHeight: 1.1,
              letterSpacing: '-.02em',
            }}
          >
            The faces behind <em style={{ fontStyle: 'italic' }}>the memories</em>
          </h1>
          <p style={{ margin: '0 0 24px', color: '#4B5468', maxWidth: '36em' }}>
            Sorted by uploaded photos first, then alphabetically by name.
          </p>

          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, roll number, or class..."
            aria-label="Search students"
            style={{
              width: '100%',
              maxWidth: '420px',
              height: '48px',
              padding: '0 20px',
              marginBottom: '32px',
              borderRadius: '999px',
              border: '1.5px solid #16213A',
              background: '#FAF9F5',
              color: '#16213A',
              fontFamily: "'DM Sans',system-ui,sans-serif",
              fontSize: '15px',
            }}
          />

          {loadingPeople ? (
            <p style={{ color: '#4B5468' }}>Loading batch directory...</p>
          ) : filteredAllPeople.length === 0 ? (
            <p style={{ color: '#4B5468' }}>No matching students found for “{searchQuery}”.</p>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill,minmax(165px,1fr))',
                gap: '28px 16px',
              }}
            >
              {filteredAllPeople.map((person, idx) => (
                <ArchPersonCard
                  key={person.id || `${person.name}-${idx}`}
                  person={person}
                  index={idx}
                  onSelect={setModalItem}
                />
              ))}
            </div>
          )}
        </main>
      ) : (
        /* MAIN MAGAZINE PAGE */
        <main id="top">
          {/* Hero */}
          <section
            style={{
              maxWidth: '1120px',
              margin: '0 auto',
              padding: '28px 20px 72px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '44px',
            }}
          >
            <div style={{ flex: '1 1 340px', minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '22px' }}>
                <span style={{ width: '32px', height: '1.5px', background: ACCENT }} />
                <span
                  style={{
                    fontSize: '12px',
                    letterSpacing: '.2em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    color: ACCENT,
                  }}
                >
                  {siteData.meta.eyebrow}
                </span>
              </div>

              <h1
                className="hero-title"
                style={{
                  margin: 0,
                  fontFamily: "'Fraunces',Georgia,serif",
                  fontWeight: 400,
                  fontSize: '56px',
                  lineHeight: 1.02,
                  letterSpacing: '-.025em',
                }}
              >
                {siteData.meta.heroLine1}
                <br />
                {siteData.meta.heroLine2}
                <br />
                <em style={{ fontStyle: 'italic', color: ACCENT }}>{siteData.meta.heroAccent}</em>
              </h1>

              <p
                style={{
                  margin: '26px 0 0',
                  fontSize: '18px',
                  lineHeight: 1.6,
                  color: '#4B5468',
                  maxWidth: '30em',
                }}
              >
                {siteData.meta.lede}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '32px' }}>
                <a
                  className="btn-fill"
                  href="#people"
                  onClick={openPeoplePage}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    minHeight: '52px',
                    padding: '0 28px',
                    borderRadius: '999px',
                    background: '#16213A',
                    color: '#F5EFE3',
                    fontWeight: 600,
                    fontSize: '15px',
                  }}
                >
                  Meet the batch
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>

                <a
                  className="btn"
                  href="#note"
                  onClick={(e) => goHomeSection(e, 'note')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '52px',
                    padding: '0 28px',
                    border: '1.5px solid #16213A',
                    borderRadius: '999px',
                    fontWeight: 600,
                    fontSize: '15px',
                    color: '#16213A',
                  }}
                >
                  Read our note
                </a>
              </div>
            </div>

            <figure style={{ flex: '1 1 320px', minWidth: 0, maxWidth: '460px', margin: 0, position: 'relative' }}>
              <div
                style={{
                  aspectRatio: '4/5',
                  borderRadius: '999px 999px 24px 24px',
                  background: '#E3D6BC',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  color: '#16213A',
                  overflow: 'hidden',
                }}
              >
                {siteData.meta.coverImage && !coverFailed ? (
                  <img
                    src={siteData.meta.coverImage}
                    alt="JNV Varanasi Campus"
                    onError={() => setCoverFailed(true)}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                ) : (
                  <>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 8h3l2-2.5h6L17 8h3v11H4z" />
                      <circle cx="12" cy="13" r="3.5" />
                    </svg>
                    <span style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase' }}>
                      Add campus photo
                    </span>
                  </>
                )}
              </div>

              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: '-6px',
                  bottom: '64px',
                  width: '100px',
                  height: '100px',
                  borderRadius: '999px',
                  background: ACCENT,
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  fontFamily: "'Fraunces',Georgia,serif",
                  fontStyle: 'italic',
                  fontSize: '16px',
                  lineHeight: 1.15,
                  transform: 'rotate(-10deg)',
                }}
              >
                <span>
                  {siteData.meta.stickerLine1}
                  <br />
                  {siteData.meta.stickerLine2}
                </span>
              </div>

              <figcaption style={{ marginTop: '14px', fontSize: '13px', color: '#4B5468' }}>
                {siteData.meta.coverCaptionPrefix}{' '}
                <span style={{ color: '#16213A', fontWeight: 600 }}>{siteData.meta.coverCaptionTag}</span>
              </figcaption>
            </figure>
          </section>

          {/* Note */}
          <section id="note" style={{ background: '#EDE4D1', padding: '72px 20px' }}>
            <div style={{ maxWidth: '680px', margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '22px' }}>
                <span style={{ fontSize: '12px', letterSpacing: '.2em', textTransform: 'uppercase', fontWeight: 600, color: '#16213A' }}>
                  {siteData.note.label}
                </span>
                <span style={{ flex: 1, height: '1px', background: 'rgba(22,33,58,.25)' }} />
              </div>

              <h2
                className="sec-title"
                style={{
                  margin: '0 0 28px',
                  fontFamily: "'Fraunces',Georgia,serif",
                  fontWeight: 400,
                  fontSize: '38px',
                  lineHeight: 1.1,
                  letterSpacing: '-.02em',
                }}
              >
                {siteData.note.titlePre}
                <em style={{ fontStyle: 'italic' }}>{siteData.note.titleEm}</em>
              </h2>

              {siteData.note.paragraphs.map((text, idx) => (
                <p
                  key={idx}
                  className={idx === 0 ? 'dropcap' : undefined}
                  style={{
                    margin: idx === siteData.note.paragraphs.length - 1 ? '0 0 32px' : '0 0 20px',
                    fontSize: '18px',
                    lineHeight: 1.75,
                  }}
                >
                  {text}
                </p>
              ))}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontFamily: "'Fraunces',Georgia,serif", fontStyle: 'italic', fontSize: '26px', color: ACCENT }}>
                  {siteData.note.signOff}
                </span>
                <span style={{ fontSize: '13px', color: '#4B5468' }}>{siteData.note.signSub}</span>
              </div>
            </div>
          </section>

          {/* People */}
          <section id="people-preview" style={{ maxWidth: '1120px', margin: '0 auto', padding: '80px 20px 0' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '16px' }}>
              <span style={{ fontFamily: "'Fraunces',Georgia,serif", fontStyle: 'italic', fontSize: '20px', color: ACCENT }}>
                01
              </span>
              <span style={{ fontSize: '12px', letterSpacing: '.2em', textTransform: 'uppercase', fontWeight: 600 }}>
                People
              </span>
              <span style={{ flex: 1, height: '1px', background: 'rgba(22,33,58,.2)' }} />
            </div>

            <h2
              className="sec-title"
              style={{
                margin: '0 0 12px',
                fontFamily: "'Fraunces',Georgia,serif",
                fontWeight: 400,
                fontSize: '38px',
                lineHeight: 1.1,
                letterSpacing: '-.02em',
              }}
            >
              The faces behind <em style={{ fontStyle: 'italic' }}>the memories</em>
            </h2>
            <p style={{ margin: '0 0 32px', color: '#4B5468', maxWidth: '32em' }}>
              Classmates and teachers who made these years what they were.
            </p>

            {loadingPeople ? (
              <p style={{ color: '#4B5468' }}>Loading batch directory...</p>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))',
                  gap: '28px 14px',
                }}
              >
                {sortedPeople.slice(0, 6).map((person, idx) => (
                  <ArchPersonCard
                    key={person.id || `${person.name}-${idx}`}
                    person={person}
                    index={idx}
                    onSelect={setModalItem}
                  />
                ))}
              </div>
            )}

            <div style={{ marginTop: '40px' }}>
              <a
                className="btn"
                href="#people"
                onClick={openPeoplePage}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  minHeight: '52px',
                  padding: '0 28px',
                  border: '1.5px solid #16213A',
                  borderRadius: '999px',
                  fontWeight: 600,
                  fontSize: '15px',
                  color: '#16213A',
                }}
              >
                View all people ({sortedPeople.length})
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </section>

          {/* Photos */}
          <section id="photos" style={{ maxWidth: '1120px', margin: '0 auto', padding: '88px 20px 0' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '16px' }}>
              <span style={{ fontFamily: "'Fraunces',Georgia,serif", fontStyle: 'italic', fontSize: '20px', color: ACCENT }}>
                02
              </span>
              <span style={{ fontSize: '12px', letterSpacing: '.2em', textTransform: 'uppercase', fontWeight: 600 }}>
                Photos
              </span>
              <span style={{ flex: 1, height: '1px', background: 'rgba(22,33,58,.2)' }} />
            </div>

            <h2
              className="sec-title"
              style={{
                margin: '0 0 12px',
                fontFamily: "'Fraunces',Georgia,serif",
                fontWeight: 400,
                fontSize: '38px',
                lineHeight: 1.1,
                letterSpacing: '-.02em',
              }}
            >
              Moments we will <em style={{ fontStyle: 'italic' }}>never retake</em>
            </h2>
            <p style={{ margin: '0 0 32px', color: '#4B5468', maxWidth: '32em' }}>
              The campus, the corridors and every ordinary day that turned out to matter.
            </p>

            <div className="masonry-grid">
              {siteData.photos.map((ph) => (
                <PhotoTile key={ph.id} item={ph} onSelect={setModalItem} />
              ))}
            </div>
          </section>

          {/* Creative work */}
          <section id="creative" style={{ maxWidth: '1120px', margin: '0 auto', padding: '88px 20px 88px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '16px' }}>
              <span style={{ fontFamily: "'Fraunces',Georgia,serif", fontStyle: 'italic', fontSize: '20px', color: ACCENT }}>
                03
              </span>
              <span style={{ fontSize: '12px', letterSpacing: '.2em', textTransform: 'uppercase', fontWeight: 600 }}>
                Creative work
              </span>
              <span style={{ flex: 1, height: '1px', background: 'rgba(22,33,58,.2)' }} />
            </div>

            <h2
              className="sec-title"
              style={{
                margin: '0 0 12px',
                fontFamily: "'Fraunces',Georgia,serif",
                fontWeight: 400,
                fontSize: '38px',
                lineHeight: 1.1,
                letterSpacing: '-.02em',
              }}
            >
              Made by us, <em style={{ fontStyle: 'italic' }}>for us</em>
            </h2>
            <p style={{ margin: '0 0 32px', color: '#4B5468', maxWidth: '32em' }}>
              Poems, sketches, stories and everything our classmates dreamed up between classes.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
                gap: '16px',
              }}
            >
              {siteData.works.map((w, idx) => {
                const bg = w.bg || CREATIVE_TINTS[idx % CREATIVE_TINTS.length];
                return (
                  <article
                    key={idx}
                    role="button"
                    tabIndex={0}
                    onClick={() =>
                      setModalItem({
                        tag: w.tag,
                        title: w.title,
                        sub: `By ${w.author}`,
                        body: w.fullText,
                        bg,
                      })
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setModalItem({
                          tag: w.tag,
                          title: w.title,
                          sub: `By ${w.author}`,
                          body: w.fullText,
                          bg,
                        });
                      }
                    }}
                    style={{
                      borderRadius: '22px',
                      padding: '26px 24px 24px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '18px',
                      minHeight: '250px',
                      background: bg,
                      cursor: 'pointer',
                    }}
                  >
                    <span
                      style={{
                        alignSelf: 'flex-start',
                        border: '1px solid #16213A',
                        borderRadius: '999px',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '.14em',
                        textTransform: 'uppercase',
                        padding: '6px 12px',
                      }}
                    >
                      {w.tag}
                    </span>
                    <h3
                      style={{
                        margin: 0,
                        fontFamily: "'Fraunces',Georgia,serif",
                        fontWeight: 400,
                        fontSize: '28px',
                        lineHeight: 1.15,
                        letterSpacing: '-.01em',
                      }}
                    >
                      {w.title}
                    </h3>
                    <p style={{ margin: 0, fontStyle: 'italic', color: '#2F3A52', flex: 1 }}>{w.excerpt}</p>
                    <span style={{ fontSize: '14px', fontWeight: 600 }}>by {w.author}</span>
                  </article>
                );
              })}
            </div>
          </section>
        </main>
      )}

      {/* Footer */}
      <footer
        style={{
          background: '#16213A',
          color: '#F5EFE3',
          padding: '72px 20px 36px',
          borderRadius: '32px 32px 0 0',
        }}
      >
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <div
            style={{
              fontFamily: "'Fraunces',Georgia,serif",
              fontStyle: 'italic',
              fontSize: '48px',
              lineHeight: 1.05,
              letterSpacing: '-.02em',
            }}
          >
            {siteData.meta.footerHeadline1}
            <br />
            {siteData.meta.footerHeadline2}
          </div>
          <p style={{ margin: '20px 0 36px', color: '#CFC8B8', maxWidth: '28em' }}>
            {siteData.meta.footerBody}
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px 28px',
              padding: '20px 0',
              borderTop: '1px solid rgba(245,239,227,.2)',
              borderBottom: '1px solid rgba(245,239,227,.2)',
            }}
          >
            <a href="#people" onClick={openPeoplePage} style={{ fontWeight: 600, padding: '10px 0', minHeight: '44px' }}>
              People
            </a>
            <a href="#photos" onClick={(e) => goHomeSection(e, 'photos')} style={{ fontWeight: 600, padding: '10px 0', minHeight: '44px' }}>
              Photos
            </a>
            <a href="#creative" onClick={(e) => goHomeSection(e, 'creative')} style={{ fontWeight: 600, padding: '10px 0', minHeight: '44px' }}>
              Creative work
            </a>
            <a href="../" style={{ fontWeight: 600, padding: '10px 0', minHeight: '44px' }}>
              Dark version
            </a>
            <a
              href="#top"
              onClick={(e) => goHomeSection(e, null)}
              style={{ fontWeight: 600, padding: '10px 0', minHeight: '44px', color: '#F2A794' }}
            >
              Back to top ↑
            </a>
          </div>
          <p style={{ margin: '24px 0 0', fontSize: '13px', color: '#B9B2A2' }}>{siteData.meta.copyright}</p>
        </div>
      </footer>

      {/* Reading / Detail Modal */}
      {modalItem && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setModalItem(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            background: 'rgba(22,33,58,.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '560px',
              maxHeight: '85vh',
              overflowY: 'auto',
              background: '#F5EFE3',
              color: '#16213A',
              borderRadius: '24px',
              padding: '28px',
              border: '1.5px solid #16213A',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    border: '1px solid #16213A',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '.14em',
                    textTransform: 'uppercase',
                    padding: '4px 10px',
                    marginBottom: '10px',
                  }}
                >
                  {modalItem.tag}
                </span>
                <h3
                  style={{
                    margin: '0 0 4px',
                    fontFamily: "'Fraunces',Georgia,serif",
                    fontWeight: 400,
                    fontSize: '30px',
                    lineHeight: 1.15,
                  }}
                >
                  {modalItem.title}
                </h3>
                <div style={{ fontSize: '13px', color: '#4B5468', fontWeight: 600 }}>{modalItem.sub}</div>
              </div>

              <button
                type="button"
                aria-label="Close"
                onClick={() => setModalItem(null)}
                className="btn"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '999px',
                  border: '1.5px solid #16213A',
                  background: 'transparent',
                  color: '#16213A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                ✕
              </button>
            </div>

            {modalItem.image && (
              <img
                src={modalItem.image}
                alt={modalItem.title}
                style={{
                  width: '100%',
                  maxHeight: '300px',
                  objectFit: 'cover',
                  borderRadius: '14px',
                  marginBottom: '18px',
                  display: 'block',
                }}
              />
            )}

            <p style={{ margin: 0, fontSize: '17px', lineHeight: 1.75, whiteSpace: 'pre-line' }}>
              {modalItem.body}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
