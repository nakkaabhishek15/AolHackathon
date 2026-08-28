import { Arc } from "@/components/arc";
import { Challenges } from "@/components/challenges";
import { Cta } from "@/components/cta";
import { Faq } from "@/components/faq";
import { Hero } from "@/components/hero";
import { Included } from "@/components/included";
import { Mission } from "@/components/mission";
import { PhotoStrip } from "@/components/photo-strip";
import { Process } from "@/components/process";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <SiteHeader />
      <main id="main" className="grain">
        <Hero />
        <Mission />
        <PhotoStrip />
        <Process />
        <Arc />
        <Challenges />
        <Included />
        <Faq />
        <Cta />
      </main>
      <SiteFooter />
    </>
  );
}
