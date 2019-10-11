<template>
  <div class="tinder">
    <v-system-bar dark window>
      <div class="flex-grow-1"></div>
      <v-icon>mdi-wifi-strength-4</v-icon>
      <v-icon>mdi-signal-cellular-outline</v-icon>
      <v-icon>mdi-battery</v-icon>
      <span>12:30</span>
    </v-system-bar>
    <div class="tinder-container">
      <div class="tinder-area">
        <vue-swing
          v-for="(card, index) in cards"
          :key="index"
          :config="swingConfig"
          @throwout="() => handleThrowout(index)"
        >
          <div
            class="tinder-area--card"
          >
            <v-img
              class="white--text align-end"
              height="200px"
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            >
            </v-img>
          </div>
        </vue-swing>
      </div>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line import/extensions
import VueSwing from 'vue-swing';

export default {
  data() {
    return {
      cards: '0'.repeat(10).split('').map((value, index) => ({ value: index, index })),
      swingConfig: {
        allowedDirections: [VueSwing.Direction.LEFT, VueSwing.Direction.RIGHT],
        isThrowOut: (xOffset, yOffset, element, throwOutConfidence) => throwOutConfidence > 0.7,
      },
    };
  },
  methods: {
    handleThrowout(index) {
      console.log(index);
    },
  },
  components: {
    VueSwing,
  },
};
</script>
<style lang="less">
.tinder {
  &-area {
    position: relative;
    &--card {
      position: absolute;
      top: 10px;
      width: 80vw;
    }
  }
}
</style>
