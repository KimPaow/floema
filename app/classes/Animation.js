import Component from 'classes/Component'

export default class Animation extends Component {
  constructor({ element, elements }) {
    super({ element, elements })
    this.element = element
    this.elements = elements
    this.createObserver()
  }

  // observe when elements are in the viewport
  createObserver() {
    this.observer = new window.IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animateIn()
        } else {
          this.animateOut()
        }
      })
    })

    this.observer.observe(this.element)
  }

  // intentional fallbacks
  animateIn() {}

  animateOut() {}

  onResize() {}
}
