import { GetFutureTaskList, SubmitForm } from '../../api/API'
import { normalizeTimeHours } from '../../utils/utils'
import { setStorage, jumpTo } from '../../utils/myUtils'

Page({
  data: {
    taskList: []
  },
  onGetFutureTaskList() {
    GetFutureTaskList()
      .then(res => {
        this.setData({
          taskList: this.parseTaskList(res.data.tasks)
        })
      })
  },
  parseTaskList(data) {
    return data.map(item => ({
      ...item,
      startTime: normalizeTimeHours(item.startTime),
      type: item.type === 1 ? 'daily' : 'multiPlayer'
    }))
  },
  getTaskMoreInfo(key) {
    setStorage('currentTaskId', parseInt(key))
    setStorage('state', 'future')
    jumpTo(`../simpleTask/simpleTask`)
  },
  onGetFormId(formId) {
    SubmitForm({ formId: formId, type: 1 })
  },
  onPullDownRefresh() {
    this.getFutureTaskList()
    setTimeout(() => {
      my.stopPullDownRefresh()
    }, 1000)
  },
  onLoad() {
    this.getFutureTaskList()
  }
})