import baseApiRoutes from './baseApiRoutes'
// Имя модели к которому привязан этот API
const restName = 'vnytNapravlenie'
// Превикс API маршрута
const routePrefix = 'napravlenie/vnyt'
// Имя набор данных которые хранится в vuex или локально в переменной localDataset
const datasetName = 'vnytNapravlenie'

// базовые машрутры для всех api
const baseApi = baseApiRoutes({ routePrefix })

export default {
  restName,
  routePrefix,
  datasetName,
  rest: {
    ...baseApi,
    getAllVnytNapravlenieRel: {
      method: 'GET',
      url: `/api/v1/${routePrefix}/rel/paginate`
    }
  },

  initConfig: {
    getRecordList: {
      datasetName: 'vnytNapravlenie',
      paginate: 'server',
      pageSize: 10,
      methodIfPaginateServer: 'getAllVnytNapravlenieRel'
    }
  },

  actionButtons: {
    crudList: [],
    crudForm: []
  },

  modals: [],
  foreign: [],
  fields: [
    {
      type: 'select-multi',
      key: 'opPokazatelIdJSON',
      foreign_crud: 's_pokazatel',
      foreign_dataset: 'pokazatel',
      foreign_label: 'name',
      foreign_value: 'id',
      disabled: false,
      hidden: false
    }
  ],
  fieldsForTable: [
    {
      type: 'number',
      key: 'napravlenieId',
      label: 'napravlenieEpic.label.nomerNapravlenia'
    },

    // #===========# / sendStatusCustomView / #===========#
    {
      type: 'text',
      key: 'sendStatusCustomView',
      columns: [
        {
          type: 'number',
          key: 'napravilPersonalId'
        },
        {
          type: 'number',
          key: 'napravlenDepartmentId'
        },
        {
          type: 'number',
          key: 'napravlenOtdelId'
        },
        {
          type: 'number',
          key: 'napravlenSubOtdelId'
        },
        {
          type: 'date',
          key: 'dateVremyaOtpravki'
        },
        {
          type: 'number',
          key: 'prinyalPersonalId'
        },
        {
          type: 'number',
          key: 'prinyalOtdelId'
        },
        {
          type: 'number',
          key: 'prinyalSubOtdelId'
        },
        {
          type: 'datetime',
          key: 'prinyalDate'
        }
      ]
    },
    // #===========# \ sendStatusCustomView \ #===========#

    // #===========# / posMaterialCustomView / #===========#
    {
      type: 'text',
      key: 'posMaterialCustomView',
      fields: {
        opPokazatelIdJSON: {
          type: 'number',
          key: 'opPokazatelIdJSON',
          foreign_crud: 's_pokazatel',
          foreign_dataset: 'pokazatel',
          foreign_label: 'name',
          foreign_value: 'id'
        },
        posMaterialId: {
          type: 'number',
          key: 'posMaterialId'
        },
        postMaterialCount: {
          type: 'number',
          key: 'postMaterialCount'
        },
        posMaterialCheckVid: {
          type: 'boolean',
          key: 'posMaterialCheckVid'
        },
        postMaterialCheck: {
          type: 'number',
          key: 'postMaterialCheck'
        }
      }
    },
    // #===========# \ posMaterialCustomView \ #===========#

    // #===========# / dateCustomView / #===========#
    {
      type: 'text',
      key: 'vnytNapravlenieOptionalCustomView',
      columns: [
        {
          type: 'date',
          key: 'dateDeworming'
        },
        {
          type: 'date',
          key: 'dateVaccination'
        },
        {
          type: 'date',
          key: 'dateObrabotki'
        },
        {
          type: 'number',
          key: 'dateLechenia'
        },
        {
          type: 'text',
          key: 'anthelminticTypeJSON'
        },
        {
          type: 'text',
          key: 'antibioticTypeJSON'
        },
        {
          type: 'text',
          key: 'disinfectantTypeJSON'
        },
        {
          type: 'text',
          key: 'vaccineTypeJSON'
        },
        {
          type: 'text',
          key: 'isledovanieProvoditsaJSON'
        }
      ]
    },
    // #===========# \ dateCustomView \ #===========#
    {
      type: 'text',
      key: 'status'
    }
  ]
}
