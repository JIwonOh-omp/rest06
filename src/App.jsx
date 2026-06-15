import { useState, useEffect, useRef, useCallback } from 'react';
import { ICONS, CATS, CATMAP, CLASSES, INSTRUCTORS, REVIEWS, STATS, PLANS } from './data';

/* ---------- Icon ---------- */
function Icon({ name, size = 24, sw = 2, cls = '' }) {
  const inner = ICONS[name] || '';
  return (
    <svg className={cls} width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
      dangerouslySetInnerHTML={{ __html: inner }} />
  );
}

/* ---------- Yarn ball ---------- */
function YarnBall({ size = 130, react = true }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!react) return;
    const onMove = (e) => {
      const el = ref.current; if (!el) return;
      const cx = window.innerWidth / 2, cy = 230;
      const dx = (e.clientX - cx) / cx, dy = (e.clientY - cy) / cy;
      el.style.transform = `translate(${dx * 14}px, ${dy * 8}px) rotate(${dx * 8}deg)`;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [react]);
  return (
    <div className="yarn-hero">
      <svg ref={ref} width={size} height={size} viewBox="0 0 130 130" style={{ overflow: 'visible', transition: 'transform .3s ease-out' }}>
        <defs>
          <radialGradient id="yb" cx="38%" cy="34%" r="75%">
            <stop offset="0%" className="yb0" /><stop offset="60%" className="yb1" /><stop offset="100%" className="yb2" />
          </radialGradient>
        </defs>
        <circle cx="65" cy="65" r="52" fill="url(#yb)" />
        <g stroke="rgba(255,255,255,.45)" strokeWidth="2.4" fill="none" strokeLinecap="round">
          <path d="M30 40c20 8 44 8 66-4M22 58c26 12 56 8 84-10M20 76c28 14 62 8 88-14M30 92c22 8 46 6 66-8" />
          <path d="M44 16c-10 24-12 70 6 98M64 13c-8 28-6 76 10 104M86 18c-4 26 2 68 14 92" />
        </g>
        <circle cx="65" cy="65" r="52" fill="none" stroke="var(--coral-deep)" strokeWidth="2" opacity=".5" />
      </svg>
    </div>
  );
}

/* ---------- custom cursor ---------- */
const CAKE_SVG = `
<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
  <path d="M11 21 L11 40 L43 31.5 Z" fill="#F7D49B" stroke="#C9883B" stroke-width="1.6" stroke-linejoin="round"/>
  <path d="M11 28.5 L43 31.5 L11 32.4 Z" fill="#FFF3DF"/>
  <path d="M11 21 L43 31.5 L11 25.6 Z" fill="#FFFFFF" stroke="#F0DCC4" stroke-width="0.7" stroke-linejoin="round"/>
  <circle cx="16" cy="23" r="1.7" fill="#FFFFFF"/>
  <circle cx="22" cy="25" r="1.7" fill="#FFFFFF"/>
  <circle cx="28" cy="26.8" r="1.6" fill="#FFFFFF"/>
  <circle cx="34" cy="28.6" r="1.4" fill="#FFFFFF"/>
  <path d="M13.4 14.2 q3.7 -2.3 7.4 0 q-1.9 2.4 -3.7 1.5 q-1.8 .9 -3.7 -1.5 z" fill="#5FB85C" stroke="#3E9E45" stroke-width="0.6" stroke-linejoin="round"/>
  <path d="M17 14.4 c3.1 0 5.2 2.6 4.6 5.2 c-.5 2.4 -2.6 3.7 -4.6 3.7 c-2 0 -4.1 -1.3 -4.6 -3.7 c-.6 -2.6 1.5 -5.2 4.6 -5.2 z" fill="#EE4338" stroke="#CE2F26" stroke-width="0.8" stroke-linejoin="round"/>
  <ellipse cx="15.5" cy="16.3" rx="1.3" ry="0.9" fill="#FFFFFF" opacity="0.45"/>
  <g fill="#FFE48C"><ellipse cx="15.3" cy="18.4" rx="0.7" ry="1"/><ellipse cx="18.4" cy="18" rx="0.7" ry="1"/><ellipse cx="16.7" cy="20.4" rx="0.7" ry="1"/><ellipse cx="19.4" cy="20.7" rx="0.7" ry="1"/></g>
</svg>`;

function Cursor() {
  useEffect(() => {
    if (matchMedia('(hover: none)').matches || matchMedia('(pointer: coarse)').matches) return;
    const cake = document.createElement('div'); cake.className = 'cake-cursor'; cake.innerHTML = CAKE_SVG;
    const trail = document.createElement('div'); trail.className = 'cake-trail';
    document.body.append(trail, cake);
    let mx = window.innerWidth / 2, my = window.innerHeight / 2, tx = mx, ty = my, shown = false;
    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      cake.style.transform = `translate(${mx}px,${my}px) translate(-30%,-32%)`;
      if (!shown) { shown = true; cake.style.opacity = trail.style.opacity = ''; }
    };
    const onOver = (e) => {
      const hot = e.target.closest('a,button,.card,.chip,.inst-card,.review,.step,.plan,.swatch');
      cake.classList.toggle('hot', !!hot);
    };
    const onDown = () => cake.classList.add('press');
    const onUp = () => cake.classList.remove('press');
    const onLeave = () => { cake.style.opacity = trail.style.opacity = '0'; shown = false; };
    let raf;
    const loop = () => {
      tx += (mx - tx) * 0.22; ty += (my - ty) * 0.22;
      trail.style.transform = `translate(${tx}px,${ty}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    window.addEventListener('mousemove', onMove); window.addEventListener('mouseover', onOver);
    window.addEventListener('mousedown', onDown); window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown); window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      cake.remove(); trail.remove();
    };
  }, []);
  return null;
}

/* ---------- scroll reveal ---------- */
function useReveal() {
  useEffect(() => {
    const els = [...document.querySelectorAll('.reveal')];
    const io = new IntersectionObserver((ents) => {
      ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.14 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

/* ---------- Thread ---------- */
function smoothPath(p) {
  if (p.length < 2) return '';
  let d = `M ${p[0].x} ${p[0].y}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] || p[i], p1 = p[i], p2 = p[i + 1], p3 = p[i + 2] || p2;
    const c1x = p1.x + (p2.x - p0.x) / 6, c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6, c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

function Thread() {
  const svgRef = useRef(null), pathRef = useRef(null), nodesRef = useRef(null);
  const state = useRef({ len: 0, nodes: [], y0: 0, y1: 1 });
  const build = useCallback(() => {
    const svg = svgRef.current, path = pathRef.current, g = nodesRef.current;
    if (!svg) return;
    const docH = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    const W = svg.parentElement.clientWidth;
    svg.setAttribute('viewBox', `0 0 ${W} ${docH}`);
    svg.parentElement.style.height = docH + 'px';
    svg.setAttribute('width', W); svg.setAttribute('height', docH);
    const anchors = [...document.querySelectorAll('[data-thread]')];
    const pts = anchors.map((el) => {
      const r = el.getBoundingClientRect();
      return { x: parseFloat(el.dataset.thread) * W, y: r.top + window.scrollY + r.height / 2, el };
    }).sort((a, b) => a.y - b.y);
    if (pts.length < 2) return;
    path.setAttribute('d', smoothPath(pts));
    const len = path.getTotalLength();
    path.style.strokeDasharray = len;
    state.current = { len, nodes: pts, y0: pts[0].y, y1: pts[pts.length - 1].y };
    g.innerHTML = '';
    pts.forEach((pt, i) => {
      const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const hide = i === 0 || 'threadHide' in pt.el.dataset;
      c.setAttribute('cx', pt.x); c.setAttribute('cy', pt.y); c.setAttribute('r', hide ? 0 : 8);
      c.setAttribute('class', 'thread-node'); g.appendChild(c); pt.node = c;
    });
    onScroll();
  }, []);
  const onScroll = useCallback(() => {
    const s = state.current; if (!s.len) return;
    const revealY = window.scrollY + window.innerHeight * 0.8;
    let prog = (revealY - s.y0) / Math.max(1, s.y1 - s.y0);
    prog = Math.max(0, Math.min(1, prog));
    pathRef.current.style.strokeDashoffset = s.len * (1 - prog);
    s.nodes.forEach((pt) => {
      if (!pt.node) return;
      const lit = revealY >= pt.y - 4;
      pt.node.classList.toggle('lit', lit);
      pt.node.classList.toggle('pulse', lit);
    });
  }, []);
  useEffect(() => {
    window.__rebuildThread = build;
    const t = [80, 400, 1000, 2200].map((ms) => setTimeout(build, ms));
    build();
    const onR = () => build();
    window.addEventListener('resize', onR);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.fonts && document.fonts.ready.then(build);
    return () => { t.forEach(clearTimeout); window.removeEventListener('resize', onR); window.removeEventListener('scroll', onScroll); };
  }, [build, onScroll]);
  return (
    <div className="thread-layer">
      <svg ref={svgRef} preserveAspectRatio="none">
        <defs>
          <linearGradient id="threadGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" className="tg0" /><stop offset="50%" className="tg1" /><stop offset="100%" className="tg2" />
          </linearGradient>
        </defs>
        <path ref={pathRef} className="thread-path" />
        <g ref={nodesRef}></g>
      </svg>
    </div>
  );
}

/* ---------- Theme switcher ---------- */
const THEMES = [
  { key: 'coral', label: '코랄', color: '#FF6A45' },
  { key: 'honey', label: '허니', color: '#F2A52E' },
  { key: 'terracotta', label: '테라코타', color: '#D9694C' },
  { key: 'berry', label: '베리', color: '#E25E86' },
  { key: 'apricot', label: '애프리콧', color: '#FF8A5B' },
];

function ThemeSwitch() {
  const [theme, setTheme] = useState(() => localStorage.getItem('poc-theme') || 'coral');
  useEffect(() => {
    const el = document.documentElement;
    el.classList.add('no-trans');
    el.dataset.theme = theme;
    localStorage.setItem('poc-theme', theme);
    void el.offsetWidth;
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.remove('no-trans')));
    window.__rebuildThread && window.__rebuildThread();
  }, [theme]);
  return (
    <div className="theme-pick" role="group" aria-label="색상 테마">
      <span className="tp-label"><Icon name="spark" size={15} /></span>
      {THEMES.map((t) => (
        <button key={t.key} className={'swatch' + (theme === t.key ? ' on' : '')}
          style={{ background: t.color }} onClick={() => setTheme(t.key)}
          title={t.label} aria-label={t.label} aria-pressed={theme === t.key} />
      ))}
    </div>
  );
}

/* ---------- Dark mode toggle ---------- */
function ModeToggle() {
  const [mode, setMode] = useState(() => localStorage.getItem('poc-mode') || 'light');
  useEffect(() => {
    const el = document.documentElement;
    el.classList.add('no-trans');
    el.dataset.mode = mode;
    localStorage.setItem('poc-mode', mode);
    void el.offsetWidth;
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.remove('no-trans')));
  }, [mode]);
  const dark = mode === 'dark';
  return (
    <button className={'mode-toggle' + (dark ? ' is-dark' : '')}
      onClick={() => setMode(dark ? 'light' : 'dark')}
      title={dark ? '라이트 모드로' : '다크 모드로'}
      aria-label={dark ? '라이트 모드로 전환' : '다크 모드로 전환'}
      aria-pressed={dark}>
      <span className="mt-icon"><Icon name={dark ? 'sun' : 'moon'} size={19} /></span>
    </button>
  );
}

/* ---------- Nav ---------- */
function YarnMini() {
  return (
    <svg className="yarn-mini" viewBox="0 0 34 34">
      <circle cx="17" cy="17" r="14" fill="var(--coral)" />
      <g stroke="rgba(255,255,255,.5)" strokeWidth="1.4" fill="none">
        <path d="M6 12c8 3 16 2 22-2M5 18c9 4 18 2 24-4M8 24c8 2 16 0 20-4" />
        <path d="M13 4c-3 8-3 20 2 26M22 5c-2 8 0 18 4 23" />
      </g>
    </svg>
  );
}

function Nav() {
  const [sc, setSc] = useState(false);
  useEffect(() => {
    const f = () => setSc(window.scrollY > 30); f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  return (
    <nav className={'nav' + (sc ? ' scrolled' : '')}>
      <a href="#top" className="brand"><YarnMini /> piece of cake</a>
      <div className="nav-links">
        <a href="#classes">클래스</a>
        <a href="#how">수강 방법</a>
        <a href="#reviews">후기</a>
        <a href="#teachers">강사</a>
        <a href="#pricing">멤버십</a>
      </div>
      <div className="nav-right">
        <ThemeSwitch />
        <ModeToggle />
        <a href="#pricing" className="btn btn-primary nav-cta">시작하기 <Icon name="arrow" size={18} cls="arr" /></a>
      </div>
    </nav>
  );
}

/* ---------- Hero ---------- */
function Marquee() {
  const items = CATS.filter((c) => c.key !== 'all');
  const row = [...items, ...items];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {row.map((c, i) => (
          <span className="mq-chip" key={i}>
            <span className="ic"><Icon name={c.icon} size={18} /></span>
            {c.label}
            <span style={{ color: 'var(--muted-text)', fontWeight: 600 }}>{c.en}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  const blobsRef = useRef(null);
  useEffect(() => {
    const onMove = (e) => {
      const dx = e.clientX / window.innerWidth - 0.5, dy = e.clientY / window.innerHeight - 0.5;
      blobsRef.current?.querySelectorAll('.float').forEach((el) => {
        const d = parseFloat(el.dataset.depth || 1);
        el.style.transform = `translate(${dx * 40 * d}px, ${dy * 40 * d}px)`;
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);
  const blob = (c) => <div className="blob" style={{ width: '100%', height: '100%', background: c }} />;
  return (
    <header className="hero" id="top">
      <div ref={blobsRef}>
        <div className="float" data-depth="1.4" style={{ left: '8%', top: '20%', width: 90, height: 90 }}>{blob('#FFD66B')}</div>
        <div className="float" data-depth="2.1" style={{ right: '10%', top: '16%', width: 64, height: 64 }}>{blob('#6FD7BD')}</div>
        <div className="float" data-depth="1.1" style={{ left: '16%', bottom: '20%', width: 52, height: 52 }}>{blob('#C7B4FF')}</div>
        <div className="float" data-depth="1.8" style={{ right: '14%', bottom: '24%', width: 78, height: 78 }}>{blob('#93C9FF')}</div>
        <div className="float" data-depth="2.4" style={{ right: '24%', top: '40%', width: 36, height: 36 }}>{blob('#FFAFC7')}</div>
        <div className="float" data-depth="1.5" style={{ left: '26%', top: '52%', width: 30, height: 30 }}>{blob('#FF9B3D')}</div>
      </div>
      <div className="wrap hero-inner">
        <div data-thread="0.5"><YarnBall /></div>
        <div className="hero-badge"><span className="dot"></span>매주 새로운 취미가 도착해요</div>
        <span className="thread-wp" data-thread="0.06" data-thread-hide="1"></span>
        <h1>Life is a<br /><span className="pop">piece of cake.</span></h1>
        <p className="kr-lead">누구나, 무엇이든, 즐겁게.<br />집에서 시작하는 어른들의 취미 한 조각.</p>
        <p className="lead">베이킹부터 드로잉, 손뜨개까지 — 실 한 가닥 풀듯<br />가볍게 시작해 끝까지 완성하는 온라인 클래스.</p>
        <div className="hero-cta">
          <a href="#classes" className="btn btn-primary">클래스 둘러보기 <Icon name="arrow" size={18} cls="arr" /></a>
          <a href="#how" className="btn btn-ghost"><Icon name="play" size={16} /> 어떻게 배우나요?</a>
        </div>
        <span className="thread-wp" data-thread="0.085" data-thread-hide="1"></span>
      </div>
      <div className="wrap"><Marquee /></div>
    </header>
  );
}

/* ---------- Tilt card ---------- */
function useTilt() {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${px * 7}deg) rotateX(${-py * 7}deg) translateY(-8px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = ''; };
  return { ref, onMouseMove: onMove, onMouseLeave: onLeave };
}

function ClassCard({ c, onOpen }) {
  const tilt = useTilt();
  const cat = CATMAP[c.cat];
  return (
    <article className="card reveal" {...tilt} onClick={() => onOpen(c)}>
      <div className="card-art" style={{ background: `linear-gradient(135deg, ${cat.grad[0]}, ${cat.grad[1]})` }}>
        <span className="lvl">{c.level}</span>
        <Icon name={cat.icon} size={76} sw={1.6} cls="ic-big" />
      </div>
      <div className="card-body">
        <div className="cat-tag">{cat.label} · {cat.en}</div>
        <h3>{c.title}</h3>
        <div className="inst">{c.instructor} 선생님 · 총 {c.lessons}강</div>
        <div className="card-meta">
          <span className="price">{c.price}<small>원~</small></span>
          <span className="rating">
            <span className="star"><Icon name="star" size={16} /></span>
            {c.rating} <span style={{ color: 'var(--muted-text)', fontWeight: 600 }}>({c.students})</span>
          </span>
        </div>
      </div>
    </article>
  );
}

/* ---------- Classes section ---------- */
function Classes({ onOpen }) {
  const [cat, setCat] = useState('all');
  const list = cat === 'all' ? CLASSES : CLASSES.filter((c) => c.cat === cat);
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      document.querySelectorAll('#classes .reveal').forEach((el) => el.classList.add('in'));
      window.__rebuildThread && window.__rebuildThread();
    });
    return () => cancelAnimationFrame(id);
  }, [cat]);
  return (
    <section className="section" id="classes">
      <div className="wrap">
        <div className="reveal" data-thread="0.14">
          <span className="eyebrow">Popular Classes</span>
          <h2 className="h-sec">지금 가장 사랑받는 클래스</h2>
          <p className="sub-sec">관심 가는 카테고리를 골라보세요. 입문자도 끝까지 완주하는,
            평점 높은 클래스만 모았어요.</p>
        </div>
        <div className="cat-row reveal d1">
          {CATS.map((c) => (
            <button key={c.key} className={'chip' + (cat === c.key ? ' active' : '')} onClick={() => setCat(c.key)}>
              {c.icon && <span className="ic"><Icon name={c.icon} size={17} /></span>}{c.label}
            </button>
          ))}
        </div>
        <div className="class-grid">
          {list.map((c) => <ClassCard key={c.id} c={c} onOpen={onOpen} />)}
        </div>
      </div>
    </section>
  );
}

/* ---------- How it works ---------- */
function How() {
  const steps = [
    { n: '01', t: '취향 고르기', d: '베이킹부터 플라워까지, 마음 가는 한 조각을 골라요.', c: '#FF6A45' },
    { n: '02', t: '편하게 수강', d: '모바일·PC 어디서나. 평생 소장으로 내 속도에 맞게.', c: '#FF9B3D' },
    { n: '03', t: '직접 만들기', d: '준비물 키트로 따라 하면 손에 남는 결과물이 완성돼요.', c: '#6FD7BD' },
    { n: '04', t: '함께 나누기', d: '커뮤니티에 완성작을 공유하고 다음 취미를 발견해요.', c: '#C7B4FF' },
  ];
  return (
    <section className="section bg-peach" id="how">
      <div className="wrap">
        <div className="reveal" data-thread="0.86" style={{ textAlign: 'center' }}>
          <span className="eyebrow" style={{ justifyContent: 'center' }}>How it works</span>
          <h2 className="h-sec">실 한 가닥 풀듯, 이렇게 이어져요</h2>
          <p className="sub-sec" style={{ margin: '14px auto 0' }}>시작이 어려울 뿐이에요. 차근차근 네 단계만 따라오세요.</p>
        </div>
        <div className="steps">
          {steps.map((s, i) => (
            <div className={'step reveal d' + (i + 1)} key={s.n}>
              <div className="num" style={{ background: s.c }}>{s.n}</div>
              <h4>{s.t}</h4><p>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Stats ---------- */
function Stats() {
  return (
    <section className="section" style={{ paddingTop: 40 }}>
      <div className="wrap">
        <div className="stats-band reveal" data-thread="0.5">
          <div className="stats-grid">
            {STATS.map((s, i) => (
              <div className="stat" key={i}>
                <div className="n eng">{s.n}</div>
                <div className="l">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Reviews ---------- */
function Reviews() {
  return (
    <section className="section bg-peach" id="reviews">
      <div className="wrap">
        <div className="reveal" data-thread="0.14">
          <span className="eyebrow">Real Stories</span>
          <h2 className="h-sec">먼저 시작한 분들의 이야기</h2>
          <p className="sub-sec">"나도 할 수 있을까?" 의 답은 늘 같았어요. 네, 누구나 할 수 있어요.</p>
        </div>
        <div className="review-grid" style={{ marginTop: 44 }}>
          {REVIEWS.map((r, i) => (
            <div className={'review reveal d' + (i % 3 + 1)} key={i}>
              <div className="stars">{Array.from({ length: r.stars }).map((_, k) => <Icon key={k} name="star" size={16} />)}</div>
              <p className="quote">"{r.text}"</p>
              <div className="who">
                <div className="avatar" style={{ background: `linear-gradient(135deg, ${r.color[0]}, ${r.color[1]})` }}>{r.initial}</div>
                <div><div className="nm">{r.name}</div><div className="cl">{r.cl}</div></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Instructors ---------- */
function Teachers() {
  return (
    <section className="section" id="teachers">
      <div className="wrap">
        <div className="reveal" data-thread="0.86" style={{ textAlign: 'center' }}>
          <span className="eyebrow" style={{ justifyContent: 'center' }}>Our Makers</span>
          <h2 className="h-sec">다정하게 이끌어주는 선생님</h2>
          <p className="sub-sec" style={{ margin: '14px auto 0' }}>각 분야의 메이커들이 가장 쉬운 길로 안내해요.</p>
        </div>
        <div className="inst-grid" style={{ marginTop: 44 }}>
          {INSTRUCTORS.map((t, i) => (
            <div className={'inst-card reveal d' + (i + 1)} key={i}>
              <div className="inst-ava" style={{ background: `linear-gradient(135deg, ${t.color[0]}, ${t.color[1]})` }}>{t.initial}</div>
              <h4>{t.name}</h4>
              <div className="field">{t.field}</div>
              <p>{t.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Pricing ---------- */
function Pricing() {
  return (
    <section className="section bg-peach" id="pricing">
      <div className="wrap">
        <div className="reveal" data-thread="0.16" style={{ textAlign: 'center' }}>
          <span className="eyebrow" style={{ justifyContent: 'center' }}>Membership</span>
          <h2 className="h-sec">부담 없이, 한 조각부터</h2>
          <p className="sub-sec" style={{ margin: '14px auto 0' }}>딱 하나만 배워도, 전부 누려도 좋아요. 마음에 드는 방식을 골라보세요.</p>
        </div>
        <div className="price-grid" style={{ marginTop: 50 }}>
          {PLANS.map((p, i) => (
            <div className={'plan reveal d' + (i + 1) + (p.feat ? ' feat' : '')} key={i}>
              {p.feat && <span className="tag">가장 인기 ★</span>}
              <h4>{p.name}</h4>
              <div className="pdesc">{p.desc}</div>
              <div className="amount eng">₩{p.amount}<small> {p.unit}</small></div>
              <ul>{p.perks.map((k, j) => <li key={j}><span className="ck"><Icon name="check" size={18} /></span>{k}</li>)}</ul>
              <button className={'btn ' + (p.feat ? 'btn-primary' : 'btn-ghost')}>
                {p.feat ? '멤버십 시작하기' : '선택하기'} <Icon name="arrow" size={18} cls="arr" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA ---------- */
function CTA() {
  return (
    <section className="section cta-final">
      <div className="wrap">
        <div className="cta-card reveal" data-thread="0.5">
          <div className="c-blob" style={{ width: 200, height: 200, background: '#FF6A45', top: -60, left: -40, opacity: .8 }} />
          <div className="c-blob" style={{ width: 150, height: 150, background: '#FFD66B', bottom: -50, right: 30, opacity: .7 }} />
          <div className="c-blob" style={{ width: 90, height: 90, background: '#6FD7BD', top: 40, right: 80, opacity: .6 }} />
          <h2>Your next hobby is<br /><span className="pop">a piece of cake.</span></h2>
          <p className="kr">오늘의 작은 시작이, 내일의 다정한 취미가 돼요.</p>
          <a href="#classes" className="btn btn-primary">첫 클래스 시작하기 <Icon name="arrow" size={18} cls="arr" /></a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  const cols = [
    { h: '클래스', links: ['베이킹', '드로잉', '뜨개·공예', '쿠킹', '플라워'] },
    { h: '회사', links: ['브랜드 스토리', '메이커 지원', '채용', '제휴 문의'] },
    { h: '고객지원', links: ['자주 묻는 질문', '1:1 문의', '환불 정책', '이용약관'] },
  ];
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-top">
          <div style={{ maxWidth: 300 }}>
            <a href="#top" className="brand"><YarnMini /> piece of cake</a>
            <p style={{ color: 'var(--ink-soft)', marginTop: 16, fontSize: 15 }}>누구나, 무엇이든, 즐겁게.<br />집에서 시작하는 어른들의 취미 한 조각.</p>
          </div>
          <div className="foot-cols">
            {cols.map((c, i) => (
              <div className="foot-col" key={i}>
                <h5>{c.h}</h5>
                {c.links.map((l, j) => <a key={j} href="#">{l}</a>)}
              </div>
            ))}
          </div>
        </div>
        <div className="foot-bot">
          <span>© 2026 piece of cake. 본 사이트는 디자인 연습용 가상 브랜드입니다.</span>
          <span>Made with 🧶 a single thread.</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Modal ---------- */
function Modal({ data, onClose }) {
  const [applied, setApplied] = useState(false);
  const [show, setShow] = useState(false);
  useEffect(() => {
    document.body.classList.add('locked');
    requestAnimationFrame(() => setShow(true));
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.classList.remove('locked'); window.removeEventListener('keydown', onKey); };
  }, []);
  const close = () => { setShow(false); setTimeout(onClose, 320); };
  if (!data) return null;
  const cat = CATMAP[data.cat];
  return (
    <div className={'modal-back' + (show ? ' show' : '')} onClick={(e) => { if (e.target.classList.contains('modal-back')) close(); }}>
      <div className="modal">
        <button className="modal-close" onClick={close}><Icon name="close" size={22} /></button>
        <div className="modal-hero" style={{ background: `linear-gradient(135deg, ${cat.grad[0]}, ${cat.grad[1]})` }}>
          <Icon name={cat.icon} size={64} sw={1.6} cls="ic-big" />
          <div style={{ position: 'relative', zIndex: 2, fontFamily: 'var(--font-display)', fontWeight: 600, opacity: .95 }}>{cat.label} · {cat.en}</div>
          <h2>{data.title}</h2>
          <div className="m-inst">{data.instructor} 선생님</div>
          <div className="modal-meta">
            <span className="pill"><Icon name="layers" size={15} /> 총 {data.lessons}강</span>
            <span className="pill"><Icon name="clock" size={15} /> {data.hours}</span>
            <span className="pill"><Icon name="star" size={15} /> {data.rating} ({data.students})</span>
            <span className="pill"><Icon name="heart" size={15} /> {data.level}</span>
          </div>
        </div>
        <div className="modal-body">
          <h3>이런 걸 배워요</h3>
          <p className="desc">{data.blurb}</p>
          <h3 style={{ marginTop: 26 }}>커리큘럼</h3>
          <ol className="curric">{data.curric.map((c, i) => <li key={i}>{c}</li>)}</ol>
          <div className="modal-foot">
            <span className="mp">{data.price}<small>원~ · 평생소장</small></span>
            <button className={'btn ' + (applied ? 'btn-primary done' : 'btn-primary')} onClick={() => setApplied(true)}>
              {applied
                ? <><Icon name="check" size={18} /> 수강 바구니에 담았어요</>
                : <>수강 신청하기 <Icon name="arrow" size={18} cls="arr" /></>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- App ---------- */
function App() {
  const [open, setOpen] = useState(null);
  useReveal();
  return (
    <>
      <Cursor />
      <Thread />
      <Nav />
      <Hero />
      <Classes onOpen={setOpen} />
      <How />
      <Stats />
      <Reviews />
      <Teachers />
      <Pricing />
      <CTA />
      <Footer />
      {open && <Modal data={open} onClose={() => setOpen(null)} />}
    </>
  );
}

export default App;
