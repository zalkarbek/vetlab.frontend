<template>
  <div class="page">
    <div
      class="d-sm-flex align-items-center justify-content-between mg-b-20 mg-lg-b-25 mg-xl-b-30"
    >
      <div>
        <h4 class="mg-b-0 tx-spacing--1 mg-b-7">
          {{ $t(`${restData.modelName}.title`) }}
        </h4>
      </div>
      <div class=" d-sm-block d-lg-block d-md-block"></div>
    </div>
    <b-row class="mg-t-20 row-xs">
      <b-col cols="12">
        <create-and-update-form
          v-model="selectedRecord"
          @on-create="onCreate"
          @on-update="onUpdate"
          :rest-data="restData"
        ></create-and-update-form>
      </b-col>
    </b-row>
    <b-row class="mg-t-10 row-xs">
      <b-col cols="12">
        <list
          v-model="records"
          @on-edit="onEditSelect"
          @on-delete="onDestroy"
          :rest-data="restData"
        ></list>
      </b-col>
    </b-row>
    <div class="footer-full-content"></div>
  </div>
</template>
<script>
import createAndUpdateForm from '~/components/RESTCreateAndUpdateForm'
import list from '~/components/RenderList'
import restData from '~/data/rest/s_region_type.json'

export default {
  components: {
    createAndUpdateForm,
    list
  },
  data() {
    return {
      restData,
      selectedRecord: {},
      records: []
    }
  },
  mounted() {
    this.getRecords()
  },
  methods: {
    async onCreate(data) {
      try {
        const res = await this.$store.dispatch('api/req', {
          req: restData.rest.create,
          data
        })
        const message = (res.data && res.data.message) || ''

        this.$bvToast.toast(message, {
          title: this.$i18n.t('success.title'),
          variant: 'success',
          solid: true,
          append: true
        })
      } catch (e) {
        const message =
          (e.response.data && e.response.data.message) || e.message
        this.$bvToast.toast(message, {
          title: this.$i18n.t('error.title'),
          variant: 'danger',
          solid: true,
          append: true
        })
      }
    },
    async onUpdate(data) {
      try {
        const res = await this.$store.dispatch('api/req', {
          req: restData.rest.update,
          data
        })
        const message = (res.data && res.data.message) || ''
        if (!res.data.error) {
          this.clearForm()
        }
        this.$bvToast.toast(message, {
          title: this.$i18n.t('success.title'),
          variant: 'info',
          solid: true,
          append: true
        })
      } catch (e) {
        const message =
          (e.response.data && e.response.data.message) || e.message
        this.$bvToast.toast(message, {
          title: this.$i18n.t('error.title'),
          variant: 'danger',
          solid: true,
          append: true
        })
      }
    },
    async onDestroy(data) {
      try {
        const res = await this.$store.dispatch('api/req', {
          req: restData.rest.destroy,
          data
        })
        const message = (res.data && res.data.message) || ''
        this.$bvToast.toast(message, {
          title: this.$i18n.t('success.title'),
          variant: 'info',
          solid: true,
          append: true
        })
      } catch (e) {
        const message =
          (e.response.data && e.response.data.message) || e.message
        this.$bvToast.toast(message, {
          title: this.$i18n.t('error.title'),
          variant: 'danger',
          solid: true,
          append: true
        })
      }
    },
    clearForm() {
      this.selectedRecord = {}
    },
    onEditSelect(data) {
      this.selectedRecord = data
    },

    async getRecords() {
      const { data } = await this.$store.dispatch('api/req', {
        req: this.restData.rest.all
      })
      this.records = [...data]
    }
  }
}
</script>
