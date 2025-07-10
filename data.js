import { LocalStore } from "../tska/storage/LocalStore.js";

export const dataAA = new LocalStore("SlayerUtils", {
    first: false,
    combat: true,
    pet: true,
    load: false,
    slayer: true,
    Chat: false,
    title: true
}, "./pbData/dataAA.json")

export const datatara = new LocalStore("SlayerUtils", {

    name: "",
    spawn:99999,
    kill:99999,
    total:99999,
    tier: 1,

}, "./pbData/datatara.json")


export const datarev = new LocalStore("SlayerUtils", {

    name: "",
    spawn:99999,
    kill:99999,
    total:99999,
    tier: 1,

}, "./pbData/datarev.json")

export const dataeman = new LocalStore("SlayerUtils", {

    name: "",
    spawn:99999,
    kill:99999,
    total:99999,
    tier: 1,
   alls: 0,
    allk: 0,
    allt: 0,
    no: 0

}, "./pbData/dataeman.json")

export const datablaze1 = new LocalStore("SlayerUtils", {

    name: "",
    spawn:99999,
    kill:99999,
    total:99999,
    tier: 1,
    alls: 0,
    allk: 0,
    allt: 0,
    no: 0

}, "./pbData/datablaze1.json")

export const datasven = new LocalStore("SlayerUtils", {

    name: "",
    spawn:99999,
    kill:99999,
    total:99999,
    tier: 1,
    alls: 0,
    allk: 0,
    allt: 0,
    no: 0

}, "./pbData/datasven.json")
