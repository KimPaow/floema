import Canvas from 'components/Canvas'
import Navigation from 'components/Navigation'
import Preloader from 'components/Preloader'
import { each } from 'lodash'
import About from 'pages/About'
import Collections from 'pages/Collections'
import Detail from 'pages/Detail'
import Home from 'pages/Home'

class App {
  constructor() {
    this.createContent()
    this.createNavigation()
    this.createPreloader()
    this.createCanvas()
    this.createPages()

    this.addLinkListeners()
    this.addEventListeners()

    this.update()
  }

  /**
   * Creation
   */
  createNavigation() {
    this.navigation = new Navigation({
      template: this.template,
    })
  }

  createPreloader() {
    this.preloader = new Preloader()
    this.preloader.once('completed', this.onPreloaded.bind(this))
  }

  createCanvas() {
    this.canvas = new Canvas()
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
  }

  /**
   * Animation loop
   */
  update() {
    if (this.canvas && this.canvas.update) {
      // console.log('update canvas')
      this.canvas.update()
    }
    // start a separate animation loop for pages, if one exists
    if (this.page && this.page.update) {
      this.page.update()
    }
    this.frame = window.requestAnimationFrame(this.update.bind(this))
  }

  /**
   * Events
   */
  onPreloaded() {
    this.preloader.destroy()
    this.onResize()
    this.page.show()
  }

  async onNavigation({ url, push = true }) {
    await this.page.hide() // hide current page
    const request = await window.fetch(url) // fetch requested page

    if (request.status === 200) {
      const html = await request.text()
      const div = document.createElement('div') // create fake div

      if (push) {
        window.history.pushState({}, '', url)
      }

      div.innerHTML = html // save html response to fake div

      const divContent = div.querySelector('.content') // select new content from fake div

      this.template = divContent.getAttribute('data-template') // update template value
      this.background = divContent.getAttribute('data-background')
      this.color = divContent.getAttribute('data-color')

      this.navigation.onNavigation(this.template)

      this.content.setAttribute('data-template', this.template)
      this.content.innerHTML = divContent.innerHTML // apply fake div content to our page

      this.page = this.pages[this.template]
      this.page.create()

      this.onResize()

      this.page.show()

      this.addLinkListeners()
    } else {
      console.log('error')
    }
  }

  onPopState() {
    this.onNavigation({ url: window.location.pathname, push: false })
  }

  onResize() {
    if (this.canvas && this.canvas.onResize) {
      this.canvas.onResize()
    }
    if (this.page && this.page.onResize) {
      this.page.onResize()
    }
  }

  /**
   * Listeners
   */
  addEventListeners() {
    window.addEventListener('popstate', this.onPopState.bind(this))
    window.addEventListener('resize', this.onResize.bind(this))
  }

  addLinkListeners() {
    const links = document.querySelectorAll('a')

    each(links, (link) => {
      link.onclick = (event) => {
        event.preventDefault()

        const { href } = link

        this.onNavigation({ url: href })
      }
    })
  }
}

new App()
