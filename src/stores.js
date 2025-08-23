import { writable } from "svelte/store";

export const theme = writable("ios")


export const updateTheme = (material=false)=>{
    material? theme.set("material") : theme.set("ios");
}




export const color = writable("light")

export const updateColor = (light=true)=>{
    light? color.set("light") : color.set("dark");

    if(light){
        document.documentElement.classList.remove('dark');
    }else{
        document.documentElement.classList.add('dark');
    }
}