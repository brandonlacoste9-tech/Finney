"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { COPY, IMG, SITE, href, type Copy, type Lang } from "@/lib/site";

export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="reveal" style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
}

function Arrow() {
  return (
    <i>
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <path
          d="M5 12h12M13 6l6 6-6 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </i>
  );
}

export function Cta({
  to,
  children,
  ghost,
  navyGhost,
  className,
}: {
  to: string;
  children: ReactNode;
  ghost?: boolean;
  navyGhost?: boolean;
  className?: string;
}) {
  const cls = [ghost ? "cta ghost" : navyGhost ? "cta navy-ghost" : "cta", className]
    .filter(Boolean)
    .join(" ");
  const external = to.startsWith("http") || to.startsWith("mailto") || to.startsWith("tel");
  if (external) {
    return (
      <a className={cls} href={to}>
        <span>{children}</span>
        <Arrow />
      </a>
    );
  }
  return (
    <Link className={cls} href={to}>
      <span>{children}</span>
      <Arrow />
    </Link>
  );
}

function Socials() {
  const items = [
    ["Instagram", SITE.ig],
    ["Facebook", SITE.fb],
    ["TikTok", SITE.tiktok],
    ["Pinterest", SITE.pin],
    ["YouTube", SITE.yt],
    ["LinkedIn", SITE.li],
  ] as const;
  return (
    <div className="socials">
      {items.map(([label, url]) => (
        <a key={label} href={url} target="_blank" rel="noreferrer">
          {label}
        </a>
      ))}
    </div>
  );
}

function swapLang(lang: Lang, pathname: string) {
  if (lang === "fr") return pathname.replace(/^\/fr/, "") || "/";
  return pathname === "/" ? "/fr" : `/fr${pathname}`;
}

export function Chrome({ lang, t }: { lang: Lang; t: Copy }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || "/";
  const p = (path: string) => href(lang, path);
  const other = swapLang(lang, pathname);
  return (
    <>
      <div className="preview">
        <span>{t.preview}</span>
        <a href={SITE.live} rel="noreferrer" target="_blank">
          {t.openLive}
        </a>
      </div>
      <header className="nav">
        <Link href={p("/")} className="brand">
          <img src={SITE.logo} alt={SITE.name} />
        </Link>
        <nav className="nav-links">
          <Link href={p("/services")}>{t.navServices}</Link>
          <span className="drop">
            <Link href={p("/plaster")}>{t.navPlaster}</Link>
            <span className="drop-menu">
              <Link href={p("/ornamental")}>{t.navOrnamental}</Link>
              <Link href={p("/stucco")}>{t.navStucco}</Link>
              <Link href={p("/drywall")}>{t.navDrywall}</Link>
            </span>
          </span>
          <Link href={p("/portfolio")}>{t.navPortfolio}</Link>
          <Link href={p("/about")}>{t.navAbout}</Link>
          <Link href={p("/contact")}>{t.navContact}</Link>
          <Link className="lang" href={other}>
            EN / FR
          </Link>
          <Cta to={p("/contact")}>{t.cta}</Cta>
        </nav>
        <button className="burger" type="button" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          {open ? t.close : t.menu}
        </button>
      </header>
      <Cta to={p("/contact")} className="sticky-quote">
        {t.cta}
      </Cta>
      <div className={`drawer${open ? " open" : ""}`}>
        <Link href={p("/services")} onClick={() => setOpen(false)}>
          {t.navServices}
        </Link>
        <Link href={p("/plaster")} onClick={() => setOpen(false)}>
          {t.navPlaster}
        </Link>
        <Link href={p("/ornamental")} onClick={() => setOpen(false)}>
          {t.navOrnamental}
        </Link>
        <Link href={p("/stucco")} onClick={() => setOpen(false)}>
          {t.navStucco}
        </Link>
        <Link href={p("/drywall")} onClick={() => setOpen(false)}>
          {t.navDrywall}
        </Link>
        <Link href={p("/portfolio")} onClick={() => setOpen(false)}>
          {t.navPortfolio}
        </Link>
        <Link href={p("/about")} onClick={() => setOpen(false)}>
          {t.navAbout}
        </Link>
        <Link href={p("/contact")} onClick={() => setOpen(false)}>
          {t.navContact}
        </Link>
        <Link href={other} onClick={() => setOpen(false)}>
          EN / FR
        </Link>
        <Cta to={p("/contact")}>{t.cta}</Cta>
      </div>
    </>
  );
}

export function Foot({ t }: { t: Copy }) {
  return (
    <footer className="foot">
      <img src={SITE.logo} alt="" />
      <span>
        {SITE.legal}
        <br />
        {SITE.rbq}
        <br />
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        {" · "}
        <a href={SITE.phoneHref}>{SITE.phone}</a>
      </span>
      <span>
        {t.foot}
        <br />
        <a href={SITE.livePrivacy} rel="noreferrer" target="_blank">
          {t.privacy}
        </a>
      </span>
    </footer>
  );
}

function Certs({ t }: { t: Copy }) {
  return (
    <section className="certs">
      <p>
        {t.cert} {t.member}
      </p>
      <div className="badge-row">
        <a className="badge" href={SITE.rbqUrl} target="_blank" rel="noreferrer">
          RBQ
        </a>
        <a className="badge" href={SITE.ccqUrl} target="_blank" rel="noreferrer">
          CCQ
        </a>
        <a className="badge" href={SITE.cnesstUrl} target="_blank" rel="noreferrer">
          CNESST
        </a>
        <a className="badge" href={SITE.acqUrl} target="_blank" rel="noreferrer">
          ACQ
        </a>
        <a className="badge" href={SITE.aecqUrl} target="_blank" rel="noreferrer">
          AECQ
        </a>
        <a className="badge" href={SITE.cmaqUrl} target="_blank" rel="noreferrer">
          CMAQ
        </a>
        <span className="badge">{SITE.rbq}</span>
      </div>
    </section>
  );
}

function StartBand({ lang, t }: { lang: Lang; t: Copy }) {
  return (
    <section className="band">
      <Reveal>
        <h2>{t.startTitle}</h2>
        <p>{t.startBody}</p>
      </Reveal>
      <Cta to={href(lang, "/contact")} ghost>
        {t.cta}
      </Cta>
    </section>
  );
}

function HeroFrame({ src, alt, children }: { src: string; alt: string; children: ReactNode }) {
  return (
    <section className="page-hero">
      <div className="hero-bg">
        <img src={src} alt={alt} />
      </div>
      <div className="hero-inner">{children}</div>
    </section>
  );
}

function WorkStrip({ lang, t }: { lang: Lang; t: Copy }) {
  const shots = [
    { src: IMG.stair, cap: t.sec1t },
    { src: IMG.commercial, cap: t.sec2t },
    { src: IMG.industrial, cap: t.sec3t },
    { src: IMG.artisanal, cap: t.sec4t },
    { src: IMG.gallery[2], cap: t.navPortfolio },
    { src: IMG.gallery[6], cap: t.navPortfolio },
    { src: IMG.gallery[9], cap: t.navPortfolio },
  ];
  return (
    <section className="strip">
      <div className="strip-head">
        <p className="kicker">{t.navPortfolio}</p>
        <h2>{t.workTitle}</h2>
        <p className="lead">{t.workLead}</p>
      </div>
      <div className="strip-track">
        {shots.map((shot) => (
          <Link key={shot.src} className="strip-shot" href={href(lang, "/portfolio")}>
            <img src={shot.src} alt={shot.cap} />
            <span>{shot.cap}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function CraftIndex({ lang, t }: { lang: Lang; t: Copy }) {
  const items = [
    { t: t.t1t, b: t.t1b, href: href(lang, "/ornamental"), img: IMG.ornamentCol, alt: "Ornamental plaster" },
    { t: t.t2t, b: t.t2b, href: href(lang, "/stucco"), img: IMG.stucco, alt: "Stucco plaster finish" },
    { t: t.t3t, b: t.t3b, href: href(lang, "/drywall"), img: IMG.drywall, alt: "Drywall finishing" },
  ];
  const [on, setOn] = useState(0);
  const active = items[on]!;
  return (
    <section className="craft">
      <div className="craft-img">
        <img src={active.img} alt={active.alt} />
      </div>
      <div className="craft-list">
        <p className="kicker">{t.navPlaster}</p>
        <h2>{t.typesTitle}</h2>
        {items.map((item, i) => (
          <Link
            key={item.t}
            href={item.href}
            className={i === on ? "on" : undefined}
            onMouseEnter={() => setOn(i)}
            onFocus={() => setOn(i)}
          >
            <span>0{i + 1}</span>
            <b>{item.t}</b>
            <p>{item.b}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function HeroMedia() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const move = (e: PointerEvent) => {
      const b = el.getBoundingClientRect();
      el.style.setProperty("--px", `${((e.clientX - b.left) / b.width - 0.5) * 18}px`);
      el.style.setProperty("--py", `${((e.clientY - b.top) / b.height - 0.5) * 12}px`);
    };
    const leave = () => {
      el.style.setProperty("--px", "0px");
      el.style.setProperty("--py", "0px");
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);
  return (
    <div className="hero-bg" ref={ref}>
      <img
        className="hero-media"
        src={IMG.hero}
        alt="Plastered hallway with a column and arched corridor"
      />
      <video
        className="hero-media"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={IMG.hero}
        aria-hidden="true"
      >
        <source src={IMG.heroVideo} type="video/mp4" />
      </video>
    </div>
  );
}

export function HomeView({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const contact = href(lang, "/contact");
  const services = [
    { n: "01", t: t.s1t, b: t.s1b },
    { n: "02", t: t.s2t, b: t.s2b },
    { n: "03", t: t.s3t, b: t.s3b },
    { n: "04", t: t.s4t, b: t.s4b },
  ];
  const sectors = [
    { t: t.sec1t, b: t.sec1b, img: IMG.stair, alt: "Curved plaster staircase under a skylight" },
    { t: t.sec2t, b: t.sec2b, img: IMG.commercial, alt: "Commercial office with rounded plaster walls and columns" },
    { t: t.sec3t, b: t.sec3b, img: IMG.industrial, alt: "Industrial hallway with level 5 plaster finish" },
    { t: t.sec4t, b: t.sec4b, img: IMG.artisanal, alt: "White plaster painting with circular textures" },
  ];
  return (
    <>
      <Chrome lang={lang} t={t} />
      <main>
        <section className="hero">
          <HeroMedia />
          <div className="hero-inner">
            <p className="kicker">{t.heroKicker}</p>
            <h1>
              <span>{t.hero1}</span>
              <span>{t.hero2}</span>
            </h1>
            <p>{t.heroBody}</p>
            <p className="note">{t.heroNote}</p>
            <div className="hero-actions">
              <Cta to={contact}>{t.cta}</Cta>
              <Cta to={href(lang, "/portfolio")} ghost>
                {t.seePortfolio}
              </Cta>
            </div>
          </div>
        </section>

        <WorkStrip lang={lang} t={t} />

        <section className="wrap">
          <div className="services-ed">
            <Reveal>
              <p className="kicker">{t.navServices}</p>
              <h2>{t.servicesTitle}</h2>
              <p className="lead">{t.servicesLead}</p>
              <ol>
                {services.map((s) => (
                  <li key={s.n}>
                    <em>{s.n}</em>
                    <b>{s.t}</b>
                    <p>{s.b}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
            <img src={IMG.tools} alt="Interior finishing tools including trowel, hammer, stapler and drill" />
          </div>
        </section>

        <section className="wrap tight">
          <Reveal>
            <p className="kicker">{t.sectorsTitle}</p>
            <h2>{t.sectorsTitle}</h2>
          </Reveal>
          <div className="sectors">
            {sectors.map((s) => (
              <article key={s.t} className="sector">
                <img src={s.img} alt={s.alt} />
                <div>
                  <h3>{s.t}</h3>
                  <p>{s.b}</p>
                  <Link href={href(lang, "/portfolio")}>{t.seePortfolio}</Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <CraftIndex lang={lang} t={t} />

        <section className="wrap">
          <div className="split">
            <img src={IMG.founder} alt="Construction Finney founder looking up" />
            <Reveal>
              <p className="kicker">{t.storyTitle}</p>
              <h2>{t.storyTitle}</h2>
              <p className="lead">{t.story1}</p>
              <p className="lead">{t.story2}</p>
              <Cta to={href(lang, "/about")} navyGhost>
                {t.readMore}
              </Cta>
            </Reveal>
          </div>
        </section>

        <section className="wrap tight">
          <Reveal>
            <h2>{t.promisesTitle}</h2>
          </Reveal>
          <div className="promises">
            {[
              ["01", t.p1t, t.p1b],
              ["02", t.p2t, t.p2b],
              ["03", t.p3t, t.p3b],
            ].map(([n, title, body]) => (
              <article key={n} className="promise">
                <span>{n}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="quote-block">
          <img src={IMG.helmet} alt="White helmet hanging on scaffolding" />
          <div>
            <blockquote>“{t.quote}”</blockquote>
            <cite>{t.quoteName}</cite>
          </div>
        </section>

        <section className="wrap">
          <Reveal>
            <h2>{t.socialTitle}</h2>
            <p className="lead">{t.socialLead}</p>
            <Socials />
          </Reveal>
        </section>

        <StartBand lang={lang} t={t} />
        <Certs t={t} />
      </main>
      <Foot t={t} />
    </>
  );
}

export function ServicesView({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const blocks = [
    { t: t.s1t, b: t.s1b, img: IMG.tools, alt: "Interior finishing tools including trowel, hammer, stapler and drill" },
    { t: t.s2t, b: t.s2b, img: IMG.trowels, alt: "Trowels and mortar board used for plaster repairs" },
    { t: t.s3t, b: t.s3b, img: IMG.mix, alt: "Mixing plaster on a mortar board with a trowel" },
    { t: t.s4t, b: t.s4b, img: IMG.scaffold, alt: "Drywall finishing from a scaffold work platform" },
  ];
  return (
    <>
      <Chrome lang={lang} t={t} />
      <main>
        <HeroFrame src={IMG.services} alt="Construction Finney services">
          <p className="kicker">{t.navServices}</p>
          <h1>{t.servicesHero}</h1>
          <p>{t.servicesHeroBody}</p>
        </HeroFrame>
        {blocks.map((block, i) => (
          <section className="wrap" key={block.t}>
            <div className={`split${i % 2 ? " reverse" : ""}`}>
              <img src={block.img} alt={block.alt} />
              <Reveal>
                <p className="kicker">0{i + 1}</p>
                <h2>{block.t}</h2>
                <p className="lead">{block.b}</p>
                <Cta to={href(lang, "/contact")} navyGhost>
                  {t.cta}
                </Cta>
              </Reveal>
            </div>
          </section>
        ))}
        <StartBand lang={lang} t={t} />
        <Certs t={t} />
      </main>
      <Foot t={t} />
    </>
  );
}

export function PlasterView({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const types = [
    { t: t.t1t, b: t.t1b, href: href(lang, "/ornamental"), img: IMG.ornamentFloral, alt: "Decorative floral plaster finish" },
    { t: t.t2t, b: t.t2b, href: href(lang, "/stucco"), img: IMG.stuccoThick, alt: "Thick stucco finish on a wall" },
    { t: t.t3t, b: t.t3b, href: href(lang, "/drywall"), img: IMG.drywallHand, alt: "Hand with a trowel applying plaster for drywall finishing" },
  ];
  return (
    <>
      <Chrome lang={lang} t={t} />
      <main>
        <HeroFrame src={IMG.plaster} alt="Plaster finish at the intersection of a ceiling and wall">
          <p className="kicker">{t.plasterKicker}</p>
          <h1>{t.plasterTitle}</h1>
          <p>{t.plasterLead}</p>
          <div className="hero-actions">
            <Cta to={href(lang, "/contact")} ghost>
              {t.cta}
            </Cta>
          </div>
        </HeroFrame>
        <section className="wrap">
          <h2>{t.typesTitle}</h2>
          <div className="grid-3">
            {types.map((item) => (
              <article key={item.t} className="type">
                <img src={item.img} alt={item.alt} />
                <div>
                  <h3>{item.t}</h3>
                  <p>{item.b}</p>
                  <Link href={item.href}>{t.learn}</Link>
                </div>
              </article>
            ))}
          </div>
        </section>
        <StartBand lang={lang} t={t} />
        <Certs t={t} />
      </main>
      <Foot t={t} />
    </>
  );
}

export function OrnamentalView({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const specs = [
    { t: t.medT, b: t.medB, img: IMG.medallion, alt: "White plaster ceiling medallion" },
    { t: t.colT, b: t.colB, img: IMG.columns, alt: "Columns with plaster ornaments" },
    { t: t.mouT, b: t.mouB, img: IMG.moulding, alt: "Close-up of plaster crown moulding" },
  ];
  return (
    <>
      <Chrome lang={lang} t={t} />
      <main>
        <HeroFrame src={IMG.ornamentCol} alt="Columns with plaster ornaments under a blue sky">
          <p className="kicker">{t.ornamentalKicker}</p>
          <h1>{t.ornamentalTitle}</h1>
          <p>{t.ornamentalLead}</p>
        </HeroFrame>
        <section className="wrap">
          <h2>{t.specTitle}</h2>
          <div className="grid-3">
            {specs.map((s) => (
              <article key={s.t} className="type">
                <img src={s.img} alt={s.alt} />
                <div>
                  <h3>{s.t}</h3>
                  <p>{s.b}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <StartBand lang={lang} t={t} />
        <Certs t={t} />
      </main>
      <Foot t={t} />
    </>
  );
}

export function StuccoView({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  return (
    <>
      <Chrome lang={lang} t={t} />
      <main>
        <HeroFrame src={IMG.stucco} alt="White stucco plaster finish on a wall">
          <p className="kicker">{t.stuccoKicker}</p>
          <h1>{t.stuccoTitle}</h1>
          <p>{t.stuccoLead}</p>
        </HeroFrame>
        <section className="wrap">
          <h2>{t.specTitle}</h2>
          <div className="grid-3">
            {[
              { t: t.stuT, b: t.stuB, img: IMG.stuccoTex, alt: "Stucco textured finish on a white wall" },
              { t: t.acrT, b: t.acrB, img: IMG.acrylic, alt: "Exterior acrylic stucco on an ancestral home" },
              { t: t.oldT, b: t.oldB, img: IMG.oldPlaster, alt: "Old-fashioned plaster and wooden lath" },
            ].map((s) => (
              <article key={s.t} className="type">
                <img src={s.img} alt={s.alt} />
                <div>
                  <h3>{s.t}</h3>
                  <p>{s.b}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="wrap">
          <div className="split">
            <img src={IMG.acrylicTall} alt="Exterior acrylic finish" />
            <Reveal>
              <h2>{t.whyAcr}</h2>
              <div className="promises" style={{ gridTemplateColumns: "1fr" }}>
                {t.why.map((line, i) => (
                  <article key={line} className="promise">
                    <span>0{i + 1}</span>
                    <p>{line}</p>
                  </article>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
        <StartBand lang={lang} t={t} />
        <Certs t={t} />
      </main>
      <Foot t={t} />
    </>
  );
}

export function DrywallView({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  return (
    <>
      <Chrome lang={lang} t={t} />
      <main>
        <HeroFrame src={IMG.drywall} alt="Drywall finishing on gypsum walls and ceilings">
          <p className="kicker">{t.dryKicker}</p>
          <h1>{t.dryTitle}</h1>
          <p>{t.dryLead}</p>
        </HeroFrame>
        <section className="wrap">
          <p className="kicker">{t.drySpec}</p>
          <h2>{t.drySpec}</h2>
          <p className="lead">{t.drySpecLead}</p>
          <div className="levels">
            {t.levels.map((level) => (
              <article key={level.n} className="level">
                <b>{level.n}</b>
                <h3>{level.t}</h3>
                <p>{level.b}</p>
              </article>
            ))}
          </div>
        </section>
        <StartBand lang={lang} t={t} />
        <Certs t={t} />
      </main>
      <Foot t={t} />
    </>
  );
}

export function PortfolioView({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  return (
    <>
      <Chrome lang={lang} t={t} />
      <main>
        <HeroFrame src={IMG.portfolio} alt="Construction Finney employee on a portfolio project">
          <p className="kicker">{t.portKicker}</p>
          <h1>{t.portTitle}</h1>
          <p>{t.portLead}</p>
        </HeroFrame>
        <section className="wrap">
          <p className="lead">{t.portMore}</p>
          <Socials />
          <div className="gallery">
            {IMG.gallery.map((src) => (
              <img key={src} src={src} alt="Construction Finney project" />
            ))}
          </div>
        </section>
        <StartBand lang={lang} t={t} />
        <Certs t={t} />
      </main>
      <Foot t={t} />
    </>
  );
}

export function AboutView({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  return (
    <>
      <Chrome lang={lang} t={t} />
      <main>
        <HeroFrame src={IMG.founder} alt="Construction Finney founder looking up">
          <p className="kicker">{t.aboutKicker}</p>
          <h1>{t.aboutTitle}</h1>
          <p>{t.aboutLead}</p>
        </HeroFrame>
        <section className="wrap">
          <div className="split">
            <img src={IMG.wall} alt="Plastering a wall" />
            <Reveal>
              <p className="kicker">{t.storyTitle}</p>
              <h2>{t.storyTitle}</h2>
              <p className="lead">{t.story1}</p>
              <p className="lead">{t.story2}</p>
            </Reveal>
          </div>
        </section>
        <section className="wrap tight">
          <div className="grid-2">
            <article className="svc">
              <span>01</span>
              <b>{t.missionT}</b>
              <p>{t.mission}</p>
            </article>
            <article className="svc">
              <span>02</span>
              <b>{t.visionT}</b>
              <p>{t.vision}</p>
            </article>
          </div>
          <p className="kicker" style={{ marginTop: "2rem" }}>
            {t.valuesTitle}
          </p>
          <h2>{t.valuesTitle}</h2>
          <div className="values">
            {t.values.map((v) => (
              <span key={v}>{v}</span>
            ))}
          </div>
        </section>
        <section className="wrap">
          <Reveal>
            <h2>{t.promisesTitle}</h2>
          </Reveal>
          <div className="promises">
            {[
              ["01", t.p1t, t.p1b],
              ["02", t.p2t, t.p2b],
              ["03", t.p3t, t.p3b],
            ].map(([n, title, body]) => (
              <article key={n} className="promise">
                <span>{n}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="wrap">
          <h2>{t.teamTitle}</h2>
          <p className="lead">{t.teamLead}</p>
          <Socials />
          <div className="team">
            {[
              { name: t.olan, role: t.olanRole, bio: t.olanBio, img: IMG.olan, alt: "Olan Finney, president and plasterer" },
              { name: t.loic, role: t.loicRole, bio: t.loicBio, img: IMG.loic, alt: "Loic Christie, vice president of business development" },
              { name: t.nala, role: t.nalaRole, bio: t.nalaBio, img: IMG.nala, alt: "Nala Bear Finney, office puppy" },
            ].map((m) => (
              <article key={m.name} className="member">
                <img src={m.img} alt={m.alt} />
                <div>
                  <h3>{m.name}</h3>
                  <p className="role">{m.role}</p>
                  <p>{m.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <StartBand lang={lang} t={t} />
        <Certs t={t} />
      </main>
      <Foot t={t} />
    </>
  );
}

function QuoteForm({ t }: { t: Copy }) {
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "");
    const email = String(fd.get("email") || "");
    const phone = String(fd.get("phone") || "");
    const work = String(fd.get("work") || "");
    const msg = String(fd.get("message") || "");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nWork: ${work}\n\n${msg}`,
    );
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent("Quote request")}&body=${body}`;
  }
  return (
    <form onSubmit={onSubmit}>
      <label>
        {t.formName}
        <input name="name" autoComplete="name" required />
      </label>
      <label>
        {t.formEmail}
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        {t.formPhone}
        <input name="phone" type="tel" autoComplete="tel" />
      </label>
      <label>
        {t.formWork}
        <select name="work" defaultValue={t.workTypes[0]}>
          {t.workTypes.map((w) => (
            <option key={w}>{w}</option>
          ))}
        </select>
      </label>
      <label>
        {t.formMsg}
        <textarea name="message" required />
      </label>
      <button className="cta" type="submit">
        <span>{t.formSend}</span>
        <Arrow />
      </button>
    </form>
  );
}

export function ContactView({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  return (
    <>
      <Chrome lang={lang} t={t} />
      <main>
        <HeroFrame src={IMG.contact} alt="Construction Finney job site">
          <p className="kicker">{t.contactKicker}</p>
          <h1>{t.contactTitle}</h1>
          <p>{t.contactLead}</p>
        </HeroFrame>
        <section className="wrap">
          <p className="note">{t.contactNote}</p>
          <div className="contact-grid" style={{ marginTop: "2rem" }}>
            <QuoteForm t={t} />
            <div className="reach">
              <p className="kicker">{t.reach}</p>
              <p>
                {SITE.address1}
                <br />
                {SITE.address2}
              </p>
              <p>
                <a href={SITE.maps} target="_blank" rel="noreferrer">
                  {t.map}
                </a>
              </p>
              <p>
                <a href={SITE.phoneHref}>{SITE.phone}</a>
              </p>
              <p>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </p>
              <p>
                <a href={SITE.liveContact} target="_blank" rel="noreferrer">
                  {t.openLive}
                </a>
              </p>
              <Socials />
              <img src={IMG.stair} alt="Curved plaster staircase" style={{ marginTop: "1.2rem" }} />
            </div>
          </div>
        </section>
        <Certs t={t} />
      </main>
      <Foot t={t} />
    </>
  );
}
