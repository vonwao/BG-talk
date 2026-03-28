import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const manifestPath = path.join(rootDir, 'assets', 'bruno-groening-gallery', 'manifest.tsv');
const outputPath = path.join(rootDir, 'bruno-gallery-guide.html');

const SLIDES = [
  { number: 1, section: 'Title', title: 'Title', blurb: 'The Man Who Said You Can Receive Help' },
  { number: 2, section: 'Identity', title: 'Opening hook', blurb: "Imagine you're sick and nothing has worked." },
  { number: 3, section: 'Identity', title: 'Herford 1949', blurb: 'Thousands showed up in Herford looking for help.' },
  { number: 4, section: 'Identity', title: 'Identity anchor', quote: 'No human being can heal; it is always only the One, God.' },
  { number: 5, section: 'Healing', title: 'Pain and hopelessness', blurb: 'Why people came: suffering, ruins, need.' },
  { number: 6, section: 'Healing', title: 'Healing anchor', quote: 'Trust and believe, the divine power helps and heals.' },
  { number: 7, section: 'Healing', title: 'Heilstrom', blurb: 'Stop clinging to what is wrong and learn to receive.' },
  { number: 8, section: 'Healing', title: 'Radical hope', quote: 'There is no incurable.' },
  { number: 9, section: 'Healing', title: 'Mystery and skepticism', quote: 'There is much that cannot be explained, but nothing that cannot happen.' },
  { number: 10, section: 'Inner Life', title: 'Older spiritual echoes', blurb: 'Kingdom within, living water, grace received.' },
  { number: 11, section: 'Inner Life', title: 'Thoughts are energy', quote: 'It is so important which thoughts a person accepts, for thoughts are energy.' },
  { number: 12, section: 'Inner Life', title: 'Creature of love', quote: 'The human being is a creature of love.' },
  { number: 13, section: 'Cosmic Stakes', title: 'Cosmic drama', blurb: 'Love against destruction, God against evil.' },
  { number: 14, section: 'Cosmic Stakes', title: 'Free will', quote: 'Man has a sacrosanct free will.' },
  { number: 15, section: 'Personal', title: 'Why I am talking about this', blurb: 'Engineer, systems, code, and the question of the human being.' },
  { number: 16, section: 'Personal', title: 'Personal testimony', blurb: "I'm telling you what I found." },
  { number: 17, section: 'Personal', title: 'Pause', blurb: 'Silence and reset.' },
  { number: 18, section: 'Closing', title: 'Help is available', blurb: 'Human beings are open, and help is available.' },
  { number: 19, section: 'Closing', title: 'Invitation', blurb: 'Worth considering; the Circle of Friends is active worldwide.' },
  { number: 20, section: 'Closing', title: 'Thank you', blurb: 'Closing slide.' },
];

const slideByNumber = new Map(SLIDES.map((slide) => [slide.number, slide]));

function normalize(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function truncate(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength - 1).trimEnd()}\u2026`;
}

function extractInlineQuote(caption) {
  const smartOpen = caption.indexOf('‘');
  const smartClose = caption.lastIndexOf('’');
  if (smartOpen !== -1 && smartClose > smartOpen) {
    return caption.slice(smartOpen + 1, smartClose).replace(/\s+/g, ' ').trim();
  }

  const plainOpen = caption.indexOf('"');
  const plainClose = caption.lastIndexOf('"');
  if (plainOpen !== -1 && plainClose > plainOpen) {
    return caption.slice(plainOpen + 1, plainClose).replace(/\s+/g, ' ').trim();
  }

  return null;
}

function makeSlideSummary(number) {
  const slide = slideByNumber.get(number);
  if (!slide) {
    return `Slide ${number}`;
  }
  if (slide.quote) {
    return `Slide ${slide.number}: "${slide.quote}"`;
  }
  return `Slide ${slide.number}: ${slide.title}`;
}

function buildEntry(row) {
  const inlineQuote = extractInlineQuote(row.caption);
  const searchText = normalize([row.caption, inlineQuote || ''].join(' '));

  const themes = [];
  const slideScores = new Map();
  const notes = [];

  function addTheme(theme) {
    if (!themes.includes(theme)) {
      themes.push(theme);
    }
  }

  function addSlides(numbers) {
    numbers.forEach((number, index) => {
      const score = Math.max(1, numbers.length - index + 1);
      slideScores.set(number, (slideScores.get(number) || 0) + score);
    });
  }

  function topSlideNumbers() {
    return [...slideScores.entries()]
      .sort((left, right) => {
        if (right[1] !== left[1]) {
          return right[1] - left[1];
        }
        return left[0] - right[0];
      })
      .map(([number]) => number);
  }

  function addPrimaryTheme(theme) {
    if (themes[0] !== theme) {
      addTheme(theme);
      const existingIndex = themes.indexOf(theme);
      if (existingIndex > 0) {
        themes.splice(existingIndex, 1);
        themes.unshift(theme);
      }
    }
  }

  function addRule(theme, numbers, why) {
    addTheme(theme);
    addSlides(numbers);
    if (why && !notes.includes(why)) {
      notes.push(why);
    }
  }

  const isGenericPortrait = searchText.trim() === 'bruno groning';

  if (/herford/.test(searchText) && /(balcony|march|wilhelmplatz|wilhelmsplatz|at herford)/.test(searchText)) {
    addRule('Herford 1949', [3, 5, 4], 'Anchors the story in the original Herford setting and public appearance.');
  }

  if (/people seeking help|requests for healing|flood of letters/.test(searchText)) {
    addRule('Crowds / desperation', [2, 3, 5], 'Shows the scale of need and why people were drawn to him.');
  }

  if (/healed person|wheelchair|mass and distant healings|communications from people who had been healed|helped many people|good things/.test(searchText)) {
    addRule('Healing testimony', [6, 8, 9], 'Fits the slides about healing reports, radical hope, and unexplained change.');
  }

  if (/visits a person seeking help|with a person seeking help|administers healing|train window/.test(searchText)) {
    addRule('Healing encounter', [5, 6, 8], 'Puts the healing story into a direct human scene.');
  }

  if (/traberhof/.test(searchText)) {
    addRule('Mass healings / public phenomenon', [5, 8, 9], 'Shows the scale, visibility, and public nature of the movement.');
  }

  if (/reporter|documentary/.test(searchText)) {
    addRule('Media / skepticism', [9, 3, 19], 'Best for the public-attention and skepticism material.');
  }

  if (/grave/.test(searchText)) {
    addRule('Legacy', [18, 20], 'Use only if you want a reflective ending or historical coda.');
  }

  if (/animals/.test(searchText)) {
    addRule('Love / gentleness', [12, 18], 'Works best with the love theme or a softer closing tone.');
  }

  if (/goes his way/.test(searchText)) {
    addRule('Path / conviction', [15, 16, 18], 'Carries a solitary, reflective energy that fits the personal turn.');
  }

  if (/workplace/.test(searchText)) {
    addRule('Context / place', [5, 7, 19], 'Useful when you want grounded historical context rather than a symbolic portrait.');
  }

  if (/all people|all nations|regardless of nationality|regardless of religion/.test(searchText)) {
    addRule('Universality / invitation', [19, 18], 'Connects directly to the closing invitation and worldwide scope.');
  }

  if (/believe|god will help|just believe|trust/.test(searchText)) {
    addRule('Faith / receptivity', [6, 8, 18], 'Directly supports the trust-and-receive framing.');
  }

  if (/order|divine law|natural creature|natural things/.test(searchText)) {
    addRule('Divine order', [11, 14, 18], 'Best for the inner-order and free-will parts of the deck.');
  }

  if (/receive|absorb the divine|healing wave|receiving station|transmitter|divine calm|patience/.test(searchText)) {
    addRule('Heilstrom / receiving', [7, 10, 11], 'Pairs well with slides about receptivity, thought, and inner stillness.');
  }

  if (/love|neighbors|peace and quiet|peace at heart/.test(searchText)) {
    addRule('Love / peace', [12, 18, 19], 'Fits the creature-of-love material and the warmer closing slides.');
  }

  if (/evil|bad, by evil|stronger than evil|satan/.test(searchText)) {
    addRule('Cosmic struggle', [13, 14], 'Best for the good-versus-evil turn in the deck.');
  }

  if (/conviction|telling you what i found/.test(searchText)) {
    addRule('Conviction / testimony', [16, 18], 'Useful when the talk turns personal and experiential.');
  }

  if (/body|return to health|health suffers|pay more attention to your body/.test(searchText)) {
    addRule('Embodiment / restored health', [5, 8, 11], 'Supports the health-and-healing logic without needing a crowd scene.');
  }

  if (/holy of holies|ancient, the true human instinct|creature/.test(searchText)) {
    addRule('Spiritual anthropology', [10, 12, 18], 'Best for the inner-life and human-nature parts of the talk.');
  }

  if (isGenericPortrait) {
    addRule('Portrait / identity', [1, 4, 16], 'Best when you want a face rather than a crowd or quote card.');
  }

  if (!themes.length && inlineQuote) {
    addRule('Quote card / alternate copy', [18, 19], 'Useful as alternate textual art if you swap in a photo-quote slide.');
  }

  if (!themes.length) {
    addRule('Portrait / context', [1, 18, 19], 'Broad fallback for images that work more by tone than by explicit theme.');
  }

  if (/healed person|wheelchair/.test(searchText)) {
    addPrimaryTheme('Healing testimony');
  }

  if (/people seeking help|requests for healing|flood of letters/.test(searchText)) {
    addPrimaryTheme('Crowds / desperation');
  }

  if (/reporter|documentary/.test(searchText)) {
    addPrimaryTheme('Media / skepticism');
  }

  const filename = path.posix.basename(new URL(row.url).pathname);
  const imagePath = path.posix.join('assets', 'bruno-groening-gallery', filename);
  const slideFits = topSlideNumbers().slice(0, 4).map((number) => ({
    number,
    summary: makeSlideSummary(number),
    section: slideByNumber.get(number)?.section || 'Other',
  }));

  const sections = [...new Set(slideFits.map((fit) => fit.section))];
  const displayTitle = inlineQuote ? `Quote card: ${truncate(inlineQuote, 88)}` : row.caption;

  return {
    id: row.id,
    filename,
    imagePath,
    caption: row.caption,
    displayTitle,
    inlineQuote,
    isQuoteCard: Boolean(inlineQuote),
    themes: themes.slice(0, 5),
    slideFits,
    sections,
    why: notes[0] || 'First-pass fit based on the official gallery caption and the current deck structure.',
    searchBlob: normalize([displayTitle, row.caption, themes.join(' '), slideFits.map((fit) => fit.summary).join(' ')].join(' ')),
  };
}

function parseManifest() {
  const raw = fs.readFileSync(manifestPath, 'utf8').trim();
  return raw
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      const [id, , url, ...captionParts] = line.split('\t');
      return {
        id,
        url,
        caption: captionParts.join('\t').trim(),
      };
    });
}

function renderHtml(entries) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bruno Gr\u00f6ning Gallery Guide</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Source+Sans+3:wght@400;500;600;700&display=swap');

    :root {
      --paper: #f5efe4;
      --paper-2: #fbf8f1;
      --ink: #1f1b17;
      --muted: #6f6559;
      --line: rgba(78, 61, 39, 0.14);
      --accent: #8d6b3b;
      --accent-strong: #5c421f;
      --chip: rgba(141, 107, 59, 0.11);
      --shadow: 0 18px 48px rgba(37, 27, 14, 0.12);
      --radius: 22px;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      min-height: 100vh;
      color: var(--ink);
      font-family: 'Source Sans 3', system-ui, sans-serif;
      background:
        radial-gradient(circle at top, rgba(183, 149, 98, 0.18), transparent 28%),
        linear-gradient(180deg, #f7f1e6 0%, #f4ead8 100%);
    }

    body::before {
      content: '';
      position: fixed;
      inset: 0;
      pointer-events: none;
      background-image:
        linear-gradient(rgba(93, 71, 44, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(93, 71, 44, 0.03) 1px, transparent 1px);
      background-size: 32px 32px;
      mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.65), transparent);
    }

    main {
      width: min(1780px, calc(100vw - 32px));
      margin: 0 auto;
      padding: 18px 0 30px;
    }

    .layout {
      display: grid;
      grid-template-columns: minmax(290px, 360px) minmax(0, 1fr);
      gap: 24px;
      align-items: start;
    }

    .sidebar {
      position: sticky;
      top: 18px;
      max-height: calc(100vh - 36px);
      overflow: auto;
      padding-right: 6px;
      scrollbar-width: thin;
      scrollbar-color: rgba(141, 107, 59, 0.35) transparent;
    }

    .sidebar::-webkit-scrollbar {
      width: 8px;
    }

    .sidebar::-webkit-scrollbar-thumb {
      background: rgba(141, 107, 59, 0.35);
      border-radius: 999px;
    }

    .hero {
      border: 1px solid var(--line);
      border-radius: 28px;
      padding: 24px 24px 20px;
      background: rgba(251, 248, 241, 0.92);
      backdrop-filter: blur(18px);
      box-shadow: var(--shadow);
    }

    .hero h1 {
      margin: 0 0 10px;
      font: 600 clamp(2.2rem, 3.6vw, 3.5rem)/0.95 'Cormorant Garamond', Georgia, serif;
      letter-spacing: 0.02em;
    }

    .hero p {
      max-width: 74ch;
      margin: 0;
      color: var(--muted);
      font-size: 1.02rem;
      line-height: 1.45;
    }

    .toolbar {
      display: grid;
      gap: 16px;
      margin-top: 18px;
    }

    .search-row {
      display: grid;
      gap: 12px;
    }

    .search-row input {
      width: 100%;
      padding: 14px 16px;
      border: 1px solid var(--line);
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.75);
      color: var(--ink);
      font: 500 1rem/1.2 'Source Sans 3', sans-serif;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);
    }

    .toggle {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 11px 14px;
      border: 1px solid var(--line);
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.65);
      color: var(--muted);
      font-weight: 600;
      width: fit-content;
    }

    .toggle input {
      accent-color: var(--accent-strong);
    }

    .count {
      color: var(--accent-strong);
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      font-size: 0.86rem;
    }

    .filter-strip {
      display: grid;
      gap: 10px;
    }

    .filter-label {
      color: var(--muted);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-size: 0.78rem;
      font-weight: 700;
    }

    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .chip-button {
      appearance: none;
      border: 1px solid var(--line);
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.76);
      padding: 10px 14px;
      color: var(--muted);
      cursor: pointer;
      font: 600 0.93rem/1 'Source Sans 3', sans-serif;
      transition: transform 120ms ease, border-color 120ms ease, color 120ms ease, background 120ms ease;
    }

    .chip-button:hover {
      transform: translateY(-1px);
      border-color: rgba(92, 66, 31, 0.28);
      color: var(--accent-strong);
    }

    .chip-button.is-active {
      background: linear-gradient(135deg, var(--accent) 0%, #b59261 100%);
      border-color: transparent;
      color: #fffaf3;
      box-shadow: 0 10px 24px rgba(92, 66, 31, 0.2);
    }

    .deck-map {
      display: grid;
      grid-template-columns: 1fr;
      gap: 10px;
    }

    .section-card {
      border: 1px solid var(--line);
      border-radius: 18px;
      padding: 14px 14px 12px;
      background: rgba(255, 255, 255, 0.56);
      box-shadow: 0 8px 24px rgba(57, 42, 22, 0.06);
    }

    .section-card h2 {
      margin: 0 0 6px;
      font: 600 1.2rem/1 'Cormorant Garamond', Georgia, serif;
    }

    .section-card p {
      margin: 0 0 10px;
      color: var(--muted);
      font-size: 0.9rem;
      line-height: 1.35;
    }

    .section-card .slides {
      color: var(--accent-strong);
      font-weight: 700;
      font-size: 0.82rem;
      letter-spacing: 0.02em;
    }

    .content {
      min-width: 0;
    }

    .content-header {
      display: flex;
      align-items: end;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 18px;
      padding: 6px 4px 0;
    }

    .content-header h2 {
      margin: 0;
      font: 600 clamp(1.7rem, 2.4vw, 2.35rem)/0.98 'Cormorant Garamond', Georgia, serif;
      letter-spacing: 0.02em;
    }

    .content-header p {
      margin: 6px 0 0;
      color: var(--muted);
      max-width: 72ch;
      line-height: 1.4;
    }

    .gallery {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
      gap: 18px;
    }

    .card {
      display: grid;
      gap: 16px;
      border: 1px solid var(--line);
      border-radius: var(--radius);
      padding: 18px;
      background: rgba(255, 255, 255, 0.78);
      box-shadow: 0 12px 30px rgba(48, 35, 18, 0.08);
    }

    .card-image {
      display: block;
      border-radius: 18px;
      overflow: hidden;
      background: #ede3d2;
      aspect-ratio: 4 / 3;
      border: 1px solid rgba(78, 61, 39, 0.08);
    }

    .card-image img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 180ms ease;
    }

    .card-image:hover img {
      transform: scale(1.02);
    }

    .eyebrow {
      color: var(--accent-strong);
      text-transform: uppercase;
      letter-spacing: 0.12em;
      font-size: 0.75rem;
      font-weight: 700;
    }

    .card h3 {
      margin: 4px 0 0;
      font: 600 1.5rem/1.05 'Cormorant Garamond', Georgia, serif;
    }

    .caption {
      margin: 8px 0 0;
      color: var(--muted);
      line-height: 1.42;
      font-size: 0.98rem;
    }

    .why {
      margin: 0;
      padding: 12px 14px;
      border-radius: 16px;
      background: rgba(141, 107, 59, 0.08);
      color: #5a4527;
      font-weight: 600;
      line-height: 1.36;
    }

    .meta-block {
      display: grid;
      gap: 8px;
    }

    .meta-title {
      color: var(--muted);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-size: 0.76rem;
      font-weight: 700;
    }

    .tag-list,
    .slide-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .tag,
    .slide-tag {
      border-radius: 999px;
      padding: 8px 12px;
      font-size: 0.9rem;
      line-height: 1.2;
    }

    .tag {
      background: var(--chip);
      color: var(--accent-strong);
      border: 1px solid rgba(141, 107, 59, 0.14);
    }

    .slide-tag {
      background: rgba(39, 30, 18, 0.06);
      border: 1px solid rgba(39, 30, 18, 0.08);
      color: var(--ink);
    }

    details {
      border-top: 1px solid rgba(78, 61, 39, 0.09);
      padding-top: 12px;
    }

    summary {
      cursor: pointer;
      color: var(--accent-strong);
      font-weight: 700;
    }

    blockquote {
      margin: 12px 0 0;
      padding-left: 14px;
      border-left: 3px solid rgba(141, 107, 59, 0.28);
      color: var(--muted);
      font-style: italic;
      line-height: 1.45;
    }

    .empty {
      grid-column: 1 / -1;
      border: 1px dashed rgba(78, 61, 39, 0.25);
      border-radius: var(--radius);
      padding: 28px;
      text-align: center;
      color: var(--muted);
      background: rgba(255, 255, 255, 0.52);
    }

    @media (max-width: 1120px) {
      .layout {
        grid-template-columns: 320px minmax(0, 1fr);
        gap: 18px;
      }

      .gallery {
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      }
    }

    @media (max-width: 900px) {
      main {
        width: min(100vw - 24px, 1480px);
        padding-top: 20px;
      }

      .layout {
        grid-template-columns: 1fr;
      }

      .sidebar {
        position: static;
        max-height: none;
        overflow: visible;
        padding-right: 0;
      }

      .hero {
        padding: 20px 18px 18px;
      }

      .content-header {
        padding-inline: 0;
      }

      .gallery {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <main>
    <div class="layout">
      <aside class="sidebar">
        <section class="hero">
          <h1>Bruno Gr\u00f6ning Gallery Guide</h1>
          <p>
            First-pass curation for <code>slides-v0.3.html</code>. Each card shows the image, the theme tags it most naturally fits,
            the slide numbers it could work on, and the current slide quote when that slide is a quote slide. This is intentionally a
            decision aid, not a final design commitment.
          </p>

          <div class="toolbar">
            <div class="search-row">
              <input id="search" type="search" placeholder="Search by caption, theme, slide, or quote">
              <label class="toggle">
                <input id="quote-only" type="checkbox">
                Quote cards only
              </label>
              <div class="count" id="count"></div>
            </div>

            <div class="filter-strip">
              <div class="filter-label">Filter By Deck Section</div>
              <div class="chips" id="section-filters"></div>
            </div>

            <div class="filter-strip">
              <div class="filter-label">Filter By Theme</div>
              <div class="chips" id="theme-filters"></div>
            </div>

            <div class="filter-strip">
              <div class="filter-label">Deck Map</div>
              <div class="deck-map" id="deck-map"></div>
            </div>
          </div>
        </section>
      </aside>

      <section class="content">
        <div class="content-header">
          <div>
            <h2>Photo Fits For The Current Deck</h2>
            <p>Use the left panel to narrow by section, theme, or quote-only images. The cards on the right are meant to be scanned quickly while you decide what belongs in the presentation.</p>
          </div>
        </div>

        <section class="gallery" id="gallery"></section>
      </section>
    </div>
  </main>

  <script>
    const slides = ${JSON.stringify(SLIDES)};
    const gallery = ${JSON.stringify(entries)};

    const sectionOrder = ['All', ...Array.from(new Set(slides.map((slide) => slide.section)))];
    const themeOrder = ['All', ...Array.from(new Set(gallery.flatMap((item) => item.themes))).sort((a, b) => a.localeCompare(b))];

    const state = {
      section: 'All',
      theme: 'All',
      query: '',
      quoteOnly: false
    };

    const galleryEl = document.getElementById('gallery');
    const countEl = document.getElementById('count');
    const searchEl = document.getElementById('search');
    const quoteOnlyEl = document.getElementById('quote-only');

    function createButton(label, isActive, onClick) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'chip-button' + (isActive ? ' is-active' : '');
      button.textContent = label;
      button.addEventListener('click', onClick);
      return button;
    }

    function renderSectionFilters() {
      const wrap = document.getElementById('section-filters');
      wrap.innerHTML = '';
      sectionOrder.forEach((section) => {
        wrap.appendChild(createButton(section, state.section === section, () => {
          state.section = section;
          render();
        }));
      });
    }

    function renderThemeFilters() {
      const wrap = document.getElementById('theme-filters');
      wrap.innerHTML = '';
      themeOrder.forEach((theme) => {
        wrap.appendChild(createButton(theme, state.theme === theme, () => {
          state.theme = theme;
          render();
        }));
      });
    }

    function renderDeckMap() {
      const wrap = document.getElementById('deck-map');
      const sectionSummaries = sectionOrder
        .filter((section) => section !== 'All')
        .map((section) => {
          const sectionSlides = slides.filter((slide) => slide.section === section);
          const slideNumbers = sectionSlides.map((slide) => slide.number).join(', ');
          const blurb = sectionSlides.find((slide) => slide.quote)?.quote || sectionSlides[0].blurb || sectionSlides[0].title;
          return { section, slideNumbers, blurb };
        });

      wrap.innerHTML = sectionSummaries.map((item) => \`
        <article class="section-card">
          <h2>\${item.section}</h2>
          <p>\${item.blurb}</p>
          <div class="slides">Slides \${item.slideNumbers}</div>
        </article>
      \`).join('');
    }

    function matches(item) {
      if (state.quoteOnly && !item.isQuoteCard) {
        return false;
      }
      if (state.section !== 'All' && !item.sections.includes(state.section)) {
        return false;
      }
      if (state.theme !== 'All' && !item.themes.includes(state.theme)) {
        return false;
      }
      if (state.query) {
        return item.searchBlob.includes(state.query);
      }
      return true;
    }

    function renderCard(item) {
      const tags = item.themes.map((theme) => \`<span class="tag">\${theme}</span>\`).join('');
      const slideTags = item.slideFits.map((fit) => \`<span class="slide-tag">\${fit.summary}</span>\`).join('');
      const quoteBlock = item.inlineQuote
        ? \`<details><summary>Image Quote</summary><blockquote>\${item.inlineQuote}</blockquote></details>\`
        : '';

      return \`
        <article class="card">
          <a class="card-image" href="\${item.imagePath}" target="_blank" rel="noreferrer">
            <img src="\${item.imagePath}" alt="\${item.caption}">
          </a>

          <div class="meta-block">
            <div class="eyebrow">\${item.id} • \${item.filename}</div>
            <h3>\${item.displayTitle}</h3>
            <p class="caption">\${item.caption}</p>
          </div>

          <p class="why">\${item.why}</p>

          <div class="meta-block">
            <div class="meta-title">Themes</div>
            <div class="tag-list">\${tags}</div>
          </div>

          <div class="meta-block">
            <div class="meta-title">Suggested Slides</div>
            <div class="slide-list">\${slideTags}</div>
          </div>

          \${quoteBlock}
        </article>
      \`;
    }

    function render() {
      const filtered = gallery.filter(matches);
      countEl.textContent = \`\${filtered.length} of \${gallery.length} images\`;

      if (!filtered.length) {
        galleryEl.innerHTML = '<div class="empty">No images match the current filters.</div>';
        renderSectionFilters();
        renderThemeFilters();
        return;
      }

      galleryEl.innerHTML = filtered.map(renderCard).join('');
      renderSectionFilters();
      renderThemeFilters();
    }

    searchEl.addEventListener('input', (event) => {
      state.query = event.target.value.trim().toLowerCase();
      render();
    });

    quoteOnlyEl.addEventListener('change', (event) => {
      state.quoteOnly = event.target.checked;
      render();
    });

    renderDeckMap();
    render();
  </script>
</body>
</html>
`;

  fs.writeFileSync(outputPath, html);
}

const manifestRows = parseManifest();
const galleryEntries = manifestRows.map(buildEntry);
renderHtml(galleryEntries);

console.log(`Wrote ${path.relative(rootDir, outputPath)} with ${galleryEntries.length} gallery cards.`);
