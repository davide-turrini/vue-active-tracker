<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

interface Link {
  menu: HTMLAnchorElement,
  hash: string,
  section: HTMLElement
}

@Component
export default class VueTrackActive extends Vue {
  /**
   *
   */
  @Prop({ type: String, default: 'a' }) linkSelector!: string

  /**
   *
   */
  @Prop({ type: String, default: 'is-active' }) activeClass!: string

  /**
   *
   */
  @Prop({ type: String, default: 'top' }) trigger!: string

  /**
   *
   */
  @Prop({ type: Boolean, default: true }) autoStart!: boolean

  /**
   *
   */
  private offset: number = 0

  /**
   *
   */
  private links: Array<Link> = []

  /**
   *
   */
  private lastActiveLink: Link | null = null

  /**
   *
   */
  private get activeClassList () {
    return this.activeClass.split(' ').filter(cl => cl !== '')
  }

  /**
   *
   */
  mounted (): void {
    window.addEventListener('resize', this.setLinks)
    window.addEventListener('scroll', this.checkLinks)
    if (this.autoStart === true) {
      this.update()
    }
  }

  /**
   *
   */
  beforeDestroy (): void {
    window.removeEventListener('resize', this.setLinks)
    window.removeEventListener('scroll', this.checkLinks)
  }

  /**
   *
   */
  private update (): void {
    this.setLinks()
    this.checkLinks()
  }

  /**
   *
   */
  private checkLinks (): void {
    if (
      this.lastActiveLink &&
      this.lastActiveLink.section &&
      this.isInView(this.lastActiveLink.section) === true
    ) {
      return
    }

    for (const link of this.links) {
      this.activeClassList.forEach(cl => link.menu.classList.remove(cl))
    }
    for (const link of this.links) {
      if (
        link.section &&
        this.isInView(link.section) === true
      ) {
        this.activeClassList.forEach(cl => link.menu.classList.add(cl))
        break
      }
    }
  }

  /**
   *
   */
  private setLinks (): void {
    if (this.trigger === 'middle') {
      // is middle
      this.offset = window.innerHeight / 2
    } else if (this.trigger === 'top') {
      // is top
      this.offset = 0
    } else if (this.trigger === 'bottom') {
      // is bottom
      this.offset = window.innerHeight
    } else if (/^\d+(\.\d+)?%$/.test(this.trigger)) {
      // is a percentage
      this.offset = Math.ceil(window.innerHeight * parseFloat(this.trigger) / 100.0)
    } else if (!isNaN(parseFloat(this.trigger))) {
      // is a number
      this.offset = Math.ceil(parseFloat(this.trigger))
    } else {
      this.offset = 0
    }
    this.links = (Array.from(this.$el.querySelectorAll(this.linkSelector))).map((el: Node) => ({
      menu: el as HTMLAnchorElement,
      hash: (el as HTMLAnchorElement).hash,
      section: document.querySelector((el as HTMLAnchorElement).hash)
    } as Link))
  }

  /**
   *
   */
  private isInView (el: HTMLElement): boolean {
    const fromTop = window.scrollY
    if (
      el.offsetTop <= fromTop + this.offset &&
      el.offsetTop + el.offsetHeight > fromTop + this.offset
    ) {
      return true
    }
    return false
  }

  // /**
  //  *
  //  */
  // private setHash (hash: string): void {
  //   if (hash === null) {
  //     history.pushState({}, document.title, window.location.pathname + window.location.search)
  //   } else if (window.history.replaceState) {
  //     window.history.replaceState({}, null, hash)
  //   } else {
  //     window.location.hash = hash
  //   }
  // }
}
</script>

<template>
  <div>
    <slot />
  </div>
</template>
