<template>
  <div class="crud">
    <div
      class="d-sm-flex align-items-center justify-content-between mg-b-20 mg-lg-b-25 mg-xl-b-30"
    >
      <div>
        <h4 class="mg-b-0 tx-spacing--1 mg-b-7">
          {{ $t(`${restName}.title`) }}
        </h4>
      </div>
      <div class="d-sm-block d-lg-block d-md-block" />
    </div>
    <b-row class="mg-t-10 row-xs">
      <b-col cols="12">
        <vnyt-napravlenie-list
          v-model="crudListRecords"
          :crud-data="crudData"
          :paginate-type="crudListPaginateType"
          :total-rows="crudListTotalRows"
          :page-size="crudListPageSize"
          :page="crudListCurrentPage"
          @on-edit="onEditSelect"
          @on-delete="onDestroy"
          @on-page="onCrudListChangePage"
          @on-page-size="onCrudListChangePageSize"
          @on-search="onCrudListSearch"
          @on-action="onListAction"
        />
      </b-col>
    </b-row>
    <div class="crud-dialogs">
      <template v-for="modal in modals">
        <template v-if="modal.type === modalTypes.form">
          <vnyt-napravlenie-form-modal
            :id="modal.id"
            :title="$t(modal.title)"
            :size="modal.size"
            :crud-data="crudData"
            :modal="modal"
            :form-data="modalFormDataByRestName"
            @on-action="onModalAction"
          />
        </template>
      </template>
    </div>
  </div>
</template>
<script>
import VnytNapravlenieList from './VnytNapravlenieList'
import VnytNapravlenieFormModal from './VnytNapravlenieFormModal'
import VnytNapravlenieComponentMixin from './VnytNapravlenieComponentMixin'
import toastMixin from '~/mixins/toastMixin'

export default {
  components: {
    VnytNapravlenieList,
    VnytNapravlenieFormModal,
  },
  mixins: [toastMixin, VnytNapravlenieComponentMixin],
  created() {
    const localEvents = this.$store.state.busEvents
    this.$eventBus.$on(localEvents.NAPRAVLENIE_SEND_TO_OTDEL_SUCCESS, this.sendNapravlenieSuccess)
  },
  methods: {
    sendNapravlenieSuccess(response) {
      if(response && !response.error) {
        this.pushItemInDatasetFirst(response.data)
      }
    },
    async generateProtocol(button, vnytNapravlenie) {
      console.log(vnytNapravlenie)
      if(
        vnytNapravlenie
        && vnytNapravlenie.status === 'completed'
        && vnytNapravlenie.isledovanies
        && vnytNapravlenie.isledovanies[0]
        && vnytNapravlenie.isledovanies[0].status === 'finish'
      ) {
        const vnytNapravlenieId = vnytNapravlenie.id
        const napravlenieId = vnytNapravlenie.napravlenieId
        const isledovanieId = vnytNapravlenie.isledovanies[0].id

        if(
          vnytNapravlenie && vnytNapravlenie.prinyalOtdel
        ) {
          const prinyalOtdel = vnytNapravlenie.prinyalOtdel
          const params = { vnytNapravlenieId, napravlenieId, isledovanieId }

          if(prinyalOtdel.sOtdeleniaId === this.$store.state.vet.otdelList.FOOD_SAFETY.ID) {
            console.log('ПРОТОКОЛ ОПБ')
            this.go('/reports/opb/protocol', params)
          }

          if(prinyalOtdel.sOtdeleniaId === this.$store.state.vet.otdelList.SEROLOGY.ID) {
            console.log('ПРОТОКОЛ СЕРОЛОГИИ')
            this.go('/reports/serology/protocol', params)
          }

          if(prinyalOtdel.sOtdeleniaId === this.$store.state.vet.otdelList.BACTERIOLOGY.ID) {
            console.log('ПРОТОКОЛ БАКТЕРИОЛОГИИ')
            this.go('/reports/bakteriology/protocol', params)
          }

          if(prinyalOtdel.sOtdeleniaId === this.$store.state.vet.otdelList.VIROLOGY.ID) {
            console.log('ПРОТОКОЛ ВИРУСОЛОГИИ')
            this.go('/reports/virology/protocol', params)
          }

          if(prinyalOtdel.sOtdeleniaId === this.$store.state.vet.otdelList.PARASITOLOGY.ID) {
            console.log('ПРОТОКОЛ ПАРАЗИТОЛОГИИ')
            this.go('/reports/parasitology/protocol', params)
          }
        }
      }
    },

    go(path, query) {
      this.$router.push({ path, query })
    }
  },
}
</script>
