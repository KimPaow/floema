import Component from 'classes/Component'
import GSAP from 'gsap'
import { COLOR_OFF_BLACK, COLOR_OFF_WHITE } from 'utils/colors'

export default class Navigation extends Component {
  constructor({ template }) {
    super({
      element: '.navigation',
      elements: {
        items: '.navigation__list__item',
        links: '.navigation__list__link',
      },
    })

    this.onNavigation(template)
  }

  onNavigation(template) {
    const aboutLink = this.elements.items[0]
    const collectionsLink = this.elements.items[1]

    if (template === 'about') {
      GSAP.to(this.element, {
        color: COLOR_OFF_BLACK,
        duration: 1.5,
      })

      GSAP.to(collectionsLink, {
        autoAlpha: 1,
        duration: 0.75,
        delay: 0.75,
      })

      GSAP.to(aboutLink, {
        autoAlpha: 0,
        duration: 0.75,
      })
    }

    if (template !== 'about') {
      GSAP.to(this.element, {
        color: COLOR_OFF_WHITE,
        duration: 1.5,
      })

      GSAP.to(collectionsLink, {
        autoAlpha: 0,
        duration: 0.75,
      })

      GSAP.to(aboutLink, {
        autoAlpha: 1,
        duration: 0.75,
        delay: 0.75,
      })
    }
  }
}
