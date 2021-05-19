import Component from 'classes/Component'
import GSAP from 'gsap'

export default class Button extends Component {
  constructor({ element }) {
    super({ element })
    this.path = element.querySelector('path:last-child')
    this.timeline = GSAP.timeline({ paused: true })
    this.pathLength = this.path.getTotalLength()
    console.log(this.pathLength)

    this.timeline.fromTo(
      this.path,
      {
        strokeDashoffset: this.pathLength,
        strokeDasharray: `${this.pathLength} ${this.pathLength}`,
      },
      {
        strokeDashoffset: 0,
        strokeDasharray: `${this.pathLength} ${this.pathLength}`,
        duration: 0.5,
      }
    )
  }

  onMouseEnter() {
    console.log('enter')
    this.timeline.play()
  }

  onMouseLeave() {
    console.log('leave')
    this.timeline.reverse()
  }

  addEventListeners() {
    // this.onMouseEnterEvent = this.onMouseEnter.bind(this)
    // this.onMouseLeaveEvent = this.onMouseLeave.bind(this)
    this.element.addEventListener('mouseenter', this.onMouseEnter.bind(this))
    this.element.addEventListener('mouseleave', this.onMouseLeave.bind(this))
  }
  removeEventListeners() {
    this.element.removeEventListener('mouseenter', this.onMouse)
    this.element.removeEventListener('mouseleave', this.onMouseLeave)
  }
}
