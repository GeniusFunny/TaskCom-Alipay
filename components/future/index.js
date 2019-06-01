Component({
  props: {
    taskName: '',
    startTime: '',
    type: '',
    id: 10
  },
  method: {
    submit(e) {
      this.props.onTask(e.currentTarget.id, e.target.formId)
    }
  }
})