import Vue from 'vue';

const component = {
  props: {
    active: {
      type: Boolean,
      // required: true,
      // default: false
      // validator(value) {
      //   return typeof value === 'boolean'
      // }
    },
    propOne: String,
  },
  template: `
    <div>
      <input type="text" v-model="text">
      <span v-show="active">see me if active</span>
      <span @click="handleChange">{{propOne}}</span>
    </div>
  `,
  data() {
    return {
      text: 0
    };
  },
  methods: {
    handleChange() {
      this.$emit('change');
    },
    add() {
      this.text++;
    }
  }
}

// Vue.component('CompOne', component);

new Vue({
  components: {
    CompOne: component
  },
  el: '#root',
  data: {
    active: true,
    prop1: 'text1'
  },
  mounted() {
    console.log(this.$refs.comp1);
  },
  template: `
    <div>
      <comp-one ref="comp1" :active="active" :prop-one="prop1" @change="handleChange"></comp-one>
      <comp-one active="!active" prop-one="text2"></comp-one>
      <button @click="add"></button>
    </div>
  `,
  methods: {
    handleChange() {
      this.prop1 += '1';
    },
    add() {
      this.$refs.comp1.add();
    }
  }
})
