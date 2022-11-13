<script lang="ts">
import { createClient } from "contentful"

enum CategoryEnum {
    'identityDesign' = "identity design",
    'uiux' = "ui ux",
    'publicationDesign' = "publication design",
    'ThreeDProjects' = "3d projects",
    'graphicDesign' = "graphic design",
    'doodles' = "doodles",
}

type Category = 'identityDesign' | 'uiux' | 'publicationDesign' | 'ThreeDProjects' | 'graphicDesign' | 'doodles';

export default {
  name: 'Projects',
  data() {
    return {
        categories: ['identityDesign', 'uiux', 'publicationDesign', 'ThreeDProjects', 'graphicDesign', 'doodles'] as Category[],
        activeCategory: '',
        CategoryEnum: CategoryEnum,
    }
  },
  components: {
  },
  mounted() {
    this.activeCategory = this.categories[0];
    this.getProjects();
  },
  methods: {
    handleCategoryChange(category: Category) : void {
        this.activeCategory = category;
    },
    getCategoryName(category: Category): CategoryEnum {
        return this.CategoryEnum[category];
    },
    async getProjects() {
        const client = createClient({
            space: import.meta.env.VITE_CONTENTFUL_SPACE || '',
            accessToken: import.meta.env.VITE_CONTENTFUL_ACCESSTOKEN || ''
        });
        await client.getEntries({
            content_type: 'project',
            select: 'fields'
        }).then(function (response: any) {
        // log the title for all the entries that have it
            console.log(response);
        })
    },
  }
}
</script>

<template>
  <div class="project-wrapper">
    <div class="categories content">
        <span
        :class="[`category`, category === activeCategory ? `active` : ``]"
        v-for="(category, index) in categories" 
        :key="index"
        @click="handleCategoryChange(category as Category)"
        >
            <p > {{ `${getCategoryName(category)}` }}</p>
        </span>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/assets/styles/_variable.scss";


.project-wrapper {
    background-color: $dark-black;
    padding: 80px 0;
}

.categories {
    display: flex;

    .category {
        margin-right: 20px;
        padding: 7px 20px;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        border-radius: 7px;
        background-color: $light-black;

        &:hover {
            background-color: $off-white;
            color: $dark-black;
        }

        p {
            margin: 0;
        }

        &.active {
            background-color: $off-white;
            color: $dark-black;
        }
    }
}

</style>
