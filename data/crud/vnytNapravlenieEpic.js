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
      url: `/api/v1/${routePrefix}/rel/paginate`,
    },
  },

  initConfig: {
    getRecordList: {
      datasetName: 'vnytNapravlenie',
      paginate: 'server',
      pageSize: 3,
      methodIfPaginateServer: 'getAllVnytNapravlenieRel',
      methodOnSearch: 'getAllVnytNapravlenieRel',
      earchColumn: ['id'],
    },
  },

  actionButtons: {
    crudList: [],
    crudForm: [],
  },

  modals: [],
  foreign: [],
  fields: [
    {
      type: 'multi-select-tag',
      key: 'opPokazatelJSON',
      foreign_crud: 's_pokazatel',
      foreign_dataset: 'pokazatel',
      foreign_label: 'name',
      foreign_value: 'name',
      foreign_attributes: ['name', 'id']
    },
  ],
  fieldsForTable: [
    {
      type: 'number',
      key: 'napravlenieId',
      label: 'vnytNapravlenie.label.outerNomerNapravlenia',
    },
    {
      type: 'number',
      key: 'id',
      label: 'vnytNapravlenie.label.nomerNapravlenia',
    },

    // #===========# / sendStatusCustomView / #===========#
    {
      type: 'text',
      key: 'sendStatusCustomView',
      fields: {
        napravilPersonalId: {
          type: 'number',
          key: 'napravilPersonalId',
        },
        napravlenDepartmentId: {
          type: 'number',
          key: 'napravlenDepartmentId',
        },
        napravlenOtdelId: {
          type: 'number',
          key: 'napravlenOtdelId',
        },
        napravlenSubOtdelId: {
          type: 'number',
          key: 'napravlenSubOtdelId',
        },
        dateVremyaOtpravki: {
          type: 'date',
          key: 'dateVremyaOtpravki',
        },
        prinyalPersonalId: {
          type: 'number',
          key: 'prinyalPersonalId',
        },
        prinyalOtdelId: {
          type: 'number',
          key: 'prinyalOtdelId',
        },
        prinyalSubOtdelId: {
          type: 'number',
          key: 'prinyalSubOtdelId',
        },
        prinyalDate: {
          type: 'datetime',
          key: 'prinyalDate',
        },
      },
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
          foreign_value: 'name',
          foreign_attributes: ['name', 'id']
        },
        posMaterialId: {
          type: 'number',
          key: 'posMaterialId',
        },
        postMaterialCount: {
          type: 'number',
          key: 'postMaterialCount',
        },
        posMaterialCheckVid: {
          type: 'boolean',
          key: 'posMaterialCheckVid',
        },
        postMaterialCheck: {
          type: 'number',
          key: 'postMaterialCheck',
        },
      },
    },
    // #===========# \ posMaterialCustomView \ #===========#

    // #===========# / dateCustomView / #===========#
    {
      type: 'text',
      key: 'vnytNapravlenieOptionalCustomView',
      fields: {
        dateDeworming: {
          type: 'text',
          key: 'dateDeworming',
        },
        dateVaccination: {
          type: 'text',
          key: 'dateVaccination',
        },
        dateObrabotki: {
          type: 'text',
          key: 'dateObrabotki',
        },
        dateLechenia: {
          type: 'text',
          key: 'dateLechenia',
        },
        anthelminticTypeJSON: {
          type: 'text',
          key: 'anthelminticTypeJSON',
        },
        disinfectantTypeJSON: {
          type: 'text',
          key: 'disinfectantTypeJSON',
        },
        vaccineTypeJSON: {
          type: 'text',
          key: 'vaccineTypeJSON',
        },
        isledovanieProvoditsaJSON: {
          type: 'text',
          key: 'isledovanieProvoditsaJSON',
        },
      },
    },
    // #===========# \ dateCustomView \ #===========#
    {
      type: 'text',
      key: 'status',
    },
  ],
}
