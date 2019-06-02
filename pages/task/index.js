import { showLoading, getStorage, hideLoading, modal, toast, jumpTo } from '../../utils/aliUtils'
import { GetTaskInfo, FinishTaskItem, GetOthersTaskInfo } from '../../api/API'
import { normalizeTimeHours } from '../../utils/utils'

Page({
  data: {
    info: {
      groupId: 1,
      isPublic: false,
      title: {
        name: '任务名称',
        value: ''
      },
      date: {
        name: '任务周期',
        value: ''
      },
      time: {
        name: '时间段',
        value: ''
      },
      unfinishedTaskList: [],
      finishedTaskList: [],
      avatarList: [],
      currentUser: getStorage('userId') || 0
    },
    buttonContent: '返回个人中心',
    fromMessage: false
  },
  subTaskClick(key) {
    if (getStorage('state') === 'now') {
      this.subTaskSubmit(key)
    }
  },
  subTaskSubmit(key) {
    const { info } = this.data
    const { currentUser} = info
    if (currentUser === getStorage('userId')) {
      modal('是否将当前任务标记为完成')
        .then(res => {
          this.subTaskChange(key)
        })
    }
  },
  subTaskChange(key) {
    const { info } = this.data
    const { groupId } = info
    showLoading()
    FinishTaskItem({ groupId, itemId: key })
      .then(() => {
        hideLoading()
        this.loadTaskList()
      })
      .catch((err) => {
        hideLoading()
        if (err.data.code === 5 || err.data.code === 2) {
          setTimeout(() => {
            toast('已过截止时间: )', 'none')
          }, 600)
        } else {
          setTimeout(() => {
            toast('服务器崩溃: )', 'none')
          }, 600)
        }
      })
  },
  loadTaskList() {
    const { info } = this.data
    const { groupId, date } = info
    showLoading()
    GetTaskInfo(groupId)
      .then(res => {
        hideLoading()
        let endTime = normalizeTimeHours(res.data.summary.endTime).split(' ')
        let startTime = normalizeTimeHours(res.data.summary.startTime).split(' ')
        this.setData({
          info: {
            ...info,
            unfinishedTaskList: res.data.unfinished,
            date: {
              value: startTime[0] + ' ~ ' + endTime[0],
              name: date.name
            },
            time: {
              value: startTime[1] + ' ~ ' + endTime[1],
              name: time.name
            },
            title: {
              value: res.data.summary.title,
              name: title.name
            },
            finishedTaskList: res.data.finished,
            isPublic: false
          }
        })
        if (typeof res.data.members !== 'undefined') {
          this.setData({
            info: {
              ...info,
              isPublic: true,
              avatarList: res.data.members.map(item => ({
                ...item,
                username: item.username.length > 3 ? item.username.slice(0, 3) + '...' : item.username
              }))
            }
          })
        }
      })
      .catch(err => {
        console.log(err)
        hideLoading()
      })
  },
  changeCurrentUserTaskInfo(key) {
    const { info } = this.data
    const { groupId } = info
    showLoading()
    GetOthersTaskInfo([groupId, key])
      .then(res => {
        this.setData({
          info: {
            ...info,
            currentUser: key,
            finishedTaskList: res.data.finished,
            unfinishedTaskList: res.data.unfinished
          }
        })
        hideLoading()
      })
  },
  jumpToPersonalCenter() {
    jumpTo('../personalCenter/personalCenter')
  },
  onLoad() {
    const { info } = this.data
    // 调整API
    this.setData({
      info: {
        ...info,
        groupId: getStorage('currentTaskId') || 0
      }
    })
    if (this.$root.$mp.query.hasOwnProperty('share')) {
      this.setData({
        share: true,
        info: {
          ...info,
          groupId: this.$root.$mp.query.groupId
        }
      })
    } else if (this.$root.$mp.query.hasOwnProperty('groupId')) {
      this.setData({
        info: {
          ...info,
          groupId: this.$root.$mp.query.groupId
        }
      })
    }
    if (this.$root.$mp.query.hasOwnProperty('from')) {
      this.setData({
        fromMessage: true
      })
    }
    this.loadTaskList()
  },
  onShareAppMessage(options) {
    const { info } = this.data
    const { groupId } = info
    return {
      title: '一起来挑战吧',
      path: `/pages/simpleTask/simpleTask?groupId=${groupId}&share=true&hasJoined=true`
    }
  },
  onUnload() {
    const { info } = this.data
    this.setData({
      info: {
        ...info,
        currentUser: getStorage('userId')
      },
      fromMessage: false
    })
  }
})