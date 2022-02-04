<template>
  <c-flex
    p="20px"
    bg="gray.200"
    height="100vh"
  >
    <c-box
      :width="['100%', '40%']"
      overflowY="auto"
    >
      <c-pseudo-box
        as="div"
        p="2"
        :bg="report.date === view.date ? 'gray.300' : 'gray.100'"
        rounded="lg"
        v-for="(report, index) in reports"
        :key="index"
        :_hover="{ bg: 'gray.300' }"
        cursor="pointer"
        @click="showReport(report)"
      >
        <c-flex
          wrap="nowrap"
          alignItems="center"
          justifyContent="space-between"
        >
          <c-flex
            alignItems="center"
          >
            <c-tag
              :width="['10%', '2%']"
              rounded="full"
              :variant-color="report.status === 'pending' ? 'red' : 'green'"
            />
            <c-text
              color="gray.700"
              p="0"
              m="0 20px"
            >
              {{ report.student_name }}
            </c-text>
          </c-flex>
          <c-text
            color="gray.500"
            p="0"
            m="0 10px 0 0"
          >
            {{ moment(report.date).format("ddd, MMM Do") }}
          </c-text>
        </c-flex>
      </c-pseudo-box>
    </c-box>
    <c-box
      :width="['60%']"
      :display="['none', 'block']"
      style="box-sizing: border-box"
      m="0 10px"
      p="20px"
      border="2px"
      borderColor="gray.100"
      bg="gray.50"
      rounded="lg"
      position="relative"
      v-if="Object.keys(view).length !== 0"
    >
      <c-text
        color="red.300"
        fontSize="30px"
        m="0 0 10px"
        p="0"
        fontWeight="bold"
      >
        <c-text
          color="gray.500"
          p="0"
          m="0"
          display="inline"
          fontWeight="normal"
        >
          Report filed against:
        </c-text>
        {{ view.student_name}}
      </c-text>
      <c-text
        color="gray.700"
        fontSize="20px"
        m="0 0 10px"
        p="0"
        fontWeight="bold"
      >
        <c-text
          color="gray.500"
          p="0"
          m="0"
          display="inline"
          fontWeight="normal"
        >
          Date of incidence:
        </c-text>
        {{ view.incident_date}}
      </c-text>
      <c-text
        color="gray.700"
        fontSize="20px"
        m="0 0 10px"
        p="0"
        fontWeight="bold"
      >
        <c-text
          color="gray.500"
          p="0"
          m="0"
          display="inline"
          fontWeight="normal"
        >
          Time of report:
        </c-text>
        {{  moment(view.date).format("dddd, MMMM Do YYYY") }}
      </c-text>
      <c-text
        fontSize="16px"
        color="gray.500"
        m="20px 0 0"
        p="10px 0 0"
        borderTop="2px"
        borderColor="gray.200"
      >
        {{ view.description }}
      </c-text>
      <c-icon-button
        variant-color="vue"
        aria-label="Call Jonathan"
        size="lg"
        icon="check"
        border="none"
        cursor="pointer"
        position="absolute"
        bottom="40px"
        @click="checkAsSuccess()"
        v-if="view.status === 'pending'"
        title="Mark as done"
      />
    </c-box>
    <c-box
      :width="['60%']"
      :display="['none', 'block']"
      style="box-sizing: border-box"
      m="0 10px"
      p="20px"
      border="2px"
      borderColor="gray.100"
      bg="gray.50"
      rounded="lg"
      v-else
    >
      <c-flex
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        <c-text
          fontSize="40px"
          color="gray.400"
          textAlign="center"
        >
          Nothing here, yet.
          <c-text
            fontSize="20px"
            color="gray.400"
            m="0"
          >
            Click on a report to view
          </c-text> 
        </c-text>
      </c-flex>
    </c-box>
  </c-flex>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      reports: [],
      view: {}
    }
  },
  methods: {
    ...mapActions(['getReports', 'markReport']),
    showReport(payload) {
      this.view = payload
    },
    checkAsSuccess() {
      this.markReport(this.view).then(() => {
        this.getReports().then(result => {
          this.reports = result
          this.view = {}
        })
      })
    }
  },
  mounted() {
    this.getReports().then(result => {
      this.reports = result
    })
  }
}
</script>
