import baseApiRoutes from './baseApiRoutes'
import baseFields from '~/data/crud/baseFields'
// Имя модели к которому привязан этот API
const restName = 's_pokazatel'
// Превикс API маршрута
const routePrefix = 'pokazatel'
// Имя набор данных которые хранится в vuex
const datasetName = 'pokazatel'

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
    ...baseFields,
    {
      type: 'select',
      key: 'sOtdeleniaId',
      foreign_crud: 's_otdelenia',
      foreign_dataset: 'otdelenia',
      foreign_label: 'name',
      foreign_value: 'id',
      foreign_attributes: ['name', 'id'],
      disabled: false,
      hidden: false,
    },
    {
      type: 'text',
      key: 'pokazatel',
    },
    {
      type: 'textarea',
      key: 'description',
    },
  ],
}
