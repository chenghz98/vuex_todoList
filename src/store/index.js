import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    inputValue: 'aaa',
    nextId: 5
  },
  mutations: {
    initList(state, list) {
      state.list = list
    },
    setInputValue(state, val) {
      state.inputValue = val
    },
    addItem(state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(obj)
      state.nextId++
      state.inputValue = ''
    },
    removeItem(state, id) {
      const i = state.list.findIndex(a => a.id === id)
      if (i !== -1) {
        state.list.splice(i, 1)
      }
    },
    changeStatus(state, param) {
      // 根据id改变对应事项的状态
      const index = state.list.findIndex(x => x.id === param.id)
      if (index !== -1) state.list[index].done = param.status
    }
  },
  actions: {
    async getList(context) {
      const { data } = await axios.get('/list.json')
      console.log(data)
      context.commit('initList', data)
    }
  },
  modules: {}
})
