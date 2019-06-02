import { GetUserInfo, GetCurrentTask, GetScore, SubmitForm } from '../../api/API'
import { setStorage, jumpTo, showLoading, hideLoading } from '../../utils/myUtils'
import { normalizeTimeHours } from '../../utils/utils'


Page({
  data: {
    userInfo: {},
    taskList: [],
    menuList: [
      {
        id: 'edit',
        name: '基本资料',
        tag: '/images/edit.png'
      },
      {
        id: 'future',
        name: '未来的任务',
        tag: '/images/data.png'
      },
      {
        id: 'history',
        name: '任务历史记录',
        tag: '/images/history.png'
      }
    ],
    sideBarVisible: true,
    menuUrl: {
      'edit': '../editInfo/index',
      'history': '../history/index',
      'future': '../future/index'
    }
  },
  parseInfo(data) {
    this.setData({
      userInfo: {
        ...this.data.userInfo,
        ...data
      }
    })
  },
  parseScore(data) {
    this.setData({
      userInfo: {
        ...this.data.userInfo,
        daily: data.personScore || 0,
        contend: data.peopleScore || 0
      }
    })
  },
  parseTaskList(data) {
    this.setData({
      taskList: data.map(item => {
        item.endTime = normalizeTimeHours(item.endTime).split(' ')[1]
        item.type = item.type === 0 ? 'multiPlayer' : 'daily'
      })
    })
  },
  getTaskList() {
    GetCurrentTask()
      .then(res => {
        this.parseTaskList(res.data.groups)
      })
  },
  onGetTaskMoreInfo(key, formId) {
    setStorage('state', 'now')
    SubmitForm({ formId: formId, type: 1 })
    setStorage('currentTaskId', parseInt(key))
    jumpTo('../task/task')
  },
  onGetMoreScoreInfo(key) {
    jumpTo(`../scoreHistory/index?type=${key}`)
  },
  onChangeSideBarVisible() {
    this.setData({
      sideBarVisible: !this.data.sideBarVisible
    })
  },
  onClickMenuItem(key) {
    jumpTo(this.data.menuUrl[key])
  },
  onLoad(query) {
    // 页面加载
    // showLoading()
    // GetUserInfo()
    //   .then(res => {
    //     this.parseInfo(res.data.info)
    //     return GetScore()
    //   })
    //   .then(res => {
    //     this.parseScore(res.data.score)
    //     return GetCurrentTask()
    //   })
    //   .then(res => {
    //     this.parseTaskList(res.data.groups)
    //     hideLoading()
    //   })
    //   .catch(err => {
    //     hideLoading()
    //     console.log(err)
    //   })
  },
  onShow() {
    // GetUserInfo()
    //   .then(res => {
    //     this.userInfo.username = res.data.info.username
    //     return GetCurrentTask()
    //   })
    //   .then(res => {
    //     this.parseTaskList(res.data.groups)
    //   })
    // 页面显示
  },
  onPullDownRefresh() {
    GetUserInfo()
      .then(res => {
        this.parseInfo(res.data.info)
        return GetScore()
      })
      .then(res => {
        this.parseScore(res.data.score)
        return GetCurrentTask()
      })
      .then(res => {
        this.parseTaskList(res.data.groups)
        my.stopPullDownRefresh()
      })
      .catch(err => {
        my.stopPullDownRefresh()
        console.log(err)
      })
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
});
