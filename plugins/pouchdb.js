import PouchDB from 'pouchdb'

import dbConfig from '../config/db'

export default ({ app }, inject) => {
  inject('pouch', new PouchDB(dbConfig.dbName))
}
