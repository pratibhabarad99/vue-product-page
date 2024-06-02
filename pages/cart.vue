<template>
  <div class="bg-gray-100 min-h-screen">
    <Header :cartItemCount="cart.length"/>
    <main class="container mx-auto py-8">
      <h1 class="text-3xl font-semibold text-gray-800 mb-6">Your Cart</h1>
      <div v-if="cart.length > 0">
        <div :key="index" class="bg-white rounded-md shadow-md mb-6" v-for="(item, index) in cart">
          <div class="flex items-center p-4">
            <img :alt="item.name" :src="item.image" class="w-24 h-24 object-contain mr-4">
            <div class="flex-1">
              <h2 class="text-lg font-semibold text-gray-800">{{ item.name }}</h2>
              <p class="text-sm text-gray-600">{{ item.description }}</p>
              <div class="flex items-center mt-2">
                <span class="text-lg font-semibold text-gray-800 mr-4">${{ item.price }}</span>
                <div class="flex items-center">
                  <span class="text-gray-600 mr-2">Qty:</span>
                  <input class="w-12 border border-gray-300 rounded-md text-center" min="1" type="number"
                         v-model="item.quantity">
                </div>
              </div>
            </div>
            <button @click="removeFromCart(index)" class="text-red-600 hover:text-red-800 focus:outline-none">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                   xmlns="http://www.w3.org/2000/svg">
                <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
              </svg>
            </button>
          </div>
        </div>
        <div class="flex justify-between items-center">
          <button @click="checkout"
                  class="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-3 rounded-lg focus:outline-none">Proceed
            to Checkout
          </button>
          <span class="text-lg font-semibold text-gray-800">Total: ${{ totalPrice }}</span>
        </div>
      </div>
      <div v-else>
        <p class="text-lg font-semibold text-gray-800">Your cart is empty</p>
      </div>
    </main>
    <Footer/>
  </div>
</template>

<script>
  import Header from '~/components/Header.vue';
  import Footer from '~/components/Footer.vue';

  export default {
    components: {
      Header,
      Footer
    },
    data() {
      return {
        cart: []
      };
    },
    computed: {
      totalPrice() {
        return this.cart.reduce((total, item) => {
          const price = parseFloat(item.price);
          const quantity = parseInt(item.quantity, 10);
          return total + (isNaN(price) ? 0 : price) * (isNaN(quantity) ? 1 : quantity);
        }, 0).toFixed(2);
      }
    },
    methods: {
      removeFromCart(index) {
        this.cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(this.cart));
      },
      checkout() {
        alert('Proceeding to checkout');
      }
    },
    mounted() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      console.log('Raw Cart:', cart);
      this.cart = cart.map(item => ({
        ...item,
        price: parseFloat(item.price),
        quantity: isNaN(parseInt(item.quantity, 10)) ? 1 : parseInt(item.quantity, 10)
      }));
    }

  };
</script>

<style>
  /* Add any custom styles here */
</style>
