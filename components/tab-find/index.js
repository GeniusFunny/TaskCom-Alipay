Component({
  props: {
    type: {
      type: 'village'
    }
  },
  methods: {
    tabClick(e) {
      this.props.onChangeTab(e.target.id)
    }
  }
})