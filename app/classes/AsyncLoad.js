import Component from 'classes/Component'

// Class for loading images as they enter the screen
export default class AsyncLoad extends Component {
  constructor({ element }) {
    super({ element })

    this.createObserver()
  }

  createObserver() {
    this.observer = new window.IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!this.element.src) {
            this.element.src = this.element.getAttribute('data-src')
          }
        }
      })
    })

    this.observer.observe(this.element)
  }
}
