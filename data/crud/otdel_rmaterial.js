import baseApiRoutes from './baseApiRoutes'
// Имя модели к которому привязан этот API
const restName = 'otdel_rmaterial'
// Превикс API маршрута
const routePrefix = 'otdel/rmaterials'
// Имя набор данных которые хранится в vuex или local (внутри компонента)
const datasetName = 'otdelRMaterial'
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
      type: 'number',
      key: 'count',
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
