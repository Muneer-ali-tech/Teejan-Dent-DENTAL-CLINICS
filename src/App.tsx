import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Departments from "@/components/sections/Departments";
import Experience from "@/components/sections/Experience";
import Doctors from "@/components/sections/Doctors";
import Transformations from "@/components/sections/Transformations";
import Technology from "@/components/sections/Technology";
import Journey from "@/components/sections/Journey";
import WhyUs from "@/components/sections/WhyUs";
import Testimonials from "@/components/sections/Testimonials";
import Branches from "@/components/sections/Branches";
import Financing from "@/components/sections/Financing";
import Offer from "@/components/sections/Offer";
import Faq from "@/components/sections/Faq";
import AboutUs from "@/pages/AboutUs";
import Services from "@/pages/Services";

import BookingModal from "@/components/systems/BookingModal";
import OfferSystem from "@/components/systems/OfferSystem";
import MobileActionBar from "@/components/systems/MobileActionBar";
import ConciergeWidget from "@/components/systems/ConciergeWidget";

import { I18nProvider } from "@/i18n";
import { UIProvider } from "@/lib/store";

type Route = "home" | "about" | "services";

function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() => {
    if (typeof window === "undefined") return "home";
    const h = window.location.hash;
    if (h.startsWith("#/about")) return "about";
    if (h.startsWith("#/services")) return "services";
    return "home";
  });

  useEffect(() => {
    const apply = () => {
      const hash = window.location.hash;
      if (hash === "" || hash === "#") return;
      const isAbout = hash.startsWith("#/about");
      const isServices = hash.startsWith("#/services");
      if (isAbout || isServices) {
        setRoute(isAbout ? "about" : "services");
        window.scrollTo(0, 0);
        return;
      }
      setRoute("home");
      const id = hash.slice(1);
      if (!id || id === "top") {
        window.scrollTo(0, 0);
      } else {
        requestAnimationFrame(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        });
      }
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  return route;
}

function HomePage() {
  return (
    <main id="main">
      <Hero />
      <TrustBar />
      <Departments />
      <Experience />
      <Doctors />
      <Transformations />
      <Technology />
      <Journey />
      <WhyUs />
      <Testimonials />
      <Branches />
      <Financing />
      <Offer />
      <Faq />
    </main>
  );
}

export default function App() {
  const route = useHashRoute();
  return (
    <I18nProvider>
      <UIProvider>
        <div className="min-h-screen bg-base">
          <Header />
          {route === "about" ? <AboutUs /> : route === "services" ? <Services /> : <HomePage />}
          <Footer />
          <BookingModal />
          <OfferSystem />
          <MobileActionBar />
          <ConciergeWidget />
        </div>
      </UIProvider>
    </I18nProvider>
  );
}
