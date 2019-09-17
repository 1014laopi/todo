import Vuex from 'vuex';
import defaultState from './state/state';
import mutations from './mutations/mutations';
import getters from './getters/getters';
import actions from './actions/actions';

const isDev = process.env.NODE_ENV === 'dev';

export default () => {
  const store = new Vuex.Store({
    // 开发环境可用，正式环境不可用
    strict: isDev,
    state: defaultState,
    mutations,
    getters,
    actions,
    // plugins: [
    //   (store) => {
    //     console.log('my plugin invoked');
    //   }
    // ]
    // modules: {
    //   a: {
    //     // 命名空间
    //     namespaced: true,
    //     state: {
    //       text: 1
    //     },
    //     mutations: {
    //       updateText(state, text) {
    //         state.text = text
    //       }
    //     },
    //     getters: {
    //       textPlus(state, getters, rootState) {
    //         return state.text + rootState.b.text;
    //       }
    //     },
    //     actions: {
    //       add({state, commit, rootState}) {
    //         commit('updateCount', { num: 56789 }, { root: true });
    //       }
    //     }
    //   },
    //   b: {
    //     namespaced: true,
    //     state: {
    //       text: 2
    //     },
    //     actions: {
    //       testAction({commit}) {
    //         commit('a/updateText', 'test text', {root : true});
    //       }
    //     }
    //   }
    // }
  });
  // vuex 热更替
  if (module.hot) {
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './actions/actions',
      './getters/getters'
    ], () => {
      const newState = require('./state/state').default;
      const newMutations = require('./mutations/mutations').default;
      const newActions = require('./actions/actions').default;
      const newGetters = require('./getters/getters').default;
      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        getters: newGetters,
        actions: newActions
      })
    })
  }
  return store;
};
