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
  async getDataset({ state, dispatch, commit }, { datasetName, datasetCrud }) {
    if (!state.dataset[datasetName].length) {
      const response = await dispatch('req', {
        req: state.crud[datasetCrud].rest.all
      })
      if (response && response.data) {
        commit('SET_DATASET', { datasetName, datalist: response.data })
      }
    }
    return state.dataset[datasetName]
  }
}
