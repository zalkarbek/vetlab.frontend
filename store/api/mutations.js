export default {
  SET_DATASET(state, { datasetName, datalist }) {
    state.dataset[datasetName] = [...datalist]
  }
}
