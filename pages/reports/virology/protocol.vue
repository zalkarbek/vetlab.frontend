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

        <div class="report-table">
          <protocol-table
            :data="isledovanieComputed"
          />
        </div>

        <div class="report-footer">
          <protocol-footer
            :data = isledovanieComputed
            :head-personal="headPersonalComputed"
          >

          </protocol-footer>
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
  import ProtocolTitle from '~/components/protocol/virology/Title'
  import ProtocolBody from '~/components/protocol/virology/Body'
  import ProtocolTable from '~/components/protocol/virology/Table'
  import utilMixin from '~/mixins/utilMixin'

  export default {
    layout: 'ReportLayout',
    components: {
      ProtocolHeader,
      ProtocolFooter,
      ProtocolTitle,
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
      const headPersonal = app.$lodash.get(headPersonals, '[0]', {})

      return {
        isledovanie,
        headPersonal
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
