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
  }
}
