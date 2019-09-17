<template>
    <div id="app">
        <div id="cover"></div>
        <Header></Header>
        <p>{{fullName}} {{counter}}</p>
        <!-- <p>{{textC}} {{textPlus}}</p> -->
        <!-- <router-link :to="{name: 'app'}">app</router-link> -->
        <router-link to="/app/123">app123</router-link>
        <router-link to="/app/456">app456</router-link>
        <router-link to="/login">login</router-link>
        <!-- <router-link to="/login/exact">login exact </router-link> -->
        <transition name="fade">
            <router-view />
        </transition>
        <Footer></Footer>
        <!-- <router-view name="a" /> -->
    </div>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapActions,
  mapMutations
} from 'vuex';
import Header from "./layout/header.vue";
import Footer from "./layout/footer.jsx";
import { setInterval } from 'timers';
// import Todo from "./views/todo/todo.vue";

// console.log(Header.__dcos);

export default {
    components: {
        Header,
        Footer,
        // Todo
    },
    mounted() {
        let i = 1;
        console.log(this.$store);
        this.updateCountAsync({
          num: 5,
          time: 2000
        });
        // this.testAction();
        // setInterval(() => {
        //   this.updateCount({
        //     num: i++,
        //     num2: 3
        //   })
        // }, 1000);
    },
    computed: {
      ...mapState({
        counter: (state) => state.count,
      }),
      ...mapGetters({
        fullName: 'fullName'
      })
    },
    methods: {
      ...mapActions(['updateCountAsync']),
      ...mapMutations(['updateCount'])
    }
};
</script>

<style lang="stylus">
#app {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}

/* 背景虚化 */
#cover {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #999;
    opacity: 0.8;
    z-index: -1;
}
</style>
