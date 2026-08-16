import React from 'react';
import PageMeta from '../components/seo/PageMeta';
import Hero from '../components/sections/Hero';
import Skills from '../components/sections/Skills';
import FeaturedWork from '../components/sections/FeaturedWork';
import ContactCta from '../components/sections/ContactCta';

const Home = () => (
  <div style={{ minHeight: '100svh' }}>
    <PageMeta path="/" />
    <Hero />
    <Skills />
    <FeaturedWork />
    <ContactCta />
  </div>
);

export default Home;
