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