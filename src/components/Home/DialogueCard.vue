<template>
  <v-card
    shaped
    width="80vw"
  >
    <v-list-item>
      <v-list-item-avatar color="grey" :size="36">
        {{author[0]}}
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{author}}</v-list-item-title>
        <v-list-item-subtitle>{{createTime}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <div style="min-height: 40vh">
      <v-card-text>
        <template
          v-for="(context, index) in content"
        >
          <div class="body-1" :key="index">- {{ context }}</div>
        </template>
      </v-card-text>
    </div>

    <v-divider></v-divider>

    <v-card-actions>
      <v-chip pill>
        <v-avatar
          left
          color="red"
        >
          {{ typename[0] }}
        </v-avatar>
        {{ typename }}
      </v-chip>
      <div class="flex-grow-1"></div>
      <!-- <v-btn icon @click="isEmojiOpen = true">
        <v-icon>fa-thumbs-o-up</v-icon>
      </v-btn> -->
    </v-card-actions>
    <!-- <v-expand-transition>
      <div v-show="isEmojiOpen">
        <div class="vertical-panel">
          <template v-for="(emoji, index) in emojiList">
            <v-btn icon :key="index">
              {{ emoji.content }}
            </v-btn>
          </template>
        </div>
      </div>
    </v-expand-transition> -->
  </v-card>
</template>
<script>
import moment from 'moment';

export default {
  props: {
    dialogue: Object,
    emojiList: Array,
  },
  data() {
    return {
      isEmojiOpen: false,
      isCommentOpen: false,
    };
  },
  computed: {
    content() {
      return this.dialogue.content.split('\t');
    },
    createTime() {
      const time = this.dialogue.createTime;
      return moment(time).format('YYYY-MM-DD HH:mm');
    },
    author() {
      return this.dialogue.creator.username.toUpperCase();
    },
    typename() {
      return (this.dialogue.typeDetail.typename || 'UNKNOWN').toUpperCase();
    },
  },
};
</script>
