<script lang="ts">
import { createClient } from "contentful"


interface Project {
    title: string,
    softwaresUsed: string[],
    description: string,
    category: string[],
    coverImage: string,
    behanceLink?: sting,
}

enum CategoryEnum {
    'identityDesign' = "identity design",
    'uiux' = "ui ux",
    'publicationDesign' = "publication design",
    'ThreeDProjects' = "3d projects",
    'graphicDesign' = "graphic design",
    'doodles' = "doodles",
}

enum SoftwareUsedEnum {
    'adobePhotoshop' = "identity design",
    'adobeIllustrator' = "ui ux",
    'adobeIndesign' = "publication design",
    'blender' = "3d projects",
    'adobeXD' = "graphic design",
}

type Category = 'identityDesign' | 'uiux' | 'publicationDesign' | 'ThreeDProjects' | 'graphicDesign' | 'doodles';

export default {
  name: 'Projects',
  data() {
    return {
        categories: [] as Category[],
        activeCategory: '',
        CategoryEnum: CategoryEnum,
        projects: [] as Project[],
    }
  },
  components: {
  },
  mounted() {
    this.getProjects().then((project: Project[]) => {
        this.projects = project;
        this.setCategories();
        this.activeCategory = this.categories[0];
    });
  },
  computed: {
    categories(): Category[]{
        let uniqueCategory: Category[] = []
        this.projects.forEach((element: Project) => {
            if (!uniqueCategory.includes(element.category)) {
                uniqueCategory.push(element.category);
            }
        });
        return uniqueCategory;
    }
  },
  methods: {
    handleCategoryChange(category: Category) : void {
        this.activeCategory = category;
    },
    getCategoryName(category: Category): CategoryEnum {
        return this.CategoryEnum[category];
    },
    async getProjects() {
        let localProject = [];
        const client = createClient({
            space: import.meta.env.VITE_CONTENTFUL_SPACE || '',
            accessToken: import.meta.env.VITE_CONTENTFUL_ACCESSTOKEN || ''
        });
        await client.getEntries({
            content_type: 'project',
            select: 'fields'
        }).then(function (response: any[]) {
        
        response.items.forEach(element => {
            localProject.push({
                title: element.fields.title,
                description: element.fields.description,
                softwaresUsed: element.fields.softwaresUsed,
                coverImage: element.fields.coverImage?.fields.file.url,
                behanceLink: element.fields.behanceLink,
                category: element.fields.category[0],
            });
        });
    })
    return localProject;
    },
    setCategories(): Category[]{
        let uniqueCategory: Category[] = []
        this.projects.forEach((element: Project) => {
            if (!uniqueCategory.includes(element.category)) {
                uniqueCategory.push(element.category);
            }
        });
        console.log(this.categories);
        this.categories = uniqueCategory;
    }
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
