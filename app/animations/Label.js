import Animation from 'classes/Animation'
import GSAP from 'gsap'
import each from 'lodash/each'
import { split } from 'utils/text'
import { calculate } from '../utils/text'

export default class Label extends Animation {
  constructor({ element, elements }) {
    super({ element, elements })

    split({ element: this.element, append: true })
    split({ element: this.element, append: true })

    this.elementLineSpans = this.element.querySelectorAll('span span')
  }

  animateIn() {
    this.timelineIn = GSAP.timeline({ delay: 0.5 })

    this.timelineIn.set(this.element, { autoAlpha: 1 })

    each(this.elementLines, (line, index) => {
      this.timelineIn.fromTo(
        line,
        { y: '100%' },
        {
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
