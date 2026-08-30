import Hero from "../components/Hero";
import EventSections from "../components/EventSections";
import ScrollEffects from "../components/ScrollEffects";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <>
      <ScrollEffects />
      <Hero />
      <EventSections />
      <Footer />
    </>
  );
}

export default HomePage;