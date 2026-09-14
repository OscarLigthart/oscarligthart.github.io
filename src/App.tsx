/**
 *  The main application — a single scrolling portfolio page.
 */
import Cursor from "./components/Cursor";
import Stars from "./components/Stars";
import Social from "./components/Social";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import Story from "./sections/Story";
import Career from "./sections/Career";
import Projects from "./sections/Projects";
import Hobbies from "./sections/Hobbies";
import Footer from "./sections/Footer";

function App() {
  return (
    <div className="site">
      <Stars />
      <Cursor />
      <Social />
      <Navbar />
      <main>
        <Hero />
        <Story />
        <Career />
        <Projects />
        <Hobbies />
      </main>
      <Footer />
    </div>
  );
}

export default App;
