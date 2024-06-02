<template>
  <div class="bg-gradient-to-br from-beige to-lightPurple min-h-screen flex flex-col">
    <Header :cartItemCount="cart.length" @update:cartItemCount="updateCartCount"/>

    <main class="flex-grow py-8">
      <h1 class="text-4xl font-bold text-center mb-8 text-gray-800">Product Listing</h1>
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div :key="product.id"
               class="bg-white shadow-md rounded-md p-4 hover:shadow-lg transition-shadow duration-300"
               v-for="product in products">
            <div class="flex justify-center items-center mb-2">
              <img :alt="product.name" :src="product.image" class="w-full h-40 object-cover rounded-md">
            </div>
            <h2 class="text-lg font-semibold text-gray-800 mb-2">{{ product.name }}</h2>
            <p class="text-gray-700 mb-2">{{ product.description }}</p>
            <p class="text-gray-800 font-semibold mb-4">Price: ${{ product.price }}</p>
            <div class="flex justify-between items-center">
              <router-link :to="`/product/${product.id}`" class="text-blue-600 hover:underline">Details</router-link>
              <button @click="handleAddToCart(product)"
                      class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer/>
  </div>
</template>

<script>
  import Header from "../components/Header";
  import Footer from '~/components/Footer.vue';

  export default {
    components: {
      Header,
      Footer
    },
    data() {
      return {
        products: [],
        cart: []
      };
    },
    methods: {
      handleAddToCart(product) {
        const existingProduct = this.cart.find(item => item.id === product.id);
        if (existingProduct) {
          existingProduct.quantity++;
        } else {
          this.cart.push({...product, quantity: 1});
        }
        localStorage.setItem('cart', JSON.stringify(this.cart)); // Save cart to localStorage
      },
      updateCartCount(count) {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
      }
    },
    async mounted() {
      try {
        const response = await fetch('/products.json');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        this.products = await response.json();

        // Load cart from localStorage
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.cart = cart;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
  };
</script>
