<template>
  <b-modal
    :id="id"
    :title="$t(title)"
    :size="size"
    :header-bg-variant="headerBgVariant"
    :header-text-variant="headerTextVariant"
    :body-bg-variant="bodyBgVariant"
    :body-text-variant="bodyTextVariant"
    :footer-bg-variant="footerBgVariant"
    :footer-text-variant="footerTextVariant"
    :header-class="modal.headerClass"
    :body-class="modal.bodyClass"
    :footer-class="modal.footerClass"
    @ok="handleOk"
    @hidden="handleCancel"
  >
    <b-col cols="12">
      <template v-if="modal.type === modalTypes.form && modalFormData">
        <table class="table table-sm">
          <thead>
          <tr>
            <th colspan="2">
              {{ $t('isledovanie.label.isledovanieResultTableHead') }}
              (<small class="tx-danger">
                {{ $t('isledovanie.label.isledovanieResultDesc') }}
              </small>)
              <b-button-group class="float-right">
                <b-button
                  @click="addResult()"
                  variant="primary"
                  size="xs"
                >
                  <i class="fas fa-plus"></i>
                </b-button>
                <b-button
                  @click="clearResultExceptFirst()"
                  variant="danger"
                  size="xs"
                >
                  <i class="fas fa-trash"></i>
                </b-button>
              </b-button-group>
            </th>
          </tr>
          </thead>
          <tbody>
            <template v-for="(result, index) in isResult">

              <template v-if="isFoodSafetyOtdel">
                <tr>
                  <td class="bg-success-light">
                    <span class="tx-bold">
                      {{ $t('isledovanie.label.nomberProbyTiny') }}
                    </span>
                  </td>
                  <td class="bg-success-light">
                    <span class="tx-16 tx-bold">
                      {{
                        renderJSONArrayToList(
                          getProp(result, 'posMaterial.sMaterialJSON', [])
                          , 'name'
                        )
                      }}
                    </span>
                    <span class="tx-primary tx-16 tx-bold">
                      ### {{ index + 1 }} ###
                    </span>
                    <span class="float-right">
                      <b-button
                        v-if="index >= 1"
                        @click="removeResultByIndex(index, isResult)"
                        class="badge"
                        variant="flat"
                        size="xs"
                      >
                        <i class="fas fa-times cursor-pointer tx-16"></i>
                      </b-button>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td class="tx-center align-middle">
                    <span class="tx-20 tx-primary tx-bold">
                      {{ result.nomerProby }}
                    </span>
                  </td>
                  <td>
                    <b-row>
                      <b-col cols="8">
                        <b-form-group
                          :label='$t(opPokazatelField.label)'
                          :description='$t(opPokazatelField.description)'
                        >
                          <multiselect
                            v-model="result.opPokazatelJSON"
                            :value="result.opPokazatelJSON"
                            :options="datasetList[opPokazatelField.foreign_dataset]"
                            :label="opPokazatelField.foreign_label"
                            :placeholder="$t(opPokazatelField.placeholder || `form.label.${opPokazatelField.key}`)"
                            :selectLabel="$t('form.label.selectItem')"
                            :selectedLabel="$t('form.label.selectedItem')"
                            :deselectLabel="$t('form.label.deselectItem')"
                            :tagPlaceholder="$t('form.label.addNewPokazatel')"
                            multiple
                            taggable
                            track-by="name"
                            @open="storageLoadDataSet(opPokazatelField)"
                            @tag="(pokazatel) => addNewTag(pokazatel, result.opPokazatelJSON, opPokazatelField)"
                          />
                        </b-form-group>
                      </b-col>
                      <b-col cols="4">
                        <b-form-group
                          :label='$t(methodField.label)'
                          :description='$t(methodField.description)'
                        >
                          <multiselect
                            v-model="result.metodJSON"
                            :options="datasetList[methodField.foreign_dataset]"
                            :label="methodField.foreign_label"
                            :placeholder="$t(methodField.placeholder || `form.label.${methodField.key}`)"
                            :selectLabel="$t('form.label.selectItem')"
                            :selectedLabel="$t('form.label.selectedItem')"
                            :deselectLabel="$t('form.label.deselectItem')"
                            :tagPlaceholder="$t('form.label.addNewPokazatel')"
                            multiple
                            taggable
                            track-by="name"
                            @open="storageLoadDataSet(methodField)"
                            @tag="(metod) => addNewTag(metod, result.metodJSON, methodField)"
                          />
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="6">
                        <b-form-group
                          :label="$t(isledovanieResultNamesField.label)"
                          :description="$t(isledovanieResultNamesField.description)"
                        >
                          <multiselect
                            v-model="result.resultJSON"
                            :options="datasetList[isledovanieResultNamesField.foreign_dataset]"
                            :label="isledovanieResultNamesField.foreign_label"
                            :placeholder="$t(isledovanieResultNamesField.placeholder)"
                            :selectLabel="$t('form.label.selectItem')"
                            :selectedLabel="$t('form.label.selectedItem')"
                            :deselectLabel="$t('form.label.deselectItem')"
                            :tagPlaceholder="$t('form.label.addNewPokazatel')"
                            multiple
                            taggable
                            track-by="name"
                            @open="storageLoadDataSet(isledovanieResultNamesField)"
                            @tag="(name) => addNewTag(name, result.resultJSON, isledovanieResultNamesField)"
                          />
                        </b-form-group>
                      </b-col>
                      <b-col cols="6">
                        <b-form-group
                          :label="$t(isledovaniePdkNamesField.label)"
                          :description="$t(isledovaniePdkNamesField.description)"
                        >
                          <multiselect
                            v-model="result.pdkJSON"
                            :options="datasetList[isledovaniePdkNamesField.foreign_dataset]"
                            :label="isledovaniePdkNamesField.foreign_label"
                            :placeholder="$t(isledovaniePdkNamesField.placeholder)"
                            :selectLabel="$t('form.label.selectItem')"
                            :selectedLabel="$t('form.label.selectedItem')"
                            :deselectLabel="$t('form.label.deselectItem')"
                            :tagPlaceholder="$t('form.label.addNewPokazatel')"
                            multiple
                            taggable
                            track-by="name"
                            @open="storageLoadDataSet(isledovaniePdkNamesField)"
                            @tag="(name) => addNewTag(name, result.pdkJSON, isledovaniePdkNamesField)"
                          />
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </td>
                </tr>
              </template>

              <template v-else>
                <tr>
                  <td colspan="2" class="bg-success-light">
                  <span class="tx-primary tx-16 tx-bold">
                    {{ $t('isledovanie.label.isledovanieResult') }}
                    ### {{ index + 1 }} ###
                  </span>
                    <span class="float-right">
                    <b-button
                        v-if="index >= 1"
                        @click="removeResultByIndex(index, isResult)"
                        class="badge"
                        variant="flat"
                        size="xs"
                    >
                      <i class="fas fa-times cursor-pointer tx-16"></i>
                    </b-button>
                  </span>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <b-row>
                      <b-col>
                        <b-form-group
                          :label='$t(opPokazatelField.label)'
                          :description='$t(opPokazatelField.description)'
                        >
                          <multiselect
                            v-model="result.opPokazatelJSON"
                            :value="result.opPokazatelJSON"
                            :options="datasetList[opPokazatelField.foreign_dataset]"
                            :label="opPokazatelField.foreign_label"
                            :placeholder="$t(opPokazatelField.placeholder || `form.label.${opPokazatelField.key}`)"
                            :selectLabel="$t('form.label.selectItem')"
                            :selectedLabel="$t('form.label.selectedItem')"
                            :deselectLabel="$t('form.label.deselectItem')"
                            :tagPlaceholder="$t('form.label.addNewPokazatel')"
                            multiple
                            taggable
                            track-by="name"
                            @open="storageLoadDataSet(opPokazatelField)"
                            @tag="(pokazatel) => addNewTag(pokazatel, result.opPokazatelJSON, opPokazatelField)"
                          />
                        </b-form-group>
                      </b-col>
                      <b-col cols="5">
                        <b-form-group
                          :label='$t(methodField.label)'
                          :description='$t(methodField.description)'
                        >
                          <multiselect
                            v-model="result.metodJSON"
                            :options="datasetList[methodField.foreign_dataset]"
                            :label="methodField.foreign_label"
                            :placeholder="$t(methodField.placeholder || `form.label.${methodField.key}`)"
                            :selectLabel="$t('form.label.selectItem')"
                            :selectedLabel="$t('form.label.selectedItem')"
                            :deselectLabel="$t('form.label.deselectItem')"
                            :tagPlaceholder="$t('form.label.addNewPokazatel')"
                            multiple
                            taggable
                            track-by="name"
                            @open="storageLoadDataSet(methodField)"
                            @tag="(metod) => addNewTag(metod, result.metodJSON, methodField)"
                          />
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </td>
                </tr>
                <template v-for="(proba, probaIndex) in result.proby">
                  <tr>
                    <td colspan="2">
                      <b-button-group >
                        <b-button
                          class="badge"
                          @click="addProbaResult(result.proby)"
                          variant="primary"
                          size="xs"
                        >
                          <i class="fas fa-plus"></i>
                        </b-button>
                        <b-button
                          class="badge"
                          @click="removeProbaByIndex(probaIndex, result.proby)"
                          variant="danger"
                          size="xs"
                        >
                          <i class="fas fa-times"></i>
                        </b-button>
                      </b-button-group>
                      <b-row>
                        <b-col cols="4">
                          <b-form-group
                            :label="$t('isledovanie.label.indexProby')"
                            :description="$t('isledovanie.description.indexProby')"
                          >
                            <b-form-input
                              v-model="proba.indexProby"
                              :placeholder="$t('isledovanie.placeholder.indexProby')"
                            />
                          </b-form-group>
                        </b-col>
                        <b-col>
                          <b-form-group
                            :label="$t(isledovanieResultNamesField.label)"
                            :description="$t(isledovanieResultNamesField.description)"
                          >
                            <multiselect
                              v-model="proba.resultJSON"
                              :options="datasetList[isledovanieResultNamesField.foreign_dataset]"
                              :label="isledovanieResultNamesField.foreign_label"
                              :placeholder="$t(isledovanieResultNamesField.placeholder)"
                              :selectLabel="$t('form.label.selectItem')"
                              :selectedLabel="$t('form.label.selectedItem')"
                              :deselectLabel="$t('form.label.deselectItem')"
                              :tagPlaceholder="$t('form.label.addNewPokazatel')"
                              multiple
                              taggable
                              track-by="name"
                              @open="storageLoadDataSet(isledovanieResultNamesField)"
                              @tag="(name) => addNewTag(name, proba.resultJSON, isledovanieResultNamesField)"
                            />
                          </b-form-group>
                        </b-col>
                      </b-row>
                    </td>
                  </tr>
                </template>
              </template>

            </template>
          </tbody>
        </table>
      </template>
    </b-col>
  </b-modal>
</template>
<script>
  import IsledovanieFormModalMixin from './IsledovanieFormModalMixin'
  import { mapState } from 'vuex'
  export default {
    mixins: [IsledovanieFormModalMixin],
    data() {
      return {
        isResult: [],
        resultItem: {
          opPokazatelJSON: [],
          metodJSON: [],
          proby: [
            {
              indexProby: '',
              resultJSON: [],
              stepenInfection: ''
            }
          ],
        },
        foodSafetyResultItem: {
          nomerProby: '',
          opPokazatelJSON: [],
          resultJSON: [],
          pdkJSON: [],
          metodJSON: []
        },
        opPokazatelField: {
          key: 'opPokazatelJSON',
          label: 'isledovanie.label.opPokazatel',
          description: 'isledovanie.description.opPokazatel',
          foreign_crud: 's_pokazatel',
          foreign_dataset: 'pokazatel',
          foreign_label: 'name',
          foreign_value: 'name',
          foreign_attributes: ['name', 'id']
        },
        methodField: {
          key: 'metodJSON',
          label: 'isledovanie.label.researchMetodJSON',
          description: 'isledovanie.description.researchMetodJSON',
          placeholder: 'isledovanie.placeholder.researchMetodJSON',
          foreign_crud: 's_metod',
          foreign_dataset: 'metod',
          foreign_label: 'name',
          foreign_value: 'name',
          foreign_attributes: ['id', 'name', 'shortName', 'gosStandard']
        },
        isledovanieResultNamesField: {
          key: 'resultJSON',
          label: 'isledovanie.label.resultJSON',
          description: 'isledovanie.description.resultJSON',
          placeholder: 'isledovanie.placeholder.resultJSON',
          foreign_crud: 'isledovanie_result_names',
          foreign_dataset: 'isledovanieResultNames',
          foreign_label: 'name',
          foreign_value: 'name',
          foreign_attributes: ['id', 'name', 'shortName']
        },
        isledovaniePdkNamesField: {
          key: 'pdkJSON',
          label: 'isledovanie.label.pdkJSON',
          description: 'isledovanie.description.pdkJSON',
          placeholder: 'isledovanie.placeholder.pdkJSON',
          foreign_crud: 'isledovanie_pdk_names',
          foreign_dataset: 'isledovaniePdkNames',
          foreign_label: 'name',
          foreign_value: 'name',
          foreign_attributes: ['id', 'name', 'shortName']
        }
      }
    },
    computed: {
      ...mapState({
        user: (state) => state.user,
      }),
      ...mapState('vet', {
        otdelList: (state) => state.otdelList,
      }),

      isFoodSafetyOtdel() {
        const id = this.getProp(this.formData, 'otdel.sOtdeleniaId', false)
        return id === this.otdelList.FOOD_SAFETY.ID
      }
    },
    watch: {
      formData(newData, oldData) {
        if(this.isFoodSafetyOtdel) {
          this.initFoodSafetyFields(newData)
        } else {
          this.initResultFields(newData)
        }

      }
    },
    methods: {
      handleOk(event) {
        if(this.isFoodSafetyOtdel && !this.checkFoodSafetyResult()) {
          event.preventDefault()
          return false
        }

        if(!this.isFoodSafetyOtdel && !this.checkResult()) {
          event.preventDefault()
          return false
        }

        this.modalFormData.isResult = this.cloneDeep(this.isResult)
        this.$emit('on-action', {
          actionMethod: this.modal.okAction,
          data: this.modalFormData,
          modalCrud: this.modalCrud,
          cb: (validated, { message }) => {
            if (!validated) {
              event.preventDefault()
              this.toastDanger(message, 'error.title')
            } else {
              this.toastSuccess(message)
            }
          },
        })
      },

      initResultFields(formData) {
        this.isResult = []
        if(formData) {
          formData.isResult = []
          const resultItem = {
            opPokazatelJSON: [
              ...this.getProp(formData, 'opPokazatelJSON', [])
            ],
            metodJSON: [
              ...this.getProp(formData, 'metodJSON', [])
            ],
            proby: [
              {
                indexProby: '',
                resultJSON: [],
                stepenInfection: ''
              }
            ],
          }
          this.$set(this.isResult, 0, resultItem)
        }
      },
      initFoodSafetyFields(formData) {
        this.isResult = []
        if(formData) {
          const posMaterials = this.getProp(formData, 'vnytNapravlenie.posMaterials', [])
          posMaterials.forEach((posMaterial, index) => {
            const resultItem = {
              posMaterial: {
                id: posMaterial.id,
                sMaterialJSON: posMaterial.sMaterialJSON
              },
              nomerProby: posMaterial.nomer || posMaterial.id,
              opPokazatelJSON: [
                ...this.getProp(formData, 'opPokazatelJSON', [])
              ],
              metodJSON: [
                ...this.getProp(formData, 'metodJSON', [])
              ],
              resultJSON: [],
              pdkJSON: [],
            }
            this.$set(this.isResult, index, resultItem)
          })
        }
      },

      async addNewTag(newTag, item, field) {
        const data = {}
        data[field.foreign_label] = newTag
        const req = this.crud[field.foreign_crud].rest.create
        try {
          const result = await this.request({ req, data })
          let res = result
          let tag = {}
          if(result.data) {
            res = result.data
          }
          if(res.data && !res.error) {
            this.pushItemInStoreDatasetFirst(res.data, field.foreign_dataset)

            if(field.foreign_attributes && Array.isArray(field.foreign_attributes)) {
              const itemOnAttr = {}
              field.foreign_attributes.forEach((attr) => {
                itemOnAttr[attr] = res.data[attr]
              })
              tag = itemOnAttr
            } else {
              tag = {
                [field.foreign_label]: res.data[field.foreign_label],
                id: res.data.id
              }
            }

            if(item && !Array.isArray(item)) {
              item = []
            }

            this.$set(item, item.length, tag)

          } else {
            this.toastDanger(this.$t(`${field.foreign_crud}.error.notAdd.${field.key}`))
          }
        } catch (e) {
          this.toastDanger(this.$t(`${field.foreign_crud}.error.notAdd.${field.key}`))
        }
      },
      addResult() {
        if(this.isFoodSafetyOtdel) {
          this.addFoodSafetyResult(this.isResult, this.isResult.length, this.formData)
          return false
        }
        this.$set(this.isResult, this.isResult.length, this.resultItem)
        return false
      },
      removeResultByIndex(index, result) {
        if(index >= 1) {
          result.splice(index, 1)
        }
      },
      clearResultExceptFirst() {
        this.isResult = [this.isResult[0]]
      },

      addFoodSafetyResult(isResults, index, formData) {
        if(formData) {
          const resultItem = {
            nomerProby: this.getProp(formData, 'vnytNapravlenie.posMaterialId'),
            opPokazatelJSON: [
              ...this.getProp(formData, 'opPokazatelJSON', [])
            ],
            metodJSON: [
              ...this.getProp(formData, 'metodJSON', [])
            ],
            resultJSON: [],
            pdkJSON: [],
          }
          this.$set(isResults, index, resultItem)
        }
      },

      addProbaResult(proby) {
        const proba = {
          indexProby: '',
          resultJSON: [],
          stepenInfection: ''
        }
        this.$set(proby, proby.length, proba)
      },
      removeProbaByIndex(index, proby) {
        if(index >= 1) {
          proby.splice(index, 1)
        }
      },

      checkResult() {
        if(Array.isArray(this.isResult)) {
          if(this.isResult.length === 0) {
            this.toastDanger('Данные не полные')
            return false
          }
          if(!this.isResult[0]) {
            this.toastDanger('Данные не полные')
            return false
          }

          if(!this.isResult[0].opPokazatelJSON || this.isResult[0].opPokazatelJSON.length === 0) {
            this.toastDanger('Не выбран определяемый показатель!')
            return false
          }

          if(!this.isResult[0].metodJSON || this.isResult[0].metodJSON.length === 0) {
            this.toastDanger('Не выбран НД на метод исследования!')
            return false
          }

          if(!this.isResult[0].proby || !this.isResult[0].proby[0].indexProby) {
            this.toastDanger('Заполните порядковый номер пробы для результата!')
            return false
          }

          if(!this.isResult[0].proby || !this.isResult[0].proby[0].resultJSON[0]) {
            this.toastDanger('Не выбрали ни один результат исследований!')
            return false
          }
        }
        return true
      },

      checkFoodSafetyResult() {
        if(!this.isResult[0].opPokazatelJSON || this.isResult[0].opPokazatelJSON.length === 0) {
          this.toastDanger('Не выбран определяемый показатель!')
          return false
        }

        if(!this.isResult[0].resultJSON || this.isResult[0].resultJSON.length === 0) {
          this.toastDanger('Результат исследований не должен быть пустым!')
          return false
        }

        if(!this.isResult[0].pdkJSON || this.isResult[0].pdkJSON.length === 0) {
          this.toastDanger('ПДК не должен быть пустым!')
          return false
        }

        if(!this.isResult[0].metodJSON || this.isResult[0].metodJSON.length === 0) {
          this.toastDanger('МУ (НД) не должен быть пустым!')
          return false
        }

        return true
      }
    }
  }
</script>
