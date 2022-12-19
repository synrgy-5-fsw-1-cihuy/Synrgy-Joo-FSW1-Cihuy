import CallToAction from "./pages/CallToAction";
import FrequenlyAskQuestions from "./pages/FAQ";
import Hero from "./pages/Hero";
import OurService from "./pages/OurService";
import Testimonials from "./pages/Testimonials";
import WhyUs from "./pages/WhyUs";

const HomePage = () => {
  return (
    <>
      <Hero />
      <OurService />
      <WhyUs />
      <Testimonials />
      <CallToAction />
      <FrequenlyAskQuestions />
    </>
  );
};

export default HomePage;
