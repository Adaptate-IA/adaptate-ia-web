import { Hero } from '@/components/sections/Hero';
import { Process } from '@/components/sections/Process';
import { QuoteForm } from '@/components/sections/QuoteForm';
import { CTA } from '@/components/sections/CTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Process />
      <QuoteForm />
      <CTA />
    </>
  );
}
