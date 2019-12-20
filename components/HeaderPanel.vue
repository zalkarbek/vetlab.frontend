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
    </div>
    <div class="navbar-right">
      <!--    NAVBAR-SEARCH-BUTTON-->
      <!--    DROPDOWN-MESSAGE-->
      <!--    DROPDOWN-NOTIFICATION-->
      <!--    DROPDOWN-LOCALES-->
      <locales-dropdown />
      <!--    DROPDOWN-PROFILE-->
    </div>
  </header>
</template>
<script>
import LocalesDropdown from './LocalesDropdown'

export default {
  components: {
    'locales-dropdown': LocalesDropdown
  }
}
</script>
