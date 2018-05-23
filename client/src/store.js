import Vue from 'vue'
import Vuex from 'vuex'
// import alertify from 'alertifyjs'
import axios from 'axios'
import swal from 'sweetalert'
// import jwt from 'jsonwebtoken'
// import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    questions: [],
    authStatus: 'false',
    question: {},
    answers: []
  },
  mutations: {
    getQuestions (state, payload) {
      state.questions = payload
    },
    checkAuth (state) {
      let token = localStorage.getItem('authStatus')
      state.authStatus = token || 'false'
    },
    addQuestion (state, payload) {
      payload['score'] = []
      state.questions.push(payload)
      // console.log('after', state.questions)
    },
    getQuestion (state, payload) {
      state.question = payload[0]
    },
    upvote (state, payload) {
      state.question.upvote.push(payload)
    },
    downvote (state, payload) {
      state.question.downvote.push(payload)
    },
    getAnswersByQuestion (state, payload) {
      state.answers = payload
    },
    addAnswer (state, payload) {
      state.answers.push(payload)
    },
    upvoteAnswer (state, payload) {
      state.answers.forEach((item, index) => {
        if (item._id === payload) {
          item.upvote.push(payload)
        }
      })
    },
    downvoteAnswer (state, payload) {
      state.answers.forEach((item, index) => {
        if (item._id === payload) {
          item.downvote.push(payload)
        }
      })
    },
    removeSingle (state) {
      state.question = {}
    }
  },
  actions: {
    signup ({commit}, payload) {
      // console.log('from actions', payload)
      axios.post('http://localhost:3000/users/signup', payload)
        .then(result => {
          // console.log(result)
          let token = result.data.token
          localStorage.setItem('authkey', token)
          localStorage.setItem('authStatus', true)
          // alertify.success(`Sign up successful :D`)
          swal('SUCCESS', `Sign up successful :D`, 'success')
          window.location.reload()
        })
        .catch(err => {
          console.log('ERROR from register', err)
          // alertify.error(`Sign up error :(`)
          // alertify.error(`Email has been previously registered..`)
          swal('ERROR', 'Email has been previously registered..', 'error')
        })
    },
    signin ({commit}, payload) {
      axios.post('http://localhost:3000/users/signin', payload)
        .then(result => {
          // console.log(result)
          let token = result.data.token
          localStorage.setItem('authkey', token)
          localStorage.setItem('authStatus', true)
          commit('checkAuth')
          window.location.reload()
          // alertify.success(`Sign in successful :D`)
          swal('SUCCESS', 'Sign in successful :D', 'success')
          window.location.reload()
        })
        .catch(err => {
          console.log('ERROR from register', err)
          // alertify.error(`Sign in error :(`)
          // alertify.error(`Incorrect email or password..`)
          swal('ERROR', 'Incorrect email or password..', 'error')
        })
    },
    getQuestions ({commit}) {
      axios.get('http://localhost:3000/questions')
        .then(result => {
          axios.get('http://localhost:3000/answers')
            .then(response => {
              // console.log('questions', result.data.questions)
              // console.log('answers', response.data.answers)
              let answers = response.data.answers
              let questions = result.data.questions
              questions.forEach((question, index) => {
                let arrScore = []
                let status = true
                answers.forEach((answer, index) => {
                  if (answer.questionId._id === question._id && status) {
                    arrScore.push(answer._id)
                  }
                })
                question['score'] = arrScore
              })
              // console.log('after', questions)
              // commit('getAnswers', response.data.answers)
              commit('getQuestions', questions)
            })
            .catch(err => {
              console.log('ERROR: get answer', err)
            })
        })
        .catch(err => {
          console.log('ERROR: get questions', err)
        })
    },
    addQuestion ({commit}, payload) {
      let token = localStorage.getItem('authkey')
      let config = {
        headers: {'authkey': token}
      }
      axios.post('http://localhost:3000/questions/save', payload, config)
        .then(result => {
          // console.log(result)
          commit('addQuestion', result.data.question)
          // alertify.success(`Post question successful :D`)
          swal('SUCCESS', 'Post question successful :D', 'success')
        })
        .catch(err => {
          console.log('ERROR: post question', err)
        })
    },
    getQuestion ({commit}, payload) {
      let url = 'http://localhost:3000/questions/single?id=' + payload
      // console.log(url)
      axios.get(url)
        .then(result => {
          commit('getQuestion', result.data.question)
        })
        .catch(err => {
          console.log('ERROR: get single question', err)
        })
    },
    upvote ({commit}, payload) {
      let url = 'http://localhost:3000/questions/upvote?id=' + payload
      let token = localStorage.getItem('authkey')
      let config = {
        headers: {'authkey': token}
      }
      axios.put(url, {}, config)
        .then(result => {
          // console.log(result)
          commit('upvote', payload)
          // alertify.success('Upvote succesful !')
          swal('SUCCESS', 'Upvote succesful !', 'success')
        })
        .catch(err => {
          console.log('ERROR: upvote question', err)
          // alertify.error('Each user is only permitted to give one upvote per question')
          swal('ERROR', 'Each user is only permitted to give one upvote per question', 'error')
        })
    },
    downvote ({commit}, payload) {
      let url = 'http://localhost:3000/questions/downvote?id=' + payload
      let token = localStorage.getItem('authkey')
      let config = {
        headers: {'authkey': token}
      }
      axios.put(url, {}, config)
        .then(result => {
          // console.log(result)
          commit('downvote', payload)
          // alertify.success('Downvote succesful !')
          swal('SUCCESS', 'Downvote succesful !', 'success')
        })
        .catch(err => {
          console.log('ERROR: downvote question', err)
          // alertify.error('Each user only permitted to give one downvote per question')
          swal('ERROR', 'Each user is only permitted to give one downvote per question', 'error')
        })
    },
    getAnswersByQuestion ({commit}, payload) {
      let url = 'http://localhost:3000/answers/byQuestion?id=' + payload
      axios.get(url)
        .then(result => {
          // console.log('before', result.data.answers)
          let arrNew = []
          result.data.answers.forEach((item, index) => {
            arrNew.push(item)
            // console.log('after', item.answer)
            // console.log('after', arrNew)
          })
          commit('getAnswersByQuestion', arrNew)
        })
        .catch(err => {
          console.log('ERROR: get question', err)
        })
    },
    addAnswer ({commit}, payload) {
      // console.log('from actions',payload)
      let url = 'http://localhost:3000/answers/save?id=' + payload.id
      let token = localStorage.getItem('authkey')
      let config = {
        headers: {'authkey': token}
      }
      axios.post(url, { answer: payload.answer }, config)
        .then(result => {
          console.log(result)
          commit('addAnswer', result.data.answer)
          // alertify.success(`Post answer successful :D`)
          swal('SUCCESS', 'Post answer successful :D', 'success')
        })
        .catch(err => {
          console.log('ERROR: add question', err)
        })
    },
    upvoteAnswer ({commit}, payload) {
      let url = 'http://localhost:3000/answers/upvote?id=' + payload
      let token = localStorage.getItem('authkey')
      let config = {
        headers: {'authkey': token}
      }
      axios.put(url, {}, config)
        .then(result => {
          // console.log(result)
          commit('upvoteAnswer', payload)
          // alertify.success('Upvote answer succesful !')
          swal('SUCCESS', 'Upvote answer succesful !', 'success')
        })
        .catch(err => {
          console.log('ERROR: upvote answer', err)
          // alertify.error('Each user only permitted to give one upvote per answer')
          swal('ERROR', 'Each user is only permitted to give one upvote per answer', 'error')
        })
    },
    downvoteAnswer ({commit}, payload) {
      let url = 'http://localhost:3000/answers/downvote?id=' + payload
      let token = localStorage.getItem('authkey')
      let config = {
        headers: {'authkey': token}
      }
      axios.put(url, {}, config)
        .then(result => {
          // console.log(result)
          commit('downvoteAnswer', payload)
          // alertify.success('Downvote answer succesful !')
          swal('SUCCESS', 'Downvote answer succesful !', 'success')
        })
        .catch(err => {
          console.log('ERROR: downvote answer', err)
          // alertify.error('Each user only permitted to give one downvote per answer')
          swal('ERROR', 'Each user is only permitted to give one downvote per question', 'error')
        })
    }
  }
})
