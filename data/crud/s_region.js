import baseApiRoutes from './baseApiRoutes'
// Имя модели к которому привязан этот API
const restName = 's_region'
// Превикс API маршрута
const routePrefix = 'regions'
// Имя набор данных которые хранится в vuex
const datasetName = 'regions'

// базовые машрутры для всех api
const baseApi = baseApiRoutes({ routePrefix })

export default {
  restName,
  routePrefix,
  datasetName,
  rest: {
    ...baseApi
  },

  fields: [
    {
      type: 'text',
      key: 'i18n'
    },
    {
      type: 'text',
      key: 'name'
    },
    {
      type: 'text',
      key: 'shortName'
    },
    {
      type: 'select',
      key: 'sRegionTypeId',
      foreign_crud: 's_region_type',
      foreign_dataset: 'regionTypes',
      foreign_label: 'name',
      foreign_value: 'id'
    },
    {
      type: 'autocomplete',
      key: 'parentId',
      foreign_crud: 's_region',
      foreign_dataset: 'regions',
      foreign_label: 'name',
      foreign_value: 'id'
    }
  ]
}
