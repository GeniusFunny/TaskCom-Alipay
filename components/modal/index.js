Component({
  props: {
    content: '创建成功',
    hidden: true
  },
  methods: {
    modalClick(e) {
      if (e.target.id === '') {
        this.hidden = true
        this.$emit('shareTask', 'close')
      } else {
        this.$emit('shareTask', e.target.id)
      }
    }
  }
})