import { writable, type Writable } from "svelte/store";
import type { MusicPlayer } from "./types";

export const currentMusic: Writable<MusicPlayer> = writable({
  file: null,
  text: null,
});
