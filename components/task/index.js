Component({
  data: {},
  props: {
    taskName: '默认任务',
    deadLine: '2018-5-14 22:00',
    finishedTaskNum: 0,
    taskNum: 1,
    finishedPlayerNum: 0,
    type: 'daily',
    id: 0
  },
  methods: {
    submit (e) {
      this.props.onTask(e.currentTarget.id, e.target.formId)
    }
  }
})