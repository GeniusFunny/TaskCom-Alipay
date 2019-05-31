Component({
  props: {
    menuList: [],
    avatar: '',
    nickName: 'Task',
    hidden: true,
    id: '123'
  },
  methods: {
    changeSideBarVisible () {
      this.hidden = true
      console.log(this.props)
      // this.$emit('changeSideBar')
    },
    clickMenuItem (e) {
      console.log(123)
      // this.$emit('clickMenuItem', e.currentTarget.id)
    }
  }
})