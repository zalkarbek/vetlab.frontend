class TimeOut {
  constructor() {
    this.timerId = null
  }

  pause(ms) {
    const milSecond = ms || 4
    return new Promise((resolve) => {
      this.timerId = setTimeout(resolve, milSecond)
    })
  }

  cancel() {
    clearTimeout(this.timerId)
    this.timerId = null
  }
}

export default TimeOut

export { TimeOut }
