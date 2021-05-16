import Animation from 'classes/Animation'
import GSAP from 'gsap'
import each from 'lodash/each'
import { calculate, split } from 'utils/text'

export default class Paragraph extends Animation {
  constructor({ element, elements }) {
    super({ element, elements })

    this.elementLineSpans = split({ element: this.element, append: true })
  }

  animateIn() {
    this.timelineIn = GSAP.timeline({ delay: 0.5 })

    this.timelineIn.set(this.element, { autoAlpha: 1 })

    each(this.elementLines, (line, index) => {
      this.timelineIn.fromTo(
        line,
        { autoAlpha: 0, y: '100%' },
        {
          autoAlpha: 1,
          delay: index * 0.2,
          duration: 1.5,
          ease: 'expo.out',
          y: '0%',
        },
        0
      )
    })
  }

  animateOut() {
    /**
     * When animating out, you dont need easings our duration etc.
     * Since the element is already out of the viewport you just want to hide
     * it as efficiently as possible
     */
    GSAP.set(this.element, {
      autoAlpha: 0,
    })
  }

  onResize() {
    this.elementLines = calculate(this.elementLineSpans)
  }
}
