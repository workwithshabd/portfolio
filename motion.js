import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const menu = document.querySelector('.menu');
menu.addEventListener('click', event => {
  if (event.target.closest('a')) menu.open = false;
});
document.addEventListener('click', event => {
  if (!menu.contains(event.target)) menu.open = false;
});
menu.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.open) {
    menu.open = false;
    menu.querySelector('summary').focus();
  }
});

gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
  if (!location.hash && window.scrollY < 100) {
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from('.line', { scaleX: 0, duration: 0.65, clearProps: 'transform' }, 0)
      .from('.title-line', { yPercent: 108, duration: 0.8, stagger: 0.11, clearProps: 'transform' }, 0.04)
      .from('.place', { y: 8, opacity: 0, duration: 0.45, clearProps: 'transform,opacity' }, 0.34);
  }

  for (const item of gsap.utils.toArray('.reveal')) {
    if (item.getBoundingClientRect().top < innerHeight) continue;
    gsap.from(item, {
      y: 18, opacity: 0, duration: 0.65, ease: 'power2.out', clearProps: 'transform,opacity',
      scrollTrigger: { trigger: item, start: 'top 95%', once: true },
    });
  }

  const projectNote = document.querySelector('.project-note');
  const refreshLayout = () => ScrollTrigger.refresh();
  projectNote.addEventListener('toggle', refreshLayout);
  return () => projectNote.removeEventListener('toggle', refreshLayout);
});
