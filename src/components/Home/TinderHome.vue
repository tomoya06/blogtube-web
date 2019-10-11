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
          <div class="tinder-area--card">
            <v-card
              shaped
              width="80vw"
              height="60vh"
              color="indigo darken-1"
            >
              {{index}}
            </v-card>
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
        isThrowOut: (xOffset, yOffset, element, throwOutConfidence) => throwOutConfidence > 0.5,
      },
    };
  },
  methods: {
    handleThrowout(index) {
      this.cards.splice(index, 1);
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
      top: 10vh;
      width: 100vw;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
