Component ({
  mixins: [],
  data: {},
  props: {
    avatar: '/images/avatar.jpeg',
    contend: '20',
    nickName: '杨航',
    daily: '10'
  },
  methods: {
    scoreClick(e) {
      console.log(this.props)
    }
  }
})