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
        licenseKey: '00000000-00000000-00000000-00000000',
        touchSensitivity: 120,
      },
    };
  },
  components: {
    TinderHome,
  },
};
</script>
