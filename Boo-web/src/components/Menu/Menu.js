import './menu.css'
import { menuData, getImage, CURRENCY } from '../../data/menuData.js'

// شعار الشبح (نفس شكل شعار BOO)
const ghostIcon = `
  <svg class="ghost-icon" viewBox="0 0 60 70" fill="none" stroke="currentColor"
       stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M8 58 V30 A22 22 0 0 1 52 30 V58
             a5.5 5.5 0 0 1 -11 0 a5.5 5.5 0 0 1 -11 0
             a5.5 5.5 0 0 1 -11 0 a5.5 5.5 0 0 1 -11 0 Z" />
    <circle cx="23" cy="27" r="3" />
    <circle cx="37" cy="27" r="3" />
    <circle cx="30" cy="39" r="4" />
  </svg>`

const sections = menuData.filter((s) => !s.hidden)

// كرت صنف — بصورة أو بدون
function MenuCard(item) {
  const img = getImage(item.image)

  return `
    <article class="menu-card ${img ? '' : 'menu-card--no-image'}">
      <div class="menu-card__media">
        ${
          img
            ? `<img src="${img}" alt="${item.en} — ${item.ar}" loading="lazy" />`
            : ghostIcon
        }
      </div>

      <div class="menu-card__body">
        <p class="menu-card__price">
          <span>${item.price} <small>${CURRENCY}</small></span>
          <i class="menu-card__line"></i>
          <span class="menu-card__size">REGULAR</span>
        </p>
        <h4 class="menu-card__en">${item.en}</h4>
        <p class="menu-card__ar" dir="rtl">${item.ar}</p>
      </div>
    </article>`
}

function MenuSection(section, index) {
  return `
    <div class="menu-panel ${index === 0 ? 'is-active' : ''}" data-panel="${section.id}">
      <header class="menu-panel__head">
        <h2 class="menu-panel__title">${section.en} Menu</h2>
        <p class="menu-panel__sub">${section.ar}</p>
      </header>

      ${section.groups
        .map(
          (group) => `
        <div class="menu-group">
          <h3 class="menu-group__title">
            <span>${group.en}</span>
            <span dir="rtl">${group.ar}</span>
          </h3>
          <div class="menu-grid">
            ${group.items.map(MenuCard).join('')}
          </div>
        </div>`
        )
        .join('')}
    </div>`
}

export function Menu() {
  return `
    <section class="menu" id="menu">
      <div class="menu__brand">
        ${ghostIcon}
        <span>BOO</span>
      </div>

      <nav class="menu-tabs" role="tablist">
        ${sections
          .map(
            (s, i) => `
          <button class="menu-tab ${i === 0 ? 'is-active' : ''}" data-target="${s.id}" role="tab">
            ${s.en}
          </button>`
          )
          .join('')}
      </nav>

      ${sections.map(MenuSection).join('')}
    </section>`
}

// التبديل بين الأقسام
export function initMenu() {
  const tabs = document.querySelectorAll('.menu-tab')
  const panels = document.querySelectorAll('.menu-panel')

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.toggle('is-active', t === tab))
      panels.forEach((p) =>
        p.classList.toggle('is-active', p.dataset.panel === tab.dataset.target)
      )
    })
  })
}
