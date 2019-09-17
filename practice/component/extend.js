import Vue from 'vue';

const component = {
  props: {
    active: Boolean,
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
  mounted() {
    console.log('comp mounted');
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

const parent = new Vue({
  name: 'parent',
})

const component2 = {
  extends: component,
  data() {
    return {
      text: 1
    }
  },
  mounted() {
    // this.$parent.text = 12345;
    console.log(this.$parent.$options.name);
  },
}

new Vue({
  parent: parent,
  name: 'root',
  el: '#root',
  components: {
    Comp: component2
  },
  mounted() {
    // this.$parent.text = 12345;
    console.log(this.$parent.$options.name);
  },
  data: {
    text: 233333
  },
  template: `
    <div>
      <span>{{text}}</span>
      <comp></comp>
    </div>
  `
})



// const CompVue = Vue.extend(component);

// new CompVue({
//   el: '#root',
//   propsData: {
//     propOne: 'xxx'
//   },
//   data: {
//     text: 123
//   },
//   mounted() {
//     console.log('instance mounted');
//   },
// })
