<template>
  <b-container fluid class="page-report">
    <b-row>
      <b-col cols="12">
        <div class="report-header">
          <protocol-header
            :department="isledovanieDepartment"
            :otdel="isledovanieOtdel"
          />
        </div>
        <div class="report-footer">
          <protocol-footer></protocol-footer>
        </div>
        <footer class="footer">
          Южная ветеринарная лаборатория КР
        </footer>
        <div class="clearfix visible-xs"></div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
  import ProtocolHeader from '~/components/protocol/virology/Header'
  import ProtocolFooter from '~/components/protocol/virology/Footer'
  import utilMixin from '~/mixins/utilMixin'

  export default {
    layout: 'ReportLayout',
    components: {
      ProtocolHeader,
      ProtocolFooter
    },
    mixins: [utilMixin],

    async asyncData({ query, app }) {
      const vnytNapravlenieId = query.vnytNapravlenieId;
      const napravlenieId = query.napravlenieId;
      const isledovanieId = query.isledovanieId;

      const reportService = app.$api.getApi('report')
      const personalService = app.$api.getApi('personal')

      const isledovanie = await reportService.getIsledovanieReportData({
        vnytNapravlenieId, napravlenieId, isledovanieId
      })
      const otdelId = isledovanie.finishedOtdelId
      const headPersonals = await personalService.getHeadsByOtdelId({ otdelId })

      return {
        isledovanie,
        headPersonal: app.$lodash.get(headPersonals, '[0]', {})
      }
    },

    computed: {
      headPersonalComputed() {
        return this.headPersonal
      },

      isledovanieComputed() {
        return this.isledovanie || {}
      },

      isledovanieDepartment() {
        return this.isledovanieComputed.otdel
          && this.isledovanieComputed.otdel.department
          || {}
      },
      isledovanieOtdel() {
        return this.isledovanieComputed.finishedOtdel || {}
      },
      vnytNapravlenie() {
        return this.isledovanieComputed.vnytNapravlenie || {}
      },
      napravlenie() {
        return this.vnytNapravlenie.napravlenie || {}
      }
    },
  }
</script>
