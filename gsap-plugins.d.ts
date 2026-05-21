import type { gsap } from 'gsap';

declare module 'gsap/SplitText' {
  export class SplitText {
    chars: Element[];
    words: Element[];
    lines: Element[];
    constructor(targets: gsap.DOMTarget, vars?: Record<string, unknown>);
    revert(): void;
  }
}

declare module 'gsap/DrawSVGPlugin' {
  export const DrawSVGPlugin: object;
}

declare module 'gsap/MorphSVGPlugin' {
  export const MorphSVGPlugin: object;
}
