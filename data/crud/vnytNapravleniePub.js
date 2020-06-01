import baseApiRoutes from './baseApiRoutes'
import { researchStartFields } from '../fields'
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
      searchColumn: ['napravlenieId'],
    },
  },

  actionButtons: {
    crudList: [
      {
        action: 'accept',
        actionMethod: 'openDialog',
        modalId: 'accept-napravlenie-dialog',
        label: 'vnytNapravlenie.pub.accept',
        icon: 'far fa-paper-plane',
        variant: 'primary',
      },
      {
        action: 'reject',
        actionMethod: 'openDialog',
        modalId: 'reject-napravlenie-dialog',
        label: 'vnytNapravlenie.pub.reject',
        icon: 'far fa-ban',
        variant: 'danger',
      },

      {
        action: 'research',
        actionMethod: 'openDialog',
        modalId: 'research-start-dialog',
        label: 'vnytNapravlenie.pub.researchStart',
        icon: 'far fa-biohazard',
        variant: 'dark',
      },
    ],
    crudForm: [],
  },

  modals: [
    // модальное окно для сброса пароля
    {
      type: 'modal-confirm', // modal-confirm, modal-message, modal-form
      id: 'accept-napravlenie-dialog',
      class: 'accept-napravlenie-dialog',
      title: 'vnytNapravlenie.modal.accept.title',
      message: 'vnytNapravlenie.modal.accept.message',
      // размер модального окна
      size: 'md',
      okAction: 'acceptOk',
      hiddenAction: 'acceptCancel',
    },

    {
      type: 'modal-form', // modal-confirm, modal-message, modal-form
      id: 'reject-napravlenie-dialog',
      class: 'reject-napravlenie-dialog',
      title: 'vnytNapravlenie.modal.reject.title',
      headerBgVariant: 'warning',
      headerTextVariant: 'light',
      // размер модального окна
      size: 'lg',
      okAction: 'rejectOk',
      hiddenAction: 'rejectCancel',
      modalCrud: {
        fields: [
          {
            type: 'textarea',
            key: 'rejectionDescription',
            col: {
              sm: 12,
              xs: 12,
              md: 10,
              lg: 10,
              xl: 10
            }
          }
        ],
      },
    },

    {
      type: 'modal-form',
      id: 'research-start-dialog',
      class: 'research-start-dialog',
      title: 'vnytNapravlenie.modal.researchStart.title',
      headerBgVariant: 'light',
      size: 'xl',
      okAction: 'reSearchOk',
      hiddenAction: 'reSearchCancel',
      modalCrud: {
        fields: [
          ...researchStartFields.fields
        ]
      }
    }

  ],
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
      hidden: false,
    },
  ],
  fieldsForTable: [
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

        rejectPersonalId: {
          type: 'number',
          key: 'prinyalPersonalId',
        },
        rejectOtdelId: {
          type: 'number',
          key: 'prinyalOtdelId',
        },
        rejectSubOtdelId: {
          type: 'number',
          key: 'prinyalSubOtdelId',
        },
        rejectDate: {
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
          foreign_value: 'id',
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
