import Vue from 'vue';

const component = {
  name: 'comp',
  // template: `
  //   <div :style="style">
  //     <slot></slot>
  //   </div>
  // `,
  props: ['prop1'],
  data() {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      },
      value: 'child'
    };
  },
  render(createElement) {
    return createElement('div', {
      style: this.style,
      // on: {
      //   click: () => {this.$emit('click')}
      // }
    }, [this.$slots.header, this.prop1])
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
  // template: `
  //   <div>
  //     <comp-one ref="comp">
  //       <span ref="span">{{value}}</span>
  //     </comp-one>
  //   </div>
  // `,
  mounted() {
    console.log(this.$refs.comp.value, this.$refs.span, 31)
  },
  methods: {
    handleClick() {console.log('clicked')}
  },
  render() {
    return this.$createElement(
      'comp-one', {
        ref: 'comp',
        props: {
          prop1: this.value
        },
        // on: {
        //   click: this.handleClick
        // },
        // 自动绑定到组件的根节点原生dom上
        nativeOn: {
          click: this.handleClick
        }
      },
      [
        this.$createElement('span', {
          ref: 'span',
          slot: "header",
          domProps: {
            innerHTML: '<span>span</span>'
          },
          attrs: {
            id: 'test-id'
          }
        }, this.value)
      ]);
  }
})
