import baseApiRoutes from './baseApiRoutes'
// Имя модели к которому привязан этот API
const restName = 'rmaterial_kit'
// Превикс API маршрута
const routePrefix = 'rmaterialsKit'
// Имя набор данных которые хранится в vuex или local (внутри компонента)
const datasetName = 'rmaterialsKit'
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
      key: 'otdelId',
      foreign_crud: 'otdel',
      foreign_dataset: 'otdel',
      foreign_label: 'name',
      foreign_value: 'id',
      foreign_attributes: ['name', 'id'],
      disabled: false,
      hidden: false,
    },

    {
      type: 'select',
      key: 'sRMaterialId',
      foreign_crud: 's_rmaterial',
      foreign_dataset: 'rmaterials',
      foreign_label: 'name',
      foreign_value: 'id',
      foreign_attributes: ['name', 'id'],
      disabled: false,
      hidden: false,
    },

    {
      type: 'select',
      key: 'sMeraId',
      foreign_crud: 's_mera',
      foreign_dataset: 'mera',
      foreign_label: 'name',
      foreign_value: 'id',
      foreign_attributes: ['name', 'id'],
      disabled: false,
      hidden: false,
    },

    {
      type: 'multi-select-tag',
      key: 'sRMetodJSON',
      foreign_crud: 's_rmetod',
      foreign_dataset: 'rmetod',
      foreign_label: 'shortName',
      foreign_value: 'shortName',
      foreign_attributes: ['name', 'shortName', 'id'],
      disabled: false,
      hidden: false,
    },

    {
      type: 'multi-select-tag',
      key: 'sBoleznJSON',
      foreign_crud: 's_bolezn',
      foreign_dataset: 'bolezn',
      foreign_label: 'name',
      foreign_value: 'name',
      foreign_attributes: ['name', 'id'],
      disabled: false,
      hidden: false,
    },

    {
      type: 'multi-select-tag',
      key: 'opPokazatelJSON',
      foreign_crud: 's_pokazatel',
      foreign_dataset: 'pokazatel',
      foreign_label: 'name',
      foreign_value: 'name',
      foreign_attributes: ['name', 'id'],
      // col настраивает макет сетки ввода (ширина поля ввода) md, sm, xs, lg
      col: {
        md: 11,
        lg: 9,
        xl: 5
      },
    },

    {
      type: 'multi-select-tag',
      key: 'sMaterialTypeJSON',
      foreign_crud: 's_material_type',
      foreign_dataset: 'materialTypes',
      foreign_label: 'name',
      foreign_value: 'name',
      foreign_attributes: ['name', 'id'],
      col: {
        md: 5,
        lg: 4,
        xl: 3
      },
    },

    {
      type: 'multi-select-tag',
      key: 'sMaterialJSON',
      foreign_crud: 's_material',
      foreign_dataset: 'materials',
      foreign_label: 'name',
      foreign_value: 'name',
      foreign_attributes: ['name', 'id'],
      col: {
        md: 5,
        lg: 4,
        xl: 3
      },
    },

    {
      type: 'number',
      key: 'count',
      col: {
        md: 3,
        lg: 3,
        xl: 2
      },
    },

    {
      type: 'number',
      key: 'costOneIsledovanie',
      col: {
        md: 3,
        lg: 3,
        xl: 2
      },
    },

    {
      type: 'textarea',
      key: 'description',
    },
  ],
}
