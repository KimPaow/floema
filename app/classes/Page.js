import Highlight from 'animations/Highlight'
import Label from 'animations/Label'
import Paragraph from 'animations/Paragraph'
import Title from 'animations/Title'
import AsyncLoad from 'classes/AsyncLoad'
import { ColorManager } from 'classes/Colors'
import GSAP from 'gsap'
import each from 'lodash/each'
import map from 'lodash/map'
import NormalizeWheel from 'normalize-wheel'
import Prefix from 'prefix'

export default class Page {
  constructor({ element, elements = {}, id }) {
    this.selector = element
    // selectorChildren gets saved to this.elements in create() below
    this.selectorChildren = {
      ...elements,

      animationTitles: '[data-animation="title"]',
      animationParagraphs: '[data-animation="paragraph"]',
      animationLabel: '[data-animation="label"]',
      animationHighlights: '[data-animation="highlight"]',

      preloaders: '[data-src]',
    }
    this.id = id
    this.transformPrefix = Prefix('transform')

    this.onMouseWheelEvent = this.onMouseWheel.bind(this)
  }

  // other pages inherit the Page class, thus making these methods available on page.create() etc
  create() {
    this.element = document.querySelector(this.selector)
    this.elements = {}

    this.scroll = {
      current: 0,
      target: 0,
      last: 0,
      limit: 1000,
    }

    each(this.selectorChildren, (value, key) => {
      if (
        value instanceof window.HTMLElement ||
        value instanceof window.NodeList ||
        Array.isArray(value)
      ) {
        // if value is already an actual element or array of any type, save it as is
        this.elements[key] = value
      } else {
        // if value is a selector, get the element and save that
        this.elements[key] = document.querySelectorAll(value)

        if (this.elements[key].length === 0) {
          this.elements[key] = null
        } else if (this.elements[key].length === 1) {
          this.elements[key] = document.querySelector(value)
        }
      }
    })

    this.createAnimations()
    this.createAsyncLoad()
  }

  createAnimations() {
    this.animations = []

    // Titles
    this.animationTitles = map(this.elements.animationTitles, (element) => {
      return new Title({
        element,
      })
    })

    // Paragraphs
    this.animationParagraphs = map(this.elements.animationParagraphs, (element) => {
      return new Paragraph({
        element,
      })
    })

    // Labels
    this.animationLabels = map(this.elements.animationLabels, (element) => {
      return new Label({
        element,
      })
    })

    // Highlights
    this.animationHighlights = map(this.elements.animationHighlights, (element) => {
      return new Highlight({
        element,
      })
    })

    this.animations.push(
      ...this.animationTitles,
      ...this.animationParagraphs,
      ...this.animationLabels,
      ...this.animationHighlights
    )
  }

  createAsyncLoad() {
    each(this.elements.preloaders, (element) => {
      return new AsyncLoad({ element })
    })
  }

  /**
   * Animations
   */
  show() {
    return new Promise((resolve) => {
      ColorManager.change({
        backgroundColor: this.element.getAttribute('data-background'),
        color: this.element.getAttribute('data-color'),
      })

      this.animationIn = GSAP.timeline()

      this.animationIn.fromTo(
        this.element,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          duration: 1.5,
          ease: 'expo.out',
        }
      )

      this.animationIn.call(() => {
        this.addEventListeners()
        resolve()
      })
    })
  }

  hide() {
    return new Promise((resolve) => {
      this.destroy()

      this.animationOut = GSAP.timeline()

      this.animationOut.to(this.element, {
        autoAlpha: 0,
        onComplete: resolve,
      })
    })
  }

  /**
   * Events
   */
  onMouseWheel(event) {
    const { pixelY } = NormalizeWheel(event)
    this.scroll.target += pixelY
  }

  onResize() {
    if (this.elements.wrapper) {
      // limit the max Y scroll value
      this.scroll.limit = this.elements.wrapper.clientHeight - window.innerHeight
    }

    each(this.animations, (animation) => animation.onResize())
  }

  /**
   * Loop
   */
  update() {
    // limit the scrollable amount
    this.scroll.target = GSAP.utils.clamp(0, this.scroll.limit, this.scroll.target)

    // since javascript is bad at handling small numbers
    if (this.scroll.current < 0.01) {
      this.scroll.current = 0
    }

    // smooth lerped scroll
    this.scroll.current = GSAP.utils.interpolate(this.scroll.current, this.scroll.target, 0.1)

    if (this.elements.wrapper) {
      this.elements.wrapper.style[this.transformPrefix] = `translateY(-${this.scroll.current}px)`
    }
  }

  /**
   * Listeners
   */
  addEventListeners() {
    window.addEventListener('mousewheel', this.onMouseWheelEvent)
  }

  removeEventListeners() {
    window.removeEventListener('mousewheel', this.onMouseWheelEvent)
  }

  /**
   * Destroy
   */
  destroy() {
    this.removeEventListeners()
  }
}
