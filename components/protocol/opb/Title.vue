<template>
  <div>
    <b-row>
      <b-col>
        <hr style="border-top-width: 3px;"/>
        <div class="tx-center">
          <h2>{{ otdelToOtdeleniaName }}</h2>
          <span>{{ $t('form.label.address') }}: {{ otdelAddress }}, тел: {{ otdelPhone }}</span>
        </div>
        <hr style="border-top-width: 3px;" />
        <div class="tx-center" style="font-size: 16px;">
          <h3>{{ toUpperCase($t('vet.protocolTest')) }}</h3>
          <span>
           <b>№</b>
            <span style="border-bottom: 1px solid #001737">
              {{ napravlenieNomer }}
            </span>
            <b>от</b>
            <span style="border-bottom: 1px solid #001737">
              {{ formatDateLong(dataZapolnenia) }}
            </span>
          </span>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script>
  import utilMixin from '~/mixins/utilMixin'
  import dateFormatMixin from '~/mixins/dateFormatMixin'

  export default {
    mixins: [
      utilMixin,
      dateFormatMixin
    ],
    props: {
      otdel: Object,
      napravlenie: Object
    },
    computed: {
      napravlenieNomer() {
        return this.napravlenie.nomer
      },

      dataZapolnenia() {
        return this.napravlenie.dataZapolnenia
      },

      otdelComputed() {
        return this.otdel || {}
      },

      otdelData() {
        return this.otdelComputed.otdelDataJSON || {}
      },

      otdelAddress() {
        return this.otdelData.address
      },

      otdelPhone() {
        return this.otdelData.phone_1
      },

      otdelsOtdelenia() {
        return this.otdelComputed.sOtdelenia
          || {}
      },

      otdelToOtdeleniaName() {
        return this.otdelsOtdelenia
          && this.otdelsOtdelenia.reportTitleName
          || ''
      }
    }
  }
</script>
<style></style>
