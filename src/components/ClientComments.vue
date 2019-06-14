<template>
    <q-card style="height: 70vh; width: 400px; max-width: 90vw;" ref="card" class="background-color-app-light flex column no-wrap justify-between q-card-container q-mb-md"> 
      <q-item>
        <q-scroll-area ref="scrollAreaComments" style="height: 50vh; width: 350px; max-width: 70vw;" :thumb-style="scrollStyle">
          <!-- TODO: Hacer CSS para que se vean bien los mensajes. -->
          
          <div v-for="comment in comments" :key="comment.comment_id" class="q-py-xs q-pa-md">
              <p v-if="comment.user">{{comment.user.name}} dijo : {{ comment.comment_text }} </p>
              <p v-else> Anónimo dijo : {{ comment.comment_text }} </p>
          </div>

        </q-scroll-area>
      </q-item>
      
      <q-item>
        <q-item-section class="flex column items-center q-mt-md">
            <q-input class="col-11" style="width: 300px;" rounded outlined v-model="model" label="Mensaje" />
            <q-btn round color="primary" icon="send" />
        </q-item-section>
      </q-item>

    </q-card>

</template>

<script>

export default {
  name: 'ClientComments',
  data () {
    return {
        model: '',
        comments: []
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

            // Parsearlo, y hacer v-if para pintar los comentarios de forma diferente.

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
