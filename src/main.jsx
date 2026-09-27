import { StrictMode, useCallback, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const experience = [
  {
    company: "Veel Inc.",
    role: "Software Engineer",
    period: "Aug 2024 - Jul 2026",
    summary: "Native product evolution, user experience, and release delivery.",
    highlights: [
      "Contributing to the migration of a production React Native application to a fully native Android architecture in Kotlin, improving platform capability and long-term maintainability.",
      "Redesigned and delivered core product journeys, including authentication and social sharing, to create clearer and more reliable user experiences.",
      "Integrated third-party authentication solutions and managed feature releases across Google Play and the App Store, while supporting code reviews, documentation, and intern development.",
    ],
  },
  {
    company: "Machnet Technology Pvt Ltd.",
    role: "Software Engineer",
    period: "Dec 2022 - Aug 2024",
    summary:
      "React Native delivery, platform integrations, and team enablement.",
    highlights: [
      "Mentored junior engineers through technical guidance, implementation support, and day-to-day collaboration.",
      "Contributed to CI/CD pipeline improvements that strengthened release consistency and development cadence.",
      "Integrated production tooling and React Native modules including App Center, LogRocket, Lottie, React Navigation, and Firebase.",
    ],
  },
  {
    company: "Amnil Technologies Pvt Ltd.",
    role: "Associate Software Engineer",
    period: "Nov 2021 - Dec 2022",
    summary: "Legacy modernisation, reusable systems, and mobile operations.",
    highlights: [
      "Migrated three legacy native applications into independent React Native products, improving maintainability, development efficiency, and cross-platform scalability.",
      "Developed reusable in-house packages and shared libraries that improved consistency across multiple applications.",
      "Managed end-to-end store releases and contributed to large-scale cinema products including QFX Cinemas, FCube Cinemas, Midtown Cinemas, and BSR Movies.",
    ],
  },
  {
    company: "Amnil Technologies Pvt Ltd.",
    role: "React Native Intern",
    period: "Jul 2021 - Nov 2021",
    summary: "Mobile foundations, asynchronous data, and product delivery.",
    highlights: [
      "Built a movie-discovery application in React Native with genre-based sorting, filtering, and intuitive navigation.",
      "Implemented asynchronous application flows using Redux, Redux-Saga, API integrations, and React Navigation, while developing practical MySQL knowledge.",
    ],
  },
];

const expertise = [
  {
    title: "Mobile engineering",
    description: "Cross-platform and native product development.",
    skills: ["React Native", "Kotlin", "Expo", "Android"],
  },
  {
    title: "Languages & architecture",
    description: "Maintainable systems designed for product growth.",
    skills: ["TypeScript", "JavaScript", "Redux", "Redux-Saga"],
  },
  {
    title: "Platform & delivery",
    description: "Reliable releases from integration to production.",
    skills: ["Firebase", "CI/CD", "Jenkins", "Git"],
  },
  {
    title: "Engineering practice",
    description: "Quality built through collaboration and clear standards.",
    skills: ["Code review", "Mentoring", "Performance", "Documentation"],
  },
];

const shell = "mx-auto w-full max-w-[1280px] px-5 sm:px-10";
const label =
  "font-mono text-[0.68rem] tracking-[0.12em] text-[#6a665f] uppercase";
const focusRing =
  "focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d85d41]";
const gmailComposeUrl =
  "https://mail.google.com/mail/?view=cm&fs=1&to=shahibijen%40gmail.com";
const navAction = `group inline-flex items-center gap-1.5 font-mono text-[0.68rem] tracking-[0.08em] uppercase text-[#56534d] transition-colors duration-300 hover:text-[#d85d41] ${focusRing}`;
const secretTapWindowMs = 30000;

function ArrowUpRight({ className = "text-[1.1rem]" }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block leading-none ${className}`}
    >
      ↗
    </span>
  );
}

function ArrowDown() {
  return (
    <span aria-hidden="true" className="text-lg leading-none">
      ↓
    </span>
  );
}

function Reveal({
  as: Component = "div",
  children,
  className = "",
  delay = 0,
  ...props
}) {
  const elementRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={elementRef}
      data-visible={visible}
      className={`translate-y-7 opacity-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(.22,1,.36,1)] data-[visible=true]:translate-y-0 data-[visible=true]:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      {...props}
    >
      {children}
    </Component>
  );
}

function ScrollProgress() {
  const progressRef = useRef(null);

  useEffect(() => {
    let frameId;

    const updateProgress = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        const scrollableHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress =
          scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
        }
      });
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div
      ref={progressRef}
      aria-hidden="true"
      className="fixed top-0 right-0 left-0 z-[60] h-[2px] origin-left scale-x-0 bg-[#d85d41] motion-reduce:hidden"
    />
  );
}

const questStations = [
  {
    id: "profile",
    name: "Origin Camp",
    marker: "ID",
    x: 1,
    y: 1,
    color: "#ffb563",
  },
  {
    id: "experience",
    name: "Career Tower",
    marker: "XP",
    x: 7,
    y: 1,
    color: "#e8785d",
  },
  {
    id: "education",
    name: "Academy",
    marker: "ED",
    x: 4,
    y: 2,
    color: "#9a8bff",
  },
  {
    id: "expertise",
    name: "Tool Lab",
    marker: "SK",
    x: 1,
    y: 5,
    color: "#4fc4a1",
  },
  {
    id: "contact",
    name: "Signal Port",
    marker: "@",
    x: 7,
    y: 5,
    color: "#67a8ff",
  },
];

const codeShards = [
  { id: "logic", x: 3, y: 4, color: "#ffe36e" },
  { id: "craft", x: 5, y: 3, color: "#ff8b73" },
  { id: "curiosity", x: 6, y: 6, color: "#83e5ff" },
];

const wildCreatures = [
  {
    id: "fluxel",
    name: "Fluxel",
    type: "Logic",
    x: 3,
    y: 1,
    color: "#ffe36e",
    accent: "#e8785d",
    catchRate: 0.58,
    description:
      "A quick-thinking circuit creature that turns tangled logic into clear paths.",
  },
  {
    id: "mossbit",
    name: "Mossbit",
    type: "Growth",
    x: 6,
    y: 4,
    color: "#72d39c",
    accent: "#35734e",
    catchRate: 0.64,
    description:
      "A patient builder that improves every system it inhabits, one small iteration at a time.",
  },
  {
    id: "ripplet",
    name: "Ripplet",
    type: "Flow",
    x: 2,
    y: 5,
    color: "#83e5ff",
    accent: "#527bd5",
    catchRate: 0.7,
    description:
      "A fluid little navigator known for finding the smoothest route through complex journeys.",
  },
];

const scenery = [
  { x: 0, y: 0 },
  { x: 2, y: 0 },
  { x: 6, y: 0 },
  { x: 8, y: 0 },
  { x: 0, y: 2 },
  { x: 8, y: 2 },
  { x: 2, y: 3 },
  { x: 7, y: 3 },
  { x: 0, y: 6 },
  { x: 2, y: 6 },
  { x: 8, y: 6 },
];

function ByteCompanion() {
  return (
    <div
      className="relative size-9 shrink-0"
      aria-label="Byte, your code companion"
      role="img"
    >
      <span className="absolute top-1 left-2 size-6 rotate-45 rounded-[7px] border-[3px] border-[#292d3e] bg-[#ffe36e] shadow-[3px_3px_0_#292d3e]" />
      <span className="absolute top-3.5 left-3.5 size-1 rounded-full bg-[#292d3e]" />
      <span className="absolute top-3.5 right-2.5 size-1 rounded-full bg-[#292d3e]" />
      <span className="absolute bottom-0 left-1/2 h-2 w-1 -translate-x-1/2 bg-[#292d3e]" />
    </div>
  );
}

function PlayerSprite() {
  return (
    <div
      className="relative size-9 drop-shadow-[3px_4px_0_rgba(20,29,37,.28)]"
      aria-label="Bijen"
      role="img"
    >
      <span className="absolute top-0 left-1/2 h-2.5 w-7 -translate-x-1/2 rounded-t-sm border-2 border-[#292d3e] bg-[#e8785d]" />
      <span className="absolute top-2 left-1/2 h-3.5 w-5 -translate-x-1/2 border-x-2 border-[#292d3e] bg-[#f5c6a5]" />
      <span className="absolute top-[9px] left-[11px] size-1 bg-[#292d3e]" />
      <span className="absolute top-[9px] right-[10px] size-1 bg-[#292d3e]" />
      <span className="absolute bottom-1 left-1/2 h-4 w-6 -translate-x-1/2 rounded-sm border-2 border-[#292d3e] bg-[#405574]" />
      <span className="absolute bottom-0 left-2 h-2 w-2 bg-[#292d3e]" />
      <span className="absolute right-2 bottom-0 h-2 w-2 bg-[#292d3e]" />
    </div>
  );
}

function CreatureSprite({ creature, large = false }) {
  const size = large ? "size-28" : "size-14";
  const eyeSize = large ? "size-2" : "size-1";

  return (
    <div
      className={`relative ${size} shrink-0 drop-shadow-[5px_7px_0_rgba(41,45,62,.25)]`}
      aria-label={creature.name}
      role="img"
    >
      <span
        className="absolute inset-[18%] rounded-[38%_48%_42%_46%] border-[3px] border-[#292d3e]"
        style={{ backgroundColor: creature.color }}
      />
      <span
        className="absolute top-[11%] left-[19%] size-[31%] rotate-[-18deg] rounded-[70%_30%_60%_40%] border-[3px] border-[#292d3e]"
        style={{ backgroundColor: creature.accent }}
      />
      <span
        className="absolute top-[11%] right-[19%] size-[31%] rotate-[18deg] rounded-[30%_70%_40%_60%] border-[3px] border-[#292d3e]"
        style={{ backgroundColor: creature.accent }}
      />
      <span
        className={`absolute top-[42%] left-[35%] ${eyeSize} rounded-full bg-[#292d3e]`}
      />
      <span
        className={`absolute top-[42%] right-[35%] ${eyeSize} rounded-full bg-[#292d3e]`}
      />
      <span className="absolute top-[53%] left-1/2 h-[3px] w-[14%] -translate-x-1/2 rounded-full bg-[#292d3e]" />
      {creature.id === "fluxel" && (
        <span className="absolute right-[2%] bottom-[17%] h-[14%] w-[30%] skew-x-[-25deg] border-[3px] border-[#292d3e] bg-[#ffe36e]" />
      )}
      {creature.id === "mossbit" && (
        <span className="absolute top-[-2%] left-1/2 h-[28%] w-[18%] -translate-x-1/2 rotate-[30deg] rounded-[100%_0] border-[3px] border-[#292d3e] bg-[#4fc47b]" />
      )}
      {creature.id === "ripplet" && (
        <>
          <span className="absolute top-[45%] left-[3%] h-[22%] w-[28%] rotate-[-20deg] rounded-full border-[3px] border-[#292d3e] bg-[#67a8ff]" />
          <span className="absolute top-[45%] right-[3%] h-[22%] w-[28%] rotate-[20deg] rounded-full border-[3px] border-[#292d3e] bg-[#67a8ff]" />
        </>
      )}
    </div>
  );
}

function CaptureCapsule({ throwing }) {
  return (
    <div
      className={`relative size-12 rounded-full border-[3px] border-[#292d3e] bg-[#f7f0d5] shadow-[3px_3px_0_#292d3e] transition-all duration-700 ${throwing ? "-translate-y-36 rotate-[540deg] scale-75 opacity-100" : "translate-y-0 rotate-0 opacity-100"}`}
      aria-hidden="true"
    >
      <span className="absolute top-0 right-0 left-0 h-1/2 rounded-t-full bg-[#e8785d]" />
      <span className="absolute top-1/2 right-0 left-0 h-[3px] -translate-y-1/2 bg-[#292d3e]" />
      <span className="absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#292d3e] bg-[#ffe36e]" />
    </div>
  );
}

function CreatureEncounter({
  creature,
  capsules,
  status,
  scanned,
  onScan,
  onThrow,
  onRun,
  onContinue,
  onCraft,
}) {
  const actionButton =
    "rounded-lg border-[3px] border-[#292d3e] px-4 py-3 font-mono text-[0.68rem] font-black tracking-[0.08em] uppercase shadow-[4px_4px_0_#292d3e] transition-transform hover:-translate-y-0.5 active:translate-x-[3px] active:translate-y-[3px] active:shadow-none disabled:cursor-not-allowed disabled:opacity-45";
  const throwing = status === "throwing";
  const caught = status === "caught";

  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-between overflow-hidden bg-[linear-gradient(180deg,#bfe9ff_0%,#dff0b6_58%,#8fcf72_59%)] p-4 sm:p-6">
      <div className="absolute top-[58%] right-[-15%] left-[-15%] h-[45%] rounded-[50%_50%_0_0] border-t-[3px] border-[#608f5c] bg-[#8fcf72]" />
      <div className="relative z-10 w-full max-w-[720px] rounded-lg border-[3px] border-[#292d3e] bg-[#f7f0d5]/95 px-4 py-3 shadow-[4px_4px_0_#292d3e]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <span className="font-mono text-[0.58rem] font-black tracking-[0.14em] text-[#e8785d] uppercase">
              Wild encounter
            </span>
            <h2 className="text-xl font-black tracking-[-0.03em] sm:text-2xl">
              {creature.name} appeared!
            </h2>
          </div>
          <span
            className="rounded-full border-2 border-[#292d3e] px-3 py-1 font-mono text-[0.6rem] font-black uppercase"
            style={{ backgroundColor: creature.color }}
          >
            {creature.type}
          </span>
        </div>
      </div>

      <div
        className={`relative z-10 my-auto transition-all duration-500 ${throwing ? "scale-90" : caught ? "scale-0 rotate-12 opacity-0" : "animate-bounce motion-reduce:animate-none"}`}
      >
        <CreatureSprite creature={creature} large />
      </div>

      <div className="relative z-20 w-full max-w-[720px] rounded-xl border-[3px] border-[#292d3e] bg-[#f7f0d5] p-4 shadow-[6px_6px_0_#292d3e]">
        <div className="mb-4 flex items-center gap-4">
          <CaptureCapsule throwing={throwing} />
          <div className="flex-1">
            {status === "idle" && (
              <p className="m-0 text-sm font-bold">What will Bijen do?</p>
            )}
            {status === "throwing" && (
              <p className="m-0 animate-pulse text-sm font-black motion-reduce:animate-none">
                Capture capsule launched…
              </p>
            )}
            {status === "escaped" && (
              <p className="m-0 text-sm font-black">
                {creature.name} broke free! Try scanning it or throw again.
              </p>
            )}
            {status === "caught" && (
              <p className="m-0 text-sm font-black text-[#35734e]">
                Caught! {creature.name} joined your project party.
              </p>
            )}
            {scanned && !caught && (
              <p className="mt-1 mb-0 text-[0.72rem] leading-5 text-[#596076]">
                {creature.description} Scan bonus: catch chance increased.
              </p>
            )}
          </div>
          <span className="font-mono text-[0.62rem] font-black whitespace-nowrap">
            CAPSULES × {capsules}
          </span>
        </div>

        {caught ? (
          <button
            className={`${actionButton} w-full bg-[#ffe36e]`}
            onClick={onContinue}
            type="button"
          >
            Add to creature index
          </button>
        ) : capsules === 0 ? (
          <div className="grid gap-2 sm:grid-cols-2">
            <button
              className={`${actionButton} bg-[#83e5ff]`}
              onClick={onCraft}
              type="button"
            >
              Craft 2 capsules
            </button>
            <button
              className={`${actionButton} bg-white`}
              onClick={onRun}
              type="button"
            >
              Retreat
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            <button
              className={`${actionButton} bg-[#83e5ff]`}
              disabled={throwing || scanned}
              onClick={onScan}
              type="button"
            >
              Scan
            </button>
            <button
              className={`${actionButton} bg-[#ffe36e]`}
              disabled={throwing}
              onClick={onThrow}
              type="button"
            >
              Capture
            </button>
            <button
              className={`${actionButton} bg-white`}
              disabled={throwing}
              onClick={onRun}
              type="button"
            >
              Run
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function DirectionPad({ onMove }) {
  const buttonClass =
    "grid size-11 place-items-center rounded-lg border-2 border-[#292d3e] bg-[#f7f0d5] font-mono text-lg font-black text-[#292d3e] shadow-[3px_3px_0_#292d3e] transition-transform active:translate-x-[2px] active:translate-y-[2px] active:shadow-none";

  return (
    <div
      className="grid w-fit grid-cols-3 gap-1"
      aria-label="Movement controls"
    >
      <span />
      <button
        className={buttonClass}
        onClick={() => onMove(0, -1)}
        aria-label="Move up"
        type="button"
      >
        ↑
      </button>
      <span />
      <button
        className={buttonClass}
        onClick={() => onMove(-1, 0)}
        aria-label="Move left"
        type="button"
      >
        ←
      </button>
      <button
        className={buttonClass}
        onClick={() => onMove(0, 1)}
        aria-label="Move down"
        type="button"
      >
        ↓
      </button>
      <button
        className={buttonClass}
        onClick={() => onMove(1, 0)}
        aria-label="Move right"
        type="button"
      >
        →
      </button>
    </div>
  );
}

function QuestScene({ scene, onContinue, collectedCount, captured = [] }) {
  const panelButton =
    "rounded-lg border-2 border-[#292d3e] bg-[#ffe36e] px-4 py-3 font-mono text-[0.7rem] font-black tracking-[0.08em] text-[#292d3e] uppercase shadow-[3px_3px_0_#292d3e] transition-transform hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none";

  if (scene === "welcome") {
    return (
      <>
        <span className="mb-3 block font-mono text-[0.64rem] font-bold tracking-[0.16em] text-[#e8785d] uppercase">
          Secret route discovered
        </span>
        <h2 className="mb-3 text-3xl leading-none font-black tracking-[-0.04em]">
          Bijen’s
          <br />
          Debugger Trail
        </h2>
        <p className="mb-4 text-sm leading-6 text-[#50566d]">
          Welcome, explorer. Guide Bijen through five portfolio districts, meet
          Byte, catch three wild code creatures, and collect every code shard.
        </p>
        <div className="mb-5 rounded-lg border-2 border-dashed border-[#9ca3af] bg-white/50 p-3 font-mono text-[0.68rem] leading-5 text-[#50566d]">
          Move with WASD, arrow keys, or the control pad. Enter buildings for
          portfolio chapters and walk into rustling grass for a wild encounter.
        </div>
        <button className={panelButton} onClick={onContinue} type="button">
          Begin quest →
        </button>
      </>
    );
  }

  if (scene === "profile") {
    return (
      <>
        <span className="mb-3 block font-mono text-[0.64rem] font-bold tracking-[0.16em] text-[#e8785d] uppercase">
          01 / Origin Camp
        </span>
        <h2 className="mb-3 text-2xl font-black tracking-[-0.04em]">
          The product-minded engineer
        </h2>
        <p className="mb-4 text-sm leading-6 text-[#50566d]">
          Bijen Shahi is a software engineer with more than four years of
          experience building consumer mobile products across entertainment and
          digital media.
        </p>
        <div className="grid grid-cols-2 gap-2">
          {[
            "Native migrations",
            "Product craft",
            "Store releases",
            "Mentoring",
          ].map((item) => (
            <span
              className="rounded-md border-2 border-[#292d3e]/20 bg-white/60 p-2 font-mono text-[0.63rem] font-bold"
              key={item}
            >
              {item}
            </span>
          ))}
        </div>
        <button
          className={`${panelButton} mt-5`}
          onClick={onContinue}
          type="button"
        >
          Keep exploring
        </button>
      </>
    );
  }

  if (scene === "experience") {
    return (
      <>
        <span className="mb-3 block font-mono text-[0.64rem] font-bold tracking-[0.16em] text-[#e8785d] uppercase">
          02 / Career Tower
        </span>
        <h2 className="mb-4 text-2xl font-black tracking-[-0.04em]">
          Four career levels cleared
        </h2>
        <div className="max-h-[42vh] space-y-3 overflow-y-auto pr-1">
          {experience.map((item, index) => (
            <article
              className="rounded-lg border-2 border-[#292d3e]/20 bg-white/55 p-3"
              key={`${item.company}-quest`}
            >
              <div className="mb-1 flex items-start gap-2">
                <span className="font-mono text-[0.62rem] font-black text-[#e8785d]">
                  LV.{String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-sm font-black leading-tight">
                    {item.company}
                  </h3>
                  <p className="m-0 text-[0.72rem] font-bold text-[#596076]">
                    {item.role}
                  </p>
                </div>
              </div>
              <p className="mt-2 mb-0 text-[0.72rem] leading-5 text-[#596076]">
                {item.summary}
              </p>
            </article>
          ))}
        </div>
        <button
          className={`${panelButton} mt-5`}
          onClick={onContinue}
          type="button"
        >
          Return to map
        </button>
      </>
    );
  }

  if (scene === "expertise") {
    return (
      <>
        <span className="mb-3 block font-mono text-[0.64rem] font-bold tracking-[0.16em] text-[#e8785d] uppercase">
          03 / Tool Lab
        </span>
        <h2 className="mb-4 text-2xl font-black tracking-[-0.04em]">
          Engineering inventory
        </h2>
        <div className="space-y-3">
          {expertise.map((group) => (
            <div key={`${group.title}-quest`}>
              <p className="mb-1 font-mono text-[0.62rem] font-black tracking-[0.08em] uppercase">
                {group.title}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <span
                    className="rounded border border-[#292d3e]/30 bg-white/60 px-2 py-1 font-mono text-[0.62rem]"
                    key={`${skill}-quest`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button
          className={`${panelButton} mt-5`}
          onClick={onContinue}
          type="button"
        >
          Pack tools
        </button>
      </>
    );
  }

  if (scene === "education") {
    return (
      <>
        <span className="mb-3 block font-mono text-[0.64rem] font-bold tracking-[0.16em] text-[#e8785d] uppercase">
          04 / Academy
        </span>
        <h2 className="mb-5 text-2xl font-black tracking-[-0.04em]">
          Knowledge unlocked
        </h2>
        <div className="space-y-3">
          <article className="rounded-lg border-2 border-[#292d3e] bg-white/60 p-4 shadow-[3px_3px_0_#292d3e]">
            <span className="font-mono text-[0.62rem] font-black text-[#7c6be8]">
              2018 — 2021
            </span>
            <h3 className="mt-1 mb-1 text-base font-black">
              BSc (Hons) Computer Science
            </h3>
            <p className="m-0 text-[0.75rem] leading-5 text-[#596076]">
              University of Wolverhampton, delivered at Herald College Kathmandu
            </p>
          </article>
          <article className="rounded-lg border-2 border-[#292d3e]/20 bg-white/55 p-4">
            <span className="font-mono text-[0.62rem] font-black text-[#7c6be8]">
              2016 — 2018
            </span>
            <h3 className="mt-1 mb-1 text-base font-black">+2 Management</h3>
            <p className="m-0 text-[0.75rem] text-[#596076]">
              Uniglobe Secondary School, Nepal
            </p>
          </article>
        </div>
        <button
          className={`${panelButton} mt-5`}
          onClick={onContinue}
          type="button"
        >
          Leave academy
        </button>
      </>
    );
  }

  if (scene === "contact") {
    return (
      <>
        <span className="mb-3 block font-mono text-[0.64rem] font-bold tracking-[0.16em] text-[#e8785d] uppercase">
          05 / Signal Port
        </span>
        <h2 className="mb-3 text-2xl font-black tracking-[-0.04em]">
          Open a communication channel
        </h2>
        <p className="mb-5 text-sm leading-6 text-[#50566d]">
          Found an interesting quest for Bijen? Send a message or take the
          classic résumé route.
        </p>
        <div className="flex flex-col gap-3">
          <a
            className={panelButton}
            href={gmailComposeUrl}
            target="_blank"
            rel="noreferrer"
          >
            Send a message ↗
          </a>
          <a
            className="rounded-lg border-2 border-[#292d3e] bg-white/60 px-4 py-3 text-center font-mono text-[0.7rem] font-black tracking-[0.08em] uppercase"
            href="/Bijen-Shahi-CV.pdf"
            download
          >
            Download CV ↓
          </a>
        </div>
        <button
          className="mt-5 font-mono text-[0.68rem] font-black underline decoration-2 underline-offset-4"
          onClick={onContinue}
          type="button"
        >
          Return to map
        </button>
      </>
    );
  }

  if (scene === "collection") {
    return (
      <>
        <span className="mb-3 block font-mono text-[0.64rem] font-bold tracking-[0.16em] text-[#e8785d] uppercase">
          Creature index
        </span>
        <h2 className="mb-2 text-2xl font-black tracking-[-0.04em]">
          {captured.length} of {wildCreatures.length} creatures caught
        </h2>
        <p className="mb-4 text-[0.75rem] leading-5 text-[#596076]">
          Find the rustling wild zones, walk into them, and use capture capsules
          to complete the collection.
        </p>
        <div className="space-y-3">
          {wildCreatures.map((creature) => {
            const isCaught = captured.includes(creature.id);
            return (
              <article
                className={`flex items-center gap-3 rounded-lg border-2 p-3 transition-all ${isCaught ? "border-[#292d3e] bg-white/60 shadow-[3px_3px_0_#292d3e]" : "border-dashed border-[#9ca3af] bg-[#d9d5c5]/45 grayscale"}`}
                key={`${creature.id}-index`}
              >
                <div className={isCaught ? "" : "opacity-20"}>
                  <CreatureSprite creature={creature} />
                </div>
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <h3 className="text-sm font-black">
                      {isCaught ? creature.name : "Unknown creature"}
                    </h3>
                    {isCaught && (
                      <span
                        className="rounded-full border border-[#292d3e] px-2 py-0.5 font-mono text-[0.52rem] font-black uppercase"
                        style={{ backgroundColor: creature.color }}
                      >
                        {creature.type}
                      </span>
                    )}
                  </div>
                  <p className="m-0 text-[0.68rem] leading-4 text-[#596076]">
                    {isCaught
                      ? creature.description
                      : "No field data recorded yet."}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
        <button
          className={`${panelButton} mt-5`}
          onClick={onContinue}
          type="button"
        >
          Continue the hunt
        </button>
      </>
    );
  }

  return (
    <>
      <div className="mb-4 flex items-center gap-3">
        <ByteCompanion />
        <div>
          <span className="block font-mono text-[0.62rem] font-black tracking-[0.1em] text-[#e8785d] uppercase">
            Quest guide
          </span>
          <h2 className="text-xl font-black">Byte says hello!</h2>
        </div>
      </div>
      <p className="mb-4 text-sm leading-6 text-[#50566d]">
        Walk into a marked building to open a portfolio chapter. Rustling wild
        zones hide original creatures you can scan and capture.
      </p>
      <div className="rounded-lg border-2 border-[#292d3e]/20 bg-white/55 p-4">
        <div className="mb-2 flex items-center justify-between font-mono text-[0.65rem] font-black uppercase">
          <span>Code shards</span>
          <span>{collectedCount} / 3</span>
        </div>
        <div className="flex gap-2">
          {codeShards.map((shard, index) => (
            <span
              className={`size-5 rotate-45 border-2 border-[#292d3e] transition-all ${index < collectedCount ? "scale-100 opacity-100" : "scale-75 bg-transparent opacity-25"}`}
              style={
                index < collectedCount
                  ? { backgroundColor: shard.color }
                  : undefined
              }
              key={shard.id}
            />
          ))}
        </div>
      </div>
      {collectedCount === codeShards.length && (
        <div className="mt-4 animate-bounce rounded-lg border-2 border-[#292d3e] bg-[#ffe36e] p-3 text-center font-mono text-[0.68rem] font-black uppercase motion-reduce:animate-none">
          Master Builder badge unlocked!
        </div>
      )}
      <button
        className="mt-4 w-full rounded-lg border-2 border-[#292d3e] bg-[#83e5ff] px-3 py-2 font-mono text-[0.65rem] font-black uppercase shadow-[3px_3px_0_#292d3e]"
        onClick={() => onContinue("collection")}
        type="button"
      >
        Open creature index · {captured.length}/{wildCreatures.length}
      </button>
    </>
  );
}

function PortfolioQuest({ onClose }) {
  const [player, setPlayer] = useState({ x: 4, y: 6 });
  const [scene, setScene] = useState("welcome");
  const [collected, setCollected] = useState([]);
  const [captured, setCaptured] = useState([]);
  const [encounter, setEncounter] = useState(null);
  const [capsules, setCapsules] = useState(6);
  const [captureStatus, setCaptureStatus] = useState("idle");
  const [scanned, setScanned] = useState(false);
  const gameRef = useRef(null);
  const playerRef = useRef({ x: 4, y: 6 });
  const captureTimerRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => {
      gameRef.current?.focus({ preventScroll: true });
    });

    return () => {
      document.body.style.overflow = previousOverflow;
      window.cancelAnimationFrame(focusFrame);
      window.clearTimeout(captureTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!scene && !encounter) {
      gameRef.current?.focus({ preventScroll: true });
    }
  }, [scene, encounter]);

  const move = useCallback(
    (deltaX, deltaY) => {
      const welcomeIsOpen = scene === "welcome";
      if ((scene && !welcomeIsOpen) || encounter) return;
      if (welcomeIsOpen) setScene(null);

      const next = {
        x: Math.min(Math.max(playerRef.current.x + deltaX, 0), 8),
        y: Math.min(Math.max(playerRef.current.y + deltaY, 0), 6),
      };
      const station = questStations.find(
        (item) => item.x === next.x && item.y === next.y,
      );
      const shard = codeShards.find(
        (item) => item.x === next.x && item.y === next.y,
      );
      const creature = wildCreatures.find(
        (item) =>
          item.x === next.x && item.y === next.y && !captured.includes(item.id),
      );

      playerRef.current = next;
      setPlayer(next);
      if (station) setScene(station.id);
      if (creature) {
        setEncounter(creature);
        setCaptureStatus("idle");
        setScanned(false);
      }
      if (shard) {
        setCollected((currentShards) =>
          currentShards.includes(shard.id)
            ? currentShards
            : [...currentShards, shard.id],
        );
      }
    },
    [scene, encounter, captured],
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        if (encounter) {
          window.clearTimeout(captureTimerRef.current);
          setEncounter(null);
          setCaptureStatus("idle");
          setScanned(false);
        } else if (scene) setScene(null);
        else onClose();
        return;
      }

      const target = event.target;
      const isEditable =
        target instanceof HTMLElement &&
        target.matches('input, textarea, select, [contenteditable="true"]');
      if (isEditable || event.metaKey || event.ctrlKey || event.altKey) return;

      const normalizedKey =
        event.key.length === 1 ? event.key.toLowerCase() : event.key;
      const directionByCode = {
        ArrowUp: [0, -1],
        ArrowDown: [0, 1],
        ArrowLeft: [-1, 0],
        ArrowRight: [1, 0],
        KeyW: [0, -1],
        KeyS: [0, 1],
        KeyA: [-1, 0],
        KeyD: [1, 0],
      }[event.code];
      const directionByKey = {
        ArrowUp: [0, -1],
        ArrowDown: [0, 1],
        ArrowLeft: [-1, 0],
        ArrowRight: [1, 0],
        w: [0, -1],
        s: [0, 1],
        a: [-1, 0],
        d: [1, 0],
      }[normalizedKey];
      const direction = directionByCode ?? directionByKey;

      if (direction) {
        event.preventDefault();
        if (encounter || (scene && scene !== "welcome")) return;
        move(...direction);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [scene, encounter, move, onClose]);

  const throwCapsule = () => {
    if (!encounter || capsules <= 0 || captureStatus === "throwing") return;

    setCapsules((current) => current - 1);
    setCaptureStatus("throwing");
    const catchChance = Math.min(
      encounter.catchRate + (scanned ? 0.22 : 0),
      0.95,
    );

    captureTimerRef.current = window.setTimeout(() => {
      if (Math.random() <= catchChance) {
        setCaptured((current) =>
          current.includes(encounter.id) ? current : [...current, encounter.id],
        );
        setCaptureStatus("caught");
      } else {
        setCaptureStatus("escaped");
      }
    }, 850);
  };

  const finishEncounter = () => {
    window.clearTimeout(captureTimerRef.current);
    setEncounter(null);
    setCaptureStatus("idle");
    setScanned(false);
  };

  return (
    <section
      ref={gameRef}
      className="fixed inset-0 z-[100] overflow-y-auto bg-[#253649] font-sans text-[#292d3e] outline-none"
      data-testid="portfolio-quest"
      role="dialog"
      aria-modal="true"
      aria-label="Bijen's interactive portfolio quest"
      aria-keyshortcuts="ArrowUp ArrowDown ArrowLeft ArrowRight W A S D"
      tabIndex={-1}
    >
      <div className="min-h-full bg-[linear-gradient(135deg,rgba(255,255,255,.03)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.03)_50%,rgba(255,255,255,.03)_75%,transparent_75%)] bg-[length:32px_32px] p-3 sm:p-5">
        <div className="mx-auto max-w-[1400px]">
          <header className="mb-3 flex items-center justify-between rounded-xl border-[3px] border-[#292d3e] bg-[#f7f0d5] px-3 py-3 shadow-[5px_5px_0_#111927] sm:px-5">
            <div className="flex items-center gap-3">
              <ByteCompanion />
              <div>
                <span className="block font-mono text-[0.58rem] font-black tracking-[0.15em] text-[#e8785d] uppercase">
                  Secret portfolio mode
                </span>
                <h1 className="text-base font-black tracking-[-0.03em] sm:text-xl">
                  The Debugger Trail
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                className="rounded-lg border-2 border-[#292d3e] bg-[#83e5ff] px-2 py-2 font-mono text-[0.56rem] font-black uppercase shadow-[3px_3px_0_#292d3e] sm:px-3 sm:text-[0.6rem]"
                onClick={() => setScene("collection")}
                type="button"
              >
                Index {captured.length}/{wildCreatures.length}
              </button>
              <button
                className="rounded-lg border-2 border-[#292d3e] bg-[#e8785d] px-3 py-2 font-mono text-[0.65rem] font-black uppercase shadow-[3px_3px_0_#292d3e] transition-transform hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                onClick={onClose}
                type="button"
              >
                Exit game
              </button>
            </div>
          </header>

          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="overflow-hidden rounded-xl border-[3px] border-[#292d3e] bg-[#97d777] shadow-[6px_6px_0_#111927]">
              <div className="flex items-center justify-between border-b-[3px] border-[#292d3e] bg-[#dff0b6] px-4 py-3 font-mono text-[0.58rem] font-black tracking-[0.08em] uppercase sm:text-[0.62rem]">
                <span>Verdant Circuit / Zone 04</span>
                <span>
                  {captured.length}/3 creatures · {capsules} capsules
                </span>
              </div>

              <div className="relative h-[56svh] min-h-[380px] max-h-[680px]">
                <div className="absolute inset-0 grid grid-cols-9 grid-rows-7">
                  {Array.from({ length: 63 }, (_, index) => {
                    const x = index % 9;
                    const y = Math.floor(index / 9);
                    const isPath =
                      x === 4 || y === 3 || (y === 5 && x > 0 && x < 8);
                    return (
                      <span
                        className={`border border-[#608f5c]/15 ${isPath ? "bg-[#e8d79c]/80" : (x + y) % 2 === 0 ? "bg-[#9dd97d]" : "bg-[#94d174]"}`}
                        key={`tile-${index}`}
                      />
                    );
                  })}
                </div>

                <div className="absolute inset-0 grid grid-cols-9 grid-rows-7">
                  {scenery.map((item, index) => (
                    <span
                      className="grid place-items-center text-2xl text-[#35734e] drop-shadow-[2px_2px_0_#254c38]"
                      style={{ gridColumn: item.x + 1, gridRow: item.y + 1 }}
                      aria-hidden="true"
                      key={`tree-${index}`}
                    >
                      ▲
                    </span>
                  ))}

                  {questStations.map((station) => (
                    <button
                      className="group relative z-10 grid place-items-center self-center justify-self-center"
                      style={{
                        gridColumn: station.x + 1,
                        gridRow: station.y + 1,
                      }}
                      onClick={() => setScene(station.id)}
                      aria-label={`Enter ${station.name}`}
                      type="button"
                      key={station.id}
                    >
                      <span
                        className="grid size-10 place-items-center rounded-t-lg border-[3px] border-[#292d3e] font-mono text-[0.7rem] font-black shadow-[3px_3px_0_#292d3e] transition-transform group-hover:-translate-y-1 sm:size-12"
                        style={{ backgroundColor: station.color }}
                      >
                        {station.marker}
                      </span>
                      <span className="mt-1 rounded bg-[#f7f0d5] px-1.5 py-0.5 font-mono text-[0.48rem] font-black whitespace-nowrap uppercase shadow-[1px_1px_0_#292d3e] sm:text-[0.55rem]">
                        {station.name}
                      </span>
                    </button>
                  ))}

                  {codeShards
                    .filter((shard) => !collected.includes(shard.id))
                    .map((shard) => (
                      <span
                        className="z-10 size-4 animate-pulse self-center justify-self-center rotate-45 border-2 border-[#292d3e] shadow-[2px_2px_0_rgba(41,45,62,.5)] motion-reduce:animate-none"
                        style={{
                          gridColumn: shard.x + 1,
                          gridRow: shard.y + 1,
                          backgroundColor: shard.color,
                        }}
                        aria-label={`${shard.id} code shard`}
                        role="img"
                        key={shard.id}
                      />
                    ))}

                  {wildCreatures
                    .filter((creature) => !captured.includes(creature.id))
                    .map((creature) => (
                      <span
                        className="z-[5] grid size-10 animate-pulse place-items-center self-center justify-self-center rounded-[45%] border-2 border-[#35734e] bg-[#4b9b61]/75 font-mono text-lg font-black text-[#dff0b6] shadow-[2px_2px_0_#254c38] motion-reduce:animate-none"
                        style={{
                          gridColumn: creature.x + 1,
                          gridRow: creature.y + 1,
                        }}
                        aria-label={`Rustling grass hiding ${creature.name}`}
                        role="img"
                        key={`${creature.id}-wild-zone`}
                      >
                        ≋
                      </span>
                    ))}

                  <div
                    className="z-20 grid place-items-center transition-all duration-150 ease-out"
                    data-testid="quest-player"
                    data-player-x={player.x}
                    data-player-y={player.y}
                    style={{ gridColumn: player.x + 1, gridRow: player.y + 1 }}
                  >
                    <PlayerSprite />
                  </div>
                </div>

                <div className="absolute right-3 bottom-3 z-20 lg:hidden">
                  <DirectionPad onMove={move} />
                </div>

                {encounter && (
                  <CreatureEncounter
                    creature={encounter}
                    capsules={capsules}
                    status={captureStatus}
                    scanned={scanned}
                    onScan={() => {
                      setScanned(true);
                      setCaptureStatus("idle");
                    }}
                    onThrow={throwCapsule}
                    onRun={finishEncounter}
                    onContinue={finishEncounter}
                    onCraft={() => {
                      setCapsules((current) => current + 2);
                      setCaptureStatus("idle");
                    }}
                  />
                )}
              </div>
            </div>

            <aside
              className={`${scene ? "fixed inset-x-3 bottom-3 z-30 max-h-[72svh] overflow-y-auto lg:static lg:max-h-none" : "hidden lg:block"} rounded-xl border-[3px] border-[#292d3e] bg-[#f7f0d5] p-5 shadow-[6px_6px_0_#111927]`}
            >
              <QuestScene
                scene={scene}
                onContinue={(nextScene = null) => setScene(nextScene)}
                collectedCount={collected.length}
                captured={captured}
              />
            </aside>
          </div>

          <div className="mt-4 hidden items-center justify-between rounded-xl border-[3px] border-[#292d3e] bg-[#f7f0d5] p-4 shadow-[5px_5px_0_#111927] lg:flex">
            <div className="flex items-center gap-4">
              <PlayerSprite />
              <div>
                <span className="block font-mono text-[0.6rem] font-black tracking-[0.1em] text-[#e8785d] uppercase">
                  Player
                </span>
                <strong className="text-sm">
                  BIJEN / MOBILE ENGINEER / LV.04
                </strong>
              </div>
            </div>
            <DirectionPad onMove={move} />
            <p className="m-0 max-w-[280px] text-right font-mono text-[0.62rem] leading-5 text-[#596076]">
              WASD / ARROWS TO MOVE
              <br />
              ENTER RUSTLING GRASS TO CATCH CREATURES
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function App() {
  const [gameOpen, setGameOpen] = useState(false);
  const [logoTapCount, setLogoTapCount] = useState(0);
  const logoRef = useRef(null);
  const logoTapRef = useRef({ count: 0, lastTap: 0 });
  const logoResetTimerRef = useRef(null);

  useEffect(() => {
    const sequence = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let position = 0;

    const handleSecretKeys = (event) => {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      if (key === sequence[position]) {
        position += 1;
        if (position === sequence.length) {
          setGameOpen(true);
          position = 0;
        }
      } else {
        position = key === sequence[0] ? 1 : 0;
      }
    };

    window.addEventListener("keydown", handleSecretKeys);
    return () => {
      window.removeEventListener("keydown", handleSecretKeys);
      window.clearTimeout(logoResetTimerRef.current);
    };
  }, []);

  const handleLogoTap = (event) => {
    event.preventDefault();

    if (window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const now = Date.now();
    if (now - logoTapRef.current.lastTap > secretTapWindowMs) {
      logoTapRef.current.count = 0;
    }

    logoTapRef.current.lastTap = now;
    logoTapRef.current.count += 1;
    const nextCount = logoTapRef.current.count;

    window.clearTimeout(logoResetTimerRef.current);

    if (nextCount >= 5) {
      logoTapRef.current.count = 0;
      setLogoTapCount(0);
      setGameOpen(true);
      return;
    }

    setLogoTapCount(nextCount);
    logoResetTimerRef.current = window.setTimeout(() => {
      logoTapRef.current.count = 0;
      setLogoTapCount(0);
    }, secretTapWindowMs);
  };

  const closeGame = () => {
    setGameOpen(false);
    window.setTimeout(() => logoRef.current?.focus(), 0);
  };

  return (
    <main className="overflow-x-hidden bg-[#f2f0ea] text-[#151518] antialiased selection:bg-[#d85d41] selection:text-white">
      <ScrollProgress />
      <a
        className="fixed top-3 left-3 z-[70] -translate-y-20 bg-[#151518] px-4 py-2 text-sm text-white transition-transform focus:translate-y-0"
        href="#main-content"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-50 border-b border-transparent bg-[#f2f0ea]/88 backdrop-blur-xl">
        <nav
          className={`${shell} flex h-[74px] items-center justify-between text-[0.84rem] font-medium sm:h-[88px]`}
          aria-label="Primary navigation"
        >
          <div className="relative">
            <a
              ref={logoRef}
              className={`-m-3 inline-flex min-h-11 min-w-11 touch-manipulation select-none items-center px-3 font-mono text-[1.4rem] tracking-[-0.12em] ${focusRing}`}
              data-testid="secret-logo-trigger"
              href="#top"
              aria-label="Bijen Shahi, home"
              onClick={handleLogoTap}
            >
              BS<span className="text-[#d85d41]">.</span>
            </a>
            {logoTapCount > 0 && (
              <div
                className="absolute top-full left-0 mt-3 w-max animate-pulse rounded-full bg-[#151518] px-3 py-1.5 font-mono text-[0.58rem] tracking-[0.08em] whitespace-nowrap text-[#f2f0ea] uppercase shadow-lg motion-reduce:animate-none"
                aria-live="polite"
              >
                Keep tapping · {logoTapCount}/5
              </div>
            )}
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a
              className={`transition-colors duration-300 hover:text-[#d85d41] ${focusRing}`}
              href="#work"
            >
              Experience
            </a>
            <a
              className={`transition-colors duration-300 hover:text-[#d85d41] ${focusRing}`}
              href="#about"
            >
              About
            </a>
            <a
              className={`transition-colors duration-300 hover:text-[#d85d41] ${focusRing}`}
              href="#contact"
            >
              Contact
            </a>
          </div>
          <div className="flex items-center gap-5 sm:gap-7">
            <a
              className={`${navAction} hidden sm:inline-flex`}
              href="/Bijen-Shahi-CV.pdf"
              download
            >
              Download CV{" "}
              <span className="transition-transform duration-300 group-hover:translate-y-0.5">
                ↓
              </span>
            </a>
            <a
              className={navAction}
              href={gmailComposeUrl}
              target="_blank"
              rel="noreferrer"
            >
              Let’s talk{" "}
              <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                <ArrowUpRight />
              </span>
            </a>
          </div>
        </nav>
      </header>

      <div id="main-content">
        <section
          className={`${shell} relative flex min-h-[calc(100svh-74px)] flex-col justify-between py-12 pb-8 sm:min-h-[720px] sm:py-20 sm:pb-12`}
          id="top"
        >
          <div className="pointer-events-none absolute top-[12%] right-[-17rem] hidden size-[34rem] animate-spin rounded-full border border-[#d85d41]/20 [animation-duration:28s] lg:block motion-reduce:animate-none">
            <span className="absolute top-0 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d85d41]" />
            <span className="absolute inset-16 rounded-full border border-[#bcb9b1]/60" />
          </div>

          <Reveal className="relative z-10">
            <p className={label}>Bijen Shahi · Software Engineer · Kathmandu</p>
          </Reveal>

          <div className="relative z-10 grid items-end gap-10 md:grid-cols-[minmax(0,1fr)_270px]">
            <Reveal delay={80}>
              <h1 className="m-0 max-w-[920px] text-[clamp(3.7rem,16vw,8.4rem)] leading-[0.9] tracking-[-0.07em] font-medium">
                Mobile engineering,
                <br />
                <em className="font-[Georgia,serif] font-medium">
                  from idea to release.
                </em>
              </h1>
            </Reveal>
            <Reveal className="max-w-[310px] pb-2 md:max-w-none" delay={180}>
              <p className="mb-6 text-[0.98rem] leading-6 text-[#5d5a55]">
                I design, build, and ship dependable mobile products across
                React Native and native Android—combining product judgment with
                disciplined engineering.
              </p>
              <a
                className={`group grid size-12 place-items-center rounded-full border border-[#1d1c1b] transition-all duration-300 hover:translate-y-1 hover:bg-[#1d1c1b] hover:text-[#f2f0ea] ${focusRing}`}
                href="#work"
                aria-label="Explore professional experience"
              >
                <span className="transition-transform duration-300 group-hover:translate-y-0.5">
                  <ArrowDown />
                </span>
              </a>
            </Reveal>
          </div>

          <Reveal
            className="relative z-10 border-t border-[#bcb9b1] pt-5 font-mono text-[0.62rem] tracking-[0.08em] uppercase sm:text-[0.68rem]"
            delay={240}
          >
            <p className="m-0 leading-[1.5]">React Native · Kotlin</p>
          </Reveal>
        </section>

        <section
          className={`${shell} grid border-t border-[#bcb9b1] py-8 pb-24 sm:grid-cols-[1fr_2fr] sm:pb-[150px]`}
          id="about"
        >
          <Reveal>
            <p className={`${label} mb-12 sm:mb-0`}>01 / Profile</p>
          </Reveal>
          <div>
            <Reveal>
              <div className="max-w-[820px] text-[clamp(1.6rem,3vw,2.75rem)] leading-[1.2] tracking-[-0.045em]">
                <p className="mb-[1.15em]">
                  I’m <strong className="font-medium">Bijen Shahi</strong>, a
                  product-minded software engineer with more than four years of
                  experience delivering consumer mobile applications across
                  entertainment and digital media.
                </p>
                <p className="m-0 text-[#77736c]">
                  My work spans native migrations, authentication, interface
                  refinement, release operations, CI/CD, performance
                  optimisation, and developer mentorship.
                </p>
              </div>
            </Reveal>

            <div className="mt-16 grid border-t border-[#bcb9b1] sm:grid-cols-2">
              {[
                ["Architecture", "Cross-platform and native Android migration"],
                ["Product craft", "Clear, reliable user journeys"],
                ["Delivery", "App-store releases and CI/CD"],
                ["Leadership", "Mentoring, review, and documentation"],
              ].map(([title, copy], index) => (
                <Reveal
                  className="border-b border-[#bcb9b1] py-6 sm:odd:border-r sm:odd:pr-8 sm:even:pl-8"
                  delay={index * 70}
                  key={title}
                >
                  <span className="mb-2 block font-mono text-[0.65rem] tracking-[0.1em] text-[#d85d41] uppercase">
                    {title}
                  </span>
                  <p className="m-0 max-w-[280px] text-[0.9rem] leading-6 text-[#5d5a55]">
                    {copy}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={`${shell} py-8 pb-24 sm:pb-[155px]`} id="work">
          <div className="grid pb-12 sm:grid-cols-[1fr_2fr] sm:pb-[66px]">
            <Reveal>
              <p className={`${label} mb-12 sm:mb-0`}>02 / Experience</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="m-0 text-[clamp(3.1rem,6vw,6.2rem)] leading-[0.92] tracking-[-0.065em] font-medium">
                Experience shaped by
                <br />
                <em className="font-[Georgia,serif] font-medium">
                  ownership and impact.
                </em>
              </h2>
            </Reveal>
          </div>

          <div className="border-t border-[#bcb9b1]">
            {experience.map((item, index) => (
              <Reveal
                as="article"
                className="group relative grid grid-cols-[28px_1fr] gap-4 overflow-hidden border-b border-[#bcb9b1] py-7 transition-[padding,background] duration-500 before:absolute before:top-0 before:bottom-0 before:left-0 before:w-[2px] before:origin-bottom before:scale-y-0 before:bg-[#d85d41] before:transition-transform before:duration-500 hover:bg-[#e9e6de] hover:before:scale-y-100 sm:grid-cols-[0.7fr_2fr_170px] sm:gap-8 sm:py-9 sm:hover:px-4"
                delay={index * 90}
                key={`${item.company}-${item.role}`}
              >
                <span className="font-mono text-[0.66rem] tracking-[0.08em] text-[#77736c] uppercase">
                  0{index + 1}
                </span>
                <div className="col-start-2 sm:col-auto">
                  <h3 className="mb-1 text-[1.25rem] tracking-[-0.035em]">
                    {item.company}
                  </h3>
                  <p className="mb-4 text-[0.84rem] font-semibold text-[#d85d41]">
                    {item.role}
                  </p>
                  <p className="mb-6 max-w-[580px] text-[0.82rem] leading-5 font-medium text-[#77736c] italic">
                    {item.summary}
                  </p>
                  <ul className="m-0 max-w-[690px] list-none space-y-2 p-0 text-[0.92rem] leading-6 text-[#55524d]">
                    {item.highlights.map((highlight) => (
                      <li
                        className="relative pl-5 before:absolute before:top-[0.63rem] before:left-0 before:size-1 before:rounded-full before:bg-[#d85d41]"
                        key={highlight}
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
                <time className="col-start-2 row-start-1 mt-[-1px] text-left font-mono text-[0.65rem] tracking-[0.06em] uppercase sm:col-auto sm:row-auto sm:text-right">
                  {item.period}
                </time>
              </Reveal>
            ))}
          </div>
        </section>

        <section
          className={`${shell} grid border-t border-[#bcb9b1] py-8 pb-24 sm:grid-cols-[1fr_2fr] sm:pb-[150px]`}
        >
          <Reveal>
            <p className={`${label} mb-12 sm:mb-0`}>03 / Expertise</p>
          </Reveal>
          <div>
            <Reveal>
              <h2 className="m-0 max-w-[820px] text-[clamp(3.1rem,6vw,6.2rem)] leading-[0.92] tracking-[-0.065em] font-medium">
                Engineering across
                <br />
                <em className="font-[Georgia,serif] font-medium">
                  the product lifecycle.
                </em>
              </h2>
            </Reveal>

            <div className="mt-16 border-t border-[#bcb9b1]">
              {expertise.map((group, index) => (
                <Reveal
                  className="grid gap-5 border-b border-[#bcb9b1] py-7 sm:grid-cols-[1fr_1.4fr]"
                  delay={index * 75}
                  key={group.title}
                >
                  <div>
                    <h3 className="mb-1 text-base tracking-[-0.025em]">
                      {group.title}
                    </h3>
                    <p className="m-0 max-w-[260px] text-[0.82rem] leading-5 text-[#77736c]">
                      {group.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap content-start gap-2">
                    {group.skills.map((skill) => (
                      <span
                        className="rounded-full border border-[#aaa69e] px-3 py-2 font-mono text-[0.68rem] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#151518] hover:bg-[#151518] hover:text-[#f2f0ea]"
                        key={skill}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section
          className={`${shell} grid border-t border-[#bcb9b1] py-8 pb-24 sm:grid-cols-[1fr_2fr] sm:pb-[145px]`}
        >
          <Reveal>
            <p className={`${label} mb-12 sm:mb-0`}>04 / Education</p>
          </Reveal>
          <div className="grid gap-12 sm:grid-cols-2 sm:gap-16">
            <Reveal>
              <span className="mb-5 block font-mono text-[0.66rem] tracking-[0.08em] text-[#6f6b65] uppercase sm:mb-12">
                2026 - Present
              </span>
              <h3 className="mb-2 text-[1.45rem] leading-tight tracking-[-0.035em]">
                Msc
                <br />
                Computer Science and Technology
              </h3>
              <p className="m-0 text-[0.9rem] leading-6 text-[#5d5a55]">
                Ulster University, UK
              </p>
            </Reveal>
            <Reveal>
              <span className="mb-5 block font-mono text-[0.66rem] tracking-[0.08em] text-[#6f6b65] uppercase sm:mb-12">
                2018 - 2021
              </span>
              <h3 className="mb-2 text-[1.45rem] leading-tight tracking-[-0.035em]">
                BSc (Hons)
                <br />
                Computer Science
              </h3>
              <p className="m-0 text-[0.9rem] leading-6 text-[#5d5a55]">
                University of Wolverhampton, UK
                <br />
                Delivered at Herald College Kathmandu
              </p>
            </Reveal>
            {/* <Reveal delay={100}>
              <span className="mb-5 block font-mono text-[0.66rem] tracking-[0.08em] text-[#6f6b65] uppercase sm:mb-12">
                2016 - 2018
              </span>
              <h3 className="mb-2 text-[1.45rem] leading-tight tracking-[-0.035em]">
                +2 Management
              </h3>
              <p className="m-0 text-[0.9rem] leading-6 text-[#5d5a55]">
                Uniglobe Secondary School, Nepal
              </p>
            </Reveal> */}
          </div>
        </section>

        <section
          className="relative overflow-hidden bg-[#151518] text-[#f5f3ee]"
          id="contact"
        >
          <div
            className="pointer-events-none absolute top-[-14rem] right-[-10rem] size-[34rem] rounded-full border border-[#d85d41]/20"
            aria-hidden="true"
          />
          <div
            className={`${shell} relative flex min-h-[580px] flex-col pt-8 sm:min-h-[680px]`}
          >
            <Reveal>
              <p className={`${label} text-[#a4a097]`}>05 / Contact</p>
            </Reveal>
            <Reveal className="flex flex-1 flex-col justify-center" delay={100}>
              <p className="mb-4 font-mono text-[0.68rem] tracking-[0.1em] uppercase text-[#a4a097]">
                Have a product or engineering challenge in mind?
              </p>
              <a
                className={`group w-fit text-[clamp(3.55rem,7.5vw,7.1rem)] leading-[0.94] tracking-[-0.065em] transition-colors duration-500 hover:text-[#d85d41] ${focusRing}`}
                href={gmailComposeUrl}
                target="_blank"
                rel="noreferrer"
              >
                Let’s start a<br />
                <em className="font-[Georgia,serif] font-medium">
                  conversation.
                </em>{" "}
                <span className="inline-block transition-transform duration-500 group-hover:-translate-y-2 group-hover:translate-x-2">
                  <ArrowUpRight className="text-[0.52em]" />
                </span>
              </a>
            </Reveal>
            <footer className="flex flex-wrap gap-x-5 gap-y-3 border-t border-[#44443f] py-6 font-mono text-[0.66rem] tracking-[0.04em] text-[#a4a097]">
              <span>© {new Date().getFullYear()} Bijen Shahi</span>
              <a
                className={`transition-colors hover:text-[#f5f3ee] sm:ml-auto ${focusRing}`}
                href="tel:+447345131282"
              >
                +44 7345 131282
              </a>
              <a
                className={`transition-colors hover:text-[#f5f3ee] ${focusRing}`}
                href="mailto:shahibijen@gmail.com"
              >
                shahibijen@gmail.com
              </a>
            </footer>
          </div>
        </section>
      </div>
      {gameOpen && <PortfolioQuest onClose={closeGame} />}
    </main>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
