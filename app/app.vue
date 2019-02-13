<template>
  <div class="page-wrapper">
    <m-header/>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import MHeader from './components/m-header/'

export default {
  components: {
    MHeader
  }
}
</script>

