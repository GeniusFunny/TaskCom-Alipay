Component({
  props: {
    content: '创建成功',
    hidden: true
  },
  methods: {
    modalClick(e) {
      if (e.target.id === '') {
        this.hidden = true
        this.props.onShareTask('close')
      } else {
        this.props.onShareTask(e.target.id)
      }
    }
  }
})