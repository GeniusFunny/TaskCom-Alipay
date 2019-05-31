Component({
  props: {
    type: {
      type: 'village'
    }
  },
  methods: {
    tabClick(e) {
      this.$emit('changeTab', e.target.id)
    }
  }
})