import { GetScoreHistory } from '../../api/API'
import { showLoading, hideLoading } from '../../utils/aliUtils'
import { normalizeTime } from '../../utils/utils'

Page({
  data: {
    type: 0,
    page: 1,
    pageSum: 1,
    historyList: [],
    hasLoaded: false
  },
  getScoreHistory() {
    const { type, historyList, page } = this.data
    GetScoreHistory([type, page])
      .then(res => {
        let data = res.data.scores.map(item => {
          return {
            ...item,
            time: normalizeTime(item.currentDay)
          }
        })
        this.setData({
          pageSum: res.pageSum,
          page: page + 1,
          historyList: historyList.concat[data],
          hasLoaded: true
        })
      })
  },
  onReachBottom() {
    const { pageSum, page } = this.data
    if (page <= pageSum) {
      this.getScoreHistory()
    }
  },
  onLoad() {
    // Todo： 查询小程序API并修改
    if (this.$root.$mp.query.hasOwnProperty('type')) {
      this.type = this.$root.$mp.query.type
    }
    showLoading()
    this.getScoreHistory()
    setTimeout(() => {
      hideLoading()
    }, 1000)
  }
  onUnload() {
    this.setData({
      type: 0,
      page: 1,
      pageSum: 1,
      historyList: [],
      hasLoaded: false
    })
  }
})