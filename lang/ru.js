export default {
  welcome: 'Добро пожаловать',
  list: 'список {name}',

  form: {
    add: 'добавление',
    save: 'сохранение',
    clear: 'очистить',
    update: 'обновить',

    field: {
      id: 'id'
    },
    label: {
      name: 'название',
      fullName: 'ФИО',
      shortName: 'короткое навание',
      i18n: 'ключ для локализации',
      sort: 'сортировка',
      search: 'поиск',
      search_on: 'поиск по',
      filter: 'фильтр',
      filter_on: 'фильтр по',
      per_page: 'количество',
      clear: 'очистка',
      address: 'адрес',
      phone_1: 'телефон 1',
      regionFullText: 'Полный адрес',
      sMaterialTypeId: 'Вид материала',
      sMaterialAnimalTypeId: 'вид животного',
      sMaterialColor: 'цвет материала',
      sRegionTypeId: 'вид региона',
      regionParentAutocomplete: 'входит в состав',
      departmentId: 'департамент',
      planCount: 'количество по плану',
      planKv: 'квартал',
      planYear: 'год плана',
      regionJSON: 'адрес',
      regionFullPath: 'полный адрес',
      departmentDataJSON: 'Дополнительная информация о департамента',
      sOtdeleniaId: 'принадлежит к группе отдела',
      otdelId: 'Принадлежит к отделу',
      opPokazatelId: 'Определяемый показатель',
      probyNapravilJSON: 'Пробу направил',
      probyDostavilJSON: 'Пробу доставил',
      ownerJSON: 'Владелец пробы',
      mestoOtboraRegionJSON: 'Место отбора пробы',
      kemOtobranJSON: 'Кем отобран',
      lechenieInfo: 'Сведение о лечении',
      sMaterialId: 'Проба материал',
      materialCount: 'Количество проб (материал)',
      sMeraId: 'Мера измерения',
      vozrast: 'Возраст животного',
      dateZabolivanie: 'Дата заболивания животного',
      dateZaboya: 'Дата забоя',
      dateOtbora: 'Дата отбора проб',
      dateDostavki: 'Дата доставки пробы'
    },
    placeholder: {
      name: 'название обьекта',
      fullName: 'ФИО',
      shortName: 'короткое название',
      i18n: 'ключ мультиязычности',
      sRegionTypeId: 'вид региона',
      sort: 'сортировка по выбранному поле',
      search: 'поле для поиска',
      search_on: 'поиск по',
      filter: 'поле для фильтра',
      filter_on: 'фильтр по',
      per_page: 'количество',
      address: 'адрес',
      phone_1: 'телефон',
      sMaterialTypeId: 'вид матриала',
      sMaterialAnimalTypeId: '(КРС, МРС, собаки, кошки)',
      sMaterialColor: 'цвет матриала',
      departmentId: 'департамент',
      planCount: 'количество по плану',
      planKv: 'какой квартал',
      planYear: 'выберите год плана',
      regionJSON: 'регион обьекта',
      regionFullPath: 'полный адрес',
      departmentDataJSON: 'информация о департамента',
      sOtdeleniaId: 'название группы отдела',
      otdelId: 'выберите отдел'
    },
    description: {
      sort: 'сортировка по выбранному поле',
      search: 'поле для поиска данных',
      search_on: 'поиск по выбранным полям',
      filter: 'фильтры по текущим данным',
      filter_on: 'фильтры по выбранным полям',
      per_page: 'количество элементов на странице',
      address: 'адрес нахождения обьекта',
      phone_1: 'телефонный номер',
      sMaterialTypeId: 'Кал, Кровь, Мясо, Молочный продукт и.т.д',
      sMaterialAnimalTypeId: '(КРС, МРС, собаки, кошки)',
      sMaterialColor: 'красный, белый, черный',
      sRegionTypeId: 'село, район, область',
      regionParentAutocomplete: 'родительский регион',
      departmentId: 'департамент',
      planCount: 'планируемое количество исследовании по плану',
      planKv: 'к какому кварталу принадлежит план',
      planYear: 'год плана',
      regionJSON: 'регион обьекта',
      regionFullPath: 'полный адрес: Область, район, село',
      departmentDataJSON: 'дополнительная информатция о департамента',
      sOtdeleniaId: 'биохимия, паразитология',
      otdelId: 'Родительский отдел',
      vozrast: 'Если материал животного произ хождения то сколько ему лет'
    }
  },
  s_mera: {
    title: 'мера',
    add: 'добавление',
    label: {
      name: 'название',
      shortName: 'короткое навание',
      i18n: 'ключ для локализации'
    },
    placeholder: {
      name: '(кг, гр, мл, л)',
      shortName: 'короткое название',
      i18n: 'ключ мультиязычности'
    }
  },
  s_otdelenia: {
    title: 'Наименование отделении'
  },
  s_material: {
    title: 'Исследуемые материалы'
  },
  s_bolezn: {
    title: 'Болезни'
  },
  s_doljnost: {
    title: 'Должности'
  },
  s_material_type: {
    title: 'Вид материалов'
  },
  s_material_animal_type: {
    title: 'Виды животных'
  },
  s_metod: {
    title: 'Методы исследовании'
  },
  s_pokazatel: {
    title: 'Определяемые показатели'
  },
  s_region: {
    title: 'Регионы'
  },
  s_region_type: {
    title: 'Вид региона'
  },
  napravlenie: {
    title: 'Направление'
  },
  otdel: {
    title: 'Отдел'
  },
  planRaboty: {
    title: 'План работы'
  },
  pos_material: {
    title: 'Поступившие материалы'
  },
  subOtdel: {
    title: 'Под отдел'
  },

  menu: {
    spravka: 'справочник',
    divider: '#######',
    admin: 'админ',
    mera: {
      index: 'меры'
    },
    region_type: {
      index: 'вид регионов',
      add: ''
    },
    regions: {
      index: 'регионы',
      add: ''
    },
    otdelenia: {
      index: 'наименование отделении',
      add: ''
    },
    doljnost: {
      index: 'должности',
      add: ''
    },
    bolezn: {
      index: 'болезни',
      add: ''
    },
    pokazatel: {
      index: 'определяемый показатель',
      add: ''
    },
    material_type: {
      index: 'вид материалов',
      add: ''
    },
    material_animal_class: {
      index: 'класс животных',
      add: ''
    },
    material_animal_type: {
      index: 'вид животных',
      add: ''
    },
    material: {
      index: 'исследуемые материалы',
      add: ''
    },
    metod: {
      index: 'методы ииследование',
      add: ''
    },
    personal: {
      add: 'Добавление персонала',
      index: 'персонал'
    },
    otdel: {
      index: 'отделы',
      add: ''
    },
    sub_otdel: {
      index: 'под отделы',
      add: ''
    },
    departments: {
      index: 'департамент',
      add: ''
    },
    plan_raboty: {
      index: 'план работы',
      add: ''
    },
    isledovanie: {
      index: 'исследование',
      add: ''
    },
    analysis: {
      index: 'анализ',
      add: ''
    },
    protocol_isledovanie: {
      index: 'заключение',
      add: ''
    },
    proby_isledovanie: {
      index: 'пробы на исследовании'
    },
    proby_postup: {
      index: 'поступившие пробы'
    },
    epidemiology: {
      index: 'эпидемиология'
    },
    napravlenie: {
      index: 'направление'
    },
    home: 'главная',
    direction: 'направлении',
    reports: 'отчеты',
    reportsResult: 'заключение',
    reportPlanOfRegion: 'планы по регионам',
    news: 'новости',
    profile: 'профиль',
    workers: 'сотрудники',
    contacts: 'контакты',
    chat: 'чат',
    form4Tiny: 'форма4(компакт)'
  },

  count: 'Количество',
  material: {
    count: 'Количество материалов'
  },
  regions: {
    osh: {
      text: 'Ошская область',
      tinyText: 'Ош'
    },
    'jalal-abad': {
      text: 'Джалал-Абадская область',
      tinyText: 'Джалал-Абад'
    },
    batken: {
      text: 'Баткенская область',
      tinyText: 'Баткен'
    },
    'south-region': {
      text: 'Южный регион',
      tinyText: 'Юг',
      allResult: 'Все результаты по Южному региону'
    }
  },

  departments: {
    one: 'Отдел',
    many: 'Отделы',
    part: 'Отдел {department}',

    epidemiology: 'Эпидемиология',
    serology: 'Серология',
    bacteriology: 'Бактериология',
    parasitology: 'Паразитология',
    foodSecurity: 'Продукты питания',
    virology: 'Вирусология',
    biochemistry: 'Биохимия',
    toxicology: 'Химтоксикология',
    radiology: 'Радиология',
    mycology: 'Микология',
    ascoly: 'Асколи',
    leptospiros: 'Лептоспироз',
    leukemia: 'Лейкемия'
  },

  research: {
    text: 'Исследовано',
    pathologist: {
      specialist: 'Патологоанатом',
      department: 'Патологоанотомия',
      method: 'Патологическая анатомический'
    },
    organoleptic: {
      specialist: 'Органолептик',
      department: 'Органолептика',
      method: 'Органолептический'
    },
    microscopy: {
      specialist: 'Микроскопиолог',
      department: 'Микроскопия',
      method: 'Микроскопический'
    },
    bacteriology: {
      specialist: 'Бактериолог',
      department: 'Бактериология',
      method: 'Бактериологический'
    },
    microbiology: {
      specialist: 'Микробиолог',
      department: 'Микробиология',
      method: 'Микробиологический'
    },
    serology: {
      specialist: 'Серолог',
      department: 'Серология',
      method: 'Серологический'
    },
    caprology: {
      specialist: 'Капролог',
      department: 'Капрология',
      method: 'Капрологический'
    },
    mycology: {
      specialist: 'Миколог',
      department: 'Микология',
      method: 'Мокологический'
    },
    biochemistry: {
      specialist: 'Биохимик',
      department: 'Биохимия',
      method: 'Биохимический'
    },
    chemToxicology: {
      specialist: 'Токсихолог',
      department: 'Химтоксикология',
      method: 'Химтоксикологический'
    },
    radioLab: {
      specialist: 'Радиолог',
      department: 'Радиология',
      method: 'Радиологический'
    }
  },

  error: {
    title: 'Ошибка',
    auth: 'Ошибка авторизации логин или пароль неверны',
    authWrong: 'Логин или пароль неверны',
    connection: 'Ошибка подключение к серверу',
    emptyField: 'Ошибка, поле пустое заполните поле',
    emptyFields: 'Ошибка, пустые поля, заполните поля',
    requireAuth: 'Требуется авторизация',
    pleaseRequireAuth: 'Пожалуйста авторизуйтесь',
    create: 'Ошибка создания',
    update: 'Ошибка обновления',
    get: 'Ошибка получения'
  },

  auth: {
    signIn: 'Войти',
    signOut: 'Выйти',
    endSession: 'Завершить сеанс'
  },

  success: {
    title: 'Успешно',
    auth: 'Авторизация успешно',
    create: 'Успешно создано',
    update: 'Успешно обновлено',
    get: 'Успешно получено'
  },
  help: {
    helpCenter: 'Центр помощи'
  },
  profile: {
    edit: 'Редактировать профиль',
    view: 'Просмотр профиля',
    delete: 'Удалить профиль'
  },
  placeholder: {
    enterEmail: 'Введите email',
    enterPassword: 'Введите пароль'
  },
  require: {
    title: 'Требуется',
    email: 'Пожалуйста введите email',
    password: 'Пожалуйста введите пароль'
  },
  current: {
    year: 'за этот год',
    week: 'за эту неделю',
    day: 'за сегодня'
  },
  researchConducted: 'Проведенные исследование',
  result: 'Результат',
  completed: 'Выполнен',
  plan: 'План',
  percent: 'Процент'
}
