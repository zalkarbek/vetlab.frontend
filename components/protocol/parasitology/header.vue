<template>
  <b-row>
    <b-col cols="12">
      <div class="tx-center">
        <b>{{ $t(`vet.department.d_${departmentComputed.id}_reportHeaderRUText`) }}</b><br>
        <span>Адрес: {{ departmentRegion }}, Тел: {{ departmentPhone }}</span>
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

      departmentData() {
        return this.departmentComputed.departmentDataJSON || {}
      },

      departmentRegion() {
        return this.departmentComputed
          && this.departmentComputed.regionJSON
          && this.departmentComputed.regionJSON.regionFullPath
      },

      departmentPostCode() {
        return this.departmentData.postcode
      },

      departmentPhone() {
        return this.departmentData.phone_1
      },

      departmentFax() {
        return this.departmentData.fax
      },

      departmentEmail() {
        return this.departmentData.email
      },

      otdelComputed() {
        return this.otdel || {}
      }
    }
  }
</script>
<style>

</style>
