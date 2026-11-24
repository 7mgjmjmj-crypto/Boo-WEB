import './hero.css'

/*
 * BOO — automatic product showcase (rebuilt to match the reference video)
 * -----------------------------------------------------------------------
 * Layout   : top nav · giant serif name strip · left copy · centred product
 *            (cropped by the bottom edge) · right column with 4 product cards.
 * Drinks   : four drinks, each with its own image, colours and floating ingredients.
 * Change   : 1) active card switches instantly
 *            2) old copy fades up and out
 *            3) name strip slides left by one name
 *            4) new product rises from below the screen IN FRONT of the old one
 *            5) new copy appears line by line, blur → sharp
 * Loop     : 1 → 2 → 3 → 4 → 1 … forever. Cards are clickable; autoplay
 *            carries on afterwards. One timer, one transition at a time;
 *            clicks during a transition are queued (latest wins).
 * Engine   : Web Animations API (built into the browser, no dependencies).
 */

// One image per drink — files are in public/images/hero/
const IMG = {
    coffee: '/images/hero/boo-iced-coffee.png',
    matcha: '/images/hero/boo-matcha-strawberry.png',
    peach: '/images/hero/boo-peach-tea.png',
    blue: '/images/hero/boo-blueberry-latte.png',
}

// Text is editable. bg / glow / decor change per drink, as in the reference.
// Cups are lined up by the bottom of the BOO logo, so the full logo shows on every cup
// exactly where it sits on the blueberry cup.
const LOGO_REF = 1.258

const SLIDES = [
    {
        img: IMG.coffee,
        logo: 1.4, // logo bottom ÷ image width (lines the logos up)
        line1: 'Iced Americano',
        line2: '& Cocoa Cold Foam',
        desc: 'Double espresso over clear ice, crowned with silky cold foam, cocoa and roasted beans.',
        strip: 'Iced Americano · Cold Foam',
        bg: '#0d0504',
        glow: 'rgba(110, 58, 34, 0.55)',
        decor: 'bean',
    },
    {
        img: IMG.matcha,
        logo: 1.445, // logo bottom ÷ image width (lines the logos up)
        line1: 'Iced Matcha',
        line2: '& Strawberry Cream',
        desc: 'Stone-ground matcha swirled into cold milk, topped with a cloud of fresh strawberry cream.',
        strip: 'Ceremonial Matcha · Strawberry',
        bg: '#050d06',
        glow: 'rgba(70, 120, 55, 0.5)',
        decor: 'leaf',
    },
    {
        img: IMG.peach,
        logo: 1.458, // logo bottom ÷ image width (lines the logos up)
        line1: 'Peach Iced Tea',
        line2: '& Passion Fruit',
        desc: 'Slow-steeped black tea with ripe peach slices, passion fruit and a sprig of fresh mint.',
        strip: 'Peach Tea · Passion Fruit',
        bg: '#120602',
        glow: 'rgba(190, 95, 30, 0.45)',
        decor: 'peach',
    },
    {
        img: IMG.blue,
        logo: 1.514, // logo bottom ÷ image width (lines the logos up)
        line1: 'Blueberry Latte',
        line2: '& Butterfly Pea',
        desc: 'Espresso and cold milk over a butterfly-pea base, finished with blueberry cream and syrup.',
        strip: 'Blueberry Latte · Butterfly Pea',
        bg: '#04060f',
        glow: 'rgba(70, 80, 190, 0.45)',
        decor: 'berry',
    },
]

// ---- timing (ms). Choreography measured from the reference at 30 fps. ----
const HOLD = 2000// time a product stays on screen (the video doesn't show this; from your brief)
// Every layer starts together and builds up gradually, like the reference
// (motion measured frame by frame: slow ramp-up, peak mid-way, clean stop).
const T = {
    copyOut: 320, // old copy drifts up and fades (starts immediately)
    strip: 760, // name strip glides one name left (starts immediately)
    oldCup: 520, // old cup sinks slightly and fades while it is covered
    riseDelay: 60,
    rise: 640, // new cup glides up from just below the screen edge
    bg: 700, // colour / glow / floating ingredients crossfade
    copyInDelay: 380,
    copyIn: 520,
    copyStagger: 70, // line 1 → line 2 → description → button
}
const EASE_RISE = 'cubic-bezier(0.6, 0, 0.3, 1)' // gradual start, clean stop (as measured in the reference)
const EASE_STRIP = 'cubic-bezier(0.65, 0, 0.35, 1)'
const EASE_IN = 'cubic-bezier(0.5, 0, 0.75, 0)'
const EASE_OUT = 'cubic-bezier(0.22, 1, 0.36, 1)'
const EASE_BG = 'cubic-bezier(0.45, 0, 0.55, 1)'

// Positions of the floating ingredients (taken from the reference frame).
// x / y in % of the section, size in vw, blur in px, rotation in deg.
const BEANS = [
    { x: 52.5, y: 4, s: 1.6, r: 30, b: 0.5 },
    { x: 95, y: 3, s: 4.2, r: -35, b: 0 },
    { x: -1.5, y: 21, s: 5.2, r: 20, b: 0 },
    { x: 34.5, y: 31, s: 1.4, r: -60, b: 1 },
    { x: 68.5, y: 30, s: 1.3, r: 75, b: 1.5 },
    { x: 98, y: 44, s: 2.6, r: 10, b: 2.5 },
    { x: 14.5, y: 91, s: 3.2, r: -25, b: 3 },
    { x: 47, y: 96, s: 2.4, r: 45, b: 2 },
    { x: 77, y: 93, s: 2, r: -70, b: 3 },
]

// Small floating ingredients, one set per drink (they crossfade with the background).
const DECOR_SVG = {
    bean: `<svg viewBox="0 0 60 80"><defs><radialGradient id="dBean" cx="35%" cy="30%" r="80%"><stop offset="0" stop-color="#8a4f2c"/><stop offset=".55" stop-color="#4f2614"/><stop offset="1" stop-color="#1f0c05"/></radialGradient></defs><ellipse cx="30" cy="40" rx="26" ry="36" fill="url(#dBean)"/><path d="M30 6C20 26 40 52 30 74" stroke="#160803" stroke-width="4" fill="none" stroke-linecap="round"/></svg>`,
    leaf: `<svg viewBox="0 0 60 80"><defs><linearGradient id="dLeaf" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7fb35a"/><stop offset="1" stop-color="#2f5a22"/></linearGradient></defs><path d="M30 76C8 58 6 26 30 4c24 22 22 54 0 72z" fill="url(#dLeaf)"/><path d="M30 74V10" stroke="#24451a" stroke-width="2.4" fill="none"/><path d="M30 30l-10-8M30 44l-12-8M30 30l10-8M30 44l12-8M30 58l-9-6M30 58l9-6" stroke="#24451a" stroke-width="1.6" fill="none"/></svg>`,
    peach: `<svg viewBox="0 0 60 80"><defs><radialGradient id="dPeach" cx="40%" cy="35%" r="75%"><stop offset="0" stop-color="#ffc163"/><stop offset=".7" stop-color="#e98a2c"/><stop offset="1" stop-color="#b9561b"/></radialGradient></defs><path d="M8 66C4 34 22 8 52 6c4 30-10 60-44 60z" fill="url(#dPeach)"/><path d="M10 64C14 40 28 20 50 8" stroke="#c94f2a" stroke-width="3" fill="none" opacity=".55"/><circle cx="30" cy="40" r="3" fill="#2a1a0c"/><circle cx="38" cy="30" r="2.6" fill="#2a1a0c"/></svg>`,
    berry: `<svg viewBox="0 0 60 80"><defs><radialGradient id="dBerry" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#6d78c9"/><stop offset=".6" stop-color="#2b2f78"/><stop offset="1" stop-color="#11133a"/></radialGradient></defs><circle cx="30" cy="42" r="26" fill="url(#dBerry)"/><path d="M24 20l6 6 6-6M30 26v-8" stroke="#0d0f2c" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`,
}

function buildMarkup(root) {
    const strip = [...SLIDES, SLIDES[0]] // trailing copy of #1 makes 4 → 1 seamless
    root.innerHTML = `
    <div class="boo-bgs" aria-hidden="true">
      ${SLIDES.map(
        (s, i) => `<div class="boo-bg" data-index="${i}" style="--bg:${s.bg};--glow:${s.glow}">
          ${BEANS.map(
            (b, k) =>
                `<span class="boo-bean" style="--x:${b.x}%;--y:${b.y}%;--s:${b.s}vw;--r:${b.r}deg;--b:${b.b}px;--d:${5 + (k % 4)}s;--delay:${-k * 0.7}s">${DECOR_SVG[s.decor]}</span>`
        ).join('')}
        </div>`
    ).join('')}
    </div>

    <div class="boo-strip" aria-hidden="true">
      <div class="boo-strip-track">
        ${strip.map((s) => `<span class="boo-strip-item">${s.strip}</span>`).join('')}
      </div>
    </div>



    <div class="boo-products">
      ${SLIDES.map(
        (s, i) => `
        <figure class="boo-product" data-index="${i}" aria-roledescription="slide" aria-label="${i + 1} of ${SLIDES.length}">
          <img src="${s.img}" alt="${s.line1} ${s.line2}" decoding="async" draggable="false" style="--shift:${(s.logo - LOGO_REF).toFixed(3)}" />
        </figure>`
    ).join('')}
    </div>

    <div class="boo-copy">
      ${SLIDES.map(
        (s, i) => `
        <div class="boo-text" data-index="${i}">
          <div class="boo-title" role="heading" aria-level="2"><span class="boo-line">${s.line1}</span><span class="boo-line">${s.line2}</span></div>
          <p class="boo-desc boo-line">${s.desc}</p>
          <a class="boo-btn boo-line" href="#menu">SHOW MENU</a>
        </div>`
    ).join('')}
    </div>

    <aside class="boo-side">
      <p class="boo-tagline">Slow Brewed, Served Cold</p>
      <p class="boo-sub">Small-batch ingredients over crystal-clear ice.<br />Fresh, smooth and made to order.</p>
      <div class="boo-cards" role="group" aria-label="Choose product">
        ${SLIDES.map(
        (s, i) => `
          <button type="button" class="boo-card" data-index="${i}" aria-label="Show ${s.line2.replace('& ', '')}">
            <img src="${s.img}" alt="" decoding="async" draggable="false" />
          </button>`
    ).join('')}
      </div>
    </aside>
  `
}

// ---- smooth, cinematic scroll to a section ----
// Slow start, fast middle, very soft landing (easeInOutQuint).
function smoothScrollTo(target, duration = 1400) {
    const startY = window.scrollY
    const endY = target.getBoundingClientRect().top + window.scrollY
    const distance = endY - startY
    if (Math.abs(distance) < 2) return

    // Respect users who turn motion off: jump straight there.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.scrollTo({ top: endY, behavior: 'instant' })
        return
    }

    const ease = (t) => (t < 0.5 ? 16 * t ** 5 : 1 - Math.pow(-2 * t + 2, 5) / 2)
    const html = document.documentElement
    const prevBehavior = html.style.scrollBehavior
    html.style.scrollBehavior = 'auto' // stop CSS smooth-scroll fighting the animation

    let start = null
    let cancelled = false
    const cancel = () => (cancelled = true)
    // If the visitor scrolls or taps during the animation, give control back to them.
    window.addEventListener('wheel', cancel, { once: true, passive: true })
    window.addEventListener('touchstart', cancel, { once: true, passive: true })

    const finish = () => {
        html.style.scrollBehavior = prevBehavior
        window.removeEventListener('wheel', cancel)
        window.removeEventListener('touchstart', cancel)
    }
    const step = (now) => {
        if (cancelled) return finish()
        if (start === null) start = now
        const t = Math.min(1, (now - start) / duration)
        window.scrollTo(0, startY + distance * ease(t))
        if (t < 1) requestAnimationFrame(step)
        else finish()
    }
    requestAnimationFrame(step)
}

function initBooShowcase(root) {
    if (!root || root.dataset.booReady) return
    root.dataset.booReady = 'true'
    buildMarkup(root)

    const q = (sel) => [...root.querySelectorAll(sel)]
    const els = {
        bgs: q('.boo-bg'),
        products: q('.boo-product'),
        texts: q('.boo-text'),
        cards: q('.boo-card'),
        track: root.querySelector('.boo-strip-track'),
        stripItems: q('.boo-strip-item'),
    }
    const count = SLIDES.length
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const state = {
        current: 0,
        animating: false,
        pending: null,
        timer: null,
        remaining: HOLD,
        startedAt: 0,
        running: [],
        hidden: document.hidden,
    }

    // ---- name strip position ----
    const stripX = (i) => -els.stripItems[i].offsetLeft
    const setStrip = (i) => (els.track.style.transform = `translate3d(${stripX(i)}px,0,0)`)

    // ---- resting state ----
    function setCards(index) {
        els.cards.forEach((el, i) => {
            el.classList.toggle('is-active', i === index)
            if (i === index) el.setAttribute('aria-current', 'true')
            else el.removeAttribute('aria-current')
        })
    }

    function applyActive(index) {
        ;[els.bgs, els.products, els.texts].forEach((list) =>
            list.forEach((el, i) => el.classList.toggle('is-active', i === index))
        )
        els.products.forEach((el, i) => el.setAttribute('aria-hidden', String(i !== index)))
        els.texts.forEach((el, i) => el.setAttribute('aria-hidden', String(i !== index)))
        setCards(index)
        setStrip(index)
    }

    // ---- the ONE autoplay timer ----
    function clearTimer() {
        clearTimeout(state.timer)
        state.timer = null
    }

    function startTimer(ms = HOLD) {
        clearTimer()
        state.remaining = ms
        if (state.hidden) return
        state.startedAt = performance.now()
        state.timer = setTimeout(() => goTo((state.current + 1) % count), ms)
    }

    // ---- transition ----
    function goTo(target) {
        target = ((target % count) + count) % count
        if (state.animating) {
            state.pending = target
            return
        }
        if (target === state.current) {
            startTimer()
            return
        }

        clearTimer()
        state.animating = true
        const from = state.current
        // 4 → 1 slides the strip forward onto the trailing copy of #1 (then snaps back
        // invisibly); every other change slides straight to the target name.
        const stripTarget = from === count - 1 && target === 0 ? count : target

        setCards(target) // card highlight switches immediately, as in the reference

        const outP = els.products[from]
        const inP = els.products[target]
        const outT = els.texts[from]
        const inT = els.texts[target]
            ;[outP, inP, outT, inT, els.bgs[from], els.bgs[target]].forEach((el) => el.classList.add('is-moving'))
        inP.classList.add('is-front')

        const anims = []
        const run = (el, frames, opts) => anims.push(el.animate(frames, { fill: 'both', ...opts }))

        if (reducedMotion.matches) {
            const fade = { duration: 450, easing: 'ease' }
                ;[
                    [outP, inP],
                    [outT, inT],
                    [els.bgs[from], els.bgs[target]],
                ].forEach(([a, b]) => {
                    run(a, [{ opacity: 1 }, { opacity: 0 }], fade)
                    run(b, [{ opacity: 0 }, { opacity: 1 }], fade)
                })
        } else {
            // 1) old copy drifts up and fades — starts at once, no dead time
            outT.querySelectorAll('.boo-line').forEach((line, i) =>
                run(line, [{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(-14px)' }], {
                    duration: T.copyOut,
                    delay: i * 25,
                    easing: EASE_IN,
                })
            )

            // 2) giant name strip glides one name left
            run(
                els.track,
                [{ transform: `translate3d(${stripX(from)}px,0,0)` }, { transform: `translate3d(${stripX(stripTarget)}px,0,0)` }],
                { duration: T.strip, easing: EASE_STRIP }
            )

            // 3) new cup glides up in front of the old one. It starts just below the
            //    screen edge (not far below), so it is visible from the first frame.
            const box = inP.parentElement
            const startY = Math.max(120, root.clientHeight - box.offsetTop + 8)
            run(inP, [{ transform: `translate3d(0,${startY}px,0)`, opacity: 1 }, { transform: 'translate3d(0,0,0)', opacity: 1 }], {
                duration: T.rise,
                delay: T.riseDelay,
                easing: EASE_RISE,
            })
            // old cup sinks a little and fades as the new one covers it
            run(
                outP,
                [
                    { transform: 'translate3d(0,0,0)', opacity: 1 },
                    { transform: 'translate3d(0,2%,0)', opacity: 1, offset: 0.55 },
                    { transform: 'translate3d(0,5%,0)', opacity: 0 },
                ],
                { duration: T.oldCup, easing: EASE_IN }
            )

            // 4) colour, glow and floating ingredients crossfade
            run(els.bgs[from], [{ opacity: 1 }, { opacity: 0 }], { duration: T.bg, easing: EASE_BG })
            run(els.bgs[target], [{ opacity: 0 }, { opacity: 1 }], { duration: T.bg, easing: EASE_BG })

            // 5) new copy, line by line, blur → sharp
            inT.querySelectorAll('.boo-line').forEach((line, i) =>
                run(
                    line,
                    [
                        { opacity: 0, filter: 'blur(8px)', transform: 'translateY(16px)' },
                        { opacity: 1, filter: 'blur(0px)', transform: 'translateY(0)' },
                    ],
                    { duration: T.copyIn, delay: T.copyInDelay + i * T.copyStagger, easing: EASE_OUT }
                )
            )
        }

        state.running = anims
        Promise.all(anims.map((a) => a.finished))
            .catch(() => { })
            .then(() => {
                state.current = target
                applyActive(target) // also snaps the strip from the trailing copy back to #1
                inP.classList.remove('is-front')
                q('.is-moving').forEach((el) => el.classList.remove('is-moving'))
                anims.forEach((a) => a.cancel())
                state.running = []
                state.animating = false

                if (state.pending !== null && state.pending !== state.current) {
                    const next = state.pending
                    state.pending = null
                    goTo(next)
                } else {
                    state.pending = null
                    startTimer()
                }
            })
    }

    // ---- events ----
    els.cards.forEach((card, i) => card.addEventListener('click', () => goTo(i)))

    // "SHOW MENU" → glide down to the menu section
    root.querySelectorAll('.boo-btn').forEach((btn) =>
        btn.addEventListener('click', (e) => {
            const menu = document.querySelector('#menu')
            if (!menu) return // no menu section on the page → normal link behaviour
            e.preventDefault()
            smoothScrollTo(menu)
        })
    )

    const onVisibility = () => {
        state.hidden = document.hidden
        if (state.hidden) {
            if (state.timer) {
                state.remaining = Math.max(0, state.remaining - (performance.now() - state.startedAt))
                clearTimer()
            }
        } else if (!state.animating && !state.timer) {
            startTimer(state.remaining)
        }
    }
    document.addEventListener('visibilitychange', onVisibility)

    // Strip offsets depend on font size → re-measure when fonts load or the window resizes.
    const resync = () => {
        if (!state.animating) setStrip(state.current)
    }
    window.addEventListener('resize', resync)
    if (document.fonts) document.fonts.ready.then(resync)

    applyActive(0)
    root.classList.add('is-ready')
    // If the BOO intro is playing, start the carousel the moment it reveals the page.
    if (document.querySelector('.bi')) {
        let started = false
        const go = () => {
            if (started) return
            started = true
            startTimer()
        }
        window.addEventListener('boo:intro-reveal', go, { once: true })
        window.addEventListener('boo:intro-complete', go, { once: true })
        setTimeout(go, 16000) // safety net
    } else {
        startTimer()
    }

    const api = {
        goTo: (i) => goTo(i),
        get current() {
            return state.current
        },
        destroy() {
            clearTimer()
            state.running.forEach((a) => a.cancel())
            document.removeEventListener('visibilitychange', onVisibility)
            window.removeEventListener('resize', resync)
        },
    }
    root.booShowcase = api
    return api
}

export default function Hero(root) {
    return initBooShowcase(root)
}