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
    this.elements.link.addEventListener('click', () => console.log('click'))
  }
}
