Component({
  props: {
    info: {
      type: {}
    }
  },
  methods: {
    changeDate(e) {
      if (e.target.id === 'startDate') {
        this.$emit('changeStartDate', e.target.value)
      } else if (e.target.id === 'endDate') {
        this.$emit('changeEndDate', e.target.value)
      }
    },
    changeTime(e) {
      if (e.target.id === 'startTime') {
        this.$emit('changeStartTime', e.target.value)
      } else if (e.target.id === 'endTime') {
        this.$emit('changeEndTime', e.target.value)
      }
    },
    changeValue(e) {
      console.log(e)
      if (e.target.id === 'players') {
        this.$emit('changePlayerNum', e.target.value)
      } else if (e.target.id === 'isPublic') {
        this.$emit('changeIsPublic', e.target.value)
      }
    },
    changeInput(e) {
      this.$emit('changeTaskName', e.target.value)
    }
  }
})