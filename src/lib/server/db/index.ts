import { isDev } from "$lib";
import type { Platform } from "../../../app";
import { d1 } from "./d1";
import { local } from "./local";

export type DBType = ReturnType<typeof d1> | ReturnType<typeof local>;
// place files you want to import through the `$lib` alias in this folder.
export const db = (platform: Platform): DBType => {
    console.log("DB Init:", isDev ? "Local" : "D1");
    if (isDev) return local();
    else return d1(platform);
}
