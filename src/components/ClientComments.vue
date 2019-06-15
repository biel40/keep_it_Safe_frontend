<template>
    <q-card style="height: 70vh; width: 400px; max-width: 90vw;" ref="card" class="background-color-app-light flex column no-wrap justify-between q-card-container q-mb-md"> 
      <q-item>
        <q-scroll-area ref="scrollAreaComments" style="height: 350px; width: 350px; max-width: 70vw;" :thumb-style="scrollStyle">
          <!-- Este div se pintará para cada comentario que haya en los comentarios -->

          <div v-for="comment in comments" :key="comment.comment_id" class="">

            <q-chat-message
              v-if="comment.user && comment.user.imageUrl != 'null' "
              class=""
              :name="comment.user.name"
              :avatar="comment.user.imageUrl"
              :text="[comment.comment_text]"
              
            />

            <q-chat-message
              v-if="comment.user && comment.user.imageUrl == 'null' "
              :name="comment.user.name"
              avatar="https://image.flaticon.com/icons/png/128/74/74472.png"
              :text="[comment.comment_text]"
              
            />

            <q-chat-message
              v-if="comment.user == null && comment.isThisUserComment == null"
              class=""
              name="Anónimo"
              avatar="https://image.flaticon.com/icons/png/128/74/74472.png"
              :text="[comment.comment_text]"
              
            />

            <q-chat-message
              v-if="comment.user == null && comment.isThisUserComment == true"
              class=""
              name="Anónimo"
              avatar="https://image.flaticon.com/icons/png/128/74/74472.png"
              :text="[comment.comment_text]"
              sent
            />

          </div>

        </q-scroll-area>
      </q-item>
      
      <q-item>
        <q-item-section class="flex column items-center q-mt-md">
            <q-input class="col-11" style="width: 300px;" rounded outlined v-model="inputModel" label="Mensaje" />
            <q-btn v-on:click="sendComment()" round color="primary" icon="send" />
        </q-item-section>
      </q-item>

    </q-card>

</template>

<script>
import { delay } from 'q';

export default {
  name: 'ClientComments',
  data () {
    return {
        inputModel: '',
        comments: [],
        commentToSend: {}
    }
  },
  methods: {
      getComments() {
        this.$axios.get('http://localhost:8081/comments')
        .then(response => {

          let commentTest = this.$classes.Comments = response.data;
          this.comments = commentTest;

        })
        .catch(error => {
            console.log(error);
        });

      },

      sendComment() {

        let user = localStorage.getItem('user');

        this.commentToSend = {
          comment_text: this.inputModel,
          user: user,
          isThisUserComment: true
        }

      this.$axios.post('http://localhost:8081/comments', this.commentToSend)
      .then(response => {
          console.log("Response: " + response);
          this.comments.push(this.commentToSend);
          this.inputModel = '',
          this.$refs.scrollAreaComments.setScrollPosition("50vm");
      })
      .catch(error => {
          console.log(error);
      });

    }
  },
  created() {
     this.getComments();
  },
  computed:{
    scrollStyle () {
      return {
        borderRadius: '5px',
        backgroundColor: '#43a047',
        width: '5px',
        opacity: 0.75
      }
    }
  },
  mounted() {
    this.$refs.scrollAreaComments.setScrollPosition(300);
  }
}

</script>

<style>
</style>
