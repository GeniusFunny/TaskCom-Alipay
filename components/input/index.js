Component({
  props: {
    info: {}
  },
  methods: {
    changeDate(e) {
      if (e.target.id === 'startDate') {
        this.props.onChangeStartDate(e.target.value)
      } else if (e.target.id === 'endDate') {
        this.props.onChangeEndDate(e.target.value)
      }
    },
    changeTime(e) {
      if (e.target.id === 'startTime') {
        this.props.onChangeStartTime(e.target.value)
      } else if (e.target.id === 'endTime') {
        this.props.onChangeEndTime(e.target.value)
      }
    },
    changeValue(e) {
      if (e.target.id === 'players') {
        this.props.onChangePlayerNum(e.target.value)
      } else if (e.target.id === 'isPublic') {
        this.props.onChangeIsPublic(e.target.value)
      }
    },
    changeInput(e) {
      this.props.onChangeTaskName(e.target.value)
    }
  }
})