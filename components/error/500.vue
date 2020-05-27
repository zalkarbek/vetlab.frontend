<template>
  <div class="error-500">
    <h1>500</h1>
    <h1>Internal Server Error</h1>
    <p>message</p>
    <p>
      <button class="btn btn-brand-01 btn-block" @click="back()">
        Back
      </button>
    </p>
  </div>
</template>
<script>
export default {
  name: 'Error500',
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
  },
}
</script>
