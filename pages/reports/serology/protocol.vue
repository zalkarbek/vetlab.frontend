<template>
  <b-container fluid class="page-report">
    <b-row>
      <b-col cols="12">
        <div class="report-header">
          <protocol-header></protocol-header>
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
  import ProtocolHeader from '~/components/protocol/serology/Header'
  import ProtocolFooter from '~/components/protocol/serology/Footer'
  export default {
    components: {
      ProtocolHeader,
      ProtocolFooter
    },
    layout: 'ReportLayout',
  }
</script>
