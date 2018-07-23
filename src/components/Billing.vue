<template>
  <section class="details">
    <div class="container">
      <div class="grid grid__header">
        <span class="grid__item">Item</span>
        <span class="grid__item">Quantity</span>
        <span class="grid__item">Rate</span>
        <span class="grid__item">Amount</span>
      </div>

      <ul>
        <li v-for="item in items" :key="item.id">
          <LineItem :item="item" />
        </li>
      </ul>

      <button class="button--cta" @click="addItem">add line item</button>

    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import LineItem from './LineItem.vue';
import { mapMutations, mapGetters } from 'vuex';

export default Vue.extend({
  name: 'billing',

  components: {
    LineItem,
  },

  computed: {
    ...mapGetters([
      'items'
    ])
  },

  methods: {
    ...mapMutations([
      'addItem'
    ])
  }
});
</script>

<style lang="scss">
  @import '../assets/scss/variables.scss';

  .grid {
    display: flex;
  }

  .grid__header {
    background: #000;
    color: #fff;
  }

  .grid__item {
    flex: 1;
    flex: 1 1 20%;
    padding: $padding;
    text-align: left;

    &:first-child {
      flex: 1 1 100%;
      max-width: none;
    }
  }

</style>
