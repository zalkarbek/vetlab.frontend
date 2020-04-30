import baseApiRoutes from './baseApiRoutes'
import baseFields from '~/data/crud/baseFields'
// Имя модели к которому привязан этот API
const restName = 's_bolezn'
// Превикс API маршрута
const routePrefix = 'bolezn'
// Имя набор данных которые хранится в vuex
const datasetName = 'bolezn'

// базовые машрутры для всех api
const baseApi = baseApiRoutes({ routePrefix })

export default {
  restName,
  routePrefix,
  datasetName,
  rest: {
    ...baseApi
  },

  fields: [...baseFields]
}
// {
//   type: 'select',
//   key: '',
//   foreign_crud: '',
//   foreign_dataset: '',
//   foreign_label: '',
//   foreign_value: '',
//   foreign_attributes: ['', ''],
//   disabled: false,
//   hidden: false
// }
