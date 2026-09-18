import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  X,
  ShoppingBag,
  Smartphone,
  ExternalLink,
  Bell,
  Search,
  Package,
  Users,
  CalendarDays,
} from "lucide-react";
import { Reveal, SectionHeading } from "../components/UI";
import { projects, appleLinks, type Project } from "../data/content";
function Phone({
  hr = false,
  secondary = false,
}: {
  hr?: boolean;
  secondary?: boolean;
}) {
  return (
    <div
      className={`mock-phone ${secondary ? "phone-secondary" : ""} ${hr ? "hr-phone" : ""}`}
    >
      <div className="phone-camera" />
      <div className="phone-status">
        9:41 <span>••• ▰</span>
      </div>
      <div className="phone-brand">
        {hr ? "dazzles hrms" : "dazzles"}
        <Bell size={11} />
      </div>
      <div className="phone-greeting">
        {hr ? "Good morning," : "Your workspace,"}
        <strong>
          {hr ? "Let’s make today count." : "beautifully organized."}
        </strong>
      </div>
      <div className="phone-feature">
        {hr ? <CalendarDays size={25} /> : <Package size={25} />}
        <span>
          {hr ? "Today’s attendance" : "Inventory overview"}
          <strong>{hr ? "09:30 AM" : "1,248 products"}</strong>
        </span>
      </div>
      <div className="phone-small-grid">
        <div>
          {hr ? "Leave balance" : "Categories"}
          <b>{hr ? "12 days" : "24"}</b>
        </div>
        <div>
          {hr ? "This month" : "New arrivals"}
          <b>{hr ? "98%" : "+86"}</b>
        </div>
      </div>
      <div className="phone-section">
        {hr ? "Workplace updates" : "Recent products"}
        <span>View all</span>
      </div>
      {[1, 2, 3].map((i) => (
        <div key={i} className="phone-row">
          <span className="phone-thumb">
            {hr ? <Users size={14} /> : <ShoppingBag size={14} />}
          </span>
          <span>
            {hr
              ? ["Team announcement", "Leave request", "Weekly update"][i - 1]
              : ["Summer collection", "Everyday essentials", "New arrivals"][
                  i - 1
                ]}
            <small>{hr ? "Keep in the loop" : "Available in stock"}</small>
          </span>
          <ArrowUpRight size={10} />
        </div>
      ))}
      <div className="phone-bottom">
        ⌂ <span>▦</span> ◇ <span>○</span>
      </div>
    </div>
  );
}
export function ProjectPreview({ id }: { id: string }) {
  if (id === "dazzles" || id === "hrms")
    return (
      <div
        className={`project-preview phone-preview ${id === "hrms" ? "hrms-preview" : ""}`}
        aria-label={`${id === "hrms" ? "HR management" : "Inventory application"} concept preview`}
        role="img"
      >
        <span className="preview-grid" />
        <span className="preview-word">
          {id === "hrms" ? "people first." : "work, simplified."}
        </span>
        <Phone hr={id === "hrms"} secondary />
        <Phone hr={id === "hrms"} />
        <span className="preview-label">
          <Smartphone size={10} /> iOS & Android
        </span>
      </div>
    );
  if (id === "pizza")
    return (
      <div
        className="project-preview pizza-preview"
        aria-label="Pizzeria website concept preview"
        role="img"
      >
        <div className="mini-browser">
          <div className="browser-top">
            <span>● ● ●</span>
            <span>londonneapolitan.co.uk</span>
          </div>
          <div className="pizza-nav">
            <strong>
              THE LONDON
              <br />
              NEAPOLITAN
            </strong>
            <span>Our story Menu Visit us</span>
          </div>
          <div className="pizza-hero">
            <div>
              <span>A LITTLE SLICE OF NAPLES</span>
              <h4>
                Good pizza.
                <br />
                Great company.
              </h4>
              <p>
                Slow dough. Fresh ingredients.
                <br />
                Made with a little amore.
              </p>
              <b>EXPLORE OUR MENU ↗</b>
            </div>
            <div className="pizza-illustration">
              {Array.from({ length: 9 }, (_, i) => (
                <i
                  key={i}
                  style={{
                    transform: `rotate(${i * 43}deg) translateY(${35 + (i % 3) * 11}px)`,
                  }}
                />
              ))}
            </div>
          </div>
          <div className="pizza-menu">
            <span>Made with love. Shared with friends.</span>
            <div>
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
      </div>
    );
  return (
    <div
      className="project-preview dashboard-preview"
      aria-label="Business analytics dashboard concept preview"
      role="img"
    >
      <div className="mini-dashboard">
        <aside>
          <b>▧ console.</b>
          {["Overview", "Analytics", "Products", "Customers", "Settings"].map(
            (x, i) => (
              <span className={i === 0 ? "mini-active" : ""} key={x}>
                {x}
              </span>
            ),
          )}
        </aside>
        <div className="dashboard-main">
          <header>
            <b>Overview</b>
            <Search size={9} />
          </header>
          <small>Welcome back. Here’s the big picture.</small>
          <div className="dashboard-metrics">
            {["Revenue", "Orders", "Customers"].map((x, i) => (
              <div key={x}>
                <small>{x}</small>
                <b>{["₹ 84,240", "1,248", "3,862"][i]}</b>
                <em>↗ 12.8%</em>
              </div>
            ))}
          </div>
          <div className="dashboard-chart">
            <span>
              Revenue overview <small>This month</small>
            </span>
            <svg viewBox="0 0 250 90">
              <defs>
                <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
                  <stop stopColor="#378bff" stopOpacity=".3" />
                  <stop offset="1" stopColor="#378bff" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[20, 40, 60, 80].map((y) => (
                <path
                  key={y}
                  d={`M0 ${y}H250`}
                  stroke="#263549"
                  strokeWidth=".5"
                />
              ))}
              <path
                d="M0 70 20 62 36 67 54 40 70 46 86 31 104 40 122 28 140 35 158 15 178 24 194 8 212 18 230 10 250 5V90H0Z"
                fill="url(#chartFill)"
              />
              <path
                d="M0 70 20 62 36 67 54 40 70 46 86 31 104 40 122 28 140 35 158 15 178 24 194 8 212 18 230 10 250 5"
                fill="none"
                stroke="#65adff"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div className="dashboard-bars">
            {[45, 70, 40, 85, 60, 90, 55, 75, 65, 95, 78, 88].map((h, i) => (
              <i key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
function ProjectDialog({
  project,
  close,
}: {
  project: Project;
  close: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);
  return (
    <dialog
      ref={ref}
      className="project-dialog"
      aria-labelledby="project-dialog-title"
      onCancel={close}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <button
        autoFocus
        className="dialog-close"
        onClick={close}
        aria-label="Close project"
      >
        <X />
      </button>
      <ProjectPreview id={project.id} />
      <div className="dialog-body">
        <span className="info-label">{project.label}</span>
        <h2 id="project-dialog-title">{project.title}</h2>
        <p>{project.detail}</p>
        <div className="tags">
          {project.stack.map((x) => (
            <span key={x}>{x}</span>
          ))}
        </div>
        <p className="concept-note">Illustrative interface preview.</p>
        {project.url && (
          <a
            className="button button-primary"
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {appleLinks[project.id] ? "Google Play" : "Visit project"}
            <ExternalLink size={16} />
          </a>
        )}
        {appleLinks[project.id] && (
          <a
            className="button button-secondary"
            href={appleLinks[project.id]}
            target="_blank"
            rel="noopener noreferrer"
          >
            App Store
            <ExternalLink size={16} />
          </a>
        )}
      </div>
    </dialog>
  );
}
export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);
  return (
    <section id="projects" className="container section">
      <Reveal>
        <SectionHeading
          badge="Selected work"
          title="A few things I’ve"
          accent="built."
        >
          <span className="section-note">
            Thoughtfully designed. Purposefully built.
          </span>
        </SectionHeading>
        <div className="project-filter filters" aria-label="Filter projects">
          {["All", "Mobile", "Web", "Dashboard"].map((x) => (
            <button
              aria-pressed={filter === x}
              className={filter === x ? "selected" : ""}
              key={x}
              onClick={() => setFilter(x)}
            >
              {x === "All" ? "All projects" : x}
            </button>
          ))}
        </div>
      </Reveal>
      <div className="projects-grid">
        {projects
          .filter((x) => filter === "All" || x.category === filter)
          .map((project, i) => (
            <Reveal
              className="project-reveal"
              key={project.id}
              delay={i * 0.06}
            >
              <article
                className="project-card"
                onPointerMove={(e) => {
                  if (
                    e.pointerType !== "mouse" ||
                    !matchMedia(
                      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
                    ).matches
                  )
                    return;
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.transform = `perspective(1200px) rotateX(${-(e.clientY - r.top - r.height / 2) * 0.007}deg) rotateY(${(e.clientX - r.left - r.width / 2) * 0.007}deg) translateY(-4px)`;
                }}
                onPointerLeave={(e) => {
                  e.currentTarget.style.transform = "";
                }}
              >
                <button
                  className="preview-button"
                  onClick={() => setSelected(project)}
                  aria-label={`Explore ${project.title}`}
                >
                  <ProjectPreview id={project.id} />
                  <span className="preview-explore">
                    Explore project <ArrowUpRight size={16} />
                  </span>
                </button>
                <div className="project-body">
                  <span className="project-label">
                    {project.label}
                    <span>0{i + 1}</span>
                  </span>
                  <button
                    className="project-title"
                    onClick={() => setSelected(project)}
                  >
                    {project.title}
                    <ArrowUpRight size={20} />
                  </button>
                  <p>{project.description}</p>
                  <div className="project-meta">
                    <div className="tags">
                      {project.stack.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${project.title} ${appleLinks[project.id] ? "on Google Play" : "website"}`}
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                  {appleLinks[project.id] && (
                    <div className="store-links">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Google Play ↗
                      </a>
                      <a
                        href={appleLinks[project.id]}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        App Store ↗
                      </a>
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
      </div>
      {selected && (
        <ProjectDialog project={selected} close={() => setSelected(null)} />
      )}
    </section>
  );
}
