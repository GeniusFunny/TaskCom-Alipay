import { GetUserInfo, UpdateUserInfo } from '../../api/API'
import { getStorage, toast, jumpTo } from '../../utils/aliUtils'
import { normalizeTime, cst2unix } from '../../utils/utils'

Page({
  data: {
    info: {
      gender: '',
      birthday: '',
      location: '',
      grade: '',
      collage: '',
      username: '',
      avatar: '/images/avatar.jpeg'
    },
    images: {
      man: '/images/man-1.png',
      woman: '/images/woman-1.png'
    },
    infoOptions: {
      gradeData: ['大一', '大二', '大三', '大四', '研一', '研二', '研三']
    }
  },
  getInfo() {
    GetUserInfo()
      .then(res => {
        this.parseInfo(res.data.info)
      })
      .catch(err => {
        toast('暂时无法获取个人信息', 'none')
        console.error(err)
      })
  },
  parseInfo(data) {
    const { gender = 0, grade = 0, birthday, location = '陕西西安', collage = '西安电子科技大学', username = '' } = data
    this.setData({
      info: {
        gender,
        grade,
        birthday: normalizeTime(birthday) || '2018-12-31',
        location,
        collage,
        avatar: getStorage('avatar'),
        username
      }
    })
    this.getGender()
  },
  getGender() {
    if (this.data.info.gender === 1) {
      this.setData({
        images: {
          ...this.data.images,
          man: '/images/man-2.png'
        }
      })
    } else {
      this.setData({
        images: {
          ...this.data.images,
          woman: '/images/woman-2.png'
        }
      })
    }
  },
  changeGender(e) {
    const { info } = this.data
    if (e.target.id === 'man') {
      this.setData({
        images: {
          man: '/images/man-2.png',
          woman: '/images/woman-1.png'
        },
        info: {
          ...info,
          gender: 1
        }
      })
    } else {
      this.setData({
        images: {
          man: '/images/man-1.png',
          woman: '/images/woman-2.png'
        },
        info: {
          ...info,
          gender: 0
        }
      })
    }
  },
  onBindBirthdayChange(e) {
    const { info } = this.data
    this.setData({
      info: {
        ...info,
        birthday: e.detail.value
      }
    })
  },
  onBindUsernameChange(e) {
    console.log(e)
    const { info } = this.data
  
    this.setData({
      info: {
        ...info,
        username: e.detail.value
      }
    })
  },
  onBindLocationChange(e) {
    const { info } = this.data
    this.setData({
      info: {
        ...info,
        location: e.detail.value
      }
    })
  },
  onBindGradeChange(e) {
    const { info } = this.data
    this.setData({
      info: {
        ...info,
        grade: e.detail.value
      }
    })
  },
  onBindCollageChange(e) {
    const { info } = this.data
    this.setData({
      info: {
        ...info,
        collage: e.detail.value
      }
    })
  },
  bindClickSubmit() {
    const { info } = this.data
    const { username, location, birthday, grade, gender, collage } = info
    let data = {
      username,
      avatar: getStorage('avatar'),
      location,
      birthday: cst2unix(birthday),
      grade,
      gender,
      collage
    }
    UpdateUserInfo(data)
      .then(res => {
        toast('保存成功')
        setTimeout(() => {
          jumpTo('../personalCenter/index')
        }, 1500)
      })
      .catch(err => {
        console.log(err)
        toast('用不要使用非法字符', 'none')
      })
  },
  onShow() {
    console.log(this.data.infoOptions.gradeData[this.data.info.grade])
  }
})