import crud from '~/data/crud'
const keys = Object.keys(crud)
const dataset = {}
const datasetNames = []

keys.forEach((key) => {
  const datasetName = crud[key].datasetName
  dataset[datasetName] = []
  datasetNames.push(datasetName)
})

export default () => ({
  crud,
  dataset,
  datasetNames,
  fieldTypes: [
    'text',
    'number',
    'textarea',
    'date',
    'email',

    'select',
    'multi_select',
    'autocomplete',

    'select:preload',
    'multi_select:preload',
    'autocomplete:preload',

    'select:search',
    'multi_select:search',
    'autocomplete:search',
    'tag'
  ]
})
