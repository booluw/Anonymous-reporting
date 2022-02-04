<template>
<c-flex wrap="wrap">
  <c-box
    :height="['auto', '100vh']"
    bg="blue.300"
    :width="['100%','50%']"
    :p="['10','4']"
    color="white"
    textAlign="center"
  >
    <c-text fontSize="5xl" fontWeight="bold">Do you know?</c-text>
    <c-list
      as="ol"
      style-type="disc"
      textAlign="left"
      fontSize="xl"
    >
      <c-list-item>About 20% of students ages 12-18 experienced bullying nationwide.</c-list-item>
    </c-list>
    <c-text :mt="['20px', '40vh']">
      Don't wait for tomorrow;
    </c-text>
    <c-button
      size="lg"
      variant-color="white"
      color="red.300"
      border="none"
      @click="showModal()"
      cursor="pointer"
    >
      Report a bully
    </c-button>
  </c-box>
  <c-box
    :height="['auto', '100vh']"
    bg="white"
    :width="['100%','50%']"
    :px="['10','4']"
    :py="['10px','20%']"
  >
    <c-box as="form" @submit.prevent :width="['70%','50%']" m="0 auto" v-if="!user">
      <c-form-control mb="5" is-required>
        <c-form-label for="name">Email</c-form-label>
        <c-input type="email" id="email" borderColor="blue.300" v-model="auth.email"/>
      </c-form-control>
      <c-form-control mb="5" is-required>
        <c-form-label for="password">Password</c-form-label>
        <c-input type="password" id="password" borderColor="blue.300" v-model="auth.password"/>
      </c-form-control>
      <c-button
        variant-color="blue"
        border="none"
        width="100%"
        height="50px"
        cursor="pointer"
        :isLoading="authLoader"
        @click="logUserIn()"
      >Log In</c-button>
    </c-box>
    <c-box
      :width="['70%','50%']"
      p="20px"
      v-else
    >
      <c-text
        fontSize="3xl"
      >
        You're logged in <br />
        <c-link
          as="router-link"
          to="/dashboard"
          fontSize="xl"
          color="blue.300"
        >
          Go to dashboard
        </c-link>
      </c-text>
    </c-box>
  </c-box>
  <c-modal
    :is-open="modal"
    :on-close="showModal"
    :closeOnOverlayClick="true"
    is-centered
    rounded="md"
  >
    <c-modal-content rounded="lg" p="3">
      <c-modal-header>Report a bully</c-modal-header>
      <c-modal-close-button m="3"/>
      <c-modal-body>
        <c-box as="form" @submit.prevent>
          <c-form-control mb="5" is-required>
            <c-form-label for="name">Name of student</c-form-label>
            <c-input type="text" id="name" borderColor="blue.300" v-model="report.student.name" required/>
          </c-form-control>
          <c-form-control mb="5" is-required>
            <c-form-label for="date">Date of incidence</c-form-label>
            <c-input type="date" id="date" borderColor="blue.300" v-model="report.date" required/>
          </c-form-control>
          <c-form-control mb="5" is-required>
            <c-form-label for="report">Details of incidence</c-form-label>
            <c-textarea is-disabled placeholder="Please explain the incidence" borderColor="blue.300" v-model="report.description" required/>
          </c-form-control>
          <c-flex justify="flex-end" pt="5">
            <c-button
              @click="submitReport()"
              variant-color="blue"
              border="2px"
              borderColor="blue.400"
              size="lg"
              mr="10"
              :isLoading="formLoader"
              cursor="pointer"
            >Submit Report</c-button>
            <c-button
              @click="showModal"
              variant="outline"
              variant-color="red"
              border="2px"
              borderColor="red.400"
              size="lg"
              cursor="pointer"
            >Close</c-button>
          </c-flex>
        </c-box>
      </c-modal-body>
    </c-modal-content>
    <c-modal-overlay />
  </c-modal>

</c-flex>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      modal: false,
      formLoader: false,
      authLoader: false,
      report: {
        student: {}
      },
      auth: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapActions(['signIn']),
    showModal() {
      this.modal = !this.modal
    },
    submitReport() {
      this.formLoader = true
    },
    logUserIn() {
      this.authLoader = true
      this.signIn(this.auth).then(() => {
        this.$router.push('/dashboard')
      }).catch(error => {
        alert(error.message)
        this.authLoader = false
      })
    }
  }
}
</script>