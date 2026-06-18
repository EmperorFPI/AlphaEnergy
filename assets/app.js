// Alpha Energy — shared site script
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
  }
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
