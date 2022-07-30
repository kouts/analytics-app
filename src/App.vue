<template>
  <div id="app">
    <div class="d-flex">
      <Sidebar />
      <main class="px-4 pt-3 w-100">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/sidebar/Sidebar'
import '@/scss/app.scss'
import '@primer/octicons/build/build.css'

export default {
  name: 'App',
  components: {
    Sidebar
  }
}
</script>
