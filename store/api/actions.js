import PouchDB from 'pouchdb'
import PouchDBFind from 'pouchdb-find'

PouchDB.plugin(PouchDBFind)

export default {
  req(ctx, { req, params, data }) {
    return this.$api.req(req, { params, data })
  },
  get(ctx, { url, params }) {
    return this.$api.get(url, params)
  },
  post(ctx, { url, data }) {
    return this.$api.post(url, data)
  },
  put(ctx, { url, data }) {
    return this.$api.put(url, data)
  },
  delete(ctx, { url, params }) {
    return this.$api.delete(url, params)
  },
  async getDataset(
    { state, dispatch, commit },
    { datasetName, datasetCrudName, datasetCrudMethod, params, data }
  ) {
    if (!state.dataset[datasetName] || !state.dataset[datasetName].length) {
      try {
        const crud = state.crud[datasetCrudName]
        const req = crud.rest[datasetCrudMethod] || crud.rest.all
        const response = await dispatch('req', {
          req,
          params,
          data
        })
        if (response && response.data) {
          commit('SET_DATASET', { datasetName, datalist: response.data })
        }
      } catch (e) {
        console.log(state.crud[datasetCrudName], datasetCrudMethod)
      }
    }
    return state.dataset[datasetName]
  },
  setDataset({ commit }, { datasetName, datalist }) {
    commit('SET_DATASET', { datasetName, datalist })
  },
  pushItemToDataset({ commit }, { datasetName, data }) {
    commit('PUSH_TO_DATASET', { datasetName, data })
  },
  updateItemInDataset({ commit }, { datasetName, id, data }) {
    commit('UPDATE_ITEM_IN_DATASET', { datasetName, id, data })
  },
  getDataInDataset({ state }, { datasetName }) {
    return state.dataset[datasetName]
  },
  getDataInDatasetPaginate(
    { state },
    { datasetName, page = 1, pageSize = 10 }
  ) {
    const dataset = state.dataset[datasetName]
    if (dataset && dataset.length >= 1) {
      const chunked = this.$lodash.chunk(dataset, pageSize)
      const length = chunked.length
      const totalRows = dataset.length
      if (length >= page) {
        return { rows: chunked[page - 1], totalRows }
      } else if (length <= page) {
        return { rows: chunked[length - 1], totalRows }
      }
    }
    return { rows: [], totalRows: 0 }
  },

  findInDataset({ state }, { datasetName, columnName, query }) {
    const dataset = state.dataset[datasetName]
    if (dataset && dataset.length >= 1) {
      return this.$filterObjectArray(query, columnName, dataset)
    }
    return []
  },

  findElementInDataset({ state }, { datasetName, columnName, value }) {
    const dataset = state.dataset[datasetName]
    if (dataset && dataset.length >= 1) {
      return dataset.find((item) => {
        return item[columnName] === value
      })
    }
    return {}
  },

  createDatabase(ctx, { schemaName }) {
    return new PouchDB(schemaName)
  },

  getDatabase({ dispatch }, { schemaName }) {
    return dispatch('createDatabase', { schemaName })
  },

  async storeDataToDatabase({ state, dispatch, commit }, { schemaName, data }) {
    const db = await dispatch('createDatabase', { schemaName })
    return db.bulkDocs(data)
  },

  async pushDataToDatabase({ state, dispatch, commit }, { schemaName, data }) {
    const db = await dispatch('createDatabase', { schemaName })
    return db.put(data)
  },

  async destroyDatabase({ dispatch }, { schemaName }) {
    const db = await dispatch('createDatabase', { schemaName })
    return db.destroy()
  },

  async findInDatabase({ dispatch }, { schemaName, query }) {
    const db = await dispatch('createDatabase', { schemaName })
    return db.find(query)
  },

  async allInDatabase({ dispatch }, { schemaName, options = {} }) {
    const db = await dispatch('createDatabase', { schemaName })
    return db.allDocs(options)
  },
  async allPaginateInDatabase({ dispatch }, { schemaName, options }) {
    const db = await dispatch('createDatabase', { schemaName })
    return db.allDocs(options)
  }
}
