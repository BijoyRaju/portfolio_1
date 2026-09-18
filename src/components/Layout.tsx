import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Menu, X, Moon, Sun, ArrowUp } from "lucide-react";
import { navigation } from "../data/content";
import { Socials } from "./UI";
export function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [light, setLight] = useState(
    () => localStorage.getItem("theme") === "light",
  );
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 30 });
  useEffect(() => {
    document.documentElement.dataset.theme = light ? "light" : "dark";
    localStorage.setItem("theme", light ? "light" : "dark");
  }, [light]);
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 35);
    window.addEventListener("scroll", scroll, { passive: true });
    scroll();
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        }),
      { rootMargin: "-15% 0px -65% 0px" },
    );
    const observed = new WeakSet<Element>();
    const observeSections = () =>
      document.querySelectorAll("main section[id]").forEach((section) => {
        if (!observed.has(section)) {
          observer.observe(section);
          observed.add(section);
        }
      });
    observeSections();
    const mutations = new MutationObserver(observeSections);
    const main = document.querySelector("main");
    if (main) mutations.observe(main, { childList: true, subtree: true });
    return () => {
      window.removeEventListener("scroll", scroll);
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <header className={scrolled ? "header scrolled" : "header"}>
        <div className="container nav-inner">
          <a className="logo" href="#home">
            Bijoy <span>Raju.</span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((item) => (
              <a
                className={active === item.toLowerCase() ? "active" : ""}
                aria-current={
                  active === item.toLowerCase() ? "location" : undefined
                }
                href={`#${item.toLowerCase()}`}
                key={item}
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="nav-actions">
            <button
              className="theme-toggle"
              aria-label={`Switch to ${light ? "dark" : "light"} theme`}
              onClick={() => setLight(!light)}
            >
              {light ? <Moon size={17} /> : <Sun size={17} />}
            </button>
            <a className="nav-cta" href="#contact">
              Let’s Talk <ArrowUpRight size={16} />
            </a>
            <button
              id="menu-toggle"
              className="menu-toggle"
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen(!open)}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.nav
              id="mobile-nav"
              className="mobile-nav"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              {navigation.map((item) => (
                <a
                  href={`#${item.toLowerCase()}`}
                  key={item}
                  onClick={() => setOpen(false)}
                >
                  {item}
                  <ArrowUpRight size={16} />
                </a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
      {children}
      <footer>
        <div className="container footer-top">
          <a href="#home" className="logo">
            Bijoy <span>Raju.</span>
          </a>
          <nav aria-label="Footer navigation">
            {navigation.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}>
                {item}
              </a>
            ))}
          </nav>
          <Socials />
        </div>
        <div className="container footer-bottom">
          <span>© 2026 Bijoy Raju. All rights reserved.</span>
          <span>
            Build <i>•</i> Learn <i>•</i> Improve <i>•</i> Repeat
          </span>
        </div>
      </footer>
      {scrolled && (
        <a className="back-top" href="#home" aria-label="Back to top">
          <ArrowUp size={18} />
        </a>
      )}
    </>
  );
}
