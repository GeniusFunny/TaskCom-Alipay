Component({
  data: {},
  props: {
    buttonContent: '创建任务',
    type: false
  },
  methods: {
    submit (e) {
      this.props.getFormId(e.target.formId)
    }
  }
})