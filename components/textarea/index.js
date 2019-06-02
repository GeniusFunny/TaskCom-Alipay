Component({
  props: {
    info: {},
    index: 1
  },
  methods: {
    changeTextarea(e) {
      this.props.onChangeTaskItemContent(e.target.id, e.target.value)
    },
    deleteTexterea(e) {
      this.props.onDeleteTaskItem(parseInt(e.target.id))
    }
  }
})