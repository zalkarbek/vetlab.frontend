import baseApiRoutes from './baseApiRoutes'
// Имя модели к которому привязан этот API
const restName = 's_pokazatel_pdk'
// Превикс API маршрута
const routePrefix = 'pokazatelPdk'
// Имя набор данных которые хранится в vuex
const datasetName = 'pokazatelPdk'

// базовые машрутры для всех api
const baseApi = baseApiRoutes({ routePrefix })

export default {
  restName,
  routePrefix,
  datasetName,
  rest: {
    ...baseApi,
  },

  fields: [
    {
      type: 'select',
      key: 'sPokazatelId',
      foreign_crud: 's_pokazatel',
      foreign_dataset: 'pokazatel',
      foreign_label: 'name',
      foreign_value: 'id',
      foreign_attributes: ['name', 'id', 'sOtdeleniaId'],
      disabled: false,
      hidden: false,
      col: {
        md: 4,
        lg: 4,
        xl: 4
      },
    },

    {
      type: 'select:own',
      key: 'pdkType',
      foreign_label: 'label',
      foreign_value: 'value',
      foreign_values: [
        {
          label: 'form.label.equal',
          value: 'equal'
        },

        {
          label: 'form.label.range',
          value: 'range'
        },

        {
          label: 'form.label.more',
          value: 'more'
        },

        {
          label: 'form.label.smaller',
          value: 'smaller'
        },

        {
          label: 'form.label.notLess',
          value: 'notLess',
        },

        {
          label: 'form.label.notMore',
          value: 'notMore',
        },
      ],
      col: {
        md: 2,
        lg: 2,
        xl: 2
      },
    },

    {
      type: 'json',
      key: 'pdkJSON',
      label: 'form.label.pdkJSON',
      json: [],
    },

    {
      type: 'text',
      key: 'pdkMera'
    },

    {
      type: 'multi-select-tag',
      key: 'materialTypeJSON',
      foreign_crud: 's_material_type',
      foreign_dataset: 'materialTypes',
      foreign_label: 'name',
      foreign_value: 'name',
      foreign_attributes: ['name', 'id'],
    },

    {
      type: 'multi-select-tag',
      key: 'sMaterialAnimalTypeJSON',
      foreign_crud: 's_material_animal_type',
      foreign_dataset: 'materialAnimalTypes',
      foreign_label: 'name',
      foreign_value: 'name',
      foreign_attributes: ['name', 'id'],
    },

    {
      type: 'multi-select-tag',
      key: 'materialJSON',
      foreign_crud: 's_material',
      foreign_dataset: 'materials',
      foreign_label: 'name',
      foreign_value: 'name',
      foreign_attributes: ['name', 'id'],
    },

    {
      type: 'textarea',
      key: 'description',
    },
  ],
}
