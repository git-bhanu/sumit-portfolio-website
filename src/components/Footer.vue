<script lang="ts">
import mail from '@/assets/svgs/mail_me_icon.svg?url'
import whatsapp from '@/assets/svgs/whatsapp.svg?url'
import behance from '@/assets/svgs/Behance.svg?url'
import linkedin from '@/assets/svgs/Linkedin.svg?url'
import instagram from '@/assets/svgs/Instagram.svg?url'
import spotify from '@/assets/svgs/Spotify.svg?url'


export default {
  name: 'Footer',
  data() {
    return {
      resumeURL: '#',
      image: {
        mail,
        whatsapp,
        behance,
        linkedin,
        instagram,
        spotify,
      },
    }
  },
  components: {
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<template>
  <div>
    <div class="pre-footer content">
        <p>massimo vignelli</p>
        <h2>
            if you can design one thing, you can<br />design everything.
        </h2>
    </div>
    <div class="footer-wrapper">
    <div class="footer">
        <h3>let's work<br />together.</h3>
        <div class="contact">
            <a href="mailto:sumit.singh19@nift.ac.in">
                <button>
                    <img :src="image.mail">
                    mail me
                </button>
            </a>
            <p style="margin: 0; font-size: 40px;">|</p>
            <a href="https://wa.me/918544128609" target="_blank" class="whatsapp">
                <img :src="image.whatsapp" alt="" srcset="">
            </a>
        </div>
        <div class="socials">
            <a href="https://www.behance.net/sumitsingh42" target="_blank"><img :src="image.behance"></a>
            <a href="https://www.linkedin.com/in/sumit-singh-nift/" target="_blank"><img :src="image.linkedin"></a>
            <a href="https://www.instagram.com/_sumitkumarsingh_/" target="_blank"><img :src="image.instagram"></a>
            <a href="https://open.spotify.com/user/sumitscool.singh" target="_blank"><img :src="image.spotify"></a>
        </div>

        <p class="company">© 2022 SUMIT KUMAR SINGH</p>
    </div>
  </div>
  </div>
</template>

<style lang="scss">
@import "@/assets/styles/_variable.scss";

.pre-footer {
    background-color: $light-black;
    padding-top: 40px;
    padding-bottom: 40px;

    h2 {
        font-size: 55px;
        margin-bottom: 20px;
        margin-top: 20px;
    }

    p {
        color: #FFFFFF;
        font-size: 16px;
        margin-bottom: 20px;
    }   
}

.footer-wrapper {
    background-color: $dark-black;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding-top: 40px;
    padding-bottom: 80px;
}

.footer {
  width: 50%;
  h3 {
    font-size: 68px;
    margin-bottom: 30px;
  }

  .contact {
    display: flex;
    align-items: center;

    button {
        background-color: $off-white;
        padding: 10px 30px;
        border-radius: 7px;
        font-family: $font;
        font-weight: 600;
        font-size: 16px;
        cursor: pointer;
        display: flex;
        align-items: center;
        margin-right: 20px;

        img {
            margin-right: 7px;
        }
    }

    a.whatsapp {
        padding-left: 20px;
    }
  }

  .socials {
    display: flex;
    align-items: center;
    margin-top: 30px;

    img {
        margin-right: 20px;
        height: 20px;
    }
  }

  .company {
    font-size: 14px;
    color: #707070;
    margin-top: 50px;
  }
}

@media screen and (max-width: $sm) {
  .pre-footer {
      padding-top: 40px;
      padding-bottom: 40px;

      h2 {
          font-size: 30px;
      }

      p {
          font-size: 14px;
      }   
  }

  .footer-wrapper {
      padding-top: 20px;
      padding-bottom: 40px;
  }

  .footer {
    width: 95%;
    h3 {
      font-size: 38px;
      margin-bottom: 80px;
    }

    .contact {
      display: flex;
      align-items: center;

      a {
        color: $light-black;
      }

      button {
          background-color: $off-white;
          padding: 10px 30px;
          border-radius: 7px;
          font-family: $font;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          color: light-black;
          display: flex;
          align-items: center;
          margin-right: 20px;

          img {
              margin-right: 7px;
          }
      }

      a.whatsapp {
          padding-left: 20px;
      }
    }

    .socials {
      display: flex;
      align-items: center;
      margin-top: 30px;

      img {
          margin-right: 20px;
          height: 20px;
      }
    }

    .company {
      font-size: 14px;
      color: #707070;
      margin-top: 50px;
    }
  }
}
</style>
