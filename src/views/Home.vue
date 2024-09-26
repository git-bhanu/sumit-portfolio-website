<script lang="ts">
import Projects from "../components/projects/Projects.vue";
import Header from "../components/Header.vue";
import { mapState } from "pinia";
import { useAppStore } from "../store";

export default {
    name: "Home",
    data() {
        return {
            width: 0,
        };
    },
    components: {
        Projects,
        Header,
    },
    mounted() {},
    methods: {},
    computed: {
        ...mapState(useAppStore, ["isMobile"]),
    },
};
</script>

<template>
    <div class="hero content">
        <div class="container">
            <h1>
                i believe in learning & getting better with every passing
                project
            </h1>
            <div class="bottom-tile">
                <span>
                    <p>sumit kumar singh<br />communication design</p>
                </span>

                <span>
                    <p>and i love listening<br />to good music</p>
                </span>
            </div>
        </div>
    </div>
    <Header v-if="isMobile" />
    <Projects />
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variable.scss";

.hero {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 80vh;
    padding-bottom: 50px;
    .container {
        width: 50%;
        h1 {
            font-size: 68px;
            font-weight: 800;
        }
    }

    .bottom-tile {
        display: flex;
        margin-top: 60px;
        font-size: 16px;

        span:nth-child(1) {
            margin-right: 60px;
            font-weight: 600;
        }
    }
}

@media screen and (max-width: $sm) {
    .hero {
        width: 90%;
        height: 70vh;
        padding-bottom: 20px;
        .container {
            width: 100%;
            h1 {
                font-size: 40px;
                font-weight: 800;
            }
        }

        .bottom-tile {
            display: flex;
            flex-direction: column;
            margin-top: 60px;
            font-size: 13px;
        }
    }
}
</style>
