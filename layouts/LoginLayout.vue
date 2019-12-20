<template>
  <div class="body">
    <app-header />
    <div class="content content-fixed content-auth">
      <div class="container-fluid">
        <nuxt />
      </div>
    </div>
  </div>
</template>
<script>
import HeaderPanel from '../components/HeaderPanel'

export default {
  components: {
    'app-header': HeaderPanel
  }
}
</script>
