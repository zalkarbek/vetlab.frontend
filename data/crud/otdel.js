import baseApiRoutes from './baseApiRoutes'
import baseFields from '~/data/crud/baseFields'
// Имя модели к которому привязан этот API
const restName = 'otdel'
// Превикс API маршрута
const routePrefix = 'otdel'
// Имя набор данных которые хранится в vuex
const datasetName = 'otdel'
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
  ],
}
