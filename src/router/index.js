import Vue from 'vue'
import Router from 'vue-router'
import Calendar from '../components/calendar'
import testCalendar from '../components/testCalendar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'testCalendar',
      component: testCalendar
    }
  ]
})
