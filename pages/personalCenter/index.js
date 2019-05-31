import { GetUserInfo, GetCurrentTask, GetScore, SubmitForm } from '../../api/API'
import { setStorage, jumpTo, showLoading, hideLoading } from '../../utils/aliUtils'
import { normalizeTimeHours } from '../../utils/utils'


Page({
  data: {
    userInfo: {},
    taskList: [],
    menuList: [
      {
        id: 'edit',
        name: '基本资料',
        tag: '/assets/images/edit.png'
      },
      {
        id: 'future',
        name: '未来的任务',
        tag: '/assets/images/data.png'
      },
      {
        id: 'history',
        name: '任务历史记录',
        tag: '/assets/images/history.png'
      }
    ],
    sideBarVisible: true,
    menuUrl: {
      'edit': '../editInfo/editInfo',
      'history': '../history/history',
      'future': '../future/future'
    }
  },
  methods: {
    parseInfo(data) {
      for (let key in data) {
        this.userInfo[key] = data[key]
      }
    },
    parseScore(data) {
      this.userInfo.daily = data.personScore || 0
      this.userInfo.contend = data.peopleScore || 0
    },
    parseTaskList(data) {
      data.forEach(item => {
        item.endTime = normalizeTimeHours(item.endTime).split(' ')[1]
        item.type = item.type === 0 ? 'multiPlayer' : 'daily'
      })
      this.taskList = data
    },
    getTaskList() {
      GetCurrentTask()
        .then(res => {
          this.parseTaskList(res.data.groups)
        })
    },
    getTaskMoreInfo(key, formId) {
      console.log(formId)
      setStorage('state', 'now')
      SubmitForm({ formId: formId, type: 1 })
      setStorage('currentTaskId', parseInt(key))
      jumpTo('../task/task')
    },
    changeSideBarVisible() {
      this.sideBarVisible = !this.sideBarVisible
    },
    clickMenuItem(key) {
      jumpTo(this.menuUrl[key])
    },
    getMoreScoreInfo(key) {
      jumpTo(`../scoreHistory/scoreHistory?type=${key}`)
    }
  },
  onLoad(query) {
    // 页面加载
    showLoading()
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
        hideLoading()
      })
      .catch(err => {
        hideLoading()
        console.log(err)
      })
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    GetUserInfo()
      .then(res => {
        this.userInfo.username = res.data.info.username
        return GetCurrentTask()
      })
      .then(res => {
        this.parseTaskList(res.data.groups)
      })
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
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
        wx.stopPullDownRefresh()
      })
      .catch(err => {
        wx.stopPullDownRefresh()
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
