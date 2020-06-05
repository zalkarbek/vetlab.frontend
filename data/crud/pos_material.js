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
    ...baseApi,
  },

  fields: [
    {
      type: 'number',
      key: 'napravlenieId',
      disabled: true,
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
      key: 'materialCount',
      col: {
        md: 3,
        lg: 3,
        xl: 2
      },
    },
    {
      type: 'select',
      key: 'sMeraId',
      foreign_crud: 's_mera',
      foreign_dataset: 'mera',
      foreign_label: 'name',
      foreign_value: 'id',
      foreign_attributes: ['name', 'id'],
      col: {
        md: 3,
        lg: 3,
        xl: 2
      },
    },
    {
      type: 'multi-select-tag',
      key: 'opPokazatelJSON',
      foreign_crud: 's_pokazatel',
      foreign_dataset: 'pokazatel',
      foreign_label: 'name',
      foreign_value: 'name',
      foreign_attributes: ['name', 'id'],
      col: {
        md: 11,
        lg: 9,
        xl: 4
      },
    },
    {
      type: 'json',
      key: 'ownerJSON',
      json: [
        {
          type: 'text',
          key: 'fullName',
          label: 'owner.label.fullName',
          col: {
            md: 5,
            lg: 4,
            xl: 3
          },
        },
        {
          type: 'text',
          key: 'phone_1',
          label: 'owner.label.phone_1',
          col: {
            md: 4,
            lg: 4,
            xl: 3
          },
        },
      ],
    },
    {
      type: 'json',
      key: 'kemOtobranJSON',
      json: [
        {
          type: 'text',
          key: 'fullName',
          label: 'kemOtobran.label.fullName',
          col: {
            md: 5,
            lg: 4,
            xl: 3
          },
        },
        {
          type: 'text',
          key: 'phone_1',
          label: 'kemOtobran.label.phone_1',
          col: {
            md: 4,
            lg: 4,
            xl: 2
          },
        },
      ],
    },
    {
      type: 'json',
      key: 'mestoOtboraRegionJSON',
      json: [
        {
          type: 'number',
          key: 'id',
          disabled: true,
          hidden: true,
        },
        {
          type: 'textarea',
          key: 'regionFullPath',
          label: 'mestoOtbora.label.regionFullPath',
          col: {
            md: 4,
            lg: 4,
            xl: 3
          },
        },
        {
          type: 'array',
          key: 'regionIds',
          disabled: true,
          hidden: true,
        },
      ],
    },
    {
      type: 'textarea',
      key: 'lechenieInfo',
      col: {
        md: 4,
        lg: 4,
        xl: 3
      },
    },
    {
      type: 'date',
      key: 'dateZabolivanie',
      col: {
        md: 4,
        lg: 3,
        xl: 3
      },
    },
    {
      type: 'number',
      key: 'vozrast',
      col: {
        md: 4,
        lg: 3,
        xl: 2
      },
    },
    {
      type: 'date',
      key: 'dateZaboya',
      col: {
        md: 4,
        lg: 3,
        xl: 3
      },
    },
    {
      type: 'date',
      key: 'dateDostavki',
      col: {
        md: 4,
        lg: 3,
        xl: 3
      },
    },
    {
      type: 'datetime',
      key: 'dateVremyaOtbora',
      col: {
        md: 4,
        lg: 3,
        xl: 3
      },
    },
    {
      type: 'textarea',
      key: 'description',
    },
  ],
}
