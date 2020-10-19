import AuthApi from './auth'
import { DepartmentRepository } from './DepartmentRepository'
import { OptionRepository } from '~/api/OptionRepository'
import { IsledovanieResultRepository } from '~/api/IsledovanieResultRepository'
import { OtdelRepository } from '~/api/OtdelRepository'
import { PosMaterialRepository } from '~/api/PosMaterialRepository'
import { PokazatelRepository } from '~/api/PokazatelRepository'
import { PokazatelPdkRepository } from '~/api/PokazatelPdkRepository'
import { ReportRepository } from '~/api/ReportRepository'
import { PersonalRepository } from '~/api/PersonalRepository'


class Api {
  constructor(context) {
    const crudApi = context.store.state.api.crud
    this.context = context
    this.apiServices = {
      auth: AuthApi(context),
      otdel: new OtdelRepository(context, crudApi.otdel),
      department: new DepartmentRepository(context, crudApi.department),
      option: new OptionRepository(context, crudApi.option),
      pokazatel: new PokazatelRepository(context, crudApi.s_pokazatel),
      pokazatelPdk: new PokazatelPdkRepository(context, crudApi.s_pokazatel_pdk),
      isledovanieResultNames: new IsledovanieResultRepository(context, crudApi.isledovanie_result_names),
      posMaterial: new PosMaterialRepository(context, crudApi.pos_material),
      report: new ReportRepository(context),
      personal: new PersonalRepository(context, crudApi.personal)
    }
  }

  getApi(name) {
    return this.apiServices[name]
  }

  req(req, { params, data }) {
    return this.context.$axios({
      method: req.method,
      url: req.url,
      params,
      data,
    })
  }

  get(url, params) {
    return this.context.$axios.$get(url, { params })
  }

  put(url, params) {
    return this.context.$axios.$put(url, params)
  }

  post(url, params) {
    return this.context.$axios.$post(url, params)
  }

  delete(url, params) {
    return this.context.$axios.$delete(url, { params })
  }

  setHeader(name, value, scopes = []) {
    this.context.$axios.setHeader(name, value, scopes)
  }

  setToken(
    token,
    type = 'Bearer',
    scopes = ['get', 'post', 'put', 'patch', 'delete', 'options']
  ) {
    this.context.$axios.setToken(token, type, scopes)
  }
}

export default (context) => {
  return new Api(context)
}
