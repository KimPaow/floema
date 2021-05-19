import Button from 'classes/Button'
import Page from 'classes/Page'
export default class Home extends Page {
  constructor() {
    super({
      id: 'home',
      element: '.home',
      elements: {
        navigation: document.querySelector('.navigation'),
        link: '.home__link',
      },
    })
  }

  create() {
    // you have to invoke 'super' or our local 'create' method will override inherited one
    // local 'create' contains all the things from inherited one, and you can add additional code
    super.create()

    this.link = new Button({
      element: this.elements.link,
    })
  }

  destroy() {
    super.destroy()
    this.link.removeEventListeners()
  }
}
