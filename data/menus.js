export default [
  {
    _t: 'menu.home',
    text: 'главная',
    type: 'single',
    class: '',
    icon: '',
    active: false,
    to: '/',
    roles: ['vetAdmin', 'admin', 'super', 'developer', 'director']
  },
  {
    _t: 'menu.spravka',
    text: 'справочник',
    type: 'flex',
    class: '',
    icon: '',
    active: false,
    roles: ['vetAdmin', 'admin', 'super', 'developer'],
    children: [
      {
        class: '',
        flex: [
          {
            _t: 'menu.spravka',
            text: 'Справочник',
            class: '',
            items: [
              {
                _t: 'menu.bolezn.index',
                text: 'болезни',
                class: '',
                icon: '',
                active: false,
                to: '/spravka/bolezn'
              },
              {
                _t: 'menu.mera.index',
                text: 'мера измерения',
                class: '',
                icon: '',
                active: false,
                to: '/spravka/mera',
              },
              {
                _t: 'menu.doljnost.index',
                text: 'должности',
                class: '',
                icon: '',
                active: false,
                to: '/spravka/doljnost',
              },
              {
                _t: 'menu.material_animal_type.index',
                text: 'вид животных',
                class: '',
                icon: '',
                active: false,
                to: '/spravka/material-animal-type',
              },
              {
                _t: 'menu.material_type.index',
                text: 'тип материалов',
                class: '',
                icon: '',
                active: false,
                to: '/spravka/material-type',
              },
              {
                _t: 'menu.material.index',
                text: 'исследуемые материалы',
                class: '',
                icon: '',
                active: false,
                to: '/spravka/material',
              },
              {
                _t: 'menu.pokazatel.index',
                text: 'определяемые показатели',
                class: '',
                icon: '',
                active: false,
                to: '/spravka/pokazatel',
              },
              {
                _t: 'menu.pdk.index',
                text: 'ПДК',
                class: '',
                icon: '',
                active: false,
                to: '/spravka/pokazatel-pdk',
              },
              {
                _t: 'menu.preparat.index',
                text: 'антибиотики и вакцины',
                class: '',
                icon: '',
                active: false,
                to: '/spravka/preparat',
              },
              {
                _t: 'menu.metod.index',
                text: 'НД',
                class: '',
                icon: '',
                active: false,
                to: '/spravka/metod',
              },
              {
                _t: 'menu.rmetod.index',
                text: 'методы исследование',
                class: '',
                icon: '',
                active: false,
                to: '/spravka/rmetod',
              },
              {
                _t: 'menu.rmaterials.index',
                text: 'методы исследование',
                class: '',
                icon: '',
                active: false,
                to: '/spravka/rmaterials',
              },
              {
                _t: 'menu.otdelenia.index',
                text: 'наименование отделении',
                class: '',
                icon: '',
                active: false,
                to: '/spravka/otdelenia',
              },
              {
                _t: 'menu.region_type.index',
                text: 'типы регионов',
                class: '',
                icon: '',
                active: false,
                to: '/spravka/region-type',
              },
              {
                _t: 'menu.regions.index',
                text: 'регионы',
                class: '',
                icon: '',
                active: false,
                to: '/spravka/regions',
              },
            ],
          },
        ],
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
                to: '/spravka/personal',
              },
              {
                _t: 'menu.role.index',
                text: 'Роли',
                class: '',
                icon: '',
                active: false,
                to: '/spravka/roles',
              },
              {
                _t: 'menu.departments.index',
                text: 'департамент',
                class: '',
                icon: '',
                active: false,
                to: '/spravka/departments',
              },
              {
                _t: 'menu.otdel.index',
                text: 'отделы',
                class: '',
                icon: '',
                active: false,
                to: '/spravka/otdel',
              },
              {
                _t: 'menu.sub_otdel.index',
                text: 'под отделы',
                class: '',
                icon: '',
                active: false,
                to: '/spravka/subOtdel',
              },
              {
                _t: 'menu.plan_raboty.index',
                text: 'план работы',
                class: '',
                icon: '',
                active: false,
                to: '/spravka/planRaboty',
              },

              {
                _t: 'menu.rmaterials_kit.index',
                text: 'расходные материалы',
                class: '',
                icon: '',
                active: false,
                to: '/spravka/rmaterialKit',
              },

              {
                _t: 'menu.otdel_rmaterials.index',
                text: 'остатки расходных материалов в отделах',
                class: '',
                icon: '',
                active: false,
                to: '/spravka/otdel-rmaterials',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    _t: 'menu.napravlenie.index',
    text: 'направление',
    type: 'children',
    class: '',
    icon: '',
    active: false,
    roles: ['vetAdmin', 'admin', 'super', 'developer', 'dispatcher'],
    children: [
      {
        _t: 'menu.napravlenie.add',
        text: 'Направлении',
        class: '',
        icon: '',
        active: false,
        to: '/napravlenie',
      },
      {
        _t: 'menu.napravlenie.route',
        text: 'Направление',
        class: '',
        icon: '',
        to: '/epic/napravlenie',
      }
    ],
  },
  {
    _t: 'menu.proby.index',
    text: 'Пробы',
    type: 'children',
    class: '',
    icon: '',
    active: false,
    children: [
      {
        _t: 'menu.posNapravlenia.index',
        text: 'поступившие направления',
        class: '',
        icon: '',
        to: '/napravlenie-pub',
      },
      {
        _t: 'menu.isledovanie.index',
        text: 'Исследование',
        class: '',
        icon: '',
        active: false,
        to: '/isledovanie',
      }
    ],
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
        to: '/reports/plan',
      },
      {
        _t: 'menu.form4Tiny',
        text: 'Форма №4(Компакт)',
        class: '',
        icon: '',
        active: false,
        to: '/reports/form4Tiny',
      },
    ],
  },
  {
    _t: 'menu.news',
    text: 'Новости',
    type: 'single',
    class: '',
    icon: '',
    active: false,
    to: '/',
  },
  {
    _t: 'menu.workers',
    text: 'Сотрудники',
    type: 'single',
    class: '',
    icon: '',
    active: false,
    to: '/',
  },
  {
    _t: 'menu.contacts',
    text: 'Контакты',
    type: 'single',
    class: '',
    icon: '',
    active: false,
    to: '/',
  },
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
