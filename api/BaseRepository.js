class BaseRepository {
  constructor(ctx, restApi) {
    this.ctx = ctx
    this.restApi = restApi.rest
  }

  all() {
    return this.ctx.$axios.$get(this.restApi.all.url)
  }
  id(id) {
    return this.ctx.$axios.$get(this.restApi.id.url, {
      params: { id }
    })
  }
  create(data = {}) {
    return this.ctx.$axios.$post(this.restApi.create.url, data)
  }
  update(data) {
    return this.ctx.$axios.$put(this.restApi.update.url, data)
  }
  delete(params) {
    return this.ctx.$axios.$delete(this.restApi.destroy.url, { params })
  }
}
export { BaseRepository }
