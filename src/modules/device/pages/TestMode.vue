<template>
  <ul>
    <li>TEST: isMobile-{{ $device.isMobile }}</li>
    <li>TEST: isMobileOrTablet-{{ $device.isMobileOrTablet }}</li>
    <li>TEST: isTablet-{{ $device.isTablet }}</li>
    <li>TEST: isDesktop-{{ $device.isDesktop }}</li>
    <li>TEST: isDesktopOrTablet-{{ $device.isDesktopOrTablet }}</li>
    <li>TEST: isIos-{{ $device.isIos }}</li>
    <li>TEST: isWindows-{{ $device.isWindows }}</li>
    <li>TEST: isMacOS-{{ $device.isMacOS }}</li>
  </ul>
</template>

<script>
export default {
  name: 'TestMode'
}
</script>
