import Button from 'classes/Button'
import Page from 'classes/Page'

export default class Detail extends Page {
  constructor() {
    super({
      id: 'detail',
      element: '.detail',
      elements: {
        navigation: document.querySelector('.navigation'),
        title: '.about__title',
        button: '.detail__button',
      },
    })
  }

  create() {
    // you have to invoke 'super' or our local 'create' method will override inherited one
    // local 'create' contains all the things from inherited one, and you can add additional code
    super.create()

    this.link = new Button({
      element: this.elements.button,
    })
  }

  destroy() {
    super.destroy()
    this.link.removeEventListeners()
  }
}
