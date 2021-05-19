class DeviceDetection {
  isPhone() {
    if (!this.isMobileChecked) {
      this.isMobileChecked = true
      this.isMobileCheck = document.documentElement.classList.contains('phone')
    }
    return this.isMobileCheck
  }

  isTablet() {
    if (!this.isTabletChecked) {
      this.isTabletChecked = true
      this.isTabletCheck = document.documentElement.classList.contains('tablet')
    }
    return this.isTabletCheck
  }

  isDesktop() {
    if (!this.isDesktopChecked) {
      this.isDesktopChecked = true
      this.isDesktopCheck = document.documentElement.classList.contains('desktop')
    }
    return this.isDesktopCheck
  }
}

const DeviceDetectionManager = new DeviceDetection()

export default DeviceDetectionManager
