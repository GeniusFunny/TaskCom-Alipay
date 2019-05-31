Component({
  props: {
    taskList: [
      {
        content: '跑步2小时',
        itemId: 0
      },
      {
        content: '工作5分钟',
        itemId: 1
      },
      {
        content: '疯狂睡觉',
        itemId: 2
      }
    ],
    type: 'finished'
  },
  methods: {
    optionClick(e) {
      if (e.target.id || e.target.id === 0) {
        this.$emit('changeTaskState', e.target.id)
      }
    }
  }
})