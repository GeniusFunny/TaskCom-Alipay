Component({
  props: {
    info: {},
    index: 1
  },
  methods: {
    changeTextarea(e) {
      this.$emit('changeTaskItemContent', e.target.id, e.target.value)
    },
    deleteTexterea(e) {
      this.$emit('deleteTaskItem', parseInt(e.target.id))
    }
  }
})