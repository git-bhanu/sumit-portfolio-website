import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
    state: () => ({ width: 0, }),
    getters: {
      isMobile: (state) => state.width < 640,
    },
    actions: {
      updateWidth(width: number) {
        console.log(width);
        this.width = width;
      },
    },
  })
