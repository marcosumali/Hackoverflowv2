<template>
    <div class="addform">

      <div v-if="authStatus == 'true'">
        <div class="fixed-action-btn">
          <a class="btn-floating btn-large" style="background-color:black;border:2px solid white;" @click="checkToken">
            <i class="large material-icons modal-trigger" href="#modal4">question_answer</i>
          </a>
        </div>

        <!-- Modal Structure -->
        <div id="modal4" class="modal">
          <div class="modal-content">
            <h4>Ask New Question</h4>
            <small style="color:grey">Psst..The form can be quite hard to click. Maybe you should use 'tab' on your keyboard instead..</small>
            <div class="row">
              <form class="col s12">
                <div class="row">
                  <div class="input-field col s12">
                    <input id="name" type="text" class="validate" v-model="question">
                    <label for="">Question Title</label>
                  </div>
                  <div class="input-field col s12">
                    <textarea id="textarea1" class="materialize-textarea" v-model="details"></textarea>
                    <label for="textarea1">Details</label>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div class="modal-footer">
            <a class="modal-close waves-effect waves-green btn #eceff1 blue-grey lighten-5 logo">Cancel</a>
            <a class="modal-close waves-effect waves-green btn logo-bg" @click="addQuestion">Ask !</a>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="fixed-action-btn">
          <a class="btn-floating btn-large" style="background-color:black;border:2px solid white;" @click="checkToken">
            <i class="large material-icons" href="#modal4">question_answer</i>
          </a>
        </div>
      </div>
    </div>

</template>

<script>
import alertify from 'alertifyjs'
import { mapState } from 'vuex'

export default {
  name: 'AddForm',
  props: {
  },
  data () {
    return {
      question: '',
      details: ''
    }
  },
  components: {
  },
  created () {
    $(document).ready(function(){
      $('.modal').modal('');
      $('.fixed-action-btn').floatingActionButton();
      $('select').formSelect();
    });
    this.$store.commit('checkAuth')
  },
  computed: {
    ...mapState([
      'authStatus'
    ])
  },
  methods: {
    checkToken () {
      if (this.authStatus == 'false') {
        // alertify.error('Prior adding new question, please sign in :D')
        swal('ERROR', 'Prior adding new question, please sign in :D', 'error')
      }
    },
    addQuestion () {
      let obj = {
        question: this.question,
        details: this.details
      }
      // console.log(obj)
      this.$store.dispatch('addQuestion', obj)
      this.question = ''
      this. details = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Barlow+Condensed|Monoton|Pacifico');

.logo {
  color: black;
}

.logo-bg {
  background-color: black;
}

.row {
  margin-bottom: 10px;
}

.modal-content {
  padding-bottom: 0px;
}

.back-button {
  margin-top: 20px;
  font-weight: bold;
  width: 100px;
}

.btn { margin-left: 10px !important; margin-right: 10px !important; }

</style>
