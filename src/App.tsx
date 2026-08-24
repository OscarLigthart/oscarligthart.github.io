/**
 *  The main application — a single scrolling portfolio page.
 */
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import Career from "./sections/Career";
import Projects from "./sections/Projects";
import Expertise from "./sections/Expertise";
import Hobbies from "./sections/Hobbies";
import Footer from "./sections/Footer";

function App() {
  return (
    <div className="site">
      <Navbar />
      <main>
        <Hero />
        <Career />
        <Projects />
        <Expertise />
        <Hobbies />
      </main>
      <Footer />
    </div>
  );
}

export default App;
