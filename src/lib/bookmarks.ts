import { create } from "zustand";
import { persist } from "zustand/middleware";

type BookmarkState = {
  ids: string[];
  recent: string[];
  toggle: (id: string) => void;
  isSaved: (id: string) => boolean;
  touch: (id: string) => void;
};

export const useLibrary = create<BookmarkState>()(
  persist(
    (set, get) => ({
      ids: [],
      recent: [],
      toggle: (id) =>
        set((s) => ({
          ids: s.ids.includes(id) ? s.ids.filter((x) => x !== id) : [id, ...s.ids],
        })),
      isSaved: (id) => get().ids.includes(id),
      touch: (id) =>
        set((s) => ({
          recent: [id, ...s.recent.filter((x) => x !== id)].slice(0, 12),
        })),
    }),
    { name: "megalodon-library" },
  ),
);
