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
      // this.$emit('changeSideBar')
    },
    clickMenuItem (e) {
      // this.$emit('clickMenuItem', e.currentTarget.id)
    }
  }
})