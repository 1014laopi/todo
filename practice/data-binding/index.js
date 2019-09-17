import Vue from 'vue';

const app = new Vue({
  el: '#root',
  // template: `
  //   <div :id="aaa" @click="handleClick">
  //     {{html}}
  //     <p v-html="html"></p>
  //   </div>
  // `,
  template: `
    <div 
      :class="[{active: isActive}]"
      :style="[styles, styles2]"
    >
      <p>{{getJoinedArr(arr)}}</p>
    </div>
  `,
  data: {
    isActive: false,
    arr: [1, 2, 3],
    html: '<span>123</span>',
    aaa: 'main',
    styles: {
      color: 'red',
      appearance: 'none'
    },
    styles2: {
      color: 'green'
    }
  },
  methods: {
    handleClick() {
      alert('clicked');
    },
    getJoinedArr(arr) {
      return arr.join(' ')
    }
  }
})
