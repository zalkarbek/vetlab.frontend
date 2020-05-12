export default [
  {
    _t: 'menu.home',
    text: 'главная',
    type: 'single',
    class: '',
    icon: '',
    active: false,
    to: '/'
  },
  {
    _t: 'menu.spravka',
    text: 'справочник',
    type: 'flex',
    class: '',
    icon: '',
    active: false,
    children: [
      {
        class: '',
        flex: [
          {
            _t: 'menu.spravka',
            text: 'Справочник',
            class: '',
            items: [
              // {
              //   _t: 'menu.bolezn.index',
              //   text: 'болезни',
              //   class: '',
              //   icon: '',
              //   active: false,
              //   to: '/spravka/bolezn'
              // },
              {
                _t: 'menu.mera.index',
                text: 'мера измерения',
                class: '',
                icon: '',
                active: false,
                to: '/spravka/mera'
              },
              {
                _t: 'menu.doljnost.index',
                text: 'должности',
                class: '',
                icon: '',
                active: false,
                to: '/spravka/doljnost'
              },
              {
                _t: 'menu.material_animal_type.index',
                text: 'вид животных',
                class: '',
                icon: '',
                active: false,
                to: '/spravka/material-animal-type'
              },
              {
                _t: 'menu.material_type.index',
                text: 'тип материалов',
                class: '',
                icon: '',
                active: false,
                to: '/spravka/material-type'
              },
              {
                _t: 'menu.material.index',
                text: 'исследуемые материалы',
                class: '',
                icon: '',
                active: false,
                to: '/spravka/material'
              },
              {
                _t: 'menu.pokazatel.index',
                text: 'определяемые показатели',
                class: '',
                icon: '',
                active: false,
                to: '/spravka/pokazatel'
              },
              {
                _t: 'menu.preparat.index',
                text: 'антибиотики и вакцины',
                class: '',
                icon: '',
                active: false,
                to: '/spravka/preparat'
              },
              {
                _t: 'menu.metod.index',
                text: 'методы исследование',
                class: '',
                icon: '',
                active: false,
                to: '/spravka/metod'
              },
              {
                _t: 'menu.otdelenia.index',
                text: 'наименование отделении',
                class: '',
                icon: '',
                active: false,
                to: '/spravka/otdelenia'
              },
              {
                _t: 'menu.region_type.index',
                text: 'типы регионов',
                class: '',
                icon: '',
                active: false,
                to: '/spravka/region-type'
              },
              {
                _t: 'menu.regions.index',
                text: 'регионы',
                class: '',
                icon: '',
                active: false,
                to: '/spravka/regions'
              }
            ]
          }
        ]
      },
      {
        class: '',
        flex: [
          {
            _t: 'menu.divider',
            text: '#',
            class: '',
            items: [
              {
                _t: 'menu.personal.index',
                text: 'персонал',
                class: '',
                icon: '',
                active: false,
                to: '/spravka/personal'
              },
              {
                _t: 'menu.departments.index',
                text: 'департамент',
                class: '',
                icon: '',
                active: false,
                to: '/spravka/departments'
              },
              {
                _t: 'menu.otdel.index',
                text: 'отделы',
                class: '',
                icon: '',
                active: false,
                to: '/spravka/otdel'
              },
              {
                _t: 'menu.sub_otdel.index',
                text: 'под отделы',
                class: '',
                icon: '',
                active: false,
                to: '/spravka/subOtdel'
              },
              {
                _t: 'menu.plan_raboty.index',
                text: 'план работы',
                class: '',
                icon: '',
                active: false,
                to: '/spravka/planRaboty'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    _t: 'menu.direction',
    text: 'Направлении',
    type: 'single',
    class: '',
    icon: '',
    active: false,
    to: '/napravlenie'
  },
  {
    _t: 'menu.epidemiology.index',
    text: 'эпидемиология',
    type: 'flex',
    class: '',
    icon: '',
    active: false,
    children: [
      {
        class: '',
        flex: [
          {
            _t: 'menu.divider',
            text: '#',
            class: '',
            items: [
              {
                _t: 'menu.napravlenie.index',
                text: 'Направление',
                class: '',
                icon: '',
                to: '/epic/napravlenie'
              },
              {
                _t: 'menu.isledovanie.index',
                text: 'Исследование',
                class: '',
                icon: '',
                to: '/'
              },
              {
                _t: 'menu.protocol_isledovanie.index',
                text: 'Заключение',
                class: '',
                icon: '',
                to: '/'
              },
              {
                _t: 'menu.proby_isledovanie.index',
                text: 'пробы на исследовании',
                class: '',
                icon: '',
                to: '/'
              },
              {
                _t: 'menu.proby_postup.index',
                text: 'поступившие пробы',
                class: '',
                icon: '',
                to: '/'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    _t: 'menu.reports',
    text: 'Отчеты',
    type: 'children',
    class: '',
    icon: '',
    active: false,
    children: [
      {
        _t: 'menu.reportPlanOfRegion',
        text: 'Планы по регионам',
        class: '',
        icon: '',
        active: false,
        to: '/reports/plan'
      },
      {
        _t: 'menu.form4Tiny',
        text: 'Форма №4(Компакт)',
        class: '',
        icon: '',
        active: false,
        to: '/reports/form4Tiny'
      }
    ]
  },
  {
    _t: 'menu.news',
    text: 'Новости',
    type: 'single',
    class: '',
    icon: '',
    active: false,
    to: '/'
  },
  {
    _t: 'menu.workers',
    text: 'Сотрудники',
    type: 'single',
    class: '',
    icon: '',
    active: false,
    to: '/'
  },
  {
    _t: 'menu.contacts',
    text: 'Контакты',
    type: 'single',
    class: '',
    icon: '',
    active: false,
    to: '/'
  }
  // {
  //   _t: 'menu.home',
  //   type: 'children',
  //   class: '',
  //   icon: 'fal fa-home',
  //   active: false,
  //   children: [
  //     {
  //       _t: 'menu.home',
  //       class: '',
  //       icon: 'fal fa-home',
  //       active: false,
  //       to: { name: 'home' }
  //     }
  //   ]
  // }
]
