Component({
  props: {
    taskName: '',
    startTime: '',
    type: '',
    id: 10
  },
  method: {
    submit(e) {
      this.$emit('task', e.currentTarget.id, e.target.formId)
    }
  }
})