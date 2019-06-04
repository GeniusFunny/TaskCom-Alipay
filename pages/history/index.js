import { GetHistory, SubmitForm } from '../../api/API'
import { normalizeTimeHours } from '../../utils/utils'
import { showLoading, hideLoading, setStorage, jumpTo } from '../../utils/myUtils'



Page({
  data: {
    taskList: [],
    page: 1,
    pageSum: 1
  },
  getHistory() {
    const { pageSum, page, taskList } = this.data
    if (typeof pageSum === 'undefined' || page <= pageSum) {
      showLoading()
      GetHistory(page)
        .then(res => {
          hideLoading()
          this.setData({
            page: page + 1,
            pageSum: res.data.pageSum,
            taskList: taskList.concat(this.parseHistory(res.data.groups))
          })
        })
        .catch(err => {
          hideLoading()
          console.log(err)
        })
    }
  },
  parseHistory(data) {
    return data.map(item => ({
      ...item,
      hasFinished: !(item.unfinishedDay > 0),
      endTime: normalizeTimeHours(item.endTime),
      type: item.type === 1 ? 'daily' : 'multiPlayer'
    }))
  },
  onGetTaskMoreInfo(key, formId) {
    SubmitForm({ formId: formId, type: 1 })
    setStorage('currentTaskId', parseInt(key))
    setStorage('state', 'history')
    jumpTo(`../simpleTask/simpleTask`)
  },
  onReachBottom() {
    this.getHistory()
  },
  onPullDownRefresh() {
    this.getHistory()
    setTimeout(() => {
      my.stopPullDownRefresh()
    }, 1000)
  },
  onLoad() {
    this.getHistory()
  }
})