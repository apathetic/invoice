<template functional>
  <section class="notes">
    <div class="container">
      <textarea class="notes__textarea" name="notes" rows="8" placeholder="Notes"></textarea>
    </div>
  </section>
</template>

<style lang="scss">
  @import '../assets/scss/variables.scss';

  .notes {
    &__textarea {
      width: $page-width;
    }
  }
</style>
