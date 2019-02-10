var tabs = document.querySelectorAll('.advantages .tabs li');
    panels = document.querySelectorAll('.advantages .tab-panel'),
    activeTabIndex = 1;

var log = console.log;

Array.prototype.forEach.call(tabs, function(i) {
  i.addEventListener('click', onTabClick);
});

function onTabClick() {
  var $this = this;

  var index = $this.getAttribute('data-index');

  if (index !== activeTabIndex) {
    activeTabIndex = index;
    changeActive(panels, index);
    changeActive(tabs, index);
  }
}

function changeActive(items, index) {
  Array.prototype.forEach.call(items, function(p) {
    p.classList.remove('active');
  });
  items[index - 1].classList.add('active');
}

var portfolioSlider = new Swiper ('.portfolio .swiper-container', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.portfolio .swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.portfolio .swiper-button-next',
    prevEl: '.portfolio .swiper-button-prev',
  }
});

var clientsSlider = new Swiper ('.clients .swiper-container', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.clients .swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.clients .swiper-button-next',
    prevEl: '.clients .swiper-button-prev',
  }
});