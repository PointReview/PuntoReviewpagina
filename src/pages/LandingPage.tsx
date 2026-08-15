import { Hero } from '../components/Hero';
import { HowItWorks } from '../components/HowItWorks';
import { Products } from '../components/Products';
import { GiftSection } from '../components/GiftSection';
import { Benefits } from '../components/Benefits';
import { Comparative } from '../components/Comparative';
import { Gallery } from '../components/Gallery';
import { Clients } from '../components/Clients';
import { CustomProduct } from '../components/CustomProduct';
import { FAQ } from '../components/FAQ';
import { FinalCTA } from '../components/FinalCTA';

export function LandingPage() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <Products />
      <GiftSection />
      <Benefits />
      <Comparative />
      <Gallery />
      <Clients />
      <CustomProduct />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
