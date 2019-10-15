<template>
  <v-card shaped width="80vw" :elevation="0">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>{{author}}</v-list-item-title>
        <v-list-item-subtitle>{{createTime}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <div style="min-height: 30vh">
      <v-card-text>
        <template v-for="(context, index) in content">
          <div class="body-1" :key="index">- {{ context }}</div>
        </template>
      </v-card-text>
    </div>

    <v-divider></v-divider>

    <v-card-actions>
      <v-chip pill>
        <v-avatar left color="red">{{ typename[0] }}</v-avatar>
        {{ typename }}
      </v-chip>
      <div class="flex-grow-1"></div>
      <v-btn icon @click="openEmojiPanel">
        <v-icon>fa-thumbs-o-up</v-icon>
      </v-btn>
      <v-btn icon @click="openCommentPanel">
        <v-icon>fa-commenting-o</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="isEmojiOpen">
        <div class="vertical-panel">
          <template v-for="(emojiItem, index) in emojiList">
            <v-btn
              class="ma-1"
              elevation="0"
              fab small :color="emoji === emojiItem.content ? '#E0E0E0' : ''"
              :key="index" @click="() => tapEmoji(emojiItem)"
            >
              <span class="emoji-btn">{{ emojiItem.content }}</span>
            </v-btn>
          </template>
          <div class="body-2 font-weight-light pa-2">{{emojiComment}}</div>
        </div>
      </div>
    </v-expand-transition>
    <v-expand-transition>
      <div v-show="isCommentOpen">
        <v-container class="px-2">
          <v-form>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="comment"
                  label="留个话儿"
                  type="text"
                >
                  <template v-slot:append-outer>
                    <v-btn icon @click="submitComment">
                      <v-icon>fa-paper-plane-o</v-icon>
                    </v-btn>
                  </template>
                </v-text-field>
              </v-col>
            </v-row>
            <!-- <v-row>
            </v-row> -->
          </v-form>
        </v-container>
      </div>
    </v-expand-transition>
  </v-card>
</template>
<script>
import moment from 'moment';
import { dialogue } from '../../services/api';

const defaultEmojiComment = '给个赞儿';

export default {
  props: {
    dialogue: Object,
    emojiList: Array,
  },
  data() {
    return {
      isEmojiOpen: false,
      isCommentOpen: false,
      emoji: '',
      emojiComment: defaultEmojiComment,
      comment: '',
    };
  },
  methods: {
    openEmojiPanel() {
      this.isEmojiOpen = !this.isEmojiOpen;
      this.isCommentOpen = false;
    },
    openCommentPanel() {
      this.isCommentOpen = !this.isCommentOpen;
      this.isEmojiOpen = false;
    },
    submitComment() {

    },
    submitEmoji() {
      dialogue.bravo(this.emoji, this.dialogue.id);
    },
    tapEmoji(emoji) {
      const { content, comment } = emoji;
      if (this.emoji === content) {
        this.submitEmoji(content);
        this.emoji = '';
        this.emojiComment = defaultEmojiComment;
        this.openEmojiPanel();
      } else {
        this.emoji = content;
        this.emojiComment = comment;
      }
    },
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
<style lang="less">
.vertical-panel {
  widows: 100%;
  overflow: auto;
  white-space: normal;
}
.emoji-btn {
  font-size: 24px;
}
</style>
