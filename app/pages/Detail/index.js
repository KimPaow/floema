import Page from 'classes/Page'

export default class Detail extends Page {
  constructor() {
    super({
      id: 'detail',
      element: '.detail',
      elements: {
        navigation: document.querySelector('.navigation'),
        title: '.about__title',
      },
    })
  }
}
