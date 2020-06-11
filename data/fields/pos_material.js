import otdelList from '~/data/otdelList'
export default {

  [otdelList.SEROLOGY.ID]: {
    ...otdelList.SEROLOGY,
    FIELDS: [
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
    ]
  },

  [otdelList.BACTERIOLOGY.ID]: {
    ...otdelList.BACTERIOLOGY,
    FIELDS: [
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
    ]
  },

  [otdelList.VIROLOGY.ID]: {
    ...otdelList.VIROLOGY,
    FIELDS: [
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
    ]
  },

  [otdelList.PARASITOLOGY.ID]: {
    ...otdelList.PARASITOLOGY,
    FIELDS: [
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
    ]
  },

  [otdelList.EPIDEMIOLOGY.ID]: {
    ...otdelList.EPIDEMIOLOGY,
    FIELDS: [
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
    ]
  },

  [otdelList.FOOD_SAFETY.ID]: {
    ...otdelList.FOOD_SAFETY,
    FIELDS: []
  }

};
