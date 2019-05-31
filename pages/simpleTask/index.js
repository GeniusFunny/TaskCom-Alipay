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
  }
})