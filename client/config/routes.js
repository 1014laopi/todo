// import Todo from '../views/todo/todo.vue';
// import Login from '../views/login/login.vue';

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app/:id',
    // path: '/app',
    // props: (route) => ({id: route.query.b}),
    props: true,
    component: () => import('../views/todo/todo.vue'),
    // component: Todo,
    name: 'app',
    meta: {
      title: 'this is app',
      description: 'this is app'
    },
    beforeEnter(to, from, next) {
      // console.log('app route before enter');
      next();
    }
    // children: [
    //   {
    //     path: 'test',
    //     component: Login
    //   }
    // ]
  },
  {
    path: '/login',
    component: () => import('../views/login/login.vue')
  }
]
