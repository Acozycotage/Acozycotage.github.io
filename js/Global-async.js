// 黑夜白天切换动画
function switchNightMode() {
    document.querySelector('body').insertAdjacentHTML('beforeend', '<div class="Cuteen_DarkSky"><div class="Cuteen_DarkPlanet"><div id="sun"></div><div id="moon"></div></div></div>'),
        setTimeout(function () {
            document.querySelector('body').classList.contains('DarkMode') ? (document.querySelector('body').classList.remove('DarkMode'), localStorage.setItem('isDark', '0'), document.getElementById('modeicon').setAttribute('xlink:href', '#icon-moon')) : (document.querySelector('body').classList.add('DarkMode'), localStorage.setItem('isDark', '1'), document.getElementById('modeicon').setAttribute('xlink:href', '#icon-sun')),
                setTimeout(function () {
                    document.getElementsByClassName('Cuteen_DarkSky')[0].style.transition = 'opacity 3s';
                    document.getElementsByClassName('Cuteen_DarkSky')[0].style.opacity = '0';
                    setTimeout(function () {
                        document.getElementsByClassName('Cuteen_DarkSky')[0].remove();
                    }, 1e3);
                }, 2e3)
        })
    const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
    if (nowMode === 'light') {
        // 先设置太阳月亮透明度
        document.getElementById("sun").style.opacity = "1";
        document.getElementById("moon").style.opacity = "0";
        setTimeout(function () {
            document.getElementById("sun").style.opacity = "0";
            document.getElementById("moon").style.opacity = "1";
        }, 1000);

        activateDarkMode()
        saveToLocal.set('theme', 'dark', 2)
        // GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)
        document.getElementById('modeicon').setAttribute('xlink:href', '#icon-sun')
        // 延时弹窗提醒
        setTimeout(() => {
            new Vue({
                data: function () {
                    this.$notify({
                        title: "关灯啦🌙",
                        message: "当前已成功切换至夜间模式！",
                        position: 'top-left',
                        offset: 50,
                        showClose: true,
                        type: "success",
                        duration: 5000
                    });
                }
            })
        }, 2000)
    } else {
        // 先设置太阳月亮透明度
        document.getElementById("sun").style.opacity = "0";
        document.getElementById("moon").style.opacity = "1";
        setTimeout(function () {
            document.getElementById("sun").style.opacity = "1";
            document.getElementById("moon").style.opacity = "0";
        }, 1000);
        
        activateLightMode()
        saveToLocal.set('theme', 'light', 2)
        document.querySelector('body').classList.add('DarkMode'), document.getElementById('modeicon').setAttribute('xlink:href', '#icon-moon')
        setTimeout(() => {
            new Vue({
                data: function () {
                    this.$notify({
                        title: "开灯啦🌞",
                        message: "当前已成功切换至白天模式！",
                        position: 'top-left',
                        offset: 50,
                        showClose: true,
                        type: "success",
                        duration: 5000
                    });
                }
            })
        }, 2000)
    }
    // handle some cases
    typeof utterancesTheme === 'function' && utterancesTheme()
    typeof FB === 'object' && window.loadFBComment()
    window.DISQUS && document.getElementById('disqus_thread').children.length && setTimeout(() => window.disqusReset(), 200)
}

// 新年卡片
let newYearTimer = null;
var newYear = () => {
    clearTimeout(newYearTimer);
    if (!document.querySelector('#newYear')) return;
    // 新年时间戳 and 星期对象
    let newYear = new Date('2023-01-22 00:00:00').getTime() / 1000,
        week = { 0: '周日', 1: '周一', 2: '周二', 3: '周三', 4: '周四', 5: '周五', 6: '周六' }

    time();

    // 补零函数
    function nol(h) { return h > 9 ? h : '0' + h; };

    function time() {
        // 现在 时间对象
        let now = new Date();

        // 右下角 今天
        document.querySelector('#newYear .today').innerHTML = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' ' + week[now.getDay()]

        // 现在与新年相差秒数
        let second = newYear - Math.round(now.getTime() / 1000);

        // 小于0则表示已经过年
        if (second < 0) {
            document.querySelector('#newYear .title').innerHTML = 'Happy New Year!';
            document.querySelector('#newYear .newYear-time').innerHTML = '<span class="happyNewYear">新年快乐</span>';
        } else {
            // 大于0则还未过年
            document.querySelector('#newYear .title').innerHTML = '距离2023年春节：'

            // 大于一天则直接渲染天数
            if (second > 86400) {
                document.querySelector('#newYear .newYear-time').innerHTML = `<span class="day">${Math.ceil(second / 86400)}<span class="unit">天</span></span>`
            } else {
                // 小于一天则使用时分秒计时。
                let h = nol(parseInt(second / 3600));
                second %= 3600;
                let m = nol(parseInt(second / 60));
                second %= 60;
                let s = nol(second);
                document.querySelector('#newYear .newYear-time').innerHTML = `<span class="time">${h}:${m}:${s}</span></span>`;
                // 计时
                newYearTimer = setTimeout(time, 1000);
            }
        }
    }

    // 元宝飘落
    jQuery(document).ready(function($) {
        $('#newYear').wpSuperSnow({
            flakes: ['https://lskypro.acozycotage.net/LightPicture/2023/01/422ec05c4910783f.webp', 'https://lskypro.acozycotage.net/LightPicture/2023/01/9fa7569281c7bdf3.webp', 'https://lskypro.acozycotage.net/LightPicture/2023/01/4155f6d134e5e85f.webp'],
            totalFlakes: '100',
            zIndex: '999999',
            maxSize: '30',
            maxDuration: '20',
            useFlakeTrans: false
        });
    });
}
newYear();

// 快速添加友链
var leonus = {    
    linkCom: e => {
        var t = document.querySelector(".el-textarea__inner");
        "bf" == e ? (t.value = "```yml\n", t.value += "- name: \n  link: \n  avatar: \n  descr: \n  rss: ", t.value += "\n```", t.setSelectionRange(15, 15)) : (t.value = "站点名称：\n站点地址：\n头像链接：\n站点描述：\nRSS地址：", t.setSelectionRange(5, 5)), t.focus()
    },
    owoBig: () => {
        if (!document.getElementById("post-comment") || document.body.clientWidth < 768) return;
        let e = 1,
            t = "",
            o = document.createElement("div"),
            n = document.querySelector("body");
        o.id = "owo-big", n.appendChild(o), new MutationObserver((l => {
            for (let a = 0; a < l.length; a++) {
                let i = l[a].addedNodes,
                    s = "";
                if (2 == i.length && "OwO-body" == i[1].className) s = i[1];
                else {
                    if (1 != i.length || "tk-comment" != i[0].className) continue;
                    s = i[0]
                }
                s.onmouseover = l => {
                    e && ("OwO-body" == s.className && "IMG" == l.target.tagName || "tk-owo-emotion" == l.target.className) && (e = 0, t = setTimeout((() => {
                        let e = 3 * l.path[0].clientHeight,
                            t = 3 * l.path[0].clientWidth,
                            a = l.x - l.offsetX - (t - l.path[0].clientWidth) / 2,
                            i = l.y - l.offsetY;
                        a + t > n.clientWidth && (a -= a + t - n.clientWidth + 10), a < 0 && (a = 10), o.style.cssText = `display:flex; height:${e}px; width:${t}px; left:${a}px; top:${i}px;`, o.innerHTML = `<img src="${l.target.src}">`
                    }), 300))
                }, s.onmouseout = () => {
                    o.style.display = "none", e = 1, clearTimeout(t)
                }
            }
        })).observe(document.getElementById("post-comment"), {
            subtree: !0,
            childList: !0
        })
    },
};

// 帧率检测
if (window.localStorage.getItem("fpson") == undefined || window.localStorage.getItem("fpson") == "1") {
    var rAF = function () {
        return (
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            }
        );
    }();
    var frame = 0;
    var allFrameCount = 0;
    var lastTime = Date.now();
    var lastFameTime = Date.now();
    var loop = function () {
        var now = Date.now();
        var fs = (now - lastFameTime);
        var fps = Math.round(1000 / fs);

        lastFameTime = now;
        // 不置 0，在动画的开头及结尾记录此值的差值算出 FPS
        allFrameCount++;
        frame++;

        if (now > 1000 + lastTime) {
            var fps = Math.round((frame * 1000) / (now - lastTime));
            if (fps <= 5) {
                var kd = `<span style="color:#bd0000">卡成ppt🤢</span>`
            } else if (fps <= 15) {
                var kd = `<span style="color:red">电竞级帧率😖</span>`
            } else if (fps <= 25) {
                var kd = `<span style="color:orange">有点难受😨</span>`
            } else if (fps < 35) {
                var kd = `<span style="color:#9338e6">不太流畅🙄</span>`
            } else if (fps <= 45) {
                var kd = `<span style="color:#08b7e4">还不错哦😁</span>`
            } else {
                var kd = `<span style="color:#39c5bb">十分流畅🤣</span>`
            }
            document.getElementById("fps").innerHTML = `FPS:${fps} ${kd}`;
            frame = 0;
            lastTime = now;
        };

        rAF(loop);
    }

    loop();
} else {
    document.getElementById("fps").style = "display:none!important"
}

//动态标题
var OriginTitile = document.title;
var titleTime;
document.addEventListener('visibilitychange', function () {
  if (document.hidden) {
    //离开当前页面时标签显示内容
    document.title = '👀跑哪里去了~';
    clearTimeout(titleTime);
  } else {
    //返回当前页面时标签显示内容
    document.title = '🐖抓到你啦～';
    //两秒后变回正常标题
    titleTime = setTimeout(function () {
      document.title = OriginTitile;
    }, 2000);
  }
});

// 站点统计图
var start_date = '20210101' // 开始日期
var date = new Date();
var end_date = '' + date.getFullYear() + (date.getMonth() > 8 ? (date.getMonth() + 1) : ("0" + (date.getMonth() + 1))) + (date.getDate() > 9 ? date.getDate() : ("0" + date.getDate())); // 结束日期
var access_token = '121.356c19cfcea486817d3139571693afba.YQj8iNa2nM0zZlLFaIq306ifAe6nMVJAjYQrbBn.BzA2TQ' // accessToken
var site_id = '18685912' // 网址 id
var dataUrl = 'https://openapi.baidu.com/rest/2.0/tongji/config/getSiteList?access_token=121.356c19cfcea486817d3139571693afba.YQj8iNa2nM0zZlLFaIq306ifAe6nMVJAjYQrbBn.BzA2TQ' + access_token + '&site_id=18685912' + site_id
// 这里为了统一颜色选取的是“明暗模式”下的两种字体颜色，也可以自己定义
var color = document.documentElement.getAttribute('data-theme') === 'light' ? '#4c4948' : 'rgba(255,255,255,0.7)'

// 访问地图
function mapChart () {
  let script = document.createElement("script")
  // let paramUrl = '&start_date=' + start_date + '&end_date=' + end_date + '&metrics=' + metrics + '&method=visit/district/a'; // 更换请求地址
  let paramUrl = '&start_date=' + start_date + '&end_date=' + end_date + '&metrics=' + metrics + '&method=overview/getDistrictRpt';
  fetch(dataUrl + paramUrl).then(data => data.json()).then(data => {
    let mapName = data.result.items[0]
    let mapValue = data.result.items[1]
    let mapArr = []
    let max = mapValue[0][0]
    for (let i = 0; i < mapName.length; i++) {
      // mapArr.push({ name: mapName[i][0].name, value: mapValue[i][0] })
      mapArr.push({ name: mapName[i][0], value: mapValue[i][0] })
    }
    let mapArrJson = JSON.stringify(mapArr)
    script.innerHTML = `
      var mapChart = echarts.init(document.getElementById('map-chart'), 'light');
      var mapOption = {
        title: {
          text: '博客访问来源地图',
          x: 'center',
          textStyle: {
            color: '${color}'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        visualMap: {
          min: 0,
          max: ${max},
          left: 'left',
          top: 'bottom',
          text: ['高','低'],
          color: ['#37a2da', '#92d0f9'],
          textStyle: {
            color: '${color}'
          },
          calculable: true
        },
        series: [{
          name: '${metricsName}',
          type: 'map',
          mapType: 'china',
          showLegendSymbol: false,
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: true,
              color: '#617282'
            }
          },
          itemStyle: {
            normal: {
              areaColor: 'rgb(230, 232, 234)',
              borderColor: 'rgb(255, 255, 255)',
              borderWidth: 1
            },
            emphasis: {
              areaColor: 'gold'
            }
          },
          data: ${mapArrJson}
        }]
      };
      mapChart.setOption(mapOption);
      window.addEventListener("resize", () => { 
        mapChart.resize();
      });`
    document.getElementById('map-chart').after(script);
  }).catch(function (error) {
    console.log(error);
  });
}

// 访问趋势
function trendsChart () {
  let script = document.createElement("script")
  let paramUrl = '&start_date=' + start_date + '&end_date=' + end_date + '&metrics=' + metrics + '&method=trend/time/a&gran=month'
  fetch(dataUrl + paramUrl).then(data => data.json()).then(data => {
    let monthArr = []
    let monthValueArr = []
    let monthName = data.result.items[0]
    let monthValue = data.result.items[1]
    for (let i = monthName.length - 1; i >= 0; i--) {
      monthArr.push(monthName[i][0].substring(0, 7).replace('/', '-'))
      monthValueArr.push(monthValue[i][0] !== '--' ? monthValue[i][0] : 0)
    }
    let monthArrJson = JSON.stringify(monthArr)
    let monthValueArrJson = JSON.stringify(monthValueArr)
    script.innerHTML = `
      var trendsChart = echarts.init(document.getElementById('trends-chart'), 'light');
      var trendsOption = {
        title: {
          text: '博客访问统计图',
          x: 'center',
          textStyle: {
            color: '${color}'
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          name: '日期',
          type: 'category',
          boundaryGap: false,
          nameTextStyle: {
            color: '${color}'
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            color: '${color}'
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '${color}'
            }
          },
          data: ${monthArrJson}
        },
        yAxis: {
          name: '${metricsName}',
          type: 'value',
          nameTextStyle: {
            color: '${color}'
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            color: '${color}'
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '${color}'
            }
          }
        },
        series: [{
          name: '${metricsName}',
          type: 'line',
          smooth: true,
          lineStyle: {
              width: 0
          },
          showSymbol: false,
          itemStyle: {
            opacity: 1,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(128, 255, 165)'
            },
            {
              offset: 1,
              color: 'rgba(1, 191, 236)'
            }])
          },
          areaStyle: {
            opacity: 1,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(128, 255, 165)'
            }, {
              offset: 1,
              color: 'rgba(1, 191, 236)'
            }])
          },
          data: ${monthValueArrJson},
          markLine: {
            data: [{
              name: '平均值',
              type: 'average',
              label: {
                color: '${color}'
              }
            }]
          }
        }]
      };
      trendsChart.setOption(trendsOption);
      window.addEventListener("resize", () => { 
        trendsChart.resize();
      });`
    document.getElementById('trends-chart').after(script);
  }).catch(function (error) {
    console.log(error);
  });
}

// 访问来源
function sourcesChart () {
  let script = document.createElement("script")
  let paramUrl = '&start_date=' + start_date + '&end_date=' + end_date + '&metrics=' + metrics + '&method=source/all/a';
  fetch(dataUrl + paramUrl).then(data => data.json()).then(data => {
    let sourcesName = data.result.items[0]
    let sourcesValue = data.result.items[1]
    let sourcesArr = []
    for (let i = 0; i < sourcesName.length; i++) {
      sourcesArr.push({ name: sourcesName[i][0].name, value: sourcesValue[i][0] })
    }
    let sourcesArrJson = JSON.stringify(sourcesArr)
    script.innerHTML = `
      var sourcesChart = echarts.init(document.getElementById('sources-chart'), 'light');
      var sourcesOption = {
        title: {
          text: '博客访问来源统计图',
          x: 'center',
          textStyle: {
            color: '${color}'
          }
        },
        legend: {
          top: 'bottom',
          textStyle: {
            color: '${color}'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        series: [{
          name: '${metricsName}',
          type: 'pie',
          radius: [30, 80],
          center: ['50%', '50%'],
          roseType: 'area',
          label: {
            color: '${color}',
            formatter: "{b} : {c} ({d}%)"
          },
          data: ${sourcesArrJson},
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(255, 255, 255, 0.5)'
            }
          }
        }]
      };
      sourcesChart.setOption(sourcesOption);
      window.addEventListener("resize", () => { 
        sourcesChart.resize();
      });`
    document.getElementById('sources-chart').after(script);
  }).catch(function (error) {
    console.log(error);
  });
}

function switchVisitChart () {
  // 这里为了统一颜色选取的是“明暗模式”下的两种字体颜色，也可以自己定义
  let color = document.documentElement.getAttribute('data-theme') === 'light' ? '#4c4948' : 'rgba(255,255,255,0.7)'
  if (document.getElementById('map-chart') && mapOption) {
    try {
      let mapOptionNew = mapOption
      mapOptionNew.title.textStyle.color = color
      mapOptionNew.visualMap.textStyle.color = color
      mapChart.setOption(mapOptionNew)
    } catch (error) {
      console.log(error)
    }
  }
  if (document.getElementById('trends-chart') && trendsOption) {
    try {
      let trendsOptionNew = trendsOption
      trendsOptionNew.title.textStyle.color = color
      trendsOptionNew.xAxis.nameTextStyle.color = color
      trendsOptionNew.yAxis.nameTextStyle.color = color
      trendsOptionNew.xAxis.axisLabel.color = color
      trendsOptionNew.yAxis.axisLabel.color = color
      trendsOptionNew.xAxis.axisLine.lineStyle.color = color
      trendsOptionNew.yAxis.axisLine.lineStyle.color = color
      trendsOptionNew.series[0].markLine.data[0].label.color = color
      trendsChart.setOption(trendsOptionNew)
    } catch (error) {
      console.log(error)
    }
  }
  if (document.getElementById('sources-chart') && sourcesOption) {
    try {
      let sourcesOptionNew = sourcesOption
      sourcesOptionNew.title.textStyle.color = color
      sourcesOptionNew.legend.textStyle.color = color
      sourcesOptionNew.series[0].label.color = color
      sourcesChart.setOption(sourcesOptionNew)
    } catch (error) {
      console.log(error)
    }
  }
}

if (document.getElementById('map-chart')) mapChart()
if (document.getElementById('trends-chart')) trendsChart()
if (document.getElementById('sources-chart')) sourcesChart()

document.getElementById("darkmode").addEventListener("click", function () { setTimeout(switchVisitChart, 100) })

// 文章统计图
function switchPostChart () {
  // 这里为了统一颜色选取的是“明暗模式”下的两种字体颜色，也可以自己定义
  let color = document.documentElement.getAttribute('data-theme') === 'light' ? '#4C4948' : 'rgba(255,255,255,0.7)'
  if (document.getElementById('posts-chart') && postsOption) {
    try {
      let postsOptionNew = postsOption
      postsOptionNew.title.textStyle.color = color
      postsOptionNew.xAxis.nameTextStyle.color = color
      postsOptionNew.yAxis.nameTextStyle.color = color
      postsOptionNew.xAxis.axisLabel.color = color
      postsOptionNew.yAxis.axisLabel.color = color
      postsOptionNew.xAxis.axisLine.lineStyle.color = color
      postsOptionNew.yAxis.axisLine.lineStyle.color = color
      postsOptionNew.series[0].markLine.data[0].label.color = color
      postsChart.setOption(postsOptionNew)
    } catch (error) {
      console.log(error)
    }
  }
  if (document.getElementById('tags-chart') && tagsOption) {
    try {
      let tagsOptionNew = tagsOption
      tagsOptionNew.title.textStyle.color = color
      tagsOptionNew.xAxis.nameTextStyle.color = color
      tagsOptionNew.yAxis.nameTextStyle.color = color
      tagsOptionNew.xAxis.axisLabel.color = color
      tagsOptionNew.yAxis.axisLabel.color = color
      tagsOptionNew.xAxis.axisLine.lineStyle.color = color
      tagsOptionNew.yAxis.axisLine.lineStyle.color = color
      tagsOptionNew.series[0].markLine.data[0].label.color = color
      tagsChart.setOption(tagsOptionNew)
    } catch (error) {
      console.log(error)
    }
  }
  if (document.getElementById('categories-chart') && categoriesOption) {
    try {
      let categoriesOptionNew = categoriesOption
      categoriesOptionNew.title.textStyle.color = color
      categoriesOptionNew.legend.textStyle.color = color
      if (!categoryParentFlag) { categoriesOptionNew.series[0].label.color = color }
      categoriesChart.setOption(categoriesOptionNew)
    } catch (error) {
      console.log(error)
    }
  }
}
document.getElementById("mode-button").addEventListener("click", function () { setTimeout(switchPostChart, 100) })