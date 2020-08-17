class ReportRepository {
  constructor(ctx) {
    this.ctx = ctx
    this.routePrefix = 'report/isledovanie'
  }
  getIsledovanieReportData(params = {}) {
    return this.ctx.$axios.$get(`api/v1/${this.routePrefix}/data`, {
      params
    })
  }
}
export { ReportRepository }
