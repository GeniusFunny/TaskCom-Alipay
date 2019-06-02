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
      this.props.onChangeTaskType(e.target.id)
    }
  }
})