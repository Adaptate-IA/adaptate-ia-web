import type { Metadata } from 'next';
import { Space_Mono, Outfit } from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SkipLink } from '@/components/layout/SkipLink';
import { JsonLd } from '@/components/seo/JsonLd';
import { ChatSidebar } from '@/components/chat/ChatSidebar';
import './globals.css';

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Adaptate IA — Agentes de IA para Negocios | Chile',
    template: '%s | Adaptate IA',
  },
  description:
    'Desarrollamos agentes de IA a medida para tu empresa en Chile. Automatiza procesos, reduce errores y escala tu equipo sin contratar más personas.',
  metadataBase: new URL('https://adaptateia.cl'),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'Adaptate IA',
    title: 'Adaptate IA — Agentes de IA para tu Negocio',
    description:
      'Agentes de IA a medida para tu empresa. Automatiza procesos, escala sin contratar y adáptate antes que tu competencia.',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Adaptate IA',
  description:
    'Empresa chilena especializada en desarrollo de agentes de inteligencia artificial a medida para negocios. Automatización de procesos, integración con sistemas existentes.',
  url: 'https://adaptateia.cl',
  email: 'hola@adaptateia.cl',
  areaServed: ['Chile', 'Latinoamérica'],
  knowsAbout: [
    'Agentes de IA',
    'Automatización de procesos',
    'Desarrollo de agentes a medida',
    'Inteligencia artificial para empresas',
    'Automatización con IA en Chile',
  ],
  slogan: 'No sobrevive el más fuerte, sino el que mejor se adapta al cambio',
  foundingLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Santiago',
      addressCountry: 'CL',
    },
  },
};

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Adaptate IA',
  description: 'Agentes de inteligencia artificial para negocios en Chile.',
  url: 'https://adaptateia.cl',
  email: 'hola@adaptateia.cl',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Santiago',
    addressRegion: 'RM',
    addressCountry: 'CL',
  },
  areaServed: 'CL',
  priceRange: '$$',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${spaceMono.variable} ${outfit.variable}`}>
      <body>
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={localBusinessJsonLd} />

        <SkipLink />

        <ChatSidebar>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </ChatSidebar>
      </body>
    </html>
  );
}
