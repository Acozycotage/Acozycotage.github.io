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

var now = new Date();
function createtime() {
  // 当前时间
  now.setTime(now.getTime() + 1000);
  var start = new Date("11/25/2022 00:00:00"); // 旅行者1号开始计算的时间
  var dis = Math.trunc(23400000000 + ((now - start) / 1000) * 17); // 距离=秒数*速度 记住转换毫秒
  var unit = (dis / 149600000).toFixed(6);  // 天文单位
  var grt = new Date("11/25/2022 00:00:00");	// 网站诞生时间
  var days = (now - grt) / 1e3 / 60 / 60 / 24,
    dnum = Math.floor(days),
    hours = (now - grt) / 1e3 / 60 / 60 - 24 * dnum,
    hnum = Math.floor(hours);
  1 == String(hnum).length && (hnum = "0" + hnum);
  var minutes = (now - grt) / 1e3 / 60 - 1440 * dnum - 60 * hnum,
    mnum = Math.floor(minutes);
  1 == String(mnum).length && (mnum = "0" + mnum);
  var seconds = (now - grt) / 1e3 - 86400 * dnum - 3600 * hnum - 60 * mnum,
    snum = Math.round(seconds);
  1 == String(snum).length && (snum = "0" + snum);
  let currentTimeHtml = "";
  (currentTimeHtml =
    hnum < 18 && hnum >= 9
    ? `<img class='boardsign' src='https://sourcebucket.s3.ladydaily.com/badge/F小屋-科研摸鱼中.svg' title='什么时候能够实现财富自由呀~'><br> <div style="font-size:13px;font-weight:bold">本站居然运行了 ${dnum} 天 ${hnum} 小时 ${mnum} 分 ${snum} 秒 <i id="heartbeat" class='fas fa-heartbeat'></i> <br> 旅行者 1 号当前距离地球 ${dis} 千米，约为 ${unit} 个天文单位 🚀</div>`
    : `<img class='boardsign' src='https://sourcebucket.s3.ladydaily.com/badge/F小屋-下班休息啦.svg' title='下班了就该开开心心地玩耍~'><br> <div style="font-size:13px;font-weight:bold">本站居然运行了 ${dnum} 天 ${hnum} 小时 ${mnum} 分 ${snum} 秒 <i id="heartbeat" class='fas fa-heartbeat'></i> <br> 旅行者 1 号当前距离地球 ${dis} 千米，约为 ${unit} 个天文单位 🚀</div>`),
    document.getElementById("workboard") &&
    (document.getElementById("workboard").innerHTML = currentTimeHtml);
}
// 设置重复执行函数，周期1000ms
// setInterval(() => {
//   createtime();
// }, 1000);


