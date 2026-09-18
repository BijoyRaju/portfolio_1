import { lazy, Suspense } from "react";
import { MotionConfig } from "framer-motion";
import { Layout } from "./components/Layout";
import DesktopEffects from "./components/DesktopEffects";
import Hero from "./sections/Hero";
import { About, Skills, Experience, Technology } from "./sections/Content";
const Projects = lazy(() => import("./sections/Projects"));
const Contact = lazy(() => import("./sections/Contact"));
export default function App() {
  const notFound =
    window.location.pathname !== "/" &&
    window.location.pathname !== "/index.html";
  return (
    <MotionConfig reducedMotion="user">
      <DesktopEffects />
      <Layout>
        <main id="main">
          {notFound ? (
            <div className="not-found container">
              <span className="gradient-text">404</span>
              <h1>A little off the beaten path.</h1>
              <p>This page doesn’t exist, but there’s plenty to explore.</p>
              <a className="button button-primary" href="/">
                Back to the portfolio ↗
              </a>
            </div>
          ) : (
            <>
              <Hero />
              <About />
              <Skills />
              <Suspense
                fallback={
                  <div className="section-loader" role="status">
                    Loading selected work…
                  </div>
                }
              >
                <Projects />
              </Suspense>
              <Experience />
              <Technology />
              <Suspense
                fallback={
                  <div className="section-loader" role="status">
                    Loading contact…
                  </div>
                }
              >
                <Contact />
              </Suspense>
            </>
          )}
        </main>
      </Layout>
    </MotionConfig>
  );
}
