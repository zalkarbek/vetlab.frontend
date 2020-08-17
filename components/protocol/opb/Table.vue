<template>
  <div>
    <b-row>
      <b-col>
        <table class="table table-bordered table-sm">
          <thead>
            <tr class="tx-center bg-primary-light" style="font-size: 16px;">
              <th class="align-middle">
                {{ $t('vet.regNomerProby') }}
              </th>
              <th class="align-middle">
                {{ $t('vet.pokazatelEd') }}
              </th>
              <th class="align-middle">
                {{ $t('vet.resultatIsledovanie') }}
              </th>
              <th class="align-middle">
                {{ $t('vet.pdk') }}
              </th>
              <th class="align-middle">
                {{ $t('vet.gosStandard') }}
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="resultItem in results">
              <tr>
                <td
                  :rowspan="getProp(resultItem, 'result', [0]).length + 1"
                  class="tx-center align-middle"
                  style="width:5%;"
                >
                  <span class="tx-bolder" style="font-size: 16px;">
                    {{ resultItem.nomerProby }}
                  </span>
                </td>
              </tr>

              <template v-for="(result, resultIndex) in getProp(resultItem, 'result')">
                <tr style="font-size: 16px;">
                  <td class="align-middle">
                    {{ getProp(result, 'opPokazatel', {}).name }}
                  </td>
                  <td class="tx-center align-middle" style="width: 14%;">
                    <span class="tx-bold">
                      {{ getProp(result, 'value', '') }}
                      <span
                          v-if="
                          Number(getProp(result, 'fault', 0)) !== 0
                        "
                      >
                      ± {{ getProp(result, 'fault', 0) }}
                      </span>
                    </span>
                  </td>
                  <td class="tx-center align-middle" style="width: 15%">
                    <template v-if="result.pdk">
                      <template v-if="getProp(result.pdk, 'pdkType', null) === 'range'">
                        <span class="tx-bold">
                          {{`
                            ${ $t('form.label.from') }
                            ${ getProp(result.pdk, 'pdkJSON.rangeMin') }
                            ${ $t('form.label.to') }
                            ${ getProp(result.pdk, 'pdkJSON.rangeMax') }
                            ${ getProp(result.pdk, 'pdkMera') }
                          `}}
                        </span>
                      </template>
                      <template v-else>
                        <span class="tx-bold">
                          {{`
                            ${ $t(`form.label.${ getProp(result.pdk, 'pdkType') }`) }
                            ${ getProp(result.pdk, `pdkJSON[${ getProp(result.pdk, 'pdkType') }]`) }
                            ${ getProp(result.pdk, 'pdkMera') }
                          `}}
                        </span>
                      </template>
                    </template>
                  </td>
                  <td class="align-middle" style="width: 20%;">
                    <span class="tx-color-02">
                      {{ ndMetod[resultIndex].name }}
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
