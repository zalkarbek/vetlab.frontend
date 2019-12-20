<template>
  <div class="page-home row">
    <div class="col-sm-12 col-lg-12">
      <h4>План выполнения</h4>
    </div>
    <div class="col-sm-6 col-lg-3 mg-t-10">
      <div class="card card-body">
        <h6
          class="tx-uppercase tx-11 tx-spacing-1 tx-color-02 tx-semibold mg-b-8"
        >
          Паразитология
        </h6>
        <div class="d-flex d-lg-block d-xl-flex align-items-end">
          <h3 class="tx-normal tx-rubik mg-b-0 mg-r-5 lh-1">51%</h3>
          <p class="tx-11 tx-color-03 mg-b-0">
            <span class="tx-medium tx-success">
              1.2% <i class="fal fa-arrow-up" />
            </span>
            за эту неделю
          </p>
        </div>
      </div>
    </div>
    <div class="col-sm-6 col-lg-3 mg-t-10">
      <div class="card card-body">
        <h6
          class="tx-uppercase tx-11 tx-spacing-1 tx-color-02 tx-semibold mg-b-8"
        >
          Бактериология
        </h6>
        <div class="d-flex d-lg-block d-xl-flex align-items-end">
          <h3 class="tx-normal tx-rubik mg-b-0 mg-r-5 lh-1">47%</h3>
          <p class="tx-11 tx-color-03 mg-b-0">
            <span class="tx-medium tx-success">
              1.8% <i class="fal fa-arrow-up" />
            </span>
            {{ $t('current.week') }}
          </p>
        </div>
      </div>
    </div>
    <div class="col-sm-6 col-lg-3 mg-t-10">
      <div class="card card-body">
        <h6
          class="tx-uppercase tx-11 tx-spacing-1 tx-color-02 tx-semibold mg-b-8"
        >
          Вирусология
        </h6>
        <div class="d-flex d-lg-block d-xl-flex align-items-end">
          <h3 class="tx-normal tx-rubik mg-b-0 mg-r-5 lh-1">78%</h3>
          <p class="tx-11 tx-color-03 mg-b-0">
            <span class="tx-medium tx-success">
              2.4% <i class="fal fa-arrow-up" />
            </span>
            {{ $t('current.week') }}
          </p>
        </div>
      </div>
    </div>
    <div class="col-sm-6 col-lg-3 mg-t-10">
      <div class="card card-body">
        <h6
          class="tx-uppercase tx-11 tx-spacing-1 tx-color-02 tx-semibold mg-b-8"
        >
          Сериология
        </h6>
        <div class="d-flex d-lg-block d-xl-flex align-items-end">
          <h3 class="tx-normal tx-rubik mg-b-0 mg-r-5 lh-1">68%</h3>
          <p class="tx-11 tx-color-03 mg-b-0">
            <span class="tx-medium tx-success">
              3.2% <i class="fal fa-arrow-up" />
            </span>
            {{ $t('current.week') }}
          </p>
        </div>
      </div>
    </div>
    <div class="col-sm-6 col-lg-3 mg-t-10">
      <div class="card card-body">
        <h6
          class="tx-uppercase tx-11 tx-spacing-1 tx-color-02 tx-semibold mg-b-8"
        >
          Тамак-аш
        </h6>
        <div class="d-flex d-lg-block d-xl-flex align-items-end">
          <h3 class="tx-normal tx-rubik mg-b-0 mg-r-5 lh-1">38%</h3>
          <p class="tx-11 tx-color-03 mg-b-0">
            <span class="tx-medium tx-success">
              2.2% <i class="fal fa-arrow-up" />
            </span>
            {{ $t('current.week') }}
          </p>
        </div>
      </div>
    </div>
    <div class="footer-full-content"></div>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],

  components: {},

  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()

      setTimeout(() => this.$nuxt.$loading.finish(), 5000)
    })
  }
}
</script>

<style>
.page-home {
  margin: 0 auto;
  display: flex;
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
