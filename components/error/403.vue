<template>
  <div class="error-403">
    <h1>403</h1>
    <h1>This page doesn’t exist</h1>
    <p>The link you clicked on may be broken or no longer exist.</p>
    <p>
      <button @click="back()" class="btn btn-brand-01 btn-block">Back</button>
    </p>
  </div>
</template>
<script>
export default {
  name: 'Error403',
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>
