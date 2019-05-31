Component ({
  mixins: [],
  data: {},
  props: {
    avatar: '/images/avatar.jpeg',
    contend: '20',
    nickName: '乾舟',
    daily: '10'
  },
  methods: {
    scoreClick(e) {
      this.props.onGetMoreScoreInfo(e.target.id)
    }
  }
})