// Renders scene.html frame-by-frame and encodes the looping hero video.
// Usage: node tools/hero-video/render.mjs [--preview]
import { chromium } from 'playwright'
import { mkdirSync, rmSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const dir = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(dir, '../..')
const frames = path.join(dir, '.frames')
const FPS = 30
const DURATION = 8
const preview = process.argv.includes('--preview')

rmSync(frames, { recursive: true, force: true })
mkdirSync(frames, { recursive: true })

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium' })
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } })
await page.goto('file://' + path.join(dir, 'scene.html'))
await page.evaluate(() => document.fonts.ready)

const times = preview ? [0, 1.5, 2.4, 3.3, 4.5, 5.3, 6.5] : Array.from({ length: FPS * DURATION }, (_, i) => i / FPS)
for (const [i, t] of times.entries()) {
  await page.evaluate((t) => window.render(t), t)
  await page.screenshot({ path: path.join(frames, `f${String(i).padStart(4, '0')}.${preview ? 'png' : 'jpg'}`), ...(preview ? {} : { type: 'jpeg', quality: 92 }) })
}
await browser.close()

if (!preview) {
  const out = path.join(root, 'public/video')
  mkdirSync(out, { recursive: true })
  const input = ['-y', '-framerate', String(FPS), '-i', path.join(frames, 'f%04d.jpg')]
  const scale = ['-vf', 'scale=1600:-2']
  execFileSync('ffmpeg', [...input, ...scale, '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '26', '-preset', 'slow', '-movflags', '+faststart', '-an', path.join(out, 'hero.mp4')], { stdio: 'inherit' })
  execFileSync('ffmpeg', [...input, ...scale, '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '38', '-row-mt', '1', '-an', path.join(out, 'hero.webm')], { stdio: 'inherit' })
  execFileSync('ffmpeg', ['-y', '-i', path.join(frames, 'f0075.jpg'), '-vf', 'scale=1600:-2', '-q:v', '4', '-update', '1', path.join(out, 'hero-poster.jpg')], { stdio: 'inherit' })
  rmSync(frames, { recursive: true, force: true })
}
