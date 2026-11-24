import './style.css'
import { Navbar, initNavbar } from './components/Navbar/Navbar.js'
import { Menu, initMenu } from './components/Menu/Menu.js'

document.querySelector('#app').innerHTML = `
  <header class="navbar">
    <a href="#home" class="logo">BOO<span>.</span></a>

   ${Navbar()}

    <a href="#contact" class="nav-button">Say Hello</a>
  </header>

  <main>
    <section class="hero" id="home">

      <p class="eyebrow">
        A LITTLE MOMENT OF HAPPINESS
      </p>

      <h1>
        Good things<br />
        come in <span>little</span><br />
        moments.
      </h1>

      <p class="description">
        A cozy little world made for good coffee,
        sweet moments and beautiful memories.
      </p>

      <a href="#menu" class="hero-button">
        Discover BOO ↗
      </a>

      <div class="hero-footer">
        <span>MADE WITH LOVE</span>
        <span>EST. 2026</span>
      </div>

    </section>

    ${Menu()}
  </main>
`
initNavbar()
initMenu()