Component({
  data: {
    currentUser: {
      type: 0
    },
    avatarList: [
      {
        avatar: '/images/avatar.jpeg',
        username: 'aaa'
      }
    ]
  },
  props: {},
  methods: {
    avatarClick (e) {
      if (e.target.id) {
        this.props.changeUserTaskInfo(parseInt(e.target.id))
      }
    }
  }
})