import { useState } from "react";
import {
  GraduationCap,
  Heart,
  BriefcaseBusiness,
  ArrowUpRight,
} from "lucide-react";
import { Reveal, SectionHeading, SkillIcon, GlowCard } from "../components/UI";
import { skills, experience } from "../data/content";
export function About() {
  return (
    <section id="about" className="container section about">
      <Reveal className="about-copy">
        <span className="eyebrow">
          <i />A little about me
        </span>
        <h2>
          More than just
          <br />a <span className="gradient-text">developer.</span>
        </h2>
        <p>
          I’m a developer who cares as much about the people using a product as
          the code behind it.
        </p>
        <p>
          With a background in computer applications and data science, I bring a
          blend of thoughtful design and analytical thinking to every project. I
          love solving real-world problems and making complex things feel
          simple.
        </p>
        <a className="text-link" href="#experience">
          Explore my journey <ArrowUpRight size={16} />
        </a>
      </Reveal>
      <Reveal className="about-details" delay={0.15}>
        <div className="about-card">
          <span className="info-icon">
            <GraduationCap />
          </span>
          <div>
            <span className="info-label">EDUCATION</span>
            <h3>Always a student.</h3>
            <p>
              BCA · Post Graduate Diploma
              <br />
              in Data Science
            </p>
          </div>
        </div>
        <div className="about-card">
          <span className="info-icon">
            <BriefcaseBusiness />
          </span>
          <div>
            <span className="info-label">EXPERIENCE</span>
            <h3>Ideas into impact.</h3>
            <p>
              2+ years working across
              <br />
              Flutter & data-driven applications
            </p>
          </div>
        </div>
        <div className="about-card">
          <span className="info-icon heart">
            <Heart />
          </span>
          <div>
            <span className="info-label">BEYOND THE CODE</span>
            <h3>Curiosity keeps me going.</h3>
            <p>Technology · UI/UX · Product Development</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
export function Skills() {
  const [filter, setFilter] = useState("All");
  return (
    <section id="skills" className="container section">
      <Reveal>
        <SectionHeading
          badge="My toolkit"
          title="Technologies I"
          accent="work with."
        >
          <span className="section-note">
            The right tools. The right solutions.
          </span>
        </SectionHeading>
        <div className="filters" aria-label="Filter skills">
          {["All", "Mobile", "Backend", "Data", "Tools"].map((category) => (
            <button
              aria-pressed={filter === category}
              className={filter === category ? "selected" : ""}
              key={category}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </Reveal>
      <div className="skills-grid" aria-live="polite">
        {skills
          .filter((skill) => filter === "All" || skill.category === filter)
          .map((skill, index) => (
            <GlowCard
              className="skill-card"
              key={skill.name}
              delay={(index % 6) * 0.045}
            >
              <SkillIcon icon={skill.icon} color={skill.color} />
              <h3>{skill.name}</h3>
              <span>{skill.category}</span>
            </GlowCard>
          ))}
      </div>
    </section>
  );
}
export function Experience() {
  return (
    <section id="experience" className="container section">
      <Reveal>
        <SectionHeading
          badge="The journey so far"
          title="My professional"
          accent="journey."
        />
      </Reveal>
      <div className="timeline">
        {experience.map((job, i) => (
          <Reveal className="timeline-item" key={job.company} delay={i * 0.1}>
            <span className="timeline-dot" />
            <div className="timeline-number">0{i + 1}</div>
            <div className="timeline-content">
              <span className="info-label">{job.type}</span>
              <h3>{job.role}</h3>
              <span className="company">{job.company}</span>
              <div className="timeline-meta">
                <span>{job.location}</span>
                <span className="timeline-period-mobile">{job.period}</span>
              </div>
            </div>
            <span className="timeline-tag">{job.period}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
export function Technology() {
  return (
    <section className="container technology-section">
      <Reveal className="tech-banner">
        <div className="tech-copy">
          <span className="eyebrow">
            <i />
            Built with purpose
          </span>
          <h2>
            Different tools.
            <br />
            <span className="gradient-text">One thoughtful approach.</span>
          </h2>
          <p>
            From the first pixel to the final API call,
            <br />
            every detail has a reason.
          </p>
          <a className="text-link" href="#contact">
            Let’s create something meaningful <ArrowUpRight size={16} />
          </a>
        </div>
        <div
          className="tech-orbit"
          aria-label="Flutter, Dart, Firebase, Node.js, SQL, Git, React and Python"
        >
          <div className="orbit-path" />
          <div className="orbit-path inner" />
          <span className="orbit-center">
            <CodeMark />
          </span>
          {[
            "Flutter",
            "Dart",
            "Firebase",
            "Node.js",
            "SQL",
            "Git",
            "React",
            "Python",
          ].map((name, i) => (
            <span className={`tech-chip chip-${i}`} key={name}>
              {name}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
function CodeMark() {
  return <span>&lt;/&gt;</span>;
}
