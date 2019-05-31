Page({
  data: {
    rankList: {
      top3: [],
      rest: []
    },
    villageTaskList: [],
    info: {
      type: 'village'
    },
    rankPage: 1,
    rankPageSum: 1,
    touch: {
      touchDot: 0,
      time: 0,
      interval: 0,
      refresh: false
    }
  }
})