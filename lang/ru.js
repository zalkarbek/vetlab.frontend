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
      shortName: 'короткое навание',
      i18n: 'ключ для локализации'
    },
    placeholder: {
      name: 'название обьека',
      shortName: 'короткое название',
      i18n: 'ключ мультиязычности',
      sRegionTypeId: 'тип региона'
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
    title: 'отделении'
  },

  menu: {
    spravka: 'справочник',
    admin: 'админ',
    mera: {
      index: 'меры'
    },
    region_type: {
      index: 'типы регионов',
      add: ''
    },
    regions: {
      index: 'регионы',
      add: ''
    },
    otdelenia: {
      index: 'отделении',
      add: ''
    },
    doljnosti: {
      index: 'должности',
      add: ''
    },
    bolezni: {
      index: 'болезни',
      add: ''
    },
    pokazately: {
      index: 'определяемых показателей',
      add: ''
    },
    materialy_type: {
      index: 'типы материалов',
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
    materialy: {
      index: 'исследуемые материалы',
      add: ''
    },
    metod_isledovanie: {
      index: 'метод ииследование',
      add: ''
    },
    personal: {
      add: 'Добавление персонала',
      index: 'персонал'
    },
    home: 'Главная',
    direction: 'Направлении',
    departments: 'Отделы',
    reports: 'Отчеты',
    reportsResult: 'Заключение',
    reportPlanOfRegion: 'Планы по регионам',
    news: 'Новости',
    profile: 'Профиль',
    workers: 'Сотрудники',
    contacts: 'Контакты',
    chat: 'Чат',
    form4Tiny: 'Форма4(компакт)'
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
