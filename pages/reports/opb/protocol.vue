<template>
  <div class="page-report">
    <b-row>
      <b-col cols="12">
        <div class="report-header">
          <protocol-header
            :department="isledovanieDepartment"
          />
        </div>
        <div class="report-title">
          <protocol-title
            :otdel="isledovanieOtdel"
            :napravlenie="napravlenie"
          />
        </div>
        <div class="clearfix mg-b-15"></div>
        <div class="report-body">
          <protocol-body
            :data="isledovanieComputed"
          />
        </div>
        <div class="report-result-table">
          <protocol-table
            :data="isledovanieComputed"
          />
        </div>

        <div class="report-footer">
          <protocol-footer
            :data = isledovanieComputed
            :head-personal="headPersonalComputed"
          />
        </div>

        <footer class="footer mg-t-20">
          Южная ветеринарная лаборатория КР
        </footer>
        <div class="clearfix visible-xs"></div>
      </b-col>
    </b-row>
  </div>
</template>
<script>
  import ProtocolHeader from '~/components/protocol/opb/Header'
  import ProtocolFooter from '~/components/protocol/opb/Footer'
  import ProtocolTitle from '~/components/protocol/opb/Title'
  import ProtocolBody from '~/components/protocol/opb/Body'
  import ProtocolTable from '~/components/protocol/opb/Table'
  import utilMixin from '~/mixins/utilMixin'

  export default {
    layout: 'ReportLayout',
    components: {
      ProtocolHeader,
      ProtocolTitle,
      ProtocolFooter,
      ProtocolBody,
      ProtocolTable
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

    async mounted() {}
  }
</script>
