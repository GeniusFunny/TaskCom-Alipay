const FILEURL = ''  //  文件服务器地址

const toast = (content = '提示', type = 'success', duration = 1500) => {
  return new Promise((resolve, reject) => {
    my.showToast({
      content,
      type,
      duration,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}

const showLoading = (content = '加载中') => {
  return new Promise((resolve, reject) => {
    my.showLoading({
      content,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}

const hideLoading = () => {
  my.hideLoading()
}

const modal = (title = '提示', content = '') => {
  return new Promise((resolve, reject) => {
    my.confirm({
      title,
      content,
      success: res => {
        if (res.confirm) {
          resolve(res)
        } else {
          reject()
        }
      },
      fail: err => reject(err)
    })
  })
}

const getStorage = (item) => {
  return my.getStorageSync(item)
}

const setStorage = (key, value) => {
  my.setStorageSync(key, value)
}

const chooseimage = (count = 9) => {
  return new Promise((resolve, reject) => {
    my.chooseImage({
      count,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}
const wxLogin = () => {
  return new Promise((resolve, reject) => {
    my.login({
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}

const upLoad = (filePath, formData) => {
  return new Promise((resolve, reject) => {
    my.uploadFile({
      url: FILEURL,
      filePath, //  本地路径名
      name: 'file',
      formData,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}
const jumpTo = (url) => {
  let state = url.indexOf('personalCenter') !== -1 || url.indexOf('add') !== -1 || url.indexOf('find') !== -1
  if (state) {
    my.switchTab({
      url: url
    })
  } else {
    my.navigateTo({
      url: url
    })
  }
}
export {
  toast,  //  提示窗
  showLoading,  //  显示加载提示框
  hideLoading,  //  隐藏加载提示框
  modal,  //  模态框
  getStorage, //  读取缓存（同步）
  setStorage, //  设置缓存（同步）
  chooseimage,  //  选取图片
  wxLogin,  //  登录微信服务器
  upLoad,  // 上传,
  jumpTo  //  页面跳转
}
