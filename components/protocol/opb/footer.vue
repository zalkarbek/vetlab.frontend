<template>
  <div>
    <b-row>
      <b-col>
        <div style="width:80%; margin: 0 auto; font-size: 16px;" class="tx-bold">
          <div>
            <span>{{ $t('report.protocol.testPerformers') }}:</span>
          </div>

          <div style="padding-left: 20px;">
            <table class="table table-borderless table-sm">
              <tbody class="tx-left">
              <template v-for="(senior, index) in seniors">
                <tr>
                  <td style="width: 30%;">
                    <span>{{ $t('report.protocol.senior') }} {{ index !== 0 ? index: '' }}:</span>
                  </td>
                  <td>
                    <span style="padding-left: 150px; border-bottom: 1px solid #1b2e4b">&nbsp;</span>
                    <span style="padding-left: 2px;">
                      {{ senior.fullName }}
                    </span>
                  </td>
                </tr>
              </template>

              <template v-for="(chemist, index) in chemists">
                <tr>
                  <td>
                    <span>{{ $t('report.protocol.chemist') }} {{ index !== 0 ? index: '' }}:</span>
                  </td>
                  <td>
                    <span style="padding-left: 150px; border-bottom: 1px solid #1b2e4b">&nbsp;</span>
                    <span style="padding-left: 2px;">
                      {{ chemist.fullName }}
                    </span>
                  </td>
                </tr>
              </template>

              <template v-for="(laborant, index) in laborants">
                <tr>
                  <td>
                    <span>{{ $t('report.protocol.laborant') }} {{ index !== 0 ? index: '' }}:</span>
                  </td>
                  <td>
                    <span style="padding-left: 150px; border-bottom: 1px solid #1b2e4b">&nbsp;</span>
                    <span style="padding-left: 2px;">
                      {{ laborant.fullName }}
                    </span>
                  </td>
                </tr>
              </template>
              </tbody>
            </table>
          </div>

          <div>
            <span>{{ $t('report.protocol.headDescTitle') }} :</span>
          </div>
          <div>
            <span>{{ $t('report.protocol.headOPB') }} :</span>
            <span style="padding-left: 150px; border-bottom: 1px solid #1b2e4b">&nbsp;</span>
            <span style="padding-left: 2px;">
              {{ headPersonalComputed.fullName }}
            </span>
          </div>
        </div>
      </b-col>
      <b-col cols="3">
        <span>
          <b-img src="~/assets/img/qrcode.png" alt="" width="128" style="float: right" />
        </span>
      </b-col>

    </b-row>
    <b-row class="mg-t-20">
      <b-col>
        <div>
          <p style="text-decoration: underline;">
            <span class="tx-danger">{{ $t('report.protocol.note') }}:</span>
            {{ $t('report.protocol.footerNoteOpb') }}
          </p>
        </div>
        <div class="tx-center">
          <span class="tx-bold">{{ $t('report.protocol.theEnd') }}</span>
        </div>
      </b-col>
    </b-row>
    <div class="clearfix"></div>
  </div>
</template>
<script>
  export default {
    props: {
      data: Object,
      headPersonal: Object
    },
    computed: {
      headPersonalComputed() {
        return this.headPersonal || {}
      },
      dataComputed() {
        return this.data || {}
      },
      finishedOtdelId() {
        return this.dataComputed.finishedOtdelId
      },
      isledovanieData() {
        return this.dataComputed.isledovanieDataJSON || {}
      },
      chemists() {
        return this.isledovanieData.chemists
      },
      laborants() {
        return this.isledovanieData.laborants
      },
      seniors() {
        return this.isledovanieData.seniors
      }
    },
    mounted() {}
  }
</script>
