<template>
  <section class="overview">
    <div class="container">
      <h1>Invoice</h1>
      <div class="columns">
        <div class="column">
          <textarea name="from" placeholder="Sender" rows="5" required></textarea>

          <h4>Bill to:</h4>
          <textarea name="to" placeholder="Recipient"  rows="5" required></textarea>
        </div>

        <div class="column align-items--right align-items--bottom">
          <dl>
            <dt>#</dt><!-- invoice # -->
            <dd>
              <input placeholder="1"></input>
            </dd>

            <dt>Date</dt>
            <dd>
              <input :placeholder="dateToday"></input>
            </dd>

            <dt>Due Date</dt>
            <dd>
              <input :placeholder="dateDue"></input>
            </dd>

            <dt>Total due</dt>
            <dd>
              <strong>$ {{ total.toFixed(2) }}</strong>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import * as moment from 'moment';

export default Vue.extend({
  name: 'overview',

  data() {
    return {
      dateToday: '',
      dateDue: ''
    };
  },
  computed: {
    ...mapGetters([
      'total'
    ])
  },

  created() {
    this.dateToday = moment().format('MMMM D, YYYY');
    this.dateDue = moment().add(1, 'month').format('MMMM D, YYYY');
  }
});
</script>

<style lang="scss">
  @import '../assets/scss/variables.scss';

  .overview {
    h1 {
      font-weight: bold;
      text-align: right;
    }

    input {
      height: $item-height;
    }
  }
</style>
