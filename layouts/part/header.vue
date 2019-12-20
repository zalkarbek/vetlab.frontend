<template>
  <header class="navbar navbar-header navbar-header-fixed">
    <a id="mainMenuOpen" href="" class="burger-menu">
      <i class="fal fa-bars" />
    </a>

    <div class="navbar-brand">
      <a href="/" class="df-logo">vetlab<span>yug</span></a>
    </div>

    <div id="navbarMenu" class="navbar-menu-wrapper">
      <div class="navbar-menu-header">
        <a href="/" class="df-logo">vetlab<span>yug</span></a>
        <a id="mainMenuClose" href="">
          <i class="fal fa-times" />
        </a>
      </div>
      <header-left-menu />
    </div>
    <header-right-menu />
  </header>
</template>
<script>
import HeaderLeftMenu from './header/header-left-menu.vue'
import HeaderRightMenu from './header/header-right-menu.vue'

export default {
  components: {
    'header-left-menu': HeaderLeftMenu,
    'header-right-menu': HeaderRightMenu
  }
}
</script>
