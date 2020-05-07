import baseApiRoutes from './baseApiRoutes'
// Имя модели к которому привязан этот API
const restName = 'pos_material'
// Превикс API маршрута
const routePrefix = 'posMaterial'
// Имя набор данных которые хранится в vuex
const datasetName = 'posMaterials'

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
      type: 'number',
      key: 'napravlenieId',
      disabled: true
    },
    {
      type: 'select',
      key: 'opPokazatelId',
      foreign_crud: 's_pokazatel',
      foreign_dataset: 'pokazatel',
      foreign_label: 'name',
      foreign_value: 'id',
      foreign_attributes: ['name', 'id']
    },
    {
      type: 'json',
      key: 'ownerJSON',
      json: [
        {
          type: 'text',
          key: 'fullName'
        },
        {
          type: 'text',
          key: 'phone_1'
        }
      ]
    },
    {
      type: 'json',
      key: 'kemOtobranJSON',
      json: [
        {
          type: 'text',
          key: 'fullName'
        },
        {
          type: 'text',
          key: 'phone_1'
        }
      ]
    },
    {
      type: 'json',
      key: 'mestoOtboraRegionJSON',
      json: [
        {
          type: 'text',
          key: 'regionId',
          disabled: true,
          hidden: true
        },
        {
          type: 'text',
          key: 'regionFullText'
        },
        {
          type: 'array',
          key: 'regions',
          disabled: true,
          hidden: true
        }
      ]
    },
    {
      type: 'text',
      key: 'lechenieInfo'
    },
    {
      type: 'select',
      key: 'sMaterialId',
      foreign_crud: 's_material',
      foreign_dataset: 'materials',
      foreign_label: 'name',
      foreign_value: 'id',
      foreign_attributes: ['name', 'id']
    },
    {
      type: 'number',
      key: 'materialCount'
    },
    {
      type: 'select',
      key: 'sMeraId',
      foreign_crud: 's_mera',
      foreign_dataset: 'mera',
      foreign_label: 'name',
      foreign_value: 'id',
      foreign_attributes: ['name', 'id']
    },
    {
      type: 'number',
      key: 'vozrast'
    },
    {
      type: 'date',
      key: 'dateZabolivanie'
    },
    {
      type: 'date',
      key: 'dateZaboya'
    },
    {
      type: 'date',
      key: 'dateOtbora'
    },
    {
      type: 'date',
      key: 'dateDostavki'
    }
  ]
}
