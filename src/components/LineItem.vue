<template>
  <div class="line-item grid">
    <input class="grid__item" v-model="description" @change="save" type="text" placeholder="description"></input>
    <input class="grid__item" :value="quantity" @change="update($event, 'quantity')"></input>
    <input class="grid__item" :value="rate" @change="update($event, 'rate')"></input>
    <span class="grid__item">${{ lineTotal.toFixed(2) }}</span>

    <button @click="removeItem">×</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'lineItem',

  props: {
    item: Object
  },

  data() {
    return {
      id: undefined,
      description: '',
      quantity: 0,
      rate: 0
    };
  },

  created() {
    this.id = this.item.id || 0;
    this.description = this.item.description;
    this.quantity = this.item.quantity;
    this.rate = this.item.rate;
  },

  computed: {
    lineTotal(): any {
      return this.quantity * this.rate;
    }
  },

  methods: {
    removeItem() {
      this.$store.commit('removeItem', this.id);
    },

    update(e: Event, field: string) {
      const value = (e.target as HTMLInputElement).value;
      const formatted = parseFloat(value) || 0;

      this[field] = (field === 'rate') ? formatted.toFixed(2) : formatted.toString();
      this.save();
    },

    save() {
      this.$store.commit('updateItem', {
        id: this.id,
        description: this.description,
        quantity: this.quantity,
        rate: this.rate,
        lineTotal: this.lineTotal
      });
    }
  }
});
</script>

<style lang="scss">
  .line-item {
    button {
      border-radius: 50%;
      font-size: 18px;
      display: none;
      height: 24px;
      line-height: 24px;
      position: absolute;
      right: -20px;
      top: 5px;
      width: 24px;
    }

    &:hover {
      button {
        display: block;
      }
    }

    .grid__item {
      width: 0; // defaults to flex
    }
  }
</style>
