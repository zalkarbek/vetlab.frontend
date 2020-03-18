export default {
  dataset: (state) => state.dataset,
  getDatasetByName: (state) => (name) => {
    return state.dataset[name]
  }
}
