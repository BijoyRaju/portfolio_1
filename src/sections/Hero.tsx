import { motion, useReducedMotion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  BriefcaseBusiness,
  Layers3,
  Coffee,
  Code2,
} from "lucide-react";
import { Button, ResumeButton, Socials, Reveal } from "../components/UI";
function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!visible) return;
    if (reduced) {
      setCount(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.3,
      onUpdate: (latest) => setCount(Math.round(latest)),
    });
    return () => controls.stop();
  }, [visible, value, reduced]);
  return <span ref={ref}>{count}+</span>;
}
export default function Hero() {
  const reduced = useReducedMotion();
  return (
    <section id="home" className="hero container">
      <div className="hero-main">
        <div className="hero-copy">
          <Reveal>
            <span className="eyebrow hero-badge">
              <i />
              Flutter Developer <span className="badge-divider">/</span> Data
              Enthusiast
            </span>
          </Reveal>
          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <motion.span
              className="intro"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              Hi, I’m
            </motion.span>
            <span>
              <motion.span
                style={{ display: "inline-block" }}
                initial={reduced ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.25 }}
              >
                Bijoy
              </motion.span>{" "}
              <motion.span
                className="gradient-text"
                style={{ display: "inline-block" }}
                initial={reduced ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.35 }}
              >
                Raju<span className="heading-period">.</span>
              </motion.span>
            </span>
          </motion.h1>
          <Reveal delay={0.25}>
            <p className="hero-subtitle">
              Senior Flutter Developer building scalable,
              <br className="desktop-break" /> beautiful and user-focused
              digital experiences.
            </p>
            <p className="hero-description">
              I turn complex ideas into intuitive mobile & web applications.
              Clean architecture. Thoughtful design. Built to make a difference.
            </p>
          </Reveal>
          <Reveal delay={0.35} className="hero-buttons">
            <Button href="#projects">View My Work</Button>
            <ResumeButton />
          </Reveal>
          <Reveal delay={0.45} className="hero-socials">
            <span>Find me on</span>
            <Socials />
            <span className="social-line" />
          </Reveal>
        </div>
        <motion.div
          className="hero-visual"
          initial={reduced ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25 }}
          onPointerMove={(e) => {
            if (reduced || e.pointerType !== "mouse") return;
            const r = e.currentTarget.getBoundingClientRect();
            e.currentTarget.style.setProperty(
              "--px",
              `${(e.clientX - r.left - r.width / 2) * 0.012}px`,
            );
            e.currentTarget.style.setProperty(
              "--py",
              `${(e.clientY - r.top - r.height / 2) * 0.012}px`,
            );
          }}
          onPointerLeave={(e) => {
            e.currentTarget.style.setProperty("--px", "0px");
            e.currentTarget.style.setProperty("--py", "0px");
          }}
        >
          <div className="portrait-glow" />
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <img
            className="portrait"
            src={`${import.meta.env.BASE_URL}images/bijoy-portrait.webp`}
            srcSet={`${import.meta.env.BASE_URL}images/bijoy-portrait-small.webp 480w, ${import.meta.env.BASE_URL}images/bijoy-portrait.webp 960w`}
            sizes="(min-width: 1024px) 570px, (min-width: 640px) 530px, calc(100vw - 40px)"
            width={960}
            height={960}
            alt="Bijoy Raju wearing sunglasses and a black shirt"
            fetchPriority="high"
            decoding="async"
          />
          <span className="handwriting">
            Build.
            <br />
            Learn.
            <br />
            Improve.
            <br />
            Repeat.
            <svg viewBox="0 0 100 30">
              <path d="M5 20Q90 -10 85 8Q60 25 20 28" />
            </svg>
          </span>
          <div className="floating-flutter">
            <svg viewBox="0 0 48 48">
              <path
                fill="#53b9ff"
                d="M29 3h15L14 33 6 25zM29 22h15L29 37l-8-8z"
              />
              <path fill="#197cd5" d="m21 29 8 8 8 8H21l-8-8z" />
            </svg>
          </div>
          <div className="code-card">
            <div className="code-dots">
              <i />
              <i />
              <i />
              <span>developer.ts</span>
            </div>
            <pre>
              <span className="code-purple">const</span> developer = {"{"}
              {"\n"} role:{" "}
              <span className="code-orange">"Flutter Developer"</span>,{"\n"}{" "}
              passion: <span className="code-orange">"Creating Impact"</span>,
              {"\n"} stack: [
              <span className="code-green">"Flutter", "Dart"</span>,{"\n"}{" "}
              <span className="code-green">"React", "Swift"</span>]{"\n"}
              {"}"}
              <span className="code-caret">▍</span>
            </pre>
          </div>
        </motion.div>
      </div>
      <div className="hero-bottom">
        <a className="scroll-cue" href="#about">
          <ArrowDown size={14} />
          <span>SCROLL TO EXPLORE</span>
        </a>
        <span className="hero-note">CRAFTING EXPERIENCES, NOT JUST CODE</span>
      </div>
      <Reveal className="stats">
        <div>
          <span className="stat-icon">
            <Code2 />
          </span>
          <p>
            <strong>
              <Counter value={2} />
            </strong>
            <span>Years Experience</span>
          </p>
        </div>
        <div>
          <span className="stat-icon">
            <BriefcaseBusiness />
          </span>
          <p>
            <strong>
              <Counter value={10} />
            </strong>
            <span>Projects Completed</span>
          </p>
        </div>
        <div>
          <span className="stat-icon">
            <Layers3 />
          </span>
          <p>
            <strong>
              <Counter value={5} />
            </strong>
            <span>Core Technologies</span>
          </p>
        </div>
        <div>
          <span className="stat-icon coffee">
            <Coffee />
          </span>
          <p>
            <strong>Always</strong>
            <span>Learning & Improving</span>
          </p>
        </div>
      </Reveal>
    </section>
  );
}
