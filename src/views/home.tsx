import React, { useEffect } from 'react';

import { Contact } from '@modules/contact/contact';
import { Employment } from '@modules/employment/employment';
import { Projects } from '@modules/projects/projects';
import { Skills } from '@modules/skills/skills';

export default function Home() {
  useEffect(() => {
    if (window.location.hash) {
      document.querySelector(window.location.hash)?.scrollIntoView();
    }
  }, []);

  return (
    <main>
      <Skills />
      <Employment />
      <Projects />
      <Contact />
    </main>
  );
}
