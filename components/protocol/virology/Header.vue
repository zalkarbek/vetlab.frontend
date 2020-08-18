<template>
  <b-row>
    <b-col cols="12">
      <div class="tx-center">
        <b>{{ $t('vet.svdieReportHeaderRUText') }}</b><br>
        <span>Адрес:г.Ош</span>
      </div>
    </b-col>
  </b-row>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    props: {
      department: Object,
      otdel:Object
    },
    computed: {
      departmentComputed() {
        return this.department || {}
      },
      otdelComputed() {
        return this.otdel || {}
      }
    }
  }
</script>
<style>

</style>
