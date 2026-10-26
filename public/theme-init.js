(function () {
  try {
    var t = localStorage.getItem('7pm-theme')
    var m = t === 'light' || t === 'dark' ? t : 'dark'
    var d = document.documentElement
    d.classList.remove('light', 'dark')
    d.classList.add(m)
    d.style.colorScheme = m
  }
  catch (e) {
    document.documentElement.classList.add('dark')
  }
})()
