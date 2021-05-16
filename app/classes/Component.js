import EventEmitter from 'events'
import each from 'lodash/each'

export default class Component extends EventEmitter {
  constructor({ element, elements = {} }) {
    // need to call 'super' to access extended class
    // 'super' initializes constructor of parent class
    super()

    this.selector = element
    this.selectorChildren = {
      ...elements,
    }

    this.create()
    this.addEventListeners()
  }

  // other Components inherit the Component class, thus making
  // these methods available on Component.create() etc
  create() {
    if (this.selector instanceof window.HTMLElement) {
      this.element = this.selector
    } else {
      this.element = document.querySelector(this.selector)
    }
    this.elements = {}

    // for each element or selector passed, return element to inheritor
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
        // console.log(this.elements[key], value)
      }
    })
  }

  addEventListeners() {}

  removeEventListeners() {}
}
