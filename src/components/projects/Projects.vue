<script lang="ts">
import { createClient } from "contentful"
import photoshop from '@/assets/svgs/photoshop.svg?url'
import indesign from '@/assets/svgs/indesign.svg?url'
import illustrator from '@/assets/svgs/illustrator.svg?url'
import blender from '@/assets/svgs/blender.svg?url'
import xd from '@/assets/svgs/xd.svg?url'


interface Project {
    title: string,
    softwaresUsed: string[],
    description: string,
    category: Category,
    coverImage: string,
    behanceLink?: string,
}

enum CategoryEnum {
    'identityDesign' = "identity design",
    'uiux' = "ui ux",
    'publicationDesign' = "publication design",
    'ThreeDProjects' = "3d projects",
    'graphicDesign' = "graphic design",
    'doodles' = "doodles",
}


type Category = 'identityDesign' | 'uiux' | 'publicationDesign' | 'ThreeDProjects' | 'graphicDesign' | 'doodles';
type SoftwareUsed = 'adobePhotoshop' | 'adobeIllustrator' | 'adobeIndesign' | 'blender' | 'adobeXD';

export default {
  name: 'Projects',
  data() {
    return {
        categories: [] as Category[],
        activeCategory: '',
        CategoryEnum: CategoryEnum,
        projects: [] as Project[],
        activeProject: [] as Project[],
    }
  },
  components: {
  },
  mounted() {
    this.getProjects().then((project: Project[]) => {
        this.projects = project;
        this.setCategories();
        this.handleCategoryChange(this.categories[0]);
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
        this.activeProject = this.projects.filter((project: Project) => {
            if (project.category !== this.activeCategory) {
                return false;
            }
            return true;
        })
    },
    getCategoryName(category: Category): CategoryEnum {
        return this.CategoryEnum[category];
    },
    getIcons(softwaresUsed: SoftwareUsed[]): string[] {
        let softwareBuffer: string[] = []; 
        softwaresUsed.forEach((software: SoftwareUsed) => {
            switch (software) {
                case "adobePhotoshop":
                    softwareBuffer.push(photoshop);
                    break;
                case "adobeIndesign":
                    softwareBuffer.push(indesign);
                    break;
                case "adobeIllustrator":
                    softwareBuffer.push(illustrator);
                    break; 
                case "blender":
                    softwareBuffer.push(blender);
                    break;
                case "adobeXD":
                    softwareBuffer.push(xd);
                    break;                    
                default:
                    break;
            }
        })
        return softwareBuffer;
    },
    async getProjects() {
        let localProject: Project[] = [];
        const client = createClient({
            space: import.meta.env.VITE_CONTENTFUL_SPACE || '',
            accessToken: import.meta.env.VITE_CONTENTFUL_ACCESSTOKEN || ''
        });
        await client.getEntries({
            content_type: 'project',
            select: 'fields'
        }).then((response: any) => {
         response.items.forEach((element: any) => {
            localProject.push({
                title: element.fields.title,
                description: element.fields.description,
                softwaresUsed: this.getIcons(element.fields.softwaresUsed as SoftwareUsed[]),
                coverImage: element.fields.coverImage?.fields.file.url,
                behanceLink: element.fields.behanceLink,
                category: element.fields.category[0],
            });
        });
    })
    return localProject;
    },
    setCategories(): void {
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
    <div class="project content">
        <div
        v-for="(project, index) in activeProject" 
        :key="index"
        >
        <div class="project-item">
            <a class="cover" :href="project.behanceLink ? project.behanceLink : void(0)" target="_blank" :style="`background-image: url(${project.coverImage})`">
            </a>
            <div class="meta">
                <a :href="project.behanceLink ? project.behanceLink : void(0)" target="_blank">
                    <h2 v-text="project.title"></h2>
                </a>
                <a :href="project.behanceLink ? project.behanceLink : void(0)" target="_blank">
                    <p v-text="project.description"></p>
                </a>
                <span style="margin-top: 30px">
                    <img 
                    v-for="icon in project.softwaresUsed"
                    :src="`${icon}`" />
                </span>
            </div>
        </div>
 
        </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/assets/styles/_variable.scss";


.project-wrapper {
    background-color: $dark-black;
    padding: 80px 0;
}

.project {
    margin-top: 40px;

    .project-item {
        display: flex;
        margin-bottom: 30px;
        height: 370px;

        .cover {
            width: 40%;
            margin-right: 30px;
            border-radius: 12px;
            overflow: hidden;
            background-size: cover;
            background-position: center;
        }
        .meta {
            width: 50%;
            font-size: 20px;

            h2 {
                margin-top: 0;
                font-weight: 600;
            }

            p {
                line-height: 1.6em;
            }
        }
    }
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
