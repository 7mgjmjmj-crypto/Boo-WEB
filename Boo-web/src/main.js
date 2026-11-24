// Intro (cinematic BOO logo reveal — mounts itself)
import './components/Intro/Intro.js'

import './style.css'
import Hero from './components/Hero/Hero.js'

document.querySelector('#app').innerHTML = `
  <main>
    <section id="home" class="boo-hero" aria-roledescription="carousel" aria-label="BOO product showcase"></section>
  </main>
`

Hero(document.querySelector('#home'))
