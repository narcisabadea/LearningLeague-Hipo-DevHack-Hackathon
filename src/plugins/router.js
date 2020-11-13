import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Search from '../components/Search'
import Chat from '../components/Chat'
import Classroom from '../components/Classroom'
import Courses from '../components/Courses'
import Tests from '../components/Tests'
import Profile from '../components/Profile'
import CoursePage from '../components/CoursePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat
    },
    {
        path: '/classroom',
        name: 'Classroom',
        component: Classroom
      },
      {
        path: '/courses/:id',
        name: 'CoursePage',
        component: CoursePage
      },
      {
        path: '/courses',
        name: 'Courses',
        component: Courses
      },
      {
        path: '/tests',
        name: 'Tests',
        component: Tests
      },
      {
        path: '/profile',
        name: 'Profile',
        component: Profile
      },
    {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld
      }
  ]
})