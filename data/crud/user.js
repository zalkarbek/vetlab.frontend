import baseApiRoutes from './baseApiRoutes'
// Имя модели к которому привязан этот API
const restName = 'user'
// Превикс API маршрута
const routePrefix = 'users'
// Имя набор данных которые хранится в vuex
const datasetName = 'users'
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
      type: 'text',
      key: 'email',
    },
    {
      type: 'password',
      key: 'password',
    },
    {
      type: 'text',
      key: 'name',
      label: 'user.label.name',
    },
    {
      type: 'select-multi',
      key: 'roles',
      foreign_crud: 'role',
      foreign_dataset: 'roles',
      foreign_label: 'role_name',
      foreign_value: 'id',
      foreign_attributes: ['role_name', 'id'],
      disabled: false,
      hidden: false,
    },
  ],
}
