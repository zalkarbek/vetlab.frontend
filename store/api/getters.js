export default {
  dataset: (state) => state.dataset,
  getDatasetByName: (state) => (name) => {
    return state.dataset[name]
  },
  elementInDataset: (state) => (datasetName, columnName, value) => {
    const dataset = state.dataset[datasetName]
    if (dataset && dataset.length >= 1) {
      return dataset.find((item) => {
        return item[columnName] === value
      })
    }
    return {}
  },
}
