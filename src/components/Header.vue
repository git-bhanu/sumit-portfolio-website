<script lang="ts">
import { createClient } from "contentful"


export default {
  name: 'Header',
  data() {
    return {
      resumeURL: '#',
    }
  },
  components: {
  },
  mounted() {
    let data = this.getData()
    data.then((response) => {
      this.resumeURL = `https:${response}`;
    })
  },
  methods: {
    async getData() {
        let url = '';
        const client = createClient({
            space: import.meta.env.VITE_CONTENTFUL_SPACE || '',
            accessToken: import.meta.env.VITE_CONTENTFUL_ACCESSTOKEN || ''
        });
        await client.getEntry('5BtHJZweBavyva9FxAmeuN').then(function (entry) {
        // log the title for all the entries that have it
        url = entry.fields.contentValue.content[0].data.target.fields.file.url;
        })

        return url;
    },
  }
}
</script>

<template>
    <ol class="menu">
        <li>
            <router-link to="/">home</router-link>
        </li>
        <li>
            <router-link to="/about">about</router-link>
        </li>        
        <!-- <li>
            <router-link to="/contact">contact</router-link>
        </li> -->
        <li>
            <a :href="resumeURL" download>
                <button>download resume</button>
            </a>
        </li>            
    </ol>
</template>

<style lang="scss">
@import "@/assets/styles/_variable.scss";

.menu {
    list-style: none;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 50px;
    
    li {
        margin-right: 30px;
        font-size: 18px;

        button {
            background-color: $off-white;
            padding: 10px 30px;
            border-radius: 7px;
            font-family: $font;
            font-weight: 600;
            font-size: 15px;
            cursor: pointer;
        }
    }
}

</style>
