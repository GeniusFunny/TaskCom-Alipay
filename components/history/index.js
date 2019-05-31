Component({
  data: {
    tagUrl: {
      unfinished: '/images/unfinished.png',
      finished: '/images/finished.png'
    }
  },
  props: {
    taskName: '默认任务',
    deadLine: '2018-5-14 22:00',
    finishedPlayerNum: 0,
    type: 'daily',
    id: 1,
    hasFinished: true
  },
  methods: {
    submit(e) {
      this.$emit('task', e.currentTarget.id, e.target.formId)
    }
  }
})