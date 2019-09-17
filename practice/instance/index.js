import Vue from 'vue';

const app = new Vue({
  // el: '#root',
  template: '<div ref="div">{{obj}}</div>',
  data: {
    text: 0,
    obj: {}
  },
  // watch: {
  //   text(newT, oldT) {
  //     console.log(`${newT}:${oldT}`);
  //   }
  // }
})

app.$mount('#root')
let i = 0;
setInterval(() => {
  // app.text += 1;
  i++;
  // app.obj.a = i;
  // app.$forceUpdate();
  app.$set(app.obj, 'a', i);
}, 1000);

// app.$options.render = (h) => {
//   return h('div', {} , 'new render function');
// }

// console.log(app.$data);
// console.log(app.$props);
// console.log(app.$el);
// console.log(app.$options);
// console.log(app.$root === app) ;
// console.log(app.$children);
// console.log(app.$scopedSlots);
// console.log(app.$slots);
// console.log(app.$refs);
// console.log(app.$isServer);

// watch返回值为一个unwatch方法，直接调用就会注销掉watch
// const unWatch = app.$watch('text', (newText, oldText) => {
//   console.log(`${newText} : ${oldText}`);
// })

// setTimeout(() => {
//   unWatch()
// }, 2000)

// app.$once('test', (a, b) => {
//   console.log(`test emited ${a} ${b}`);
// })

// app.$emit('test', 1, 2);

// setInterval(() => {
//   app.$emit('test', 1, 2)
// }, 1000);
