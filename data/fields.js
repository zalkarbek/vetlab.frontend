const otdelFields = [
  {
    id: 4,
    name: 'паразитология',
    key: 'parasitology',
    fields: [
      // Дата дегельминтизации животного (дата)
      // отдел: паразитология
      {
        type: 'date',
        key: 'dateDeworming',
        disabled: false,
        hidden: false,
      },
      // Вид антигельминтика (несколько значений)
      // отдел: паразитология
      {
        type: 'multi-select-tag',
        key: 'anthelminticTypeJSON',
        foreign_crud: 's_preparat',
        foreign_dataset: 'preparat',
        foreign_label: 'name',
        foreign_value: 'name',
        foreign_attributes: ['name', 'id'],
        disabled: false,
        hidden: false,
      },
    ],
  },

  {
    id: 1,
    name: 'бактериология',
    key: 'bacteriology',
    fields: [
      // ================ БАКТЕРИОЛОГИЯ ==================//
      // Дата лечения животного (дата)
      // отдел: бактериология
      {
        type: 'date',
        key: 'dateLechenia',
        disabled: false,
        hidden: false,
      },
      // Вид антибиотика (Какой антибиотик использован при лечении) (несколько значений)
      // отдел: бактериология
      {
        type: 'multi-select-tag',
        key: 'antibioticTypeJSON',
        foreign_crud: 's_preparat',
        foreign_dataset: 'preparat',
        foreign_label: 'name',
        foreign_value: 'name',
        foreign_attributes: ['name', 'id'],
        disabled: false,
        hidden: false,
      },

      // Дата обработки ( дата проведения дезинфекции и.т.д )
      // отдел: бактериология
      {
        type: 'date',
        key: 'dateObrabotki',
      },

      // Вид дезинфектанта (несколько значений)
      // отдел: бактериология
      {
        type: 'multi-select-tag',
        key: 'disinfectantTypeJSON',
        foreign_crud: 's_preparat',
        foreign_dataset: 'preparat',
        foreign_label: 'name',
        foreign_value: 'name',
        foreign_attributes: ['name', 'id'],
        disabled: false,
        hidden: false,
      },
      // ================ БАКТЕРИОЛОГИЯ ==================//
    ],
  },

  {
    id: 3,
    name: 'серология',
    key: 'serology',
    fields: [
      // ================ СЕРОЛОГИЯ, ВИРУСОЛОГИЯ ==================//
      // Дата вакцинации животного (дата)
      // отдел: серология, вирусология
      {
        type: 'date',
        key: 'dateVaccination',
      },

      // Вид вакцины (несколько значений)
      // отдел: серология, вирусология
      {
        type: 'multi-select-tag',
        key: 'vaccineTypeJSON',
        foreign_crud: 's_preparat',
        foreign_dataset: 'preparat',
        foreign_label: 'name',
        foreign_value: 'name',
        foreign_attributes: ['name', 'id'],
        disabled: false,
        hidden: false,
      },
      // ================ СЕРОЛОГИЯ, ВИРУСОЛОГИЯ ==================//
    ],
  },
]

const vnytNapravlenieFields = {
  fields: [
    // =========================== Поля Внутреннее направления ============== //
    // // Место отбора проб (адрес регион)
    // // отдел: общий
    // {
    //   key: 'Место отбора проб'
    // },

    // Дата и время отправки проб (дата)
    // отдел: общий
    {
      type: 'datetime',
      key: 'dateVremyaOtpravki',
      col: {
        sm: 12,
        xs: 12,
        md: 10,
        lg: 5,
      }
    },

    // Направляется в отдел (одно значение)
    // отдел: общий
    {
      type: 'select',
      key: 'napravlenOtdelId',
      foreign_crud: 'otdel',
      foreign_dataset: 'otdel',
      foreign_label: 'name',
      foreign_value: 'id',
      foreign_attributes: ['name', 'id'],
      col: {
        sm: 12,
        xs: 12,
        md: 10,
        lg: 5,
      }
    },

    // Обьект исследования (одно зачение)
    // отдел: общий
    {
      type: 'multi-select-tag',
      key: 'posMaterials',
      foreign_crud: 'pos_material',
      foreign_dataset: 'posMaterials',
      foreign_label: 'name',
      foreign_value: 'name',
      foreign_attributes: ['name', 'id'],
      col: {
        sm: 12,
        xs: 12,
        md: 10,
        lg: 5,
      }
    },

    // Количество пробы цифра (одно зачение)
    // отдел: общий
    {
      type: 'number',
      key: 'postMaterialCount',
      disabled: false,
      hidden: false,
      col: {
        sm: 12,
        xs: 12,
        md: 10,
        lg: 5,
      }
    },

    // Исследования проводятся (одно значение)
    // отдел: общий
    {
      type: 'select-multi:own',
      key: 'isledovanieProvoditsaJSON',
      col: {
        sm: 12,
        xs: 12,
        md: 10,
        lg: 5,
      },
      foreign_label: 'label',
      foreign_value: 'value',
      foreign_values: [
        {
          label: 'form.label.primary',
          value: 'primary',
        },
        {
          label: 'form.label.secondary',
          value: 'secondary',
        },
        {
          label: 'form.label.notApply',
          value: 'notApply',
        },
        {
          label: 'form.label.beforeProcess',
          value: 'beforeProcess',
        },
        {
          label: 'form.label.afterProcess',
          value: 'afterProcess',
        },
      ],
    },

    // Определяемые показатели (несколько значений)
    // отдел: общий
    {
      type: 'multi-select-tag',
      key: 'opPokazatelJSON',
      foreign_crud: 's_pokazatel',
      foreign_dataset: 'pokazatel',
      foreign_label: 'name',
      foreign_value: 'name',
      foreign_attributes: ['name', 'id'],
      disabled: false,
      hidden: false,
      col: {
        md: 12,
        sm: 12,
        xs: 12,
        lg: 9,
        xl: 9
      }
    },

    // Соответствие внешнего вида пробы
    // отдел: общий
    {
      type: 'checkbox',
      key: 'posMaterialCheckVid',
      checkbox_value: true,
      checkbox_unchecked_value: false,
      checkbox_label: 'form.label.checkVid',
    },

    // Соответствие своему образу
    // отдел: общий
    {
      type: 'checkbox',
      key: 'postMaterialCheck',
      checkbox_value: true,
      checkbox_unchecked_value: false,
      checkbox_label: 'form.label.materialCheck',
    },

    // // Пробу принял (ФИО сотрудника) (JSON значение)
    // // отдел: общий
    // {
    //   key: 'Пробу принял'
    // },
    //
    // // Пробу направил (ФИО сотрудника) (JSON значение)
    // // отдел: общий
    // {
    //   key: 'Пробу направил'
    // },

    // ========== <<< Информация о пробе >>> =========== //

    // // Дата и время приема пробы (одно значение)
    // // отдел: общий
    // {
    //   key: 'Дата и время приема пробы'
    // }
  ],
}

const researchStartFields = {
  fields: [
    {
      type: 'multi-select-tag',
      key: 'posMaterials',
      col: {
        md: 12,
        lg: 6,
        sm: 12,
        xs: 12,
        xl: 6
      }
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
        md: 12,
        lg: 9,
        sm: 12,
        xs: 12,
        xl: 9
      }
    },
    {
      type: 'multi-select-tag',
      key: 'metodJSON',
      label: 'vnytNapravlenie.label.researchMetodJSON',
      description: 'vnytNapravlenie.description.researchMetodJSON',
      placeholder: 'vnytNapravlenie.placeholder.researchMetodJSON',
      foreign_crud: 's_metod',
      foreign_dataset: 'metod',
      foreign_label: 'name',
      foreign_value: 'name',
      foreign_attributes: ['id', 'name', 'shortName', 'gosStandard'],
      disabled: false,
      hidden: false,
      col: {
        md: 12,
        lg: 9,
        sm: 12,
        xs: 12,
        xl: 9
      }
    },
  ]
}

const isledovanieFields = {
  fields: [
    {
      type: 'multi-select-tag',
      key: 'opPokazatelJSON',
      foreign_crud: 's_pokazatel',
      foreign_dataset: 'pokazatel',
      foreign_label: 'name',
      foreign_value: 'name',
      foreign_attributes: ['name', 'id'],
      col: {
        md: 12,
        lg: 9,
        sm: 12,
        xs: 12,
        xl: 9
      }
    },

    {
      type: 'text',
      key: 'indexNomberProby'
    },
    {
      type: 'text',
      key: 'resultIsledovanieJSON'
    }
  ]
}

export {
  vnytNapravlenieFields,
  otdelFields,
  researchStartFields,
  isledovanieFields
}
