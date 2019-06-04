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
      this.props.onTask(e.currentTarget.id, e.target.formId)
    }
  },
  didMount() {
    console.log('????')
    console.log(this.props)
  }
})