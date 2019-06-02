import { GetRank, GetTaskVillage } from '../../api/API'
import { showLoading, hideLoading, jumpTo } from '../../utils/myUtils'

Page({
  data: {
    rankList: {
      top3: [],
      rest: []
    },
    villageTaskList: [],
    info: {
      type: 'village'
    },
    rankPage: 1,
    rankPageSum: 1,
    touch: {
      touchDot: 0,
      time: 0,
      interval: 0,
      refresh: false
    }
  },
  onChangeTab(type) {
    const { info } = this.data
    this.setData({
      info: {
        ...info,
        type
      }
    })
  },
  getRank(page = 1) {
    const { rankPage, rankList}  = this.data
    GetRank(page)
      .then(res => {
        this.setData({
          rankPage: rankPage + 1,
          rankPageSum: res.data.pageSum,
          rankList: {
            ...rankList,
            top3: res.data.rank.slice(0, 3),
            rest: res.data.rank.length >= 3 ? res.data.rank.slice(3, res.data.rank.length) : []
          }
        })
      })
  },
  getVillageTask() {
    GetTaskVillage()
      .then(res => {
        this.setData({
          villageTaskList: res.data.items.map(item => ({
            ...item,
            time: item.startTime.split('T')[0] + ' ~ ' + item.endTime.split('T')[0]
          }))
        })
      })
  },
  getTaskMoreInfo(e) {
    if (e.target.id) {
      jumpTo(`../simpleTask/simpleTask?groupId=${e.target.id}&share=true&inApp=true`)
    }
  },
  touchEventStart(e) {
    const { touch } = this.data
    this.setData({
      touch: {
        ...touch,
        touchDot: e.pageX
      }
    })
  },
  touchEventMove(e) {
    const { touch } = this.data
    const { touchDot, refresh } = touch
    if (Math.abs(touchDot - e.pageX) > 120 && !refresh) {
      showLoading('更新任务村ing')
      this.setData({
        refresh: true
      })
      this.getVillageTask()
      setTimeout(() => {
        hideLoading()
      }, 1000)
    }
  },
  touchEventEnd(e) {
    console.log('滑动结束')
    this.setData({
      refresh: false
    })
  },
  onPullDownRefresh() {
    const { info } = this.data
    const { type } = info
    if (type === 'rank') {
      this.setData({
        rankPage: 1
      })
      this.getRank(1)
    } else {
      this.getVillageTask()
    }
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 700)
  },
  onReachBottom() {
    const { info, rankPage, rankPageSum, rankList  } = this.data
    const { rest } = rankList 
    const { type } = info
    if (type === 'rank') {
      if (rankPage <= rankPageSum && rankPage <= 10) {
        showLoading('加载更多伙伴')
        GetRank(rankPage)
          .then(res => {
            if (rankPage === 10 && res.data.rank.length === 10) {
              res.data.rank.pop()
            }
            this.setData({
              rankPage: rankPage + 1,
              rankPageSum: res.data.pageSum,
              rankList: {
                ...rankList,
                rest: rest.concat[res.data.rank]
              }
            })
            setTimeout(() => {
              hideLoading()
            }, 700)
          })
      }
    }
  },
  onLoad() {
    showLoading()
    const { touch } = this.data
    this.setData({
      touch: {
        ...touch,
        refresh: false
      }
    })
    this.getRank(1)
    this.getVillageTask()
    setTimeout(() => {
      hideLoading()
    }, 1500)
  }
})