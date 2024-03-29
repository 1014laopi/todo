import Vue from 'vue';

const component = {
  model: {
    prop: 'value1',
    event: 'change'
  },
  props: ['value1'],
  template: `
    <div>
      <input type="text" @input="handleInput" :value="value1">
    </div>
  `,
  data() {
    return {
      text: 0
    };
  },
  methods: {
    handleInput(e) {
      console.log(e.target.value);
      this.$emit('change', e.target.value);
    }
  }
}

new Vue({
  el: '#root',
  components: {
    CompOne: component
  },
  data() {
    return {
      value: 123
    }
  },
  template: `
    <div>
      <comp-one v-model="value"></comp-one>
    </div>
  `
})
