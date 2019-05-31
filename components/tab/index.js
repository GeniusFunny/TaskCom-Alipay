Component({
  data: {
    data: {}
  },
  props: {
    menuList: [],
    type: 'daily'
  },
  methods: {
    tabClick(e) {
      this.$emit('changeTaskType', e.target.id)
    }
  }
})