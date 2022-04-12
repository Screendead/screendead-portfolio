import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Hero from "./components/hero/Hero";
import Projects from "./components/projects/Projects";

import './App.scss';
import { useEffect } from "react";
import useWindowDimensions from "./hooks/use-window-dimensions";
import { Route, Routes, useLocation } from "react-router-dom";
import Playgrounds, { playgrounds } from "./components/projects/playgrounds/Playgrounds";
import Playground from "./components/projects/playgrounds/components/Playground";

/**
 * A portfoilo website for my personal projects.
 */
function App() {
  let location = useLocation();
  let { height } = useWindowDimensions();

  useEffect(() => {
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty(
      '--vh',
      `${height / 100}px`
    );
  }, [height]);

  return (
    <>
      <Header />
      <Routes>
        <Route index element={
          <>
            <Hero />
            <main className="main">
              <Projects />
              <About />
              {/* <Contact /> */}
            </main>
          </>
        } />
        <Route path="/projects">
          <Route index element={<Projects />} />
          <Route path="playgrounds">
            <Route index element={<Playgrounds />} />
            <Route path="sketches/:playground" element={
              <Playground info={
                playgrounds.find(playground => playground.link === location.pathname) || null
              } />
            } />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
