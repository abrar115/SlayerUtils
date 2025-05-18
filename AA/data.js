
import { LocalStore } from "../tska/storage/LocalStore";

export const data = new LocalStore("AA", {
    spawn:99999,
    kill:99999,
    total:999999
}, "./pbData/data.json");

