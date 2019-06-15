<template>
    <q-card style="height: 70vh; width: 400px; max-width: 90vw;" ref="card" class="background-color-app-light flex column no-wrap justify-between q-card-container q-mb-md"> 
      <q-item>
        <q-scroll-area ref="scrollAreaComments" style="height: 50vh; width: 350px; max-width: 70vw;" :thumb-style="scrollStyle">
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
              v-if="comment.user == null"
              class=""
              name="Anónimo"
              avatar="https://image.flaticon.com/icons/png/128/74/74472.png"
              :text="[comment.comment_text]"
              
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

            // Hay que tener en cuenta que los comentarios, los atributos hay problemas con las instancias.
            let commentTest = this.$classes.Comments = response.data;
            
            console.log("Comment Text ->" , commentTest);

            this.comments = commentTest;

        })
        .catch(error => {
            console.log(error);
        });

      },

      sendComment() {

        let user = localStorage.getItem('user');

        console.log("Input Model --> " + this.inputModel);

        this.commentToSend = {
          comment_text: this.inputModel,
          user: user
        }

        console.log(this.commentToSend);

      // Tengo que crear un nuevo objeto comentario con el usuario que lo manda.
      // Una vez hecho, se manda al servidor por Post

      this.$axios.post('http://localhost:8081/comments', this.commentToSend)
      .then(response => {
          console.log("Response: " + response);
          // Si la respuesta es positiva, hay que actualizar de alguna forma los comentarios.
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
  mounted(){
    // TODO: Get height and change the 1000 number
    this.$refs.scrollAreaComments.setScrollPosition (1000, 0);

    // document.querySelector(".scroll")
  }
}
</script>

<style>
</style>
