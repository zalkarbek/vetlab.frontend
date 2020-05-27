import baseApiRoutes from './baseApiRoutes'
import baseFields from '~/data/crud/baseFields'
// Имя модели к которому привязан этот API
const restName = 'planRaboty'
// Превикс API маршрута
const routePrefix = 'plan'
// Имя набор данных которые хранится в vuex
const datasetName = 'plan'
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
      key: 'departmentId',
      foreign_crud: 'department',
      foreign_dataset: 'departments',
      foreign_label: 'name',
      foreign_value: 'id',
      foreign_attributes: ['name', 'id'],
      disabled: false,
      hidden: false,
    },
    {
      type: 'number',
      key: 'planCount',
      disabled: false,
      hidden: false,
    },
    {
      type: 'number',
      key: 'planKv',
      disabled: false,
      hidden: false,
    },
    {
      type: 'number',
      key: 'planYear',
      disabled: false,
      hidden: false,
    },
  ],
}
