<template>
  <div>
    <full-page ref="fullpage" :options="fullpageOptions">
      <div class="section">
        <tinder-home></tinder-home>
      </div>
      <div class="section">
        Second section ...
      </div>
    </full-page>
  </div>
</template>

<script>
import TinderHome from '../components/Home/TinderHome.vue';

export default {
  data() {
    return {
      fullpageOptions: {

      },
    };
  },
  components: {
    TinderHome,
  },
};
</script>
