import { useRef, type ReactNode, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Phone,
  Mail,
  Download,
  Database,
  GitBranch,
  Network,
  ChartNoAxesColumnIncreasing,
  Flame,
  Atom,
} from "lucide-react";
import { profile } from "../data/content";
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
export function SectionHeading({
  badge,
  title,
  accent,
  children,
}: {
  badge: string;
  title: string;
  accent?: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">
          <i />
          {badge}
        </span>
        <h2>
          {title} {accent && <span className="gradient-text">{accent}</span>}
        </h2>
      </div>
      {children}
    </div>
  );
}
export function Button({
  children,
  href,
  secondary = false,
  download = false,
}: {
  children: ReactNode;
  href: string;
  secondary?: boolean;
  download?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();
  return (
    <a
      ref={ref}
      className={`button ${secondary ? "button-secondary" : "button-primary"}`}
      href={href}
      download={download || undefined}
      onPointerMove={(e) => {
        if (
          reduced ||
          e.pointerType !== "mouse" ||
          !matchMedia("(min-width: 1024px)").matches
        )
          return;
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.06}px,${(e.clientY - r.top - r.height / 2) * 0.06}px)`;
      }}
      onPointerLeave={(e) => {
        e.currentTarget.style.transform = "";
      }}
    >
      {children}
      {download ? <Download size={16} /> : <ArrowUpRight size={17} />}
    </a>
  );
}
export function ResumeButton() {
  return (
    <Button
      href={`${import.meta.env.BASE_URL}Bijoy-Raju-CV.pdf`}
      download
      secondary
    >
      Download Resume
    </Button>
  );
}
export function Socials() {
  const [hint, setHint] = useState("");
  return (
    <div className="social-wrap">
      <div className="socials">
        {Object.entries(profile.socials).map(([name, url]) => {
          const Icon = name === "GitHub" ? Github : Linkedin;
          return url ? (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
            >
              <Icon size={19} />
            </a>
          ) : (
            <button
              key={name}
              aria-label={`${name} profile details`}
              onClick={() => setHint(`${name} link is coming soon.`)}
            >
              <Icon size={19} />
            </button>
          );
        })}
        {profile.email ? (
          <a href={`mailto:${profile.email}`} aria-label="Email Bijoy">
            <Mail size={19} />
          </a>
        ) : (
          <button
            aria-label="Email details"
            onClick={() => setHint("Contact details are being updated.")}
          >
            <Mail size={19} />
          </button>
        )}
        <a href={profile.phoneHref} aria-label="Call Bijoy">
          <Phone size={19} />
        </a>
      </div>
      {hint && (
        <span className="social-hint" role="status">
          {hint}
        </span>
      )}
    </div>
  );
}
import { useState } from "react";
export function SkillIcon({ icon, color }: { icon: string; color: string }) {
  const style = { color } as CSSProperties;
  if (icon === "node")
    return (
      <svg viewBox="0 0 48 48" className="skill-icon" aria-hidden="true">
        <path
          d="M24 3 43 14v20L24 45 5 34V14Z"
          fill="none"
          stroke={color}
          strokeWidth="3"
        />
        <text
          x="24"
          y="31"
          textAnchor="middle"
          fill={color}
          fontFamily="Arial,sans-serif"
          fontSize="19"
          fontWeight="bold"
        >
          JS
        </text>
      </svg>
    );
  if (icon === "go")
    return (
      <svg viewBox="0 0 52 48" className="skill-icon" aria-hidden="true">
        <path d="M2 16h9M0 23h9M3 30h7" stroke={color} strokeWidth="2" />
        <text
          x="12"
          y="33"
          fill={color}
          fontFamily="Arial,sans-serif"
          fontStyle="italic"
          fontWeight="bold"
          fontSize="26"
        >
          Go
        </text>
      </svg>
    );
  if (icon === "swift")
    return (
      <svg viewBox="0 0 48 48" className="skill-icon" aria-hidden="true">
        <rect x="2" y="2" width="44" height="44" rx="11" fill={color} />
        <path
          d="M10 12c8 8 15 13 20 15-6-7-11-12-14-18 9 8 16 14 20 19 2-7 0-12-3-17 9 7 12 17 5 24l3 6-8-4c-9 4-18-1-23-9 5 4 12 5 17 3C21 26 15 19 10 12Z"
          fill="white"
        />
      </svg>
    );
  if (icon === "flutter")
    return (
      <svg viewBox="0 0 48 48" className="skill-icon" aria-hidden="true">
        <path fill="#55c4ff" d="M29 3h15L14 33 6 25zM29 22h15L29 37l-8-8z" />
        <path fill="#158de0" d="m21 29 8 8 8 8H21l-8-8z" />
      </svg>
    );
  if (icon === "dart")
    return (
      <svg viewBox="0 0 48 48" className="skill-icon" aria-hidden="true">
        <path fill="#37c9e8" d="m13 5 24 7 7 24-14 9L4 19z" />
        <path fill="#168dc0" d="m13 5 24 7 7 24L13 5zM4 19l26 26-17-4z" />
      </svg>
    );
  if (icon === "figma")
    return (
      <svg viewBox="0 0 40 48" className="skill-icon" aria-hidden="true">
        <rect x="5" y="1" width="15" height="15" rx="7.5" fill="#f76d54" />
        <rect x="20" y="1" width="15" height="15" rx="7.5" fill="#ff9c8c" />
        <rect x="5" y="16" width="15" height="15" rx="7.5" fill="#ac7aff" />
        <circle cx="27.5" cy="23.5" r="7.5" fill="#42bbf5" />
        <rect x="5" y="31" width="15" height="15" rx="7.5" fill="#43d5a4" />
      </svg>
    );
  if (icon === "oracle")
    return (
      <span className="oracle-icon" aria-hidden="true">
        O
      </span>
    );
  if (icon === "python")
    return (
      <span className="python-icon" aria-hidden="true">
        Py<span>•</span>
      </span>
    );
  const Icon =
    icon === "firebase"
      ? Flame
      : icon === "react"
        ? Atom
        : icon === "git"
          ? GitBranch
          : icon === "api"
            ? Network
            : icon === "chart"
              ? ChartNoAxesColumnIncreasing
              : Database;
  return <Icon className="skill-icon" style={style} strokeWidth={1.65} />;
}
export function GlowCard({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={`glow-card ${className}`}
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-25px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      {children}
    </motion.div>
  );
}
