import './navbar.css'

const NAV_ITEMS = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Menu', href: '#menu' },
    // { label: 'Help', href: '#help' },
]

export function Navbar() {
    return `
    <nav class="glass-nav">
      <div class="glass-nav__track">
        <span class="glass-nav__pill"></span>
        <ul class="glass-nav__list">
          ${NAV_ITEMS.map(item => `
            <li><a href="${item.href}" class="glass-nav__link">${item.label}</a></li>
          `).join('')}
        </ul>
      </div>
    </nav>
  `
}

export function initNavbar() {
    const nav = document.querySelector('.glass-nav')
    const pill = nav.querySelector('.glass-nav__pill')
    const links = nav.querySelectorAll('.glass-nav__link')

    function setActive(link) {
        links.forEach(l => l.classList.remove('is-active'))
        link.classList.add('is-active')
        pill.style.setProperty('--pill-x', link.offsetLeft + 'px')
        pill.style.setProperty('--pill-w', link.offsetWidth + 'px')
    }

    links.forEach(link => link.addEventListener('click', () => setActive(link)))

    setActive(links[0])
    requestAnimationFrame(() => nav.classList.add('glass-nav--ready'))
    window.addEventListener('resize', () => setActive(nav.querySelector('.is-active')))
}