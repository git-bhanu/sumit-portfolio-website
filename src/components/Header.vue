<script lang="ts">
import { createClient } from "contentful"
import behance from '@/assets/svgs/Behance.svg?url'
import linkedin from '@/assets/svgs/Linkedin.svg?url'
import instagram from '@/assets/svgs/Instagram.svg?url'
import spotify from '@/assets/svgs/Spotify.svg?url'
import mail from '@/assets/svgs/mail.svg?url'


export default {
  name: 'Header',
  data() {
    return {
      resumeURL: '#',
      image: {
        behance,
        linkedin,
        instagram,
        spotify,
        mail,
      },
    }
  },
  components: {
  },
  mounted() {
    let data = this.getData()
    data.then((response: string) => {
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
        await client.getEntry('5BtHJZweBavyva9FxAmeuN').then(function (entry: any) {
        // log the title for all the entries that have it
        url = entry?.fields.contentValue.content[0].data.target.fields.file.url;
        })

        return url;
    },
  }
}
</script>

<template>
  <div class="menu-wrapper content">
    <div class="socials">
        <a href="https://www.behance.net/sumitsingh42" target="_blank"><img :src="image.behance"></a>
        <a href="https://www.linkedin.com/in/sumit-singh-nift/" target="_blank"><img :src="image.linkedin"></a>
        <a href="https://www.instagram.com/_sumitkumarsingh_/" target="_blank"><img :src="image.instagram"></a>
        <a href="https://open.spotify.com/user/sumitscool.singh" target="_blank"><img :src="image.spotify"></a>
      </div>
      <ol class="menu">      
          <!-- <li>
              <router-link to="/contact">contact</router-link>
          </li> -->
          <li>
              <a :href="resumeURL" download target="_blank">
                  <button>download resume</button>
              </a>
          </li>
          <li>
              <a href="mailto:sumit.singh19@nift.ac.in" download target="_blank">
                  <button  class="mail"><img :src="image.mail">mail me</button>
              </a>
          </li>
      </ol>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variable.scss";

.menu-wrapper {
  display: flex;
  justify-content: flex-end;
  position: relative;
}

.socials {
  position: absolute;
  left: 0;
  top: 70px;
  display: flex;
  flex-direction: column;

  img {
    margin-bottom: 10px;
  }
}

.menu {
    width: 50%;
    list-style: none;
    display: flex;
    align-items: center;
    margin-top: 50px;
    
    li {
        margin-right: 30px;
        font-size: 16px;

        button {
            background-color: $off-white;
            padding: 10px 30px;
            border-radius: 7px;
            font-family: $font;
            font-weight: 600;
            font-size: 16px;
            cursor: pointer;

            &.mail {
              background: transparent;
              color: $off-white;
              border-color: $off-white;
              display: flex;
              align-items: center;

              img {
                margin-right: 7px;
              }
            }
        }
    }
}

@media screen and (max-width: $sm) {
  .menu-wrapper {
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      position: relative;
    }

    .socials {
      position: relative;
      flex-direction: row;
      left: 10px;
      top: 0;

      img {
        margin-right: 15px;
      }
    }

    .menu {
        list-style: none;
        width: 100%;
        padding-left: 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-top: 10px;
        
        li {
            margin-right: 30px;
            font-size: 16px;
            width: 100%;
            margin-bottom: 10px;

            a {
              text-decoration: none;
            }

            button {
                width: 100%;
                color: $light-black;

                &.mail {
                  width: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: $off-white;

                  img {
                    margin-right: 7px;
                  }
                }
            }
        }
    }
}

</style>
