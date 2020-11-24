<template>
  <div>
    <b-row>
      <b-col>
        <div class="tx-center" style="margin-top: 5px;">
          <h2>{{ otdelToOtdeleniaName }}</h2>
        </div>
        <div class="tx-center" style="font-size: 16px; margin-top: 20px;">
          <h4>{{ toUpperCase($t('vet.protocolTest2')) }}</h4>
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

          <span style="padding-left:250px;">
                <img src="~/assets/img/qrcode.png" alt="" width="128">
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
