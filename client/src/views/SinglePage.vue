<template>
  <div class="single" >
  
    <div class="row">
      <div class="question-container col l8 offset-l2 s12">
        <div class="col s12">
          <h3>{{ question.question }}</h3>
          <p class="">asked by <span style="font-weight:bold;">{{ question.userId.username }}</span> on <span style="font-weight:bold;">{{ new Date(question.createdAt).getDate() }} {{ getMonthName(new Date(question.createdAt).getMonth()) }} {{ new Date(question.createdAt).getFullYear() }}</span></p>
        </div>
        <div class="col l1 s3 text-center">
          <i class="col s12 material-icons arrow-size pointer" @click="upvote(question._id)">arrow_drop_up</i>
          <a class="col s12 score-style">{{ getVote(question.upvote.length, question.downvote.length) }}</a>
          <i class="col s12 material-icons arrow-size pointer" @click="downvote(question._id)">arrow_drop_down</i>
        </div>
        <div class="col l11 s9">
          <div class="details col s12">
            <p>{{ question.details }}</p>
          </div>
        </div>
      </div>
    </div>

    <br>
    <div v-if="answers.length < 2">
      <h5 class="answers">{{answers.length}} Answer</h5>
    </div>
    <div v-else>
      <h5 class="answers">{{answers.length}} Answers</h5>
    </div>
    <hr>
    <br>

    <div class="row">
      <div class="answer-container col l8 offset-l2 s12" v-for="(answer, index) in answers" :key="index">
        <div class="col l1 s3 text-center">
          <i class="col s12 material-icons arrow-size pointer" @click="upvoteAnswer(answer._id)">arrow_drop_up</i>
          <a class="col s12 score-style">{{ getVote(answer.upvote.length, answer.downvote.length) }}</a>
          <i class="col s12 material-icons arrow-size pointer" @click="downvoteAnswer(answer._id)">arrow_drop_down</i>
        </div>
        <div class="col l11 s9">
          <div class="col s12">
            <p class="" style="margin-top:0px;">answered by <span style="font-weight:bold;">{{ answer.userId.username }}</span> on <span style="font-weight:bold;">{{ new Date(answer.createdAt).getDate() }} {{ getMonthName(new Date(answer.createdAt).getMonth()) }} {{ new Date(answer.createdAt).getFullYear() }}</span></p>
          </div>
          <div class="details col s12" style="min-height:150px;background-color:lightblue">
            <p>{{ answer.answer }}</p>
          </div>
        </div>
      </div>
    </div>

    <hr>

    <div class="row">
      <div class="col l8 offset-l2 s12">
        <p  class="s12" style="font-size:30px;margin-top:10px;">Your Answer</p>
        <form class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <textarea id="textarea1" class="materialize-textarea" v-model="input"></textarea>
              <label for="textarea1">Details</label>
            </div>
          </div>
        </form>
        <a class="waves-effect waves-green btn col s12" @click="addAnswer">Answer !</a>
      </div>
    </div>


    <div class="footer-container" style="margin-top:103px !important;">
      <Footer />
    </div>

  </div>

</template>

<script>
import {mapState} from 'vuex'
import alertify from 'alertifyjs'
import Footer from '@/components/Footer.vue'

export default {
  name: 'single',
  data () {
    return {
      id: this.$route.query.id,
      input: ''
    }
  },
  components: {
    Footer
  },
  created () {
    this.$store.dispatch('getQuestion', this.id)
    this.$store.dispatch('getAnswersByQuestion', this.id)
  },
  methods: {
    getMonthName (num) {
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      return monthNames[num]
    },
    getVote (num1, num2) {
      let total = num1 - num2
      return total
    },
    upvote (id) {
      if (!this.authStatus || this.authStatus == false || this.authStatus == 'false') {
        // alertify.error('Prior voting question, please sign in :D')
        swal('ERROR', 'Prior to vote, please sign in :D', 'error')
      } else {
        this.$store.dispatch('upvote', id)
      }
    },
    downvote (id) {
      if (!this.authStatus || this.authStatus == false || this.authStatus == 'false') {
        // alertify.error('Prior voting question, please sign in :D')
        swal('ERROR', 'Prior to vote, please sign in :D', 'error')
      } else {
        this.$store.dispatch('downvote', id)
      }
    },
    addAnswer () {
      if (!this.authStatus || this.authStatus == false || this.authStatus == 'false') {
        // alertify.error('Prior adding new answer, please sign in :D')
        swal('ERROR', 'Prior adding new answer, please sign in :D', 'error')
      } else {
        let obj = {
          id: this.id,
          answer: this.input
        }
        // console.log(obj)
        if (!obj.answer || obj.answer == '') {
          // alertify.error(`Your answer can't be empty`)
          swal('ERROR', `Your answer can't be empty`, 'error')
        } else {
          this.$store.dispatch('addAnswer', obj)
        }
      }
    },
    upvoteAnswer (id) {
      if (!this.authStatus || this.authStatus == false || this.authStatus == 'false') {
        // alertify.error('Prior voting answer, please sign in :D')
        swal('ERROR', 'Prior to vote, please sign in :D', 'error')
      } else {
        this.$store.dispatch('upvoteAnswer', id)
      }
    },
    downvoteAnswer (id) {
      if (!this.authStatus || this.authStatus == false || this.authStatus == 'false') {
        // alertify.error('Prior voting answer, please sign in :D')
        swal('ERROR', 'Prior to vote, please sign in :D', 'error')
      } else {
        this.$store.dispatch('downvoteAnswer', id)
      }

    }
  },
  computed: {
    ...mapState([
      'question',
      'answers',
      'authStatus'
    ])
  }
}
</script>

<style scoped>

.text-center {
  text-align: center
}

.arrow-size {
  font-size: 70px;
  padding: 0px;
}

.score-style {
  font-size: 30px
}

.pointer {
  cursor: pointer;
}

.details {
  /* border: 1px solid black; */
  background-color: lightgray;
  border-radius: 10px;
  min-height: 200px;
}

hr, .answers {
  margin-left: 300px;
  margin-right: 300px;
}

@media only screen and (max-width: 375px) {

  hr, .answers {
    margin-left: 20px;
    margin-right: 20px;
  }

}

.answer-container {
  margin-bottom: 50px;
}

</style>
