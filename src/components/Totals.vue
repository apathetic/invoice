<template>
  <section>
    <div class="container align-items--right">
      <dl>
        <dt>Subtotal</dt>
        <dd>
          <span>$ {{ subTotal.toFixed(2) }}</span>
        </dd>

        <dt>Discounts</dt>
        <dd class="format format--dollar">
          <input v-model="discounts" @change="format"></input>
        </dd>

        <dt>Tax</dt>
        <dd class="format format--percent">
          <input v-model="tax" @change="format"></input>
        </dd>

        <dt>Shipping</dt>
        <dd class="format format--dollar">
          <input v-model="shipping" @change="format"></input>
        </dd>

        <dt>Total</dt>
        <dd>
          <strong>$ {{ total.toFixed(2) }}</strong>
        </dd>
      </dl>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapGetters } from 'vuex';

export default Vue.extend({
  name: 'totals',

  computed: {
    discounts: {
      get(): any {
        return this.$store.getters.discounts;
      },
      set(value: any) {
        value = parseFloat(value) || 0;
        this.$store.commit('setDiscount', value);
      }
    },

    tax: {
      get(): any {
        return this.$store.getters.tax;
      },
      set(value: any) {
        value = parseFloat(value) || 0;
        this.$store.commit('setTax', value);
      }
    },

    shipping: {
      get(): any {
        return this.$store.getters.shipping;
      },
      set(value: any) {
        value = parseFloat(value) || 0;
        this.$store.commit('setShipping', value);
      }
    },

    ...mapGetters([
      'total',
      'subTotal',
    ])
  },

  methods: {
    format(e: Event) {
      const value = (e.target as HTMLInputElement).value;
      const formatted = (parseFloat(value) || 0).toFixed(2);

      (e.target as HTMLInputElement).value = formatted;
    }
  }
});
</script>