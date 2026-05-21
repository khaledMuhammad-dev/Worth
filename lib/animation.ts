import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

export const reducedMotion = prefersReducedMotion();

export const fadeUp = (el: Element | string, delay = 0) => {
  if (prefersReducedMotion()) return;

  return gsap.fromTo(
    el,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      delay,
      ease: 'power3.out',
      scrollTrigger: { trigger: el as string, start: 'top 85%' },
    }
  );
};

export const staggerFadeUp = (parent: string, children: string, stagger = 0.12) => {
  if (prefersReducedMotion()) return;

  return gsap.fromTo(
    `${parent} ${children}`,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.65,
      stagger,
      ease: 'power3.out',
      scrollTrigger: { trigger: parent, start: 'top 80%' },
    }
  );
};
