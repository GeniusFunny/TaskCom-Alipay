Component({
  props: {
    menuList: [],
    avatar: '/images/avatar.jpeg',
    nickName: '乾舟',
    hidden: true,
    id: '123',
    changeSideBar: '',
    clickMenuItem: '',
  },
  didMount() {
    console.log(this.props)
  },
  methods: {
    changeSideBarVisible() {
      this.props.onChangeSideBarVisible()
    },
    clickMenuItem(e) {
      this.props.onClickMenuItem(e.currentTarget.id)
    }
  }
})