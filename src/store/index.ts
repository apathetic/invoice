import Vue from 'vue';
import Vuex from 'vuex';
import { MutationPayload, Store } from 'vuex';
import { LineItem, RootState } from '../types';

Vue.use(Vuex);

const persistedId = localStorage.getItem('id');
const persistedItems = localStorage.getItem('items');
const persistedDiscounts = localStorage.getItem('discounts');
const persistedTax = localStorage.getItem('tax');
const persistedShipping = localStorage.getItem('shipping');


export default new Vuex.Store({
  state: {
    discounts: parseInt(persistedDiscounts || '0', 10),
    tax: parseInt(persistedTax || '0', 10),
    shipping: parseInt(persistedShipping || '0', 10),
    items: (persistedItems) ? JSON.parse(persistedItems) : [],
    id: parseInt(persistedId || '0', 10)
  },

  mutations: {
    /**
     * Adds a new LineItem into the Work details
     */
    addItem: (state: RootState) => {
      const item: LineItem = {
        description: '',
        quantity: 0,
        rate: 0,
        lineTotal: 0,
        id: state.id++
      };

      state.items.push(item);
    },

    /**
     * Removes a particular LineItem from the billing details.
     */
    removeItem: (state: RootState, id: number) => {
      const remove = state.items.findIndex(item => item.id === id);

      if (!!~remove) {
        state.items.splice(remove, 1);
      }
    },

    /**
     * Updates any field within a particular LineItem
     */
    updateItem: (state: RootState, data: LineItem) => {
      const update = state.items.findIndex(item => item.id === data.id);

      if (!!~update) {
        Vue.set(state.items, update, data);
      }
    },

    /**
     * Sets any discounts for this invoice, in dollars.
     */
    setDiscount: (state: RootState, value: number) => {
      state.discounts = value;
    },

    /**
     * Sets the tax rate, in percent.
     */
    setTax: (state: RootState, value: number) => {
      state.tax = value;
    },

    /**
     * Sets any incurred shipping charges, in dollars.
     */
    setShipping: (state: RootState, value: number) => {
      state.shipping = value;
    }
  },

  actions: {
    //
  },

  getters: {
    discounts: state => state.discounts,
    tax: state => state.tax,
    shipping: state => state.shipping,
    items: state => state.items,
    subTotal: state => state.items.reduce((sub, item) => sub += item.lineTotal, 0),
    total: (state, getters) => {
      const tax = 1 + getters.tax / 100;
      const total = (getters.subTotal - getters.discounts) * tax + getters.shipping;

      return (Math.max(total, 0));
    }
  },

  plugins: [
    (store: Store<RootState>) => {
      store.subscribe((mutation: MutationPayload, { items }) => {
        localStorage.setItem('items', JSON.stringify(items));
      });

      store.subscribe((mutation: MutationPayload, { id }) => {
        localStorage.setItem('id', id.toString());
      });

      store.subscribe((mutation: MutationPayload, { discounts }) => {
        localStorage.setItem('discounts', discounts.toString());
      });

      store.subscribe((mutation: MutationPayload, { tax }) => {
        localStorage.setItem('tax', tax.toString());
      });

      store.subscribe((mutation: MutationPayload, { shipping }) => {
        localStorage.setItem('shipping', shipping.toString());
      });
    }
  ],
});
