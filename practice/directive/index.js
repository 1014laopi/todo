import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div>
      <div v-once>
        Text: {{active}}  
      </div>
      <div v-if="text !== 0">
        Else Text: {{text}}  
      </div>
      <div v-else>
        else content
      </div>
      <div v-html="html">
      </div>
      <input type="text" v-model="text">
      <input type="checkbox" v-model="active">
      <div>
        <input type="checkbox" :value="1" v-model="arr">
        <input type="checkbox" :value="2" v-model="arr">
        <input type="checkbox" :value="3" v-model="arr">
      </div>
      <div>
        <input type="radio" value="one" v-model="picked">
        <input type="radio" value="two" v-model="picked">
      </div>
      <ul>
        <li v-for="(item, index) in arr" :key="index">{{item}}:{{index}}</li>
      </ul>
      <ul>
        <li v-for="(value, key, index) of obj">{{value}}:{{key}}:{{index}}</li>
      </ul>
    </div>
  `,
  data: {
    arr: [1,2,3],
    picked: '',
    obj: {
      a: '123',
      b: '456',
      c: '789'
    },
    text: 0,
    active: false,
    html: '<span>this is html</span>',
  }
})
