export default {
  css: [
    '~/assets/css/tailwind.css',
  ],
  buildModules: [
    '@nuxtjs/tailwindcss',
  ],
  router: {
    // Define your routes here
    routes: [
      {
        path: '/cart',
        component: '@/pages/cart.vue'
      }
    ]
  },
  plugins: [
    '~/plugins/bootstrap-icons.js'
  ]

};
