/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { Products } from './components/Products';
import { GiftSection } from './components/GiftSection';
import { Benefits } from './components/Benefits';
import { Comparative } from './components/Comparative';
import { Gallery } from './components/Gallery';
import { Clients } from './components/Clients';
import { CustomProduct } from './components/CustomProduct';
import { FAQ } from './components/FAQ';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen font-sans text-slate-900 bg-slate-50 selection:bg-blue-200 selection:text-blue-900">
        <Navbar />
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
        <Footer />
        <CartDrawer />
        <FloatingWhatsApp />
      </div>
    </CartProvider>
  );
}
