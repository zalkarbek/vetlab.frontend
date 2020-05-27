<template>
  <div class="navbar-right">
    <!--    NAVBAR-SEARCH-BUTTON-->
    <!--    DROPDOWN-MESSAGE-->
    <!--    DROPDOWN-NOTIFICATION-->
    <!--    DROPDOWN-PROFILE-->
    <header-right-profile />
    <!--    DROPDOWN-LOCALES-->
    <header-right-locale />
  </div>
</template>
<script>
import HeaderRightLocale from './_right-locale.vue'
import HeaderRightProfile from './_right-profile.vue'

export default {
  components: {
    'header-right-profile': HeaderRightProfile,
    'header-right-locale': HeaderRightLocale,
  },
}
</script>
<style>
.navbar-header .navbar-right .dropdown:last-child {
  margin-left: -10px;
  margin-right: 10px;
}
</style>
