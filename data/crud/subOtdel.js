import baseApiRoutes from './baseApiRoutes'
import baseFields from '~/data/crud/baseFields'
// Имя модели к которому привязан этот API
const restName = 'subOtdel'
// Превикс API маршрута
const routePrefix = 'otdel/sub'
// Имя набор данных которые хранится в vuex
const datasetName = 'subOtdel'
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
    ...baseFields,
    {
      type: 'select',
      key: 'otdelId',
      foreign_crud: 'otdel',
      foreign_dataset: 'otdel',
      foreign_label: 'name',
      foreign_value: 'id',
      foreign_attributes: ['name', 'id'],
      disabled: false,
      hidden: false
    },
    {
      type: 'select',
      key: 'sOtdeleniaId',
      foreign_crud: 's_otdelenia',
      foreign_dataset: 'otdelenia',
      foreign_label: 'name',
      foreign_value: 'id',
      foreign_attributes: ['name', 'id'],
      disabled: false,
      hidden: false
    }
  ]
}
