import { create } from "zustand";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";

export interface State {
  projectTitle: string;
  filePath: string;
  updateProjectTitle: (title: string) => void;
  updateFilePath: (path: string) => void;
  storage: () => StateStorage;
}

// export const useStore = create<State>((set) => ({
//   projectTitle: "Untitled Project",
//   filePath: "",
//   updateProjectTitle: (title) => set({ projectTitle: title }),
//   updateFilePath: (path) => set({ filePath: path }),
// }));

// export const useStore = create<State>(
//   persist(
//     (set, get) => ({
//       projectTitle: "Untitled Project",
//       filePath: "",
//       updateProjectTitle: (title) => set({ projectTitle: title }),
//       updateFilePath: (path) => set({ filePath: path }),
//     }),
//     {
//       name: "food-storage", //Key in storage
//       storage: createJSONStorage(() => sessionStorage),
//     }
//   )
// );
