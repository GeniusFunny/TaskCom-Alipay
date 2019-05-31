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
  }
})