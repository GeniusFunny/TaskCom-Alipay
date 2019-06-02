import { toast, jumpTo, showLoading, hideLoading, modal } from '../../utils/aliUtils'
import { unix2cst, cst2unix } from '../../utils/utils'
import { CreateNewTask, SubmitForm } from '../../api/API'

Page({
  data: {
    info: {
      type: 'daily',
      taskName: {
        name: '任务名称',
        type: 'input',
        value: ''
      },
      startDate: {
        id: 'startDate',
        name: '任务开始日期',
        type: 'date',
        value: '',
        start: '',
        end: ''
      },
      endDate: {
        id: 'endDate',
        name: '任务结束日期',
        type: 'date',
        value: '',
        start: '',
        end: ''
      },
      startTime: {
        id: 'startTime',
        name: '每日开始时间',
        type: 'time',
        value: '',
        start: '',
        end: ''
      },
      endTime: {
        id: 'endTime',
        name: '每日结束时间',
        type: 'time',
        value: '',
        start: '',
        end: ''
      },
      players: {
        id: 'players',
        name: '最大参与人数',
        type: 'picker',
        value: 4,
        data: [
          2, 4, 6, 8, 10, 12, 20, 50, 99
        ]
      },
      taskList: [],
      public: {
        id: 'isPublic',
        name: '是否公开',
        type: 'picker',
        value: 0,
        data: [
          '否', '是'
        ]
      }
    },
    taskInfo: {},
    hidden: true,
    groupId: 66366,
    itemId: 1,
    formId: '',
    buttonContent: '新建任务',
    canClick: true
  },
  changeTaskType(type) {
    const { info } = this.data
    this.setData({
      info: {
        ...info,
        type
      }
    })
  },
  addSubTask(e) {
    const { info, itemId } = this.data
    const { taskList } = info
    this.setData({
      info: {
        ...info,
        taskList: taskList.concat[{ id: itemId + 1, value: '' }]
      },
      itemId: itemId + 1
    })
  },
  checkTaskName() {
    const { info } = this.data
    const { taskName } = info
    return taskName.value.length > 0
  },
  checkTaskInfo() {
    const { info } = this.data
    const { taskList } = info
    if (taskList.length === 0) {
      return false
    }
    return taskList.every(item => {
      return item.value.length > 0
    })
  },
  getTaskInfo() {
    const { info, taskInfo } = this.data
    const { taskName, startDate, startTime, endDate, endTime, public, taskList, type, players } = info
    try {
      this.setData({
        taskInfo: {
          ...taskInfo,
          title: taskName.value,
          startTime: cst2unix(`${startDate.value}'T'${startTime.value}:00`),
          endTime: cst2unix(`${endDate.value}'T'${endTime.value}:00`),
          isPublic: public.value === '1',
          maxPeople: 1,
          items: taskList.map(item => ({
            content: item.value
          })),
          type: 1
        }
      })
      if (type === 'multiplayer') {
        this.setData({
          taskInfo: {
            ...taskInfo,
            maxPeople: players.data[players.value],
            type: 0
          }
        })
      }
    } catch (e) {
      throw new Error('有空值')
    }
    return this
  },
  clearTask() {
    const { info} = this.data
    const { taskName, public } = info

    this.setData({
      taskInfo: {},
      info: {
        ...info,
        public: {
          ...public,
          value: 0,
        },
        taskName: {
          ...taskName,
          value: ''
        },
        taskList: []
      }
    })
    this.initDate()
    this.initTime()
  },
  submitTask() {
    showLoading('提交中')
    const { info, taskInfo, formId } = this.data
    const { taskName, public } = info
    const { type } = taskInfo
    this.setData({
      canClick: false
    })
    CreateNewTask(taskInfo)
      .then(res => {
        hideLoading()
        this.setData({
          canClick: true
        })
        SubmitForm({ groupId: res.data.groupId, formId, type: 0 })
          .then(res => {
            console.log(res)
          })
          .catch(() => {
            toast('消息通知失败', 'none')
          })
        if (type === 0) {
          this.setData({
            hidden: false,
            groupId: res.data.groupId
          })
        } else {
          toast('创建成功')
          setTimeout(() => {
            this.clearTask()
            jumpTo('../personalCenter/personalCenter')
          }, 1000)
        }
      })
      .catch(err => {
        toast('提交任务失败', 'none')
        this.setData({
          canClick: false
        })
        console.error(err)
      })
  },
  createTask() {
    if (this.checkTaskName() && this.checkTaskInfo()) {
      modal('创建新任务', '确认无误后，即可提交。')
        .then(res => {
          this.getTaskInfo().submitTask()
        })
    } else {
      toast('请填写相关信息', 'none')
    }
  },
  shareTask(key) {
    if (key !== 'share') {
      this.clearTask()
      this.setData({
        hidden: true
      })
      jumpTo('../personalCenter/personalCenter')
    }
  },
  getFormId(key) {
    this.setData({
      formId: key
    })
    this.createTask()
  },
  initDate() {
    const { info } = this.data
    const { startDate, endDate } = info
    this.setData({
      info: {
        ...info,
        startDate: {
          ...startDate,
          value: '请设置',
          start: unix2cst(Date.now()),
          end: unix2cst(Date.now() + 3600 * 1000 * 24 * 90)
        },
        endDate: {
          ...endDate,
          value: '请设置',
          start: unix2cst(Date.now()),
          end: unix2cst(Date.now() + 3600 * 1000 * 24 * 90)
        },
      }
    })
  },
  changeStartDate(value) {
    const { info } = this.data
    const { startDate, endDate } = info
    this.setData({
      info: {
        ...info,
        startDate: {
          ...startDate,
          value,
        },
        endDate: {
          ...endDate,
          value,
          start: value,
          end: unix2cst(cst2unix(value) + 3600 * 1000 * 24 * 90)
        },
      }
    })
  },
  changeEndDate(value) {
    this.setData({
      info: {
        ...info,
        endDate: {
          ...endDate,
          value
        }
      }
    })
  },
  initTime() {
    const { info } = this.data
    const { startTime, endTime } = info
    this.setData({
      info: {
        ...info,
        startTime: {
          ...startTime,
          value: '请设置'
        },
        endTime: {
          ...endTime,
          value: '请设置'
        }
      }
    })
  },
  changeStartTime(value) {
    const { info } = this.data
    const { startTime, endTime } = info
    this.setData({
      info: {
        ...info,
        startTime: {
          ...startTime,
          value
        },
        endTime: {
          ...endTime,
          value
        }
      }
    })
    if (startTime.value !== '请设置' && endTime.value < startTime.value) {
      this.setData({
        info: {
          ...info,
          endTime: {
            ...endTime,
            value
          }
        }
      })
    }
  },
  changeEndTime(value) {
    const { info } = this.data
    const { startTime, endTime } = info
    this.setData({
      info: {
        ...info,
        startTime: {
          ...startTime,
          value
        },
        endTime: {
          ...endTime,
          value
        }
      }
    })
  },
  changeTaskName(value) {
    const { info } = this.data
    const { taskName } = info
    this.setData({
      info: {
        ...info,
        taskName: {
          ...taskName,
          value
        }
      }
    })
  },
  deleteTaskItem(key) {
    const { info } = this.data
    const { taskList } = info
    this.setData({
      info: {
        ...info,
        taskList: taskList.filter(item => item.id !== key)
      }
    })
  },
  changeTaskItemContent(key, value) {
    const { info } = this.data
    const { taskList } = info
    let index = this.findTask(key)
    if (index !== -1) {
      this.setData({
        info: {
          ...info,
          taskList: taskList.map((item, itemIndex) => itemIndex === index ? { ...item, value } : item)
        }
      })
    }
  },
  findTask(key) {
    let itemIndex = -1
    const { info } = this.data
    const { taskList } = info
    taskList.forEach((item, index) => {
      if (item.id === parseInt(key)) {
        itemIndex = index
      }
    })
    return itemIndex
  },
  changeIsPublic(value) {
    const { info } = this.data
    const { public } = info
    this.setData({
      info: {
        ...info,
        public: {
          ...public,
          value
        }
      }
    })
  },
  changePlayerNum(value) {
    const { info } = this.data
    const { players } = info
    this.setData({
      info: {
        ...info,
        players: {
          ...players,
          value
        }
      }
    })
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
});
