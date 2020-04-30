export default {
  INIT_DATASET(state, { datasetName }) {
    state.dataset[datasetName] = []
  },
  FLUSH_DATASET(state, { datasetName }) {
    state.dataset[datasetName] = []
  },
  SET_DATASET(state, { datasetName, datalist }) {
    state.dataset[datasetName] = datalist
  },
  PUSH_TO_DATASET(state, { datasetName, data }) {
    if (!state.dataset[datasetName]) {
      state.dataset[datasetName] = []
    }
    state.dataset[datasetName].push(data)
  },
  UPDATE_ITEM_IN_DATASET(state, { datasetName, id, data }) {
    const elementIndex = this.$lodash.findIndex(state.dataset[datasetName], {
      id
    })
    if (elementIndex >= 0) {
      state.dataset[datasetName][elementIndex] = data
    }
  }
}
