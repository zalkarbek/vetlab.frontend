<template>
  <div class="container-fluid page-home">
    <main-plan-percent />
    <plan-of-region />
    <main-positive-material />
    <main-forma4 />
    <div class="footer-full-content"></div>
  </div>
</template>

<script>
import MainPositiveMaterial from '~/components/vetlab/MainPositiveMaterial.vue'
import MainPlanPercent from '~/components/vetlab/MainPlanPercent.vue'
import MainForma4 from '~/components/vetlab/MainForma4.vue'
import PlanOfRegion from '~/components/vetlab/PlanOfRegion.vue'

export default {
  components: {
    MainPositiveMaterial,
    MainPlanPercent,
    MainForma4,
    PlanOfRegion
  },

  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 3000)
    })
  }
}
</script>

<style>
.page-home {
  /*margin: 0 auto;*/
  /*display: flex;*/
  /*justify-content: center;*/
  /*align-items: center;*/
  /*text-align: center;*/
}

.title {
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
