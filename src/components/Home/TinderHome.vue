<template>
  <div class="tinder">
    <v-system-bar dark window>
      <v-icon>fa-bullhorn</v-icon>
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
            <dialogue-card
              :dialogue="card"
              :emojiList="supportedBravos"
            ></dialogue-card>
          </div>
        </vue-swing>
        <div
          class="tinder-area--card"
          v-if="cards.length === 0"
        >
          <v-card
            shaped
            width="80vw"
            height="60vh"
          >
            <v-progress-circular
              :size="50"
              color="primary"
              indeterminate
            ></v-progress-circular>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line import/extensions
import VueSwing from 'vue-swing';
import randomColor from 'randomcolor';

import DialogueCard from './DialogueCard.vue';

import { dialogue } from '../../services/api';

export default {
  data() {
    return {
      cards: [],
      supportedBravos: [],
      swingConfig: {
        allowedDirections: [VueSwing.Direction.LEFT, VueSwing.Direction.RIGHT],
        isThrowOut: (xOffset, yOffset, element, throwOutConfidence) => throwOutConfidence > 0.5,
      },
    };
  },
  mounted() {
    this.fetchRandomDialogues();
    this.fetchAllBrovos();
  },
  methods: {
    handleThrowout(index) {
      this.cards.splice(index, 1);
      if (this.cards.length === 1) {
        this.fetchRandomDialogues();
      }
    },
    fetchRandomDialogues() {
      dialogue.fetchRandomBatch().then(({ data }) => {
        const { result = [] } = data;
        const mappedResult = result.map(item => ({
          ...item,
          color: randomColor(),
        }));
        this.cards.unshift(...mappedResult);
      });
    },
    fetchAllBrovos() {
      dialogue.allBravos().then(({ data }) => {
        const { result = [] } = data;
        this.supportedBravos = result;
      });
    },
  },
  components: {
    VueSwing,
    DialogueCard,
  },
};
</script>
<style lang="less">
.tinder {
  height: 100vh;
  &-container {
    height: calc(100% - 32px);
  }
  &-area {
    position: relative;
    height: 100%;

    & > div {
      height: 100%;
    }
    &--card {
      position: absolute;
      top: 0;
      bottom: 0vh;
      width: 100vw;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
