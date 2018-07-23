<template>
  <main id="app">

    <!-- overview -->
    <Overview />

    <!-- billing details -->
    <Billing />

    <!-- totals -->
    <Totals />

    <!-- notes -->
    <Notes />

  </main>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Overview from './components/Overview.vue';
  import Billing from './components/Billing.vue';
  import Totals from './components/Totals.vue';
  import Notes from './components/Notes.vue';

  export default Vue.extend({
    name: 'app',
    components: {
      Overview,
      Billing,
      Totals,
      Notes
    }
  });
</script>

<style lang="scss">
  @import 'assets/scss/variables.scss';
  @import 'assets/scss/layout.scss';

  * {
    box-sizing: border-box;
    user-select: none;
    margin: 0;
    padding: 0;
    position: relative;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: $color-font;
    margin-top: 60px;
  }

  .button--cta {
    padding: 0.5em 1em;
  }

  .format {
    &::after {
      position: absolute;
      right: 1em;
      top: 0;
      z-index: 10;
    }

    &--dollar {
      &::after {
        content: '$'
      }
    }

    &--percent {
      &::after {
        content: '%'
      }
    }
  }

  dt {
    clear: left;
    float: left;
    line-height: $item-height;
    text-align: right;
    width: $item-width;
}

  dd {
    margin-left: $item-width + $gutter;
    line-height: $item-height;
  }

  ul {
    padding: 0;
    margin: 1em 0;
  }

  li {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  input,
  textarea {
    appearance: none;
    border: $border;
    border-radius: 4px;
    display: block;
    font-size: 16px;
    margin: 0 0 1em;
    padding: $padding;
  }

  input {
    max-width: 180px;

    + input {
      margin-left: 0.2em;
    }
  }

  button {
    appearance: none;
    background: $color-blue;
    border: none;
    color: #fff;
    cursor: pointer;
    padding: 0;

    &:hover {
      background: $color-hover;
    }
  }

</style>
