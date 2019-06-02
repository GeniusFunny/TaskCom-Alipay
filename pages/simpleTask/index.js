import { showLoading, getStorage, hideLoading, toast, modal, jumpTo } from '../../utils/myUtils'
import { GetSimpleTaskInfo, JoinTaskGroup, SubmitForm } from '../../api/API'
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
      avatarList: []
    },
    hidden: true,
    share: false,
    inApp: false,
    buttonContent: '加入',
    formId: '',
    hasJoined: false,
    fromShareAndHasJoined: false,
    canClick: true,
    hasClicked: false
  },
  loadTaskList() {
    const { info, hasJoined, fromShareAndHasJoined, share, inApp } = this.data
    const { groupId, date, time, title, avatarList  } = info
    showLoading()
    GetSimpleTaskInfo(groupId)
      .then(res => {
        hideLoading()
        let endTime = normalizeTimeHours(res.data.summary.endTime).split(' ')
        let startTime = normalizeTimeHours(res.data.summary.startTime).split(' ')
        this.setData({
          info: {
            ...info,
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
            TaskList: res.data.items,
            isPublic: false,
          }
        })
        if (typeof res.data.members !== 'undefined') {
          this.setData({
            info: {
              ...info,
              isPublic: true
            },
            avatarList: res.data.members.map(item => ({
              ...item,
              username: item.username.length > 3 ? item.username.slice(0, 3) + '...' : item.username
            }))
          })

          if (avatarList.findIndex(item => item.userId === getStorage('userId')) !== -1) {
            this.setData({
              hasJoined: true,
              buttonContent: '已加入'
            })
            if ((fromShareAndHasJoined && hasJoined) || (share && !inApp)) {
              this.setData({
                buttonContent: '返回个人中心'
              })
            }
          }
        }
      })
      .catch(err => {
        console.log(err)
        hideLoading()
        setTimeout(() => {
          toast('网络状况差', 'none')
        }, 1000)
      })
  },
  joinTaskGroup() {
    const { buttonContent, info, formId, inApp } = this.data
    const { groupId } = info

    if (buttonContent === '已加入') {
      return 0
    } else if (buttonContent === '返回个人中心') {
      jumpTo('../personalCenter/personalCenter')
      return 0
    }
    this.setData({
      hasClicked: true,
      canClick: false
    })
    JoinTaskGroup(groupId)
      .then(res => {
        SubmitForm({ groupId, formId, type: 0 })
          .then(res => {
            console.log(res)
          })
          .catch((err) => {
            console.log(err)
            toast('消息推送失败', 'none')
          })
        this.loadTaskList()
      })
      .catch(err => {
        this.setData({
          canClick: true,
        })
        let code = err.data.code
        if (code === 1) {
          toast('人数已满: )', 'none')
        } else if (code === 2) {
          toast('任务组已经结束: )', 'none')
        } else if (code === 3) {
          toast('你已在当前任务组: )', 'none')
        } else if (code === 4) {
          toast('单人任务: )', 'none')
        } else if (code === undefined) {
          modal('提示', '您尚未注册，是否前往注册？')
            .then(res => {
              jumpTo('../index/index')
            })
        }
        if (!inApp) {
          setTimeout(() => {
            jumpTo('../index/index')
          }, 1000)
        }
      })
  },
  onGetFormId(key) {
    this.setData({
      formId: key,
    })
    this.joinTaskGroup()
  },
  onLoad() {
    // 查询小程序API并修改
    this.setData({
      info: {
        groupId: getStorage('currentTaskId') || 0, 
      },
      share: false,
    })
    if (this.$root.$mp.query.hasOwnProperty('share')) {
      this.setData({
        share: true,
        hasClicked: false,
        info: {
          groupId: this.$root.$mp.query.groupId
        }
      })
    }
    if (this.$root.$mp.query.hasOwnProperty('inApp')) {
      this.setData({
        inApp: true
      })
    }
    if (this.$root.$mp.query.hasOwnProperty('hasJoined')) {
      this.setData({
        fromShareAndHasJoined: true
      })
    }
    this.loadTaskList()
  },
  onShareAppMessage(options) {
    if (this.hasJoined) {
      return {
        title: '一起来挑战吧',
        path: `/pages/simpleTask/simpleTask?groupId=${this.info.groupId}&share=true&hasJoined=true`
      }
    } else {
      return {
        title: '一起来挑战吧',
        path: `/pages/simpleTask/simpleTask?groupId=${this.info.groupId}&share=true`
      }
    }
  },
  onUnload() {
    this.setData({
      share: false,
      hasClicked: false,
      canClick: true,
      fromShareAndHasJoined: false,
      formId: '',
      inApp: false,
      buttonContent: '加入',
      info: {
        groupId: '',
      }
    })
  }
})