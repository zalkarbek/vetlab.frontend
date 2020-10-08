<template>
  <div>
    <b-row>
      <b-col>
        <table class="table table-bordered table-sm">
          <thead>
          <tr class="tx-center bg-primary-light" style="font-size: 16px;">
            <th class="align-middle">
              {{ $t('vet.pokazatel') }}
            </th>
            <th class="align-middle">
              {{ $t('vet.gosStandard') }}
            </th>
            <th class="align-middle">
              {{ $t('vet.resultIndex') }}
            </th>
            <th class="align-middle">
              {{ $t('vet.result') }}
            </th>
          </tr>
          </thead>
          <tbody>
            <template v-for="(result, index) in results">
              <tr style="font-size: 16px;">
                <td
                  :rowspan="getProp(results, '[0].proby', [0]).length + 1"
                  class="tx-center align-middle"
                >
                  <span class="tx-bolder" style="font-size: 16px;">
                    {{ pokazatels[index].name }}
                  </span>
                </td>
                <td
                  :rowspan="getProp(results, '[0].proby', [0]).length + 1"
                  class="align-middle"
                  style="width: 20%;"
                >
                  <span class="tx-color-02">
                    {{ ndMetod[index].name }}
                  </span>
                </td>
              </tr>
              <template v-for="(proba) in getProp(result, 'proby')">
                <tr>
                  <td class="align-middle tx-center">
                    {{ getProp(proba, 'indexProby') }}
                  </td>

                  <td class="tx-center align-middle">
                    <span class="tx-bold">
                      <span v-for="(res, index) in proba.result">
                        {{ getProp(res, 'name') }}
                        <span v-if="(index + 1) !== proba.result.length">, </span>
                      </span>
                    </span>
                  </td>
                </tr>
              </template>
            </template>
          </tbody>
        </table>
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
      data: Object
    },
    computed: {
      dataComputed() {
        return this.data || {}
      },
      pokazatels() {
        console.log(this.dataComputed.opPokazatelJSON)
        return this.dataComputed.opPokazatelJSON || []
      },
      results() {
        return this.dataComputed.isResultJSON || []
      },
      ndMetod() {
        return this.dataComputed.metodJSON || []
      },
      vnytNapravlenie() {
        return this.dataComputed.vnytNapravlenie || {}
      },
      napravlenie() {
        return this.vnytNapravlenie.napravlenie || {}
      },
      napravlenieData() {
        return this.napravlenie.napravlenieDataJSON || {}
      },
      posMaterials() {
        return this.vnytNapravlenie.posMaterials || []
      },
      customer() {
        const posMaterialOwner = this.getProp(this.posMaterials, '[0].ownerJSON')
        const ownerJSON = this.napravlenie.ownerJSON
        return posMaterialOwner || ownerJSON || {}
      }
    }
  }
</script>
<style></style>
