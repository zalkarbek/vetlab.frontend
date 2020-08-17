<template>
  <div class="body">
    <div class="content">
      <div class="container">
        <nuxt />
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    components: {},
    head() {
      return this.$nuxtI18nSeo()
    },
  }
</script>
