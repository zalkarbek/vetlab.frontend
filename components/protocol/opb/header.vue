<template>
  <div>
    <b-row>
      <b-col cols="5" style="height: 120px;">
        <div class="tx-center">

          <div style="font-size: 1em;">
            <b>{{ $t('vet.GosKGText') }}</b>
          </div>

          <div class="mg-t-10">
            <b>
              {{ $t(`vet.department.d_${departmentComputed.id}_reportHeaderKGText`) }}
            </b>
          </div>

          <div class="mg-t-10">
            <span>
              {{ `${ departmentPostCode } ${ departmentRegionFullPath }` }}
            </span>
              <br>
              <span>
              тел: {{ `${ departmentPhone }` }}
            </span>
              <br>
              <span>
              факс: {{ `${ departmentFax }` }}
            </span>
              <br>
              <span>
              {{ `${ departmentEmail }` }}
            </span>
          </div>
        </div>
      </b-col>

      <b-col cols="3">
        <div class="tx-center">
          <img src="~/assets/img/kg_gerb.png" width="128rem" height="128rem">
        </div>
      </b-col>

      <b-col cols="4">
        <div class="tx-center">
          <div style="font-size: 1em;">
            <b>{{ $t('vet.GosRUText') }}</b>
          </div>
          <div class="mg-t-10">
            <b>
              {{ $t(`vet.department.d_${departmentComputed.id}_reportHeaderRUText`) }}
            </b>
          </div>

          <div class="mg-t-10">
            <span>
              {{ `${ departmentPostCode } ${ departmentRegionFullPath }` }}
            </span>
              <br>
              <span>
              тел: {{ `${ departmentPhone }` }}
            </span>
              <br>
              <span>
              факс: {{ `${ departmentFax }` }}
            </span>
              <br>
              <span>
              {{ `${ departmentEmail }` }}
            </span>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    props: {
      department: Object
    },
    computed: {
      departmentComputed() {
        return this.department || {}
      },

      departmentData() {
        return this.departmentComputed.departmentDataJSON || {}
      },

      departmentRegionFullPath() {
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
      }
    }
  }
</script>
<style></style>
