<template>
    <q-card style="height: 70vh; width: 400px; max-width: 90vw;" ref="card" class="flex column no-wrap justify-between"> 
      
        <q-card-section class="scroll" ref="scrollAreaComments">

<<<<<<< HEAD
          <div v-for="comment in comments" :key="comment.comment_id" class="q-pa-md">
=======
          <div v-for="comment in comments" :key="comment.comment_id">
>>>>>>> 79989bad73063996d0a919b5a3b3370ef10b2118

            <q-chat-message
              v-if="comment.user && comment.user.imageUrl != 'null' && !comment.isThisUserComment "
              :name="comment.user.name"
              :avatar="comment.user.imageUrl"
              :text="[comment.comment_text]"
              
            />
      
            <q-chat-message
              v-else-if="comment.user && comment.user.imageUrl != 'null' && comment.isThisUserComment "
              :name="comment.user.name"
              :avatar="comment.user.imageUrl"
              :text="[comment.comment_text]"
              sent
            />
           
            <q-chat-message
              v-if="comment.user && comment.user.imageUrl == 'null' "
              :name="comment.user.name"
              avatar="https://image.flaticon.com/icons/png/128/74/74472.png"
              :text="[comment.comment_text]"
              
            />

            <q-chat-message
              v-if="comment.user == null && comment.isThisUserComment == false"
              name="Anónimo"
              avatar="https://image.flaticon.com/icons/png/128/74/74472.png"
              :text="[comment.comment_text]"
              
            />

            <q-chat-message
              v-if="comment.user == null && comment.isThisUserComment == true"
              name="Anónimo"
              avatar="https://image.flaticon.com/icons/png/128/74/74472.png"
              :text="[comment.comment_text]"
              sent
            />

          </div>

        </q-card-section>
      
      
      <q-card-section class="flex no-wrap items-center justify-between q-my-md">
          <q-input class="col-11" style="width: 300px;" rounded outlined v-model="inputModel" label="Mensaje" />
          <q-btn v-on:click="sendComment()" round color="primary" icon="send" />
      </q-card-section>

    </q-card>

</template>

<script>
import { delay } from 'q';
import { setTimeout } from 'timers';

export default {
  name: 'ClientComments',
  data () {
    return {
        inputModel: '',
        comments: [],
        commentToSend: null,
    }
  },
  methods: {
      getComments() {
        this.$axios.get('http://localhost:8081/comments')
        .then(response => {
          
          response.data.forEach(comment => {

            let commentObj = new this.$classes.Comments(comment.comment_id, comment.comment_text, comment.user);
            let user = JSON.parse(localStorage.getItem('user'));
           
            let currentUserEmail;

            if (user != null) {
              currentUserEmail = user.email;
            } 
            
            if (user != null && comment.user != null && comment.user.email == currentUserEmail) {
              commentObj.isThisUserComment = true;
            } else commentObj.isThisUserComment = false;
            
            console.log(commentObj);

            this.comments.push(commentObj);

          });

        })
        .catch(error => {
            console.log(error);
        });

      },

      sendComment() {

        let user = JSON.parse(localStorage.getItem('user'));

        this.commentToSend = {
          comment_text: this.inputModel,
          user: user,
          isThisUserComment: true
        }

      this.$axios.post('http://localhost:8081/comments', this.commentToSend)
      .then(response => {
          console.log("enviando");
          console.log(this.commentToSend);

          this.comments.push(this.commentToSend);
          this.inputModel = '',
          this.scrolling()
      })
      .catch(error => {
          console.log(error);
      });

    },
    scrolling() {
      let scrollItem = document.querySelector('.scroll');
      scrollItem.scrollTop = scrollItem.scrollHeight;
    }
  },
  created() {
    this.getComments();
<<<<<<< HEAD
=======
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
>>>>>>> 79989bad73063996d0a919b5a3b3370ef10b2118
  },
  updated() {
    this.scrolling();
  }
}

</script>

<style>
</style>
