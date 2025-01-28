class RevealOnScroll {
  constructor() {
    this.itemsToReveal = document.querySelectorAll('.feature-item');
    this.hideInitialy();
    this.events();
  }

  events() {
    window.addEventListener('scroll', () => {
      this.itemsToReveal.forEach((el) => {
        this.calculateIfScrolledTo(el);
      });
    });
  }

  calculateIfScrolledTo(el) {
    let scrollPercent =
      (el.getBoundingClientRect().y / window.innerHeight) * 100;
    console.log(scrollPercent);

    if (scrollPercent < 75) {
      el.classList.add('reveal-item--is-visible');
    }
  }

  hideInitialy() {
    this.itemsToReveal.forEach((el) => el.classList.add('reveal-item'));
  }
}

export default RevealOnScroll;

// NOTE - każdy ekran ma inną rozdzielczość (wielkość)
// NOTE - ze względu na responsive we need View Port (window.inner)

// NOTE - scrollPercent = jak daleko (w procentach) od górnej krawędzi ViewPorta element został przeskrolowany

// NOTE - 0 do 70% (w dół) , 70% do 0 (w górę)
