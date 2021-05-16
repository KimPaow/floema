import { each } from 'lodash'
import About from 'pages/About'
import Collections from 'pages/Collections'
import Detail from 'pages/Detail'
import Home from 'pages/Home'

class App {
  constructor() {
    this.createContent()
    this.createPages()
    this.addLinkListeners()
  }

  createContent() {
    this.content = document.querySelector('.content')
    this.template = this.content.getAttribute('data-template')
  }

  createPages() {
    this.pages = {
      about: new About(),
      detail: new Detail(),
      collections: new Collections(),
      home: new Home(),
    }

    this.page = this.pages[this.template]
    this.page.create()
    this.page.show()
  }

  async onChange(url) {
    await this.page.hide()
    const request = await window.fetch(url) // fetch requested page

    // Thought: could this be a try catch block?
    if (request.status === 200) {
      const html = await request.text()
      const div = document.createElement('div') // create fake div

      div.innerHTML = html // save html response to fake div

      const divContent = div.querySelector('.content') // select new content from fake div

      this.template = divContent.getAttribute('data-template') // update template value

      this.content.setAttribute('data-template', this.template)
      this.content.innerHTML = divContent.innerHTML // apply fake div content to our page

      this.page = this.pages[this.template]
      this.page.create()
      this.page.show()
    } else {
      console.log('error')
    }
  }

  addLinkListeners() {
    const links = document.querySelectorAll('a')

    each(links, (link) => {
      link.onclick = (event) => {
        event.preventDefault()

        const { href } = link

        this.onChange(href)
      }
    })
  }
}

new App()
