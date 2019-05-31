Page({
  data: {
    info: {
      type: 'daily',
      taskName: {
        name: '任务名称',
        type: 'input',
        value: ''
      },
      startDate: {
        id: 'startDate',
        name: '任务开始日期',
        type: 'date',
        value: '',
        start: '',
        end: ''
      },
      endDate: {
        id: 'endDate',
        name: '任务结束日期',
        type: 'date',
        value: '',
        start: '',
        end: ''
      },
      startTime: {
        id: 'startTime',
        name: '每日开始时间',
        type: 'time',
        value: '',
        start: '',
        end: ''
      },
      endTime: {
        id: 'endTime',
        name: '每日结束时间',
        type: 'time',
        value: '',
        start: '',
        end: ''
      },
      players: {
        id: 'players',
        name: '最大参与人数',
        type: 'picker',
        value: 4,
        data: [
          2, 4, 6, 8, 10, 12, 20, 50, 99
        ]
      },
      taskList: [],
      public: {
        id: 'isPublic',
        name: '是否公开',
        type: 'picker',
        value: 0,
        data: [
          '否', '是'
        ]
      }
    },
    taskInfo: {},
    hidden: true,
    groupId: 66366,
    itemId: 1,
    formId: '',
    buttonContent: '新建任务',
    canClick: true
  },
  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
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
    // 页面被下拉
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
