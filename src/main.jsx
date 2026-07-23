import { StrictMode, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

const experience = [
  {
    company: 'Veel Inc.',
    role: 'Software Engineer',
    period: 'Aug 2024 - Present',
    summary: 'Native product evolution, user experience, and release delivery.',
    highlights: [
      'Contributing to the migration of a production React Native application to a fully native Android architecture in Kotlin, improving platform capability and long-term maintainability.',
      'Redesigned and delivered core product journeys, including authentication and social sharing, to create clearer and more reliable user experiences.',
      'Integrated third-party authentication solutions and managed feature releases across Google Play and the App Store, while supporting code reviews, documentation, and intern development.',
    ],
  },
  {
    company: 'Machnet Technology Pvt Ltd.',
    role: 'Software Engineer',
    period: 'Dec 2022 - Aug 2024',
    summary: 'React Native delivery, platform integrations, and team enablement.',
    highlights: [
      'Mentored junior engineers through technical guidance, implementation support, and day-to-day collaboration.',
      'Contributed to CI/CD pipeline improvements that strengthened release consistency and development cadence.',
      'Integrated production tooling and React Native modules including App Center, LogRocket, Lottie, React Navigation, and Firebase.',
    ],
  },
  {
    company: 'Amnil Technologies Pvt Ltd.',
    role: 'Associate Software Engineer',
    period: 'Nov 2021 - Dec 2022',
    summary: 'Legacy modernisation, reusable systems, and mobile operations.',
    highlights: [
      'Migrated three legacy native applications into independent React Native products, improving maintainability, development efficiency, and cross-platform scalability.',
      'Developed reusable in-house packages and shared libraries that improved consistency across multiple applications.',
      'Managed end-to-end store releases and contributed to large-scale cinema products including QFX Cinemas, FCube Cinemas, Midtown Cinemas, and BSR Movies.',
    ],
  },
  {
    company: 'Amnil Technologies Pvt Ltd.',
    role: 'React Native Intern',
    period: 'Jul 2021 - Nov 2021',
    summary: 'Mobile foundations, asynchronous data, and product delivery.',
    highlights: [
      'Built a movie-discovery application in React Native with genre-based sorting, filtering, and intuitive navigation.',
      'Implemented asynchronous application flows using Redux, Redux-Saga, API integrations, and React Navigation, while developing practical MySQL knowledge.',
    ],
  },
];

const expertise = [
  {
    title: 'Mobile engineering',
    description: 'Cross-platform and native product development.',
    skills: ['React Native', 'Kotlin', 'Expo', 'Android'],
  },
  {
    title: 'Languages & architecture',
    description: 'Maintainable systems designed for product growth.',
    skills: ['TypeScript', 'JavaScript', 'Redux', 'Redux-Saga'],
  },
  {
    title: 'Platform & delivery',
    description: 'Reliable releases from integration to production.',
    skills: ['Firebase', 'CI/CD', 'Jenkins', 'Git'],
  },
  {
    title: 'Engineering practice',
    description: 'Quality built through collaboration and clear standards.',
    skills: ['Code review', 'Mentoring', 'Performance', 'Documentation'],
  },
];

const shell = 'mx-auto w-full max-w-[1280px] px-5 sm:px-10';
const label = 'font-mono text-[0.68rem] tracking-[0.12em] text-[#6a665f] uppercase';
const focusRing = 'focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d85d41]';
const gmailComposeUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=shahibijen%40gmail.com';
const navAction = `group inline-flex items-center gap-1.5 font-mono text-[0.68rem] tracking-[0.08em] uppercase text-[#56534d] transition-colors duration-300 hover:text-[#d85d41] ${focusRing}`;

function ArrowUpRight({ className = 'text-[1.1rem]' }) {
  return <span aria-hidden="true" className={`inline-block leading-none ${className}`}>↗</span>;
}

function ArrowDown() {
  return <span aria-hidden="true" className="text-lg leading-none">↓</span>;
}

function Reveal({ as: Component = 'div', children, className = '', delay = 0, ...props }) {
  const elementRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
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
      { threshold: 0.12, rootMargin: '0px 0px -48px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={elementRef}
      data-visible={visible}
      className={`translate-y-7 opacity-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(.22,1,.36,1)] data-[visible=true]:translate-y-0 data-[visible=true]:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
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
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
        }
      });
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
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

function App() {
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
        <nav className={`${shell} flex h-[74px] items-center justify-between text-[0.84rem] font-medium sm:h-[88px]`} aria-label="Primary navigation">
          <a className={`font-mono text-[1.4rem] tracking-[-0.12em] ${focusRing}`} href="#top" aria-label="Bijen Shahi, home">
            BS<span className="text-[#d85d41]">.</span>
          </a>
          <div className="hidden items-center gap-8 md:flex">
            <a className={`transition-colors duration-300 hover:text-[#d85d41] ${focusRing}`} href="#work">Experience</a>
            <a className={`transition-colors duration-300 hover:text-[#d85d41] ${focusRing}`} href="#about">About</a>
            <a className={`transition-colors duration-300 hover:text-[#d85d41] ${focusRing}`} href="#contact">Contact</a>
          </div>
          <div className="flex items-center gap-5 sm:gap-7">
            <a className={`${navAction} hidden sm:inline-flex`} href="/Bijen-Shahi-CV.pdf" download>
              Download CV <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
            </a>
            <a className={navAction} href={gmailComposeUrl} target="_blank" rel="noreferrer">
              Let’s talk <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"><ArrowUpRight /></span>
            </a>
          </div>
        </nav>
      </header>

      <div id="main-content">
        <section className={`${shell} relative flex min-h-[calc(100svh-74px)] flex-col justify-between py-12 pb-8 sm:min-h-[720px] sm:py-20 sm:pb-12`} id="top">
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
                Mobile engineering,<br />
                <em className="font-[Georgia,serif] font-medium">from idea to release.</em>
              </h1>
            </Reveal>
            <Reveal className="max-w-[310px] pb-2 md:max-w-none" delay={180}>
              <p className="mb-6 text-[0.98rem] leading-6 text-[#5d5a55]">
                I design, build, and ship dependable mobile products across React Native and native Android—combining product judgment with disciplined engineering.
              </p>
              <a
                className={`group grid size-12 place-items-center rounded-full border border-[#1d1c1b] transition-all duration-300 hover:translate-y-1 hover:bg-[#1d1c1b] hover:text-[#f2f0ea] ${focusRing}`}
                href="#work"
                aria-label="Explore professional experience"
              >
                <span className="transition-transform duration-300 group-hover:translate-y-0.5"><ArrowDown /></span>
              </a>
            </Reveal>
          </div>

          <Reveal className="relative z-10 flex items-center justify-between gap-4 border-t border-[#bcb9b1] pt-5 font-mono text-[0.62rem] tracking-[0.08em] uppercase sm:text-[0.68rem]" delay={240}>
            <p className="m-0 max-w-[190px] leading-[1.5] sm:max-w-none">React Native · Kotlin · Product delivery</p>
            <span className="inline-flex items-center gap-2 text-right text-[#56534d]">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#d85d41] opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex size-2 rounded-full bg-[#d85d41]" />
              </span>
              Open to impactful opportunities
            </span>
          </Reveal>
        </section>

        <section className={`${shell} grid border-t border-[#bcb9b1] py-8 pb-24 sm:grid-cols-[1fr_2fr] sm:pb-[150px]`} id="about">
          <Reveal>
            <p className={`${label} mb-12 sm:mb-0`}>01 / Profile</p>
          </Reveal>
          <div>
            <Reveal>
              <div className="max-w-[820px] text-[clamp(1.6rem,3vw,2.75rem)] leading-[1.2] tracking-[-0.045em]">
                <p className="mb-[1.15em]">
                  I’m <strong className="font-medium">Bijen Shahi</strong>, a product-minded software engineer with more than four years of experience delivering consumer mobile applications across entertainment and digital media.
                </p>
                <p className="m-0 text-[#77736c]">
                  My work spans native migrations, authentication, interface refinement, release operations, CI/CD, performance optimisation, and developer mentorship.
                </p>
              </div>
            </Reveal>

            <div className="mt-16 grid border-t border-[#bcb9b1] sm:grid-cols-2">
              {[
                ['Architecture', 'Cross-platform and native Android migration'],
                ['Product craft', 'Clear, reliable user journeys'],
                ['Delivery', 'App-store releases and CI/CD'],
                ['Leadership', 'Mentoring, review, and documentation'],
              ].map(([title, copy], index) => (
                <Reveal
                  className="border-b border-[#bcb9b1] py-6 sm:odd:border-r sm:odd:pr-8 sm:even:pl-8"
                  delay={index * 70}
                  key={title}
                >
                  <span className="mb-2 block font-mono text-[0.65rem] tracking-[0.1em] text-[#d85d41] uppercase">{title}</span>
                  <p className="m-0 max-w-[280px] text-[0.9rem] leading-6 text-[#5d5a55]">{copy}</p>
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
                Experience shaped by<br />
                <em className="font-[Georgia,serif] font-medium">ownership and impact.</em>
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
                <span className="font-mono text-[0.66rem] tracking-[0.08em] text-[#77736c] uppercase">0{index + 1}</span>
                <div className="col-start-2 sm:col-auto">
                  <h3 className="mb-1 text-[1.25rem] tracking-[-0.035em]">{item.company}</h3>
                  <p className="mb-4 text-[0.84rem] font-semibold text-[#d85d41]">{item.role}</p>
                  <p className="mb-6 max-w-[580px] text-[0.82rem] leading-5 font-medium text-[#77736c] italic">{item.summary}</p>
                  <ul className="m-0 max-w-[690px] list-none space-y-2 p-0 text-[0.92rem] leading-6 text-[#55524d]">
                    {item.highlights.map((highlight) => (
                      <li className="relative pl-5 before:absolute before:top-[0.63rem] before:left-0 before:size-1 before:rounded-full before:bg-[#d85d41]" key={highlight}>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
                <time className="col-start-2 row-start-1 mt-[-1px] text-left font-mono text-[0.65rem] tracking-[0.06em] uppercase sm:col-auto sm:row-auto sm:text-right">{item.period}</time>
              </Reveal>
            ))}
          </div>
        </section>

        <section className={`${shell} grid border-t border-[#bcb9b1] py-8 pb-24 sm:grid-cols-[1fr_2fr] sm:pb-[150px]`}>
          <Reveal>
            <p className={`${label} mb-12 sm:mb-0`}>03 / Expertise</p>
          </Reveal>
          <div>
            <Reveal>
              <h2 className="m-0 max-w-[820px] text-[clamp(3.1rem,6vw,6.2rem)] leading-[0.92] tracking-[-0.065em] font-medium">
                Engineering across<br />
                <em className="font-[Georgia,serif] font-medium">the product lifecycle.</em>
              </h2>
            </Reveal>

            <div className="mt-16 border-t border-[#bcb9b1]">
              {expertise.map((group, index) => (
                <Reveal className="grid gap-5 border-b border-[#bcb9b1] py-7 sm:grid-cols-[1fr_1.4fr]" delay={index * 75} key={group.title}>
                  <div>
                    <h3 className="mb-1 text-base tracking-[-0.025em]">{group.title}</h3>
                    <p className="m-0 max-w-[260px] text-[0.82rem] leading-5 text-[#77736c]">{group.description}</p>
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

        <section className={`${shell} grid border-t border-[#bcb9b1] py-8 pb-24 sm:grid-cols-[1fr_2fr] sm:pb-[145px]`}>
          <Reveal>
            <p className={`${label} mb-12 sm:mb-0`}>04 / Education</p>
          </Reveal>
          <div className="grid gap-12 sm:grid-cols-2 sm:gap-16">
            <Reveal>
              <span className="mb-5 block font-mono text-[0.66rem] tracking-[0.08em] text-[#6f6b65] uppercase sm:mb-12">2018 - 2021</span>
              <h3 className="mb-2 text-[1.45rem] leading-tight tracking-[-0.035em]">BSc (Hons)<br />Computer Science</h3>
              <p className="m-0 text-[0.9rem] leading-6 text-[#5d5a55]">
                University of Wolverhampton, UK<br />
                Delivered at Herald College Kathmandu
              </p>
            </Reveal>
            <Reveal delay={100}>
              <span className="mb-5 block font-mono text-[0.66rem] tracking-[0.08em] text-[#6f6b65] uppercase sm:mb-12">2016 - 2018</span>
              <h3 className="mb-2 text-[1.45rem] leading-tight tracking-[-0.035em]">+2 Management</h3>
              <p className="m-0 text-[0.9rem] leading-6 text-[#5d5a55]">Uniglobe Secondary School, Nepal</p>
            </Reveal>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#151518] text-[#f5f3ee]" id="contact">
          <div className="pointer-events-none absolute top-[-14rem] right-[-10rem] size-[34rem] rounded-full border border-[#d85d41]/20" aria-hidden="true" />
          <div className={`${shell} relative flex min-h-[580px] flex-col pt-8 sm:min-h-[680px]`}>
            <Reveal>
              <p className={`${label} text-[#a4a097]`}>05 / Contact</p>
            </Reveal>
            <Reveal className="flex flex-1 flex-col justify-center" delay={100}>
              <p className="mb-4 font-mono text-[0.68rem] tracking-[0.1em] uppercase text-[#a4a097]">Have a product or engineering challenge in mind?</p>
              <a
                className={`group w-fit text-[clamp(3.55rem,7.5vw,7.1rem)] leading-[0.94] tracking-[-0.065em] transition-colors duration-500 hover:text-[#d85d41] ${focusRing}`}
                href={gmailComposeUrl}
                target="_blank"
                rel="noreferrer"
              >
                Let’s start a<br />
                <em className="font-[Georgia,serif] font-medium">conversation.</em>{' '}
                <span className="inline-block transition-transform duration-500 group-hover:-translate-y-2 group-hover:translate-x-2">
                  <ArrowUpRight className="text-[0.52em]" />
                </span>
              </a>
            </Reveal>
            <footer className="flex flex-wrap gap-x-5 gap-y-3 border-t border-[#44443f] py-6 font-mono text-[0.66rem] tracking-[0.04em] text-[#a4a097]">
              <span>© {new Date().getFullYear()} Bijen Shahi</span>
              <a className={`transition-colors hover:text-[#f5f3ee] sm:ml-auto ${focusRing}`} href="tel:+9779841943442">+977 9841943442</a>
              <a className={`transition-colors hover:text-[#f5f3ee] ${focusRing}`} href="mailto:shahibijen@gmail.com">shahibijen@gmail.com</a>
            </footer>
          </div>
        </section>
      </div>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
