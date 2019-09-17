// mutation只能同步 action异步
export default {
  updateCountAsync(store, data) {
    setTimeout(() => {
      store.commit('updateCount', {
        num: data.num
      })
    }, data.time)
  }
}
