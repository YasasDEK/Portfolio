import { atom } from "recoil";

export const currentViewPageState = atom({
  key: "currentViewPageState",
  default: null as "Projects" | "Home" | "Blog" | null,
});
