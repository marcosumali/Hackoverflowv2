<template>
  <div class="home">
    <!-- <img src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <AddForm />

    <div class="row">
      <div class="container-questions col l8 offset-l2 s12">
        <div class="question col s12 animated fadeIn" v-for="(item, index) in questions" :key="index">
          <div class="row">
            <div class="button1 col l1 s2">
              <p class="text-center">{{  getVote(item.upvote.length, item.downvote.length) }}</p>
              <p class="no-top text-center">votes</p>
            </div>
            <div class="button2 col l1 s2">
              <p class="text-center">{{ item.score.length }}</p>
              <p class="no-top text-center">answers</p>
            </div>
            <div class="list col l10 s8">
              <router-link :to="{ path: 'single', query: { id: item._id }}"><p>{{ item.question }}</p></router-link>
              <p class="no-top">asked by <span style="font-weight:bold;">{{ item.userId.username }}</span> on <span style="font-weight:bold;">{{ new Date(item.createdAt).getDate() }} {{ getMonthName(new Date(item.createdAt).getMonth()) }} {{ new Date(item.createdAt).getFullYear() }}</span></p>
            </div>
          </div>
          
        </div>
      </div>
    </div>

    <Footer />

  </div>
</template>

<style scoped>

.container-questions {
  /* border: 1px solid black; */
}

p {
  /* margin-top: 0px; */
  margin-bottom: 0px;
}

.no-top {
  margin-top: 0px;
}

.text-center {
  text-align: center;
}

</style>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Register from '@/components/Register.vue'
import AddForm from '@/components/AddForm.vue'
import Footer from '@/components/Footer.vue'
import { mapState } from 'vuex'

export default {
  name: 'home',
  components: {
    HelloWorld,
    Register,
    AddForm,
    Footer
  },
  computed: {
    ...mapState([
      'questions',
    ])
  },
  created () {
    this.$store.dispatch('getQuestions')
  },
  methods: {
    getMonthName (num) {
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      return monthNames[num]
    },
    getVote (num1, num2) {
      let total = num1 - num2
      return total
    }
  }
}
</script>
