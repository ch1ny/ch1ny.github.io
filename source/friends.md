---
title: 我的朋友
layout: py
---

{% meting "1337928912" "netease" "song" "volume:0.5 "autoplay:true" "preload:auto" "mutex:false" "theme:#31aeff" %}

<hr />

## 我的朋友

<style>
    .button {
        position: relative;
        color: rgb(49, 174, 255);
        border: 1px solid rgb(49, 174, 255);
        padding: 0.5rem;
        font-size: 1.5rem;
        background-color: white;
        margin: 0.5rem;
        cursor: pointer;
        transition: 500ms;
        border-radius: 0.25em;
        width: 15em;
        height: 2em;
        opacity: 1;
    }
    .button:hover {
        color: white;
        background-color: rgb(49, 174, 255);
    }
    .button.button_cannot_seen {
        opacity: 0;
        z-index: -1;
    }

    .sob {
        opacity: 1;
        transition: 500ms;
        -webkit-user-drag: none;
    }
    .sob_hidden {
        opacity: 0;
        margin-top: 0;
    }
</style>

<div style="text-align: center; position: relative; width: 100%; user-select: none;">
    <div style="position: absolute; width: 100%; font-size: 1.5rem; line-height: 4rem;">破案了，原来德布罗煜没有朋友</div>
    <button class="button" onclick="const self = this.classList.add('button_cannot_seen'); document.querySelector('.sob').classList.remove('sob_hidden');">我的朋友呢？</button>
    <div style="width: 100%; display: flex; justify-content: space-around;">
        <img class="sob sob_hidden" src="https://assets.aiolia.top/Pictures/Others/20220401192619.jpg"/>
    </div>
</div>
