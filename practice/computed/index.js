import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div>
      <p>Name: {{name}}</p>
      <p>Name: {{getName()}}</p>
      <p>Number: {{number}}</p>
      <p>FullName: {{fullName}}</p>
      <p>Number:<input type="text" v-model="number"></p>
      <p>FirstName:<input type="text" v-model="firstName"></p>
      <p>LastName: <input type="text" v-model="lastName"></p>
      <p>obj.a: <input type="text" v-model="obj.a"></p>
    </div>
  `,
  data: {
    firstName: 'Xiao',
    lastName: 'Wang',
    number: 0,
    fullName: ' ',
    obj: {
      a: '123'
    }
  },
  computed: {
    name: {
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
      set() {
        const names = name.split(' ');
        this.firstName = names[0];
        this.lastName = names[1];
      }
    }
  },
  // mounted() {
  //   this.obj = {
  //     a: '345'
  //   }
  // },
  // 最初绑定不执行, 设置immediate可以首次执行
  watch: {
    // firstName(newName, oldName) {
    //   this.fullName = newName + ' ' + this.lastName;
    // }
    'obj.a': {
      handler(newName, oldName) {
        console.log('obj.a changed');
      },
      immediate: true,
      // deep: true
    },

  },
  methods: {
    getName() {
      console.log(`getName invoked${this.firstName} ${this.lastName}`);
      return `${this.firstName} ${this.lastName}`
    }
  }
})
