function whenDOMReady() {
  percent()
  setPageTitle()
}
window.onload = () => { document.querySelector('#nav #menus').style.width = document.querySelector('#nav .menus_items').offsetWidth + 'px' }
whenDOMReady()
document.addEventListener("pjax:complete", whenDOMReady)
document.addEventListener("pjax:complete", () => { document.querySelector('#nav #menus').style.width = document.querySelector('#nav .menus_items').offsetWidth + 'px' })

window.onscroll = percent;
function percent() {
  let a = document.documentElement.scrollTop || window.pageYOffset, // 卷去高度
    b = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight) - document.documentElement.clientHeight, // 整个网页高度
    result = Math.round(a / b * 100), // 计算百分比
    btn = document.querySelector("#percent") // 获取按钮

  if (result <= 5) {
    btn.children[1].innerHTML = "Top"
  } else if (result <= 95) {
    btn.children[1].innerHTML = result
  } else {
    btn.children[1].innerHTML = "End"
  }
}

function settingPanelClick() {
  document.getElementById('setting-panel').classList.toggle('panel-show')
}

function setPageTitle() {
  document.querySelector('.roll-name-content a').innerHTML = document.title.replace(/\|(.*)/g, '')
  if (document.getElementById('post-comment')) document.querySelector('#nav #to-comment').style.display = 'flex'
}

function changeMusicList(num) {
  document.querySelector('.music-box').style.transform = `translate(-${((document.querySelector('.panel-content-2').offsetWidth + 10) * num)}px)`
}