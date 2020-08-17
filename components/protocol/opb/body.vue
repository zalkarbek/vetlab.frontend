<template>
  <div>
    <b-row>
      <b-col>
        <div style="font-size: 1.2em;">
          <table class="table table-sm">
            <tbody>
              <tr>
                <th style="width: 5%">1</th>
                <td>
                  <span class="tx-bold">
                    {{ $t('vet.testObject') }}:
                  </span>
                </td>
                <td>
                  <span v-for="(material, index) in uniquePosMaterials">
                    {{ getProp(material, 'sMaterialJSON[0].name', '') }}
                    -
                    {{ getProp(material, 'materialCount', '') }}
                    {{ getProp(material, 'sMera.shortName', '') }}
                    <span v-if="uniquePosMaterials.length !== index + 1">,</span>
                  </span>
                </td>
              </tr>
              <tr>
                <th>2</th>
                <td>
                  <span class="tx-bold">
                    {{ $t('vet.materialCount') }}:
                  </span>
                </td>
                <td>
                  {{ `${ posMaterials.length } ${ $t('vet.proba') }` }}
                </td>
              </tr>
              <tr>
                <th>3</th>
                <td>
                  <span class="tx-bold">
                    {{ $t('vet.customer') }}:
                  </span>
                </td>
                <td>
                  {{ customer.fullName }}
                </td>
              </tr>

              <tr>
                <th>3</th>
                <td>
                  <span class="tx-bold">
                    {{ $t('vet.nomerZakaza') }}:
                  </span>
                </td>
                <td>
                  {{ napravlenieData.napravlenieZakazNomer || 'б/н' }}
                </td>
              </tr>

              <tr>
                <th>3</th>
                <td>
                  <span class="tx-bold">
                    {{ $t('vet.dataPostup') }}:
                  </span>
                </td>
                <td>
                  {{ formatDateBase(napravlenie.dataZapolnenia) }}
                </td>
              </tr>

              <tr>
                <th>3</th>
                <td>
                  <span class="tx-bold">
                    {{ $t('vet.dataProvedenia') }}:
                  </span>
                </td>
                <td>
                  <b>с</b>
                  {{ formatDateBase(napravlenie.dateStart) }}
                  &nbsp;
                  <b>по</b>
                  {{ formatDateBase(napravlenie.dateFinish) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
      },
      uniquePosMaterials() {
        const uniques = []
        this.posMaterials.forEach((posMaterial) => {
          if(uniques && uniques.length === 0) {
            uniques.push(posMaterial)
          }
          const duplicate = uniques.find((item) => {

            const material = posMaterial.sMaterialJSON
              && Array.isArray(posMaterial.sMaterialJSON)
              && posMaterial.sMaterialJSON[0]

            const duplicateMaterial = item.sMaterialJSON
              && Array.isArray(item.sMaterialJSON)
              && item.sMaterialJSON[0]

            return Number(material.id) === Number(duplicateMaterial.id)
          })
          if(!duplicate) {
            uniques.push(posMaterial)
          }
        })
        return uniques
      }
    }
  }
</script>
<style></style>
