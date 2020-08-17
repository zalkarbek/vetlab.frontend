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
  PUSH_TO_DATASET_FIRST(state, { datasetName, data }) {
    if (!state.dataset[datasetName]) {
      state.dataset[datasetName] = []
    }
    state.dataset[datasetName] = [data, ...state.dataset[datasetName]]
  },
  UPDATE_ITEM_IN_DATASET(state, { datasetName, id, data }) {
    const elementIndex = this.$lodash.findIndex(state.dataset[datasetName], {
      id,
    })
    if (elementIndex >= 0) {
      state.dataset[datasetName][elementIndex] = data
    }
  },
  REMOVE_ITEM_IN_DATASET(state, { data, datasetName }) {
    const dataset = state.dataset[datasetName]
    if(dataset) {
      dataset.splice(dataset.indexOf(data), 1)
    }
  },
  CRUD_FIELDS_REPLACE(state, { crud, fields = [] }) {
    crud.fields = fields
  },

  CRUD_FIELDS_REPLACE_ONE(state, { crud, oldField, newField }) {
    const oldIndex = crud.fields.indexOf(oldField)
    if(oldIndex !== -1) {
      crud.fields[oldIndex] = newField
    }
  },

  CRUD_FIELDS_JSON_REPLACE(state, { field, json }) {
    field.json = json
  },

  CRUD_FIELDS_ADD(state, { crud, field }) {
    crud.fields.push(field)
  }
}
