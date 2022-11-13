<script lang="ts">
import { createClient } from "contentful"
import Header from '@/components/Header.vue';

export default {
  name: 'App',
  data() {
    return {
      test: 'asds'
    }
  },
  components: {
    Header,
  },
  mounted() {
    let data = this.getData()
    data.then((response: string) => {
      console.log(response);
    })
  },
  methods: {
    async getData() {
      let headingEl = '';
      const client = createClient({
      space: import.meta.env.VITE_CONTENTFUL_SPACE || '',
      accessToken: import.meta.env.VITE_CONTENTFUL_ACCESSTOKEN || ''
    });
    await client.getEntries().then(function (entries: any) {
      // log the title for all the entries that have it
      entries.items.forEach(function (entry: any) {
        if (entry.fields.meta === 'heading') {
          headingEl = entry.fields.contentValue.content[0].content[0]['value'];
        }
      });
    })
    return headingEl;
    }
  }
}

</script>


<template>
  <div>
    <Header/>
    <main>
      <router-view />
      <span>
      </span>
    </main>
  </div>
</template>
  
<style lang="scss">
@import "@/assets/styles/_variable.scss";
</style>
  