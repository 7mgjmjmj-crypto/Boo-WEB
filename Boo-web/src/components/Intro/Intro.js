/* ==========================================================================
   BOO — Cinematic Intro
   01  the full-screen chocolate-brown surface is visible from the first frame
   02  the official BOO logo is drawn by hand, the coffee bean appears
   03  the bean cracks along its groove, the brown surface tears open with
       organic, liquid edges
   04  the opening expands until the whole viewport is pure white (#FFFFFF),
       then the intro removes itself and the existing site is shown

   Self-mounting: importing this file once is enough
     import './components/Intro/Intro.js'
   Fires window event 'boo:intro-complete' when it has removed itself.
   GSAP is used from window.gsap if present, otherwise loaded from the CDN.
   ========================================================================== */

import './intro.css'

const GSAP_CDN = 'https://cdn.jsdelivr.net/npm/gsap@3.13.0/+esm'
const FAILSAFE_MS = 15000

/* ---------- official logo ----------
   Source of truth: public/images/Logo/boo_logo_from_colour_guide_transparent (1).png
   (1676 × 2747 px, colour #ac8150). Its exact contours were traced into the vector
   paths below so the logo can be drawn stroke by stroke and then filled.
   Each entry: [drawing group, path data]. Groups: 0 ghost body, 1 eyes, 2 mouth,
   3 "B", 4 first "O", 5 second "O".                                         */
const LOGO_W = 1676
const LOGO_H = 2747
const LOGO_COLOR = '#ac8150'
const LOGO_PATHS = [
  [0, 'M1229 1189l0 83z'],
  [0, 'M524 61l0 3-12 2 0 3-10 2 0 3-10 2 0 3-10 2 0 2-4 0 0 3-10 2 0 3-8 2 0 3-3 2-1-2-3 2-1 3-8 2 0 2-4 3-4 0 0 3-12 4-4 5-4 1 1 1-6 3-1 3-4 0-3 5-7 2-3 5-4 0 0 3-3 0-3 4-4 0 0 3-5 2-2 5-4 0 0 2-4 1-3 5-7 2 0 3-4 2-1 3-7 4-3 5-4 0 0 2-5 3 0 3-3 0-3 5-4 2 0 2-5 3 0 2-5 3-2 4-2 1-3 4-5 3 0 3-5 2-1 3-2 0-2 5-5 2 0 3-5 2-2 3 2 1-5 3-3 5-2 0-2 5-3 0-2 8-3 0-4 7-3 1-2 6-3 0-2 7-2 1-3 2 0 2-3 2 0 3-5 3-2 6-3 1-2 7-5 3-2 8-3 0 0 4-2 3-3 0-2 7-3 0-2 9-2 0-3 8-5 3-2 9-3 1-2 9-5 4 0 4-3 0-2 9-3 1-2 9-3 1-2 9-3 1-2 10-3 0-4 16-3 2-2 10-3 1-2 11-3 1 0 7-2 1 0 5-3 0 0 7-1 1 1 1-2 1-1 6-2 0-2 15-3 1-4 23-3 1-3 20-1-2-1 9-2 1-1 13-2-1-2 26-3 1-2 31-3 2 0 20-2 3 0 39-2-4-1 1372 1 6 2 0 0 18 2 2 0 11 3 1 2 14 3 2 0 6 2 1 0 3 3 2 2 11 5 3 0 4 3 2 2 6 3 4 2 0 0 4 5 2 0 4 3 4 4 2 0 4 2-1 2 2 0 2 11 8 3 5 6 2 3 5 4 0 1 2 3 1 0 2 4 0 3 4 5 1 0 3 9 2 2 3 5 0 1 2 4 0 2 2 6 0 1 3 7 0 0 2 10 0 0 2 20 1 0 1 41-2 1-2 11 0 1-2 6-1 1-2 19-4 2-3 9-2 1-3 8-2 0-3 9-3-1-1 5-2 2-4 8-2 0-3 5-2 4-7 3 0 2-5 3 0 0-3 5-3 2-7 3 0 2-5 2-1 3-6 3-1 4-14 2 0 2-3 1-6 3-1 2-9 2-1 3-17 3-1 0-8 2-1 0-22 2 0 1-305 2-3 3 0 0-2 12 0 0 2 5 2 2 9 1 311 0-8 1-1 3 37 2-2 3 16 3 2 2 10 2 1 1 5 1-2 4 11 2-1 2 8 2-1 1 5 5 3 2 7 2 0 3 4 5 4-2 1 4 3 0 2 2 0 3 4 4 1 1 3 5 2 0 3 7 2 0 2 6 3 0 2 8 3 0 2 4 1 0 2 5 0 1 2 17 5-1 2 6 1 1 2 7 0 1 2 23 3 1 3 47 0 0-3 22-3 0-2 8 0 0-2 5 0 1-3 5 0 1-2 5 0 1-2 5-1-1-2 10-2 0-3 5-1 3-4 3 0 7-7 3-1 1-2 4-2 4-5 4-2 0-3 5-2 1-3 2 0 2-5 3 0 1-4 2-2 1-4 3 0 2-6 2 0 3-8 2 0 1-3 2-1 0-4 2-1 3-11 3 0 2-12 2 0 1-7 2-1 2-17 3-1 0-21 2-1 0-307 2 0 3-5 12 0 1 2 5 4 0 312 1 0 1 18 1 2 1 8 3 2 2 14 3 1 0 9 2 0 0 4 3 2 2 10 3 1 0 4 2 1 1 3 2 1 2 6 3 0 0 4 4 4 1 3 2-1 0 4 5 4 2 4 3 0 2 5 5 3 0 2 7 2 0 2 5 3 0 3 5 2 0 3 9 2 1 3 8 2 0 3 4 0 6 4 4 0 0 3 8 0 0 2 4 0 1 2 7 1 0 1 11 1 1 3 12 0 1 2 49 0 2-2 12 0 2-3 8-1 1-1 4-1 1-2 6 0 1-2 5 0 0-3 14-4 1-3 7-2 0-3 4 0 4-5 6-2 1-3 5-2 0-3 4 0 3-5 7-5 0-4 3 0 2-5 3-1 2-4 3-1 2-7 3 0 0-4 5-4 0-4 4-3 0-4 3-1 0-4 2 0 0-5 3-1 2-9 3-1 2-16 3-1 2-23 3-2 0-314 2-6 3-1 0-3 9 0 4 0 1 3 3 0 2 10 0 314 1-3 1-1 3 31 3 2 2 15 3 1 0 6 2 1 0 5 3 0 0 4 2 2 2 8 2 0 3 4 0 4 3 0 2 8 5 2 0 4 3 1 0 3 12 10 2 4 3 0 0 2 5 3 2 5 4 0 0 2 4 1 2 5 8 2 0 2 4 1 0 2 4 0 1 2 3 1 0 1 10 3 0 2 12 3 0 2 10 1 0 2 9 0 1 3 18 0 4 2 27 0 3-2 18-1 2-2 9 0 1-2 6 0 1-3 13-3 1-2 9-2 1-3 10-3 3-4 8-2 1-3 6-3-1-2 7-2 1-3 6-3 0-2 4-3 1 1 0-2 3-4 2 0 4-5 4-2 2-7 4-3 1-4 2 0 1-3 2 0 0-4 3-2 2-6 3-1 2-11 2 0 3-13 3-1 0-11 2-1 0-11 2-1 0-39 2-1 0-604-2 0 0-15-2-1 0-4-2 0 0-5-3-1-1-4-4-2-2-5-8-2-2-5-8 0 0-3-29 0-1 3-9 0-1 2-6 0 1 2-6 1-1 1-1-1-1 2-10 0-1 2-21 0 0 3-7 0-1-3-24-1 0-1-6 0-2-2-8 0-2-3-11-2-1-3-9-2 0-3-7-2 0-3-8-2 0-3-3-2-1 2-3-2 0-3-3 0-2-4-3-1-3-4-2 0-4-8-5-3-1-3-2-1-2-7-5-4-1-4-2 0-2-10-3 0-2-10-3-1-2-16-2-1 0-18-3-2 0-522 4-3 3 5 0 53-2-3 0 22 2 1-2 8 2 445 3 0 2 22 3 1 0 7 2 0 0 4 3 1 2 10 3 0 2 9 5 3 0 4 3 1 2 5 5 3 2 6 2 0 3 6 7 2 1 3 8 5 0 2 8 2 3 4 4 1 1 3 9 2 1 3 4 0 2 1 8 1 1 3 15 0 0 2 37 0 2-2 14 0 1-3 14-3 1-2 8-2 1-3 8-2 0-3 4 0 4-5 6-3 2-4 4 0 4-7 2-1 0-2 6-3 2-7 2 0 1-5 5-3 2-9 2-1 3-11 3-1 0-7 2-1 0-8 2 0 0-23 2-1 0-543-2-1 0-75-2-1 0-36-2 0 0-22-3 0-3-29-2-1 0-12-2 0 0-10-3 0-3-19-2 0-2-18-3-1-1-8-1 0-1-8-2 0-4-22-3 0-3-15-2 0 0-7-2 0 0-5-3-1-3-11-2-1-2-12-3-1-3-11-2 0-4-15-3 0 0-5-2-1 0-4-3-1-2-8-3 0 0-5-2-1 0-4-3-1-2-9-3 0-2-7-3-1 0-4-2 0-2-8-2 0-1-4-5-4-2-8-2 0-3-4-1-4-2 0 0-3-2-1 0-4-5-3-1-4-2 0-2-7-5-4-1-4-4-2 0-3-5-3 0-4-2 0-1-3-2-1 0-4-5-2-3-5-2-1 0-4-4-2 0-3-3 0-2-3-1-2-2-1 0-4-5-2 0-3-5-2-2-5-5-3-1-2-2 0-4-10-3 0-2-4-3-1-2-5-5-2-1-3-2 0-3-4-2 0-3-5-2 0 0-2-4-4 0-2-8-2 0-3-5-2 0-3-5-2-3-5-2 0-3-5-4 0-2-5-6-3 0-2-6-2-1-3-5-3-1-2-3 0-4-5-2 0-3-4-4 0 0-3-5-2-1-3-3 0-4-3 0-2-4 0 0-2-4 0 0-3-4 0-2-3 0-2-4 0-3-2 0-3-13-4-3-5-3 0-2-3-7-2-1-3-3 0-1-2-4 0 0-3-8-2-1-3-9-2 0-3-14-4 0-3-5 0 0-2-5 0 0-3-10-2-1-3-9-2-1-3-11-2 0-3-8 0 0-2-4 0-1-3-17-4-1-3-14-2 0-3-7 0 0-2-7 0-1-3-16-2-2-3-16-2 0-3-16-2-1-3-10 0-1-2-10 0-2-2-10 0-2-3-12 0-1-2-15 0-1-3-15 0-2-2-32 0-1-3-127 0-1 3-29 0-3 2-14 0-3 3-27 2-1 3-10 0-2 2-19 2-1 3-16 2 0 2-7 1-1 2-7 0-1 3-16 2 0 3-15 2-1 3-12 2-2 3-19 4-1 3-11 2-1 3z'],
  [0, 'M537 115l5-1 4-3 8-1 0-2 12-2 0-3 14-3-2-2 12-2 1-3 15-3 0-2 6 0 2-2 6 0 1-3 16-2 1-2 8-1 0-2 16-2 0-3 20-3-2-2 24-2 0-3 34-3-2-2 26 0 4-2 104 0 2 2 29 0 2 3 17 0 3 2 11 0 1 2 27 3 1 3 18 2 1 3 14 2 2 3 8 0 2 1 16 3 0 3 16 2 1 3 13 2 0 3 12 2 0 2 12 3 0 3 12 2 1 2 13 5 2 3 12 2 0 2 2 2 2-1 4 2 0 2 10 3 0 2 8 3 1 3 9 2 1 3 3 0 4 3 4 1 1 3 5 0 2 5 8 2 0 3 4 0 4 2 0 2 8 3 1 3 5 2 0 2 4 1 3 3 5 1 0 3 4 2 1 2 5 1 2 5 7 2 1 2 4 3 3 5 4 0 1 2 2 1 3 4 3 0 2 5 4 0 1 2 5 3 0 3 4 2 1 2 5 3 2 5 2 0 2 2 3 1 5 5 0 1 5 3 1 3 4 2 0 4 2-1 1 4 4 2 1 3 5 3 0 2 5 3 4 7 2 0 3 5 3 1 2 6 5 3 0 3 5 2 0 4 2 0 3 6 5 2 2 8 3 0 2 6 2 0 1 4 5 3 2 6 3 0 2 7 2 1 3 3-1 1 1 2 3 1 0 4 4 4 0 4 5 3 0 4 3 1 2 3-2 1 6 6 1 5 3 1 2 9 3 0 2 9 2 0 3 4 2 9 3 1 2 9 2 0 3 5 0 6 3 1 2 9 3 1 2 10 3 0 2 12 3 0 0 7 2 0 0 5 2 0 0 7 3 1 2 12 3 0 2 15 3 0 2 16 3 1 2 19 3 1 0 7 2 0 0 11 3 1 2 20 2 2 0 12 3 1 0 12 2 2 0 25 3 0 0 42 2 0 0 598 0 20-2 0 0 10-3 0 0 6-5 4 0 4-4 3 0 4-5 3-1 3-7 2 0 3-5 2-1 3-10 2-2 2-5 0-2 3-36 0 0-3-8 0 0-2-10-2 0-3-6-2-2-3-4-2 0-3-5-2-3-5-2-1-2-4-3 0 0-4-2-3-3-1 0-4-2 0 0-5-2-1 1-2-1 0-1-7-2 1-1-11-1 0-1-527-2 0-2-19-3-1-1-4-6-6 0-4-3 0-3-5-4 0-2-5-5 0-1-3-7-2-39 0 0 2-5 0-1 3-4 0-3 5-7 2 0 3-5 2-2 8-3 0 0 4-2 1 0 4-3 1 0 7-1 0-1 531 3 32 1-4 1 16 2 1 0 7 2-2 3 14 3 1 2 11 3 1 2 9 3 1 0 5 4 2 0 4 5 3 0 5 3 0 0 3 5 2 2 7 3 1 2 5 2 0 3 4 3 1 4 4 0 3 2 0 3 4 5 4 0 2 7 2 1 3 4 2 2 3 6 2 0 3 4 0 6 4 4 0 0 2 4 3 6 0 1 2 4 1 1 2 6 0 2 3 15 2-1 2 29 3 0 2 45 1 0-3 17 0 1-2 10 0 1-3 7 0 0-2 10 0 0 627-2 0 0 13-3 0-2 14-3 1-2 9-2 0 0 4-3 1-3 5-2 0-2 8-3 0-2 4-3 1-3 4-4 0 0 3-5 2 0 3-7 2-1 3-9 2 0 3-9 2-2 3-11 2-1 3-9 0-1 2-44 0-1-2-8 0-1-3-14-2 0-3-8-2-1-3-7-2-2-3-7-2 0-3-5-2-2-5-3 0-2-5-3 0-4-7-3-1-2-7-3-1 0-4-5-3-3-9-2-1-2-11-3-1 0-7-2-1 0-13-3-1 0-317-2-2 0-15-2-1 0-7-3 0-1-4-1-1-1-4-2 0-2-8-3 0-2-5-6-3 0-2-4 0 0-2-3-1 0-2-5-1-1 1-6-4-10-1 2-2-12 0-18 0 4 2-18 3 0 2-5 0-3 5-4 0 0 2-5 3-3 5-2 0-2 8-5 2 0 5-3 0-3 20-1-3-1 317-2 1-2 24-3 0 0 8-2 0 0 5-3 0-2 10-3 1-2 8-3 0 0 2-5 4-2 6-3 1-2 5-5 2-3 5-7 2 0 2-5 3-1 3-4 0-3 5-9 2 0 3-5 0-1 2-6 0 0 3-20 2 0 2-27 1-1-3-11 0-1-2-7 0-1-3-11-2-1-3-10-2-2-3-4 0 0-2-4-1 0-2-6-2-1-3-3 0-4-4-2 0 0-3-5-2-3-5-2-1-2-4-3 0-3-8-2 0-2-7-3-1 0-4-4-6-1-6-2-1-2-16-3-1 0-22-2-1 0-217 2-4 0-46-2-3-1-41-2 0 0-10-2-1 0-4-3-1-3-9-2 0-2-5-3 0-4-7-3 0-2-5-5 0 0-3-18-5 2-2-10 0-26 0 0 2-7 1 0 2-10 2 0 3-5 2-1 3-7 3-2 6-7 6 0 4-3 1-2 9-3 0 0 12-2 3 0 318-3 0-2 21-3 1-2 9-3 1 0 7-2 0-2 6-3 1-2 7-3 1-2 5-3 0-2 5-2 0-3 5-5 2 0 3-3 0-3 4-4 0-3 5-4 0 0 3-8 2-1 3-11 2-1 3-14 2 0 3-22 2-30-2 0-3-4-2-8 0-1-3-11-2 0-3-10-3 2-1-8-3 0-2-4-1-2-4-4-1 0-2-4 0-2-5-3 0-3-5-2 0 0-5-4-3-1-2-2 0-2-7-3-1-2-9-3-1-1-6-1 0 0-8-3-1 0-7-2-2 0-19-3-1-1-307-1-1 0-11-3-1 0-6-4-6 0-4-2 0-2-3-3-2-8-10-3 0-2-5-5 0-1-3-4 0-1-2-6-2-35-1-20 5 0 3-7 2-3 5-2 0 0 3-7 5 0 4-5 3 0 4-3 1 0 6-2 1 0 10-3 0 0 308-2 0-2 26-3 1 0 7-2 0 0 5-3 1-2 12-3 0-2 6-5 4 0 3-3 1-3 6-2 0-2 6-5 3-1 3-4 0-2 5-8 2-3 5-9 2 0 3-5 0-1 2-6 0 0 3-18 2 0 3-9 0-1 2-29 0-1-2-9 0-1-3-16-2 0-3-10-2-1-3-9-2-2-5-8-2-5-8-7-3-2-7-3 0-2-5-3-1 0-3-5-4-2-8-5-4 0-6-3-2 0-4-2-1 0-5-2-2 0-8-3-2 0-18-2-2 0-6 0-1340 2-1 0-52 0-3 2 0 1-22 1 0 3-32 3 0 0-12 2-1 0-11 3-1 2-22 3 0 2-17 3-1 2-16 3-1 2-16 3-1 2-13 3-2 4-16 3-1 0-7 2-1 0-4 3-1 2-11 2 0 3-12 3-1 2-9 3-1 2-9 3-1 0-4 2 0 2-10 3 0 1-3-1-1 3-4 2 0 2-8 3-2 0-4 3-3 2 0 2-9 3 0 2-6 2-1 1-3 2-1 2-8 5-3 1-5 1 1 3-8 2 0 3-6 3 0 2-7 4-3 1-4 2 0 1-2 4-4 0-4 2 1 1-4 5-3 2-5 2 0 1-4 5-2 0-3 5-2 0-3 3-3 2 0 0-4 4-5 5-3 0-2 3 0 2-5 2 0 3-5 3 0 2-5 2 0 3-5 3 0 2-5 4-2 4-5 2 0 2-4 5-4 1-2 6-2 0-3 6-3 0-2 4-2 0-3 8-3 2-4 5-2 0-3 7-3 1-2 5-2 0-3 6-2 4-5 3 0 1-3 7-3 3-4 7-2 3-5 4 0 1-3 3-2 3 0 1-3 7-2 1-3 4 0 3-5 4 0 3-4 4 0 2-3 8-2 1-3 9-3 1-2 9-2 1-3 9-3 1-2 9-2z'],
  [1, 'M842 440l0 3-20 2 0 3-5 0-1 2-4 0 0 3-9 2-1 3-7 2 0 2-5 3-2 5-8 2-2 7-5 3-2 7-3 1 0 4-2 3-3 0-2 10-3 1-2 14-3 0 0 17-2 0 2 37 3 0 0 10 2 0 0 5 3 0 2 11 5 3 0 4 3 1 4 10 3 0 0 2 5 4 0 3 3 3 3 0 1 3 5 2 0 3 7 2 1 2 8 3 1 3 10 2 0 2 4 1 2 2 20 2 1 3 22 0 1-3 14-1 0-1 15-3 0-2 11-2 1-3 9-3 1-2 7-2 0-3 5-3 0-2 7-2 1-5 5-2 0-3 4-2 3-8 3 0 2-10 2 0 1-5 4-5 0-7 3-1 0-6 2 0 0-13 2-1 0-23-2 0-2-25-3 0-1-6-1-1-3-9-2-1 0-5-5-2-3-8-2 0-2-5-2 0-3-5-5-2 0-3-5-2-3-5-7-2-1-3-9-2-1-3-9-2-1-3-18-2 0-3z'],
  [1, 'M859 492l11 0 1 2 9 1 1 1 5 1 0 1 4 1 2 3 6 2 1 2 4 3 0 3 5 2 0 3 3 0 2 9 3 1 0 7 2 0 0 12 3 0 0 8-3 0 0 14-2 0 0 5-3 1 0 4-2 0 0 4-3 1 0 3-5 2 0 2-5 5-4 0 0 2-3 1-1 2-4 0-1 3-17 2-2 3-6 0-2-3-18-2-2-3-2 0-2-2-3-1 0-2-3 0-3-4-3 0-2-5-3-1-2-7-3-1 2-2 1 2 4 1 3 5 8 1-3 1 9 1 3 2 17 0 2-2 8 0 1-3 8-3-1-1 3-3 1 1 2-2-1-1 3-3 1 1 1-4 2-2 2 0 3-12 3 0 0-26-3-2-2-8-3-1 0-3-5-2 0-3-5-2 0-3-3-2-4 0-1-3-6 0-1-2-14-1 6 0 1-4z'],
  [1, 'M426 440l0 3-12 0 0 2-8 0 0 3-6 0-2 2-4 0 0 3-10 2 0 3-6 2-1 3-3 0-2 4-3 0 0 3-3 2-2 0 0 2-7 6 0 4-5 4-2 7-2 0-1 3-2 2 0 4-3 0-2 14-3 1 0 8-2 1 1 44 0-1 1 9 3 1 0 7 2 0-2 2 2 1 0 3 3 1 3 9 2 0 2 8 5 4 3 7 2 0 2 4 2 0 1 2 4 3 3 4 4 1 1 3 5 2 0 2 10 3 0 3 10 2 0 2 14 3 0 1 14 1 2 3 23 0 1-3 21-3 1-1 5-1 0-2 11-2 1-3 4-1 1-1 3-1 1-2 3 0 3-5 4-1 3-4 5-2 0-3 2 0 4-5 2 0 2-7 2 0 3-7 3 0 4-15 2 0 1-5 1-1 1-9 3 0 2-15 0-32-2-1 0-11-3-1-2-11-3-1 0-4-2-1 2-1-4-4 0-4-3-1-2-6-3 0 0-3-5-3-3-7-2 0-2-5-8-2-4-7-5 0 0-3-3 0-1-2-4 0-1-3-10-2-1-3-17-2-1-3z'],
  [1, 'M438 492l17 0-2 2 17 3 0 1 5 2-1 1 6 3 0 2 4 1 3 5 3 0 0 4 5 4 2 8 3 1 0 11 2 1-2 26-3 1 0 7-2 1 0 4-3 1-2 5-3 0-1 4-8 5-1 3-9 2 0 3-5 0-1 2-12 1 0 2-9 0 0-2-19-3-1-3-7-2-1-3-7-2-2-5-5-3 0-4-3-1 0-2 4 0 1 3 7 2 1 3 9 0 0 2 18 0 2-2 9 0 1-3 4-1 4-4 2 0 2-5 2 0 3-5 5-3 0-4 2-1 3-10 0-19-2-3 0-4-3-1 0-6-2 0-1-3-4-2-1-4-4-2 0-2-8-2 0-3-4 0-1-2-14-1 6 0z'],
  [2, 'M556 696l-1 3-9 0-1 2-6 0-1 3-11 2-1 3-9 2-1 3-8 2 0 2-4 3-7 2-1 3-6 2 0 2-3 1-3 5-2 0-5 7-2 0-3 5-2 0-2 4-5 4-1 3-2-1-2 7-3 0-2 9-3 1-4 11-3 1-2 9-3 1-2 12-3 1 0 6-2 2 0 9-3 2 0 14-2 5 0 32 2 4 0 16 3 1 0 9 2 1 1 8 2-1 0 6 2 1 0 7 3 1 2 9 3 2 4 11 2 0 1 4 5 3 0 4 7 7-1 1 1 2 3 0 2 5 5 3 0 2 2 1 5 7 3 0 0 2 3 2 1-1 3 5 5 2 0 2 5 1 4 4 4 0 0 3 8 2 1 3 9 2 1 3 12 2 1 3 16 2 1 3 15 0 2 2 43 0 1-2 14 0 1-3 9 0 2-2 6 0 1-3 13-2 1-3 11-3 1-2 7-2 2-3 3 0 3-4 4 0 1-3 5-3 0-2 6-2 1-3 3 0 2-4 2-1 3-5 5-3 0-2 2 0 3-5 3 0 2-7 4-3 3-9 3 0 2-8 2 0 1-4 2-1 0-4 3 0 2-13 3-1 0-6 2-1 0-6 2-1 1-12 2-2 0-15 2 0 0-34-2-1 0-16-2-2 0-8-3-2 0-6-2-1-1-6-2-1-2-12-3-1 0-4-2-1 0-3-3-1 0-4-2 0-1-4-2 0 0-4-4-3 1-1-1-3-3-1 0-2-5-3 0-3-5-4-2-4-3 0-3-5-2-1-2-4-3 0-1-3-5-2-1-2-5-3 0-3-3-1-1 1-3-4-4-1 0-2-8-2-2-3-8-2-1-3-11-2-2-3-6 0-1-2-9 0-2-3-17 0-1-2-44 0 0 2z'],
  [2, 'M571 748l51 0 2 3 10 0 1 2 11 2 1 3 9 2 1 3 7 2 1 3 7 2 0 2 4 3 1 3 5 2 2 4 2 1 3 5 5 2 0 4 3 2 2 7 3 0 2 9 3 1 2 11 2 2 1 10 1-1 3 31-2 1 0 21-3 1 0 9-2 2-2 10-3 2-2 8-3 2-2 8-3 1-2 5-5 2 0 4-5 3 0 3-8 2 0 2-4 3 0 3-8 2 0 3-7 2-1 3-9 2-1 3-13 2-2 2-6 0-1 3-48 0 0-3-8 0-1-2-13-2-2-3-8-2 0-3-8-2 0-3-5 0-3-5-6-2-3-5-3-1 0-2-4-3 0-4-5-2-1-3-2 0-2-7-3 0-3-10-2 0 0-4-2-2 0-4-3 0-2-15-3-1-1-23-1-3 2-32 2 0 3-15 3 0 2-9 2 0 3-10 3 0 2-8 3 0 2-5 2 0 5-7 5-3 0-2 5-2 0-3 8-2 0-3 4-1 4-4 8-2 1-3 11-3 1-1 9-1z'],
  [3, 'M5 2434l0 2-3 2 0 5-2-1 0 290 2 0 0 5 2 0 3 5 27 0 0 2 132 0 1-2 19 0 1-3 9-1 1-1 7-1 0-1 8-1 0-2 4 0 3-2 0-3 4 0 3-5 2 0 3-5 5-3 0-4 3-1 0-4 1-1 1-6 3 0 0-10 2-3 0-19 2 0 0-13-2 3 0-20-2 0-1-12-2 2-2-12-3 0 0-5-5-3-2-7-3 0-4-7-5 0 0-3-9-2-1-3-5 0-4-2-1-2 15-5 0-3 4-2 2-3 4-1 4-9 2-1 3-9 3-1 0-6 2-3 0-51-2-1 0-9-3 0-1-6-1-2-1-4-2 0 0-3-2-1 0-4-5-2-3-5-6-2-2-3-8-2-2-3-18-2 0-3-18 0 0-2-54 0-82 0z'],
  [3, 'M76 2608l62-1 0 2 12 0 0 2 4 0 1 3 5 0 2 5 3 0 0 5 2 0 0 6 3 2 0 33-3 1-2 12-8 2 0 2-4 3-8 0-1 3-68 0z'],
  [3, 'M76 2486l46 0 3 2 19 0 2 3 6 0 5 7 3 0 0 8 2 0 0 31-2 1 0 4-3 1-3 7-2 2-7 0-1 3-11 0-3 2-54 0z'],
  [4, 'M758 2434l-1 3-13 2-1 3-9 2 0 3-3 0-3 3-1-1-3 5-5 2-1 3-4 2 0 3-3 0-2 6-2 1 0 4-3 1-2 9-3 1-2 12-3 0-2 16-3 2-2 30-3 1 0 78 3 1 2 32 3 0 0 10 2 0 0 7 3 0 2 13 3 0 0 6 2 1 0 3 3 0 0 5 4 4 0 2 3 1 2 5 2 0 3 3 0 2 5 2 0 2 8 3 0 3 8 2 1 3 13 2 0 2 6 0 2 3 30 2 1 3 53 0 1-3 19 0 1-2 9 0 1-3 9-1 1-1 12-3 0-2 5 0 0-2 5 0 0-3 5-1 2-4 2 0 3-5 3 0 2-5 5-2 2-6 3-1 2-8 2-1 1-4 1-1 1-5 3-2 2-10 3-2 2-23 3-1 0-16 2-1 0-4 0-78-2-5 0-16-3-2-3-21-2 0-2-12-3-1-1-6-1-1-1-3-2-1-2-8-5-3-2-7-3 0-2-5-3 0-3-5-6-2-4-3 0-2-9-2-1-3-14-2-1-3-12-2-13 0-1-3-47-1-29 1-1 3-14 0-1 2z'],
  [4, 'M838 2488l2 2 8 1 1 2 5 0 0 3 8 2 0 2 5 3 0 5 2 0 0 4 2 2 1 6 2 0 2 25 3 0 0 80 0 3-3 2 0 15-2 1 0 6-3 1-2 13-5 2 0 4-2 3-4 0-1 3-3 0-1 2-4 0 0 3-7 1-1 1-14 1-1 2-10 0-2-3-18-2-2-3-9-2 0-3-7-5 0-4-3 0 0-4-2-2-2-14-3-1 0-15-2-1 0-84 2-20 2 1 0 2 1-10 1 0 3-10 3 0 2-7 3 0 0-3 3-2 4 0 0-3 4 0 2-2 6 0 1-3z'],
  [5, 'M1472 2434l0 3-7 0-1 2-7 1-1 2-4 0-3 5-3 0-4 4-4 1 1 2-3 0-3 5-5 3 0 4-3 0-2 7-5 3-2 10-3 0-2 12-3 0-2 21-2-1-1 15-2 3-1 25-1-4-1 58 2-6 1 27 3 20 1-3 1 14 2 1 0 6 3 1 2 13 3 0 4 14 5 4 0 3 5 3 0 3 3 0 2 5 5 2 0 2 8 3 0 3 3 0 1 2 5 0 0 2 13 3 0 1 9 1 1 3 8 0 4 2 20 0 0 3 49 0 1-3 20 0 1-2 9 0 1-3 9-1 1-1 11-2 1-3 10-2 0-3 7-3 0-2 8-2 0-3 4-3 0-4 2 0 3-5 3-1 2-8 3-2 0-3 2-1 0-5 3-1 2-12 2 0 4-21 1 1 1-16 2-3 0-87-2-4 0-17-3 0-2-21-3-2-2-14-3 0 0-4-2-2 0-3-3-1-2-7-3-1 0-4-5-3 0-2-4-3 0-2-5-2 0-3-3 0-3-4-4 0-1-3-9-2-1-3-14-2-1-3-12-2-13 0-2-3-43-1-32 2-1 2z'],
  [5, 'M1519 2488l37 0 0 3 14 2 3 5 3 0 4 8 3 0 2 12 3 0 0 6 2 1 0 13 3 0 0 24 2 10-1 34-1 3 0 27-3 0-2 20-3 0 0 4-2 1 0 5-3 0 0 4-5 5-2 0-1 3-8 2-1 3-5 0-1 1-13 1-1 3-17 0 0-3-9 0-2-2-6 0 0-3-5 0-2-5-8-5-2-4-3 0 0-5-2-1 1-2-1 0-1-5-2-1 0-9-2-2-2-27 0-62 2-18 2-2 0-12 2 0 3-12 3 0 2-6 2 0 2-4 2-2 1 1 3-4 4 0 2-2 8-1z'],
]

// Photoreal roasted coffee bean (rendered asset, 250 × 350 WebP with transparency)
const BEAN_SRC = 'data:image/webp;base64,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'

/* ---------- deterministic randomness (same tear shape every load) ---------- */
function seeded(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const rand = seeded(2026)
const N = 48 // points per torn edge
// Organic edge: a smoothed low-frequency curve plus fine fibre noise
function edge() {
  const raw = Array.from({ length: N }, () => rand() * 2 - 1)
  return raw.map((v, i) => {
    const a = raw[Math.max(0, i - 1)]
    const b = raw[Math.min(N - 1, i + 1)]
    const smooth = v * 0.4 + (a + b) * 0.3
    return smooth + (rand() * 2 - 1) * 0.22
  })
}
const jagL = edge()
const jagR = edge()

/* ---------- the bean's groove (bean box = 100 × 140 units) ----------
   The groove of the bean image follows x = 50 + 5.5·sin(2πt), t = (y − 16) / 108.
   The bean cracks exactly along it.                                        */
const GROOVE_STEPS = 30
const groove = Array.from({ length: GROOVE_STEPS + 1 }, (_, i) => {
  const t = i / GROOVE_STEPS
  return [50 + 5.5 * Math.sin(2 * Math.PI * t), 16 + 108 * t]
})

function beanClip(side) {
  const out = side === 'l' ? '-40%' : '140%'
  const pts = groove.map(([x, y]) => `${x.toFixed(2)}% ${((y / 140) * 100).toFixed(2)}%`)
  return `polygon(${out} -5%, 50% -5%, ${pts.join(', ')}, 50% 105%, ${out} 105%)`
}

function crackPath() {
  return 'M' + groove.map(([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`).join(' L')
}

/* ---------- markup ---------- */
function logoSVG() {
  const fill = LOGO_PATHS.map(([, d]) => d).join('')
  const strokes = LOGO_PATHS
    .map(([g, d]) => `<path class="bi-logo__line bi-logo__line--${g}" d="${d}" pathLength="1"/>`)
    .join('')
  return `
  <svg class="bi-logo" viewBox="0 0 ${LOGO_W} ${LOGO_H}" role="img" aria-label="BOO">
    <path class="bi-logo__fill" d="${fill}" fill="${LOGO_COLOR}" fill-rule="evenodd"/>
    <g class="bi-logo__lines">${strokes}</g>
  </svg>`
}

function template() {
  const frags = Array.from({ length: 14 }, (_, i) => `<i class="bi-frag bi-frag--${i % 4}"></i>`).join('')
  return `
  <svg class="bi-defs" width="0" height="0" aria-hidden="true" focusable="false">
    <filter id="bi-f-silk" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.0016 0.0042" numOctaves="3" seed="8"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer>
        <feFuncA type="linear" slope="0" intercept="1"/>
      </feComponentTransfer>
    </filter>
    <filter id="bi-f-grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="5" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
    </filter>
  </svg>

  <div class="bi-surface">
    <div class="bi-bg"></div>
    <svg class="bi-bg__silk" preserveAspectRatio="none" aria-hidden="true"><rect width="100%" height="100%" filter="url(#bi-f-silk)"/></svg>
    <div class="bi-light"></div>
    <div class="bi-sheen"></div>
    <svg class="bi-bg__grain" preserveAspectRatio="none" aria-hidden="true"><rect width="100%" height="100%" filter="url(#bi-f-grain)"/></svg>
    <div class="bi-vignette"></div>

    <div class="bi-tear">
      <div class="bi-tear__edge"></div>
      <div class="bi-tear__white"></div>
    </div>

    <div class="bi-brand">${logoSVG()}</div>

    <div class="bi-bean">
      <div class="bi-bean__half bi-bean__half--l"><img src="${BEAN_SRC}" alt="" draggable="false" /></div>
      <div class="bi-bean__half bi-bean__half--r"><img src="${BEAN_SRC}" alt="" draggable="false" /></div>
      <svg class="bi-bean__crack" viewBox="0 0 100 140" aria-hidden="true">
        <path d="${crackPath()}" pathLength="1"/>
      </svg>
    </div>

    <div class="bi-frags">${frags}</div>
    <div class="bi-loader"><span></span></div>
  </div>

  <button class="bi-skip" type="button">Skip</button>`
}

/* ---------- geometry helpers ---------- */
function tearPolygon(half, wobble = 0) {
  if (half <= 0.001) return 'polygon(50% -2%, 50% -2%, 50% 102%, 50% 102%)'
  const amp = 1.9 * Math.min(1, half / 2.5)
  const left = []
  const right = []
  for (let i = 0; i < N; i++) {
    const y = -2 + (i / (N - 1)) * 104
    const w = Math.sin(i * 0.38 + wobble) * 0.5 * amp
    left.push(`${(50 - half - jagL[i] * amp - w).toFixed(2)}% ${y.toFixed(2)}%`)
    right.unshift(`${(50 + half + jagR[i] * amp + w).toFixed(2)}% ${y.toFixed(2)}%`)
  }
  return `polygon(${left.join(',')},${right.join(',')})`
}

async function loadGsap() {
  if (window.gsap) return window.gsap
  const mod = await import(/* @vite-ignore */ GSAP_CDN)
  return mod.gsap || mod.default
}

/* ---------- main ---------- */
export function Intro() {
  if (document.querySelector('.bi')) return
  const root = document.createElement('div')
  root.className = 'bi'
  root.setAttribute('aria-hidden', 'true')
  root.innerHTML = template()
  document.body.appendChild(root)
  document.documentElement.classList.add('bi-lock')
  document.documentElement.classList.remove('bi-done')

  const $ = (s) => root.querySelector(s)
  const $$ = (s) => [...root.querySelectorAll(s)]
  $('.bi-bean__half--l img').style.clipPath = beanClip('l')
  $('.bi-bean__half--r img').style.clipPath = beanClip('r')

  let done = false
  let tl = null
  let gsapRef = null
  const timers = new Set()
  const later = (fn, ms) => {
    const id = setTimeout(() => { timers.delete(id); fn() }, ms)
    timers.add(id)
  }

  const finish = () => {
    if (done) return
    done = true
    timers.forEach(clearTimeout)
    timers.clear()
    if (tl) tl.kill()
    if (gsapRef) gsapRef.killTweensOf($$('.bi, .bi *'))
    document.documentElement.classList.remove('bi-lock')
    document.documentElement.classList.add('bi-done')
    root.remove()
    window.dispatchEvent(new CustomEvent('boo:intro-complete'))
  }

  // CSS-only path: reduced motion, GSAP unavailable, or skip before GSAP loaded
  const quickExit = (delay = 0) => {
    root.classList.add('bi--static')
    later(() => {
      root.classList.add('bi--revealed')
      later(() => {
        document.documentElement.classList.add('bi-done')
        root.classList.add('bi--out')
        later(finish, 700)
      }, 900)
    }, delay)
  }

  later(finish, FAILSAFE_MS)

  $('.bi-skip').addEventListener('click', () => {
    if (done) return
    if (gsapRef && tl) {
      tl.kill()
      document.documentElement.classList.add('bi-done')
      gsapRef.to(root, { opacity: 0, duration: 0.55, ease: 'power2.out', onComplete: finish })
    } else quickExit()
  })

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    quickExit(1400)
    return
  }

  loadGsap()
    .then((gsap) => {
      if (done) return
      gsapRef = gsap
      tl = buildTimeline(gsap, root, $, $$, finish)
    })
    .catch(() => quickExit(800))
}

function buildTimeline(gsap, root, $, $$, finish) {
  const surface = $('.bi-surface')
  const tearEdge = $('.bi-tear__edge')
  const tearWhite = $('.bi-tear__white')
  const bean = $('.bi-bean')
  const halfL = $('.bi-bean__half--l')
  const halfR = $('.bi-bean__half--r')
  const frags = $$('.bi-frag')
  const W = () => surface.offsetWidth
  const M = () => Math.min(surface.offsetWidth, surface.offsetHeight)
  const B = () => bean.offsetWidth

  // Tear state, drawn on every update (liquid wobble while open)
  const tear = { half: 0, wobble: 0 }
  const drawTear = () => {
    tearWhite.style.clipPath = tearPolygon(tear.half, tear.wobble)
    tearEdge.style.clipPath = tearPolygon(tear.half > 0 ? tear.half + 0.6 : 0, tear.wobble + 0.4)
  }

  // Ambient light, independent of the timeline
  gsap.to('.bi-light', { xPercent: 5, yPercent: -3, duration: 6, ease: 'sine.inOut', repeat: -1, yoyo: true })
  gsap.fromTo('.bi-sheen', { xPercent: -60 }, { xPercent: 60, duration: 5.5, ease: 'sine.inOut', repeat: -1, repeatDelay: 1.2 })

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: finish })

  // The brown surface is already fully visible on the first frame; it settles very gently.
  const S = -1.0 // the sequence starts 1s earlier because there is no opening reveal any more
  tl.fromTo('.bi-bg', { scale: 1.04 }, { scale: 1, duration: 3.2, ease: 'sine.out' }, 0)

  /* Scene 02 — the logo is drawn by hand, then filled with ink */
  tl.set('.bi-brand', { opacity: 1 }, 2.05 + S)
  const draw = [
    [0, 2.1, 1.25],   // ghost body
    [1, 2.4, 0.6],    // eyes
    [2, 2.55, 0.6],   // mouth
    [3, 2.7, 0.6],    // B
    [4, 2.82, 0.6],   // O
    [5, 2.94, 0.6],   // O
  ].map(([g, at, dur]) => [g, at + S, dur])
  draw.forEach(([g, at, dur]) => {
    tl.fromTo(`.bi-logo__line--${g}`, { strokeDashoffset: 1 },
      { strokeDashoffset: 0, duration: dur, ease: 'power1.inOut' }, at)
  })
  tl.fromTo('.bi-logo__fill', { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'sine.inOut' }, 3.25 + S)
  tl.to('.bi-logo__lines', { opacity: 0, duration: 0.5, ease: 'sine.inOut' }, 3.5 + S)

  // Bean — liquid reveal (circular mask + blur settling)
  tl.fromTo(bean, { clipPath: 'circle(0% at 50% 62%)', scale: 0.72, filter: 'blur(10px)', opacity: 0 },
    { clipPath: 'circle(80% at 50% 50%)', scale: 1, filter: 'blur(0px)', opacity: 1, duration: 1.15, ease: 'expo.out' }, 2.05 + S)

  tl.to('.bi-loader', { opacity: 1, duration: 0.4 }, 2.55 + S)
  tl.fromTo('.bi-loader span', { scaleX: 0 }, { scaleX: 1, duration: 1.05, ease: 'power2.inOut' }, 2.6 + S)

  /* Scene 03 — crack along the groove, organic liquid tear */
  tl.to('.bi-bean__crack path', { strokeDashoffset: 0, duration: 0.3, ease: 'power2.in' }, 3.6 + S)
  tl.to(bean, { scale: 1.05, duration: 0.3, ease: 'power2.in' }, 3.6 + S)

  const T = 3.9 + S
  tl.to(tear, { half: 6, duration: 0.5, ease: 'power4.out', onUpdate: drawTear }, T)
  tl.to(tear, { half: 8, wobble: 2.2, duration: 0.5, ease: 'sine.inOut', onUpdate: drawTear }, T + 0.5)
  tl.to(tear, { half: 60, wobble: 4, duration: 1.1, ease: 'expo.inOut', onUpdate: drawTear }, T + 0.95)

  tl.set(bean, { clipPath: 'none', filter: 'none' }, T)
  tl.to('.bi-bean__crack', { opacity: 0, duration: 0.2 }, T)
  tl.to('.bi-loader', { opacity: 0, duration: 0.35, ease: 'power2.out' }, T)
  tl.to('.bi-brand', { opacity: 0, duration: 0.6, ease: 'power2.in' }, T + 0.7)
  tl.to(halfL, { x: () => -B() * 1.05, rotation: -11, duration: 0.6, ease: 'power3.out' }, T)
  tl.to(halfR, { x: () => B() * 1.05, rotation: 11, duration: 0.6, ease: 'power3.out' }, T)
  tl.to(halfL, { x: () => -W() * 0.56, rotation: -32, opacity: 0, duration: 1.0, ease: 'power3.in' }, T + 1.0)
  tl.to(halfR, { x: () => W() * 0.56, rotation: 32, opacity: 0, duration: 1.0, ease: 'power3.in' }, T + 1.0)

  frags.forEach((el, i) => {
    const r = seeded(100 + i)
    const side = i % 2 ? 1 : -1
    const dx = side * (0.1 + r() * 0.45)
    const dy = (r() - 0.6) * 0.45
    tl.set(el, { opacity: 1 }, T)
    tl.fromTo(el, { x: 0, y: 0, scale: 0.4, rotation: 0 },
      { x: () => M() * dx, y: () => M() * dy, scale: 0.7 + r() * 0.8, rotation: (r() - 0.5) * 540,
        duration: 1.1 + r() * 0.5, ease: 'power2.out' }, T + r() * 0.08)
    tl.to(el, { opacity: 0, duration: 0.5, ease: 'power1.in' }, T + 0.9 + r() * 0.4)
  })

  /* Scene 04 — the whole viewport is pure white; hand over to the existing site */
  const E = T + 2.05
  tl.set(root, { backgroundColor: '#ffffff' }, E)
  tl.set(surface, { visibility: 'hidden' }, E)
  tl.call(() => document.documentElement.classList.add('bi-done'), null, E)
  tl.to(root, { opacity: 0, duration: 0.7, ease: 'power1.inOut' }, E + 0.2)

  return tl
}

Intro()

export default Intro
