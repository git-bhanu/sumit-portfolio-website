<script lang="ts">
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { mapStores, mapState } from 'pinia'
import { useAppStore } from './store';

export default {
  name: 'App',
  data() {
    return {
      width: 0,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    ...mapState(useAppStore, ['isMobile'])
  },
  components: {
    Header,
    Footer,
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
  mounted() {
    this.onResize();
    window.addEventListener('resize', this.onResize)
  },
  methods: {
    onResize() {
      this.width = document.body.clientWidth;
      this.appStore.updateWidth(this.width);
    }
  }
}

</script>


<template>
  <div>
    <Header v-if="!isMobile"/>
    <main>
      <router-view />
      <span>
      </span>
    </main>
    <Footer/>
  </div>
</template>
  
<style lang="scss">
@import "@/assets/styles/_variable.scss";
</style>
  