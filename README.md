---
title: hlsDownloader_dramasq
lang: zh-tw
tags: github
---

# hlsDownloader_dramasq

[![hackmd-github-sync-badge](https://hackmd.io/PxnC87G5QNmp2_mxRwzw-g/badge)](https://hackmd.io/PxnC87G5QNmp2_mxRwzw-g)


## contents

[TOC]

## what is this ?

- Use real browser to download `hls` video.
- Rely on Puppeteer-core and chrome.
- This is specially designed for dramasq.cc website.

## Explain these codes with practical examples

### video source

Assume we want to download video in [this link](https://dramasq.cc/jp210814/1.html). We won't use this link directly beacuse there is a `iframe` wraping the real video, which redirect to [a webpage only carries a single real hls video](https://dramasq.cc/a/m3u8/?ref=_DqdQaHR0cHM6Ly92MTAuZGlvdXMuY2MvMjAyMTA4MTUvRjRhSVp3TFAvaW5kZXgubTN1OA).

### environment

- Only successfully tested in windows.
- You need to have `nodejs` and `ffmpeg`.

### Software operation method

0. find the following line in `index.js` : `await page.goto('URL');`, change URL to anything you want.
1. `npm i`
2. `npm start`
3. Waiting for everything to stand still.
> You will get a lot of `.ts` files in the root dir.

### Decrypt the video

1. find `index.m3u8` in root dir.
2. Change the following URL to become the format of this document:`#EXT-X-KEY:METHOD=AES-128,URI="./key.m3u8"`
3. find `key.key` and change file name to `key.m3u8`
4. CMD:`ffmpeg -protocol_whitelist "file,http,https,crypto,tcp,tls" -i index.m3u8 -c copy out.ts`

## Technical Description

...