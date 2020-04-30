import crud from '~/data/crud'
import inputMask from '~/data/input-mask'
import fieldTypes from '~/data/fieldTypes'
import datasetNamesList from '~/data/dataset'

const crudKeys = Object.keys(crud)
const dataset = {}
const datasetNames = []

crudKeys.forEach((key) => {
  const datasetName = crud[key].datasetName
  dataset[datasetName] = []
  datasetNames.push(datasetName)
})

datasetNamesList.forEach((key) => {
  datasetNames.push(key)
  dataset[key] = []
})

export default () => ({
  crud,
  dataset,
  datasetNames,
  database: {},
  fieldTypes,
  inputMask
})
