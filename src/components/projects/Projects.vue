<script lang="ts">
import { createClient } from "contentful"
import photoshop from '@/assets/svgs/photoshop.svg?url'
import indesign from '@/assets/svgs/indesign.svg?url'
import illustrator from '@/assets/svgs/illustrator.svg?url'
import blender from '@/assets/svgs/blender.svg?url'
import xd from '@/assets/svgs/xd.svg?url'


interface Project {
    title: string,
    softwaresUsed: {icon: string, title: string}[],
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

enum SoftwareUsedEnum {
    'adobePhotoshop' = "Adobe Photoshop",
    'adobeIllustrator' = "Adobe Illustrator",
    'adobeIndesign' = "Adobe Indesign",
    'blender' = "Blender",
    'adobeXD' = "Abode XD",
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
    getIcons(softwaresUsed: SoftwareUsed[]): {icon: string, title: string}[] {
        let softwareBuffer: {icon: string, title: string}[] = []; 
        softwaresUsed.forEach((software: SoftwareUsed) => {
            switch (software) {
                case "adobePhotoshop":
                    softwareBuffer.push({
                        icon: photoshop,
                        title: SoftwareUsedEnum[software]
                    });
                    break;
                case "adobeIndesign":
                    softwareBuffer.push({
                        icon: indesign,
                        title: SoftwareUsedEnum[software]
                    });
                    break;
                case "adobeIllustrator":
                    softwareBuffer.push({
                        icon: illustrator,
                        title: SoftwareUsedEnum[software]
                    });             
                    break; 
                case "blender":
                    softwareBuffer.push({
                        icon: blender,
                        title: SoftwareUsedEnum[software]
                    });                    
                    break;
                case "adobeXD":
                    softwareBuffer.push({
                        icon: xd,
                        title: SoftwareUsedEnum[software]
                    });                     
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
        const order = {'identityDesign': 1, 'uiux': 2, 'publicationDesign': 3, 'ThreeDProjects': 4, 'graphicDesign': 5, 'doodles': 5, default: Number.MAX_VALUE};
        this.projects.forEach((element: Project) => {
            if (!uniqueCategory.includes(element.category)) {
                uniqueCategory.push(element.category);
            }
        });

        const sorted = uniqueCategory.sort((a: Category, b: Category): number => {
            return (order[a] - order[b] || a > b || -(a < b)) as number;
        });

        this.categories = sorted;
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
                <span style="margin-top: 30px;transition: all 0.2s ease-in-out;">
                    <img
                    style="cursor: pointer;"
                    v-for="icon in project.softwaresUsed"
                    :src="`${icon.icon}`"
                    :title="icon.title"
                    />
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
    transition: all 2s ease-in-out;

    .project-item {
        display: flex;
        margin-bottom: 30px;
        height: 300px;

        .cover {
            width: 50%;
            margin-right: 30px;
            border-radius: 12px;
            overflow: hidden;
            background-size: cover;
            background-position: center;
            transition: all 0.2s ease-in-out;
        }
        .meta {
            width: 50%;

            h2 {
                margin-top: 0;
                font-weight: 600;
                font-size: 20px;
                transition: all 0.2s ease-in-out;
            }

            p {
                line-height: 1.6em;
                font-size: 20px;
                transition: all 0.2s ease-in-out;
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
        font-size: 16px;

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

@media screen and (max-width: $sm) {
    .project-wrapper {
        padding: 40px 0;
    }

    .project {
        margin-top: 40px;
        transition: all 2s ease-in-out;

        .project-item {
            display: flex;
            flex-direction: column;
            margin-bottom: 40px;
            height: auto;

            .cover {
                width: 100%;
                height: 200px;
                margin-bottom: 20px;
            }
            .meta {
                width: 100%;

                h2 {
                    font-size: 16px;
                }

                p {
                    font-size: 16px;
                }
            }
        }
    }

    .categories {
        display: flex;
        flex-wrap: wrap;

        .category {
            margin-right: 20px;
            margin-bottom: 20px;
        }
    }
}

</style>
