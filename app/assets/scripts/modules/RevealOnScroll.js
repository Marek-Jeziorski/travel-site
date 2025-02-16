import { throttle } from 'lodash';
import { debounce } from 'lodash';

class RevealOnScroll {
  constructor(elements, thresholdPercent) {
    this.thresholdPercent = thresholdPercent;
    this.itemsToReveal = elements;
    this.browserHeight = window.innerHeight;
    this.hideInitialy();
    this.scrollTrottle = throttle(this.calcCaller, 200).bind(this);
    this.events();
  }

  events() {
    window.addEventListener('scroll', this.scrollTrottle);
    window.addEventListener(
      'resize',
      debounce(() => {
        console.log('Resize just run');
        this.browserHeight = window.innerHeight;
      }, 333)
    );
  }

  calcCaller() {
    console.log('Scroll function run');
    this.itemsToReveal.forEach((el) => {
      if (el.isRevealed == false) {
        this.calculateIfScrolledTo(el);
      }
    });
  }

  calculateIfScrolledTo(el) {
    if (window.scrollY + this.browserHeight > el.offsetTop) {
      console.log('Element was calculated');
      let scrollPercent =
        (el.getBoundingClientRect().y / this.browserHeight) * 100;
      console.log(scrollPercent);

      if (scrollPercent < this.thresholdPercent) {
        el.classList.add('reveal-item--is-visible');
        el.isRevealed = true;
        if (el.isLastItem) {
          window.removeEventListener('scroll', this.scrollTrottle);
        }
      }
    }
  }

  hideInitialy() {
    this.itemsToReveal.forEach((el) => {
      el.classList.add('reveal-item');
      el.isRevealed = false;
    });

    this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true;
  }
}

export default RevealOnScroll;

// NOTE - każdy ekran ma inną rozdzielczość (wielkość)
// NOTE - ze względu na responsive we need View Port (window.inner)

// NOTE - scrollPercent = jak daleko (w procentach) od górnej krawędzi ViewPorta element został przeskrolowany

// NOTE - 0 do 70% (w dół) , 70% do 0 (w górę)
