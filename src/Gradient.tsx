import {tinycolor, TinyColor} from "@ctrl/tinycolor"
import React from "react";


interface Char {
    char: string,
    color: TinyColor
}


export function gradient(text: string, color_s: string, color_e: string) {
    let result: Char[];
    const color_s_rgb: TinyColor = tinycolor(color_s);
    const color_e_rgb: TinyColor = tinycolor(color_e);
    const colorDistance = {
        r: color_e_rgb.r - color_s_rgb.r,
        g: color_e_rgb.g - color_s_rgb.g,
        b: color_e_rgb.b - color_s_rgb.b,
        a: color_e_rgb.a - color_s_rgb.a
    }

    const chars = text.split('');
    result = chars.map((char, index) => {
        const color: TinyColor = new TinyColor({
            r: color_s_rgb.r + colorDistance.r * index / text.length,
            g: color_s_rgb.g + colorDistance.g * index / text.length,
            b: color_s_rgb.b + colorDistance.b * index / text.length,
            a: color_s_rgb.a + colorDistance.a * index / text.length
        })
        return {char, color}
    })

    return {
        raw: result,
        html: result.map((char, index) =>
            <span style={{color: char.color.toRgbString()}} key={index}>{char.char}</span>),
        text: result.map(
            char => `<color=${char.color.toHexString()}>${char.char}</color>`
        ).join('')
    }
}