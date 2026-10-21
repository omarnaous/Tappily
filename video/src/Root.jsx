import { Audio, Composition, staticFile } from 'remotion'
import { useFonts } from './fx.jsx'
import { FPS, HERO_DURATION, PROMO, STORY } from './timing.js'
import { HeroLoop, Promo, TapStory } from './scenes/Compositions.jsx'

// Brand fonts (the same files the website uses), loaded before the first frame.
const withFonts = (Comp, sound) =>
  function Fonted() {
    useFonts([
      ['Inter Variable', 'Inter.woff2', { weight: '100 900' }],
      ['Bricolage Grotesque Variable', 'Bricolage.woff2', { weight: '200 800' }],
    ])
    return (
      <>
        <Comp />
        {sound && <Audio src={staticFile(sound)} />}
      </>
    )
  }

export const Root = () => (
  <>
    {/* Website hero card, silent seamless loop */}
    <Composition id="HeroLoop" component={withFonts(HeroLoop)} durationInFrames={HERO_DURATION} fps={FPS} width={1080} height={1350} />
    {/* Scroll-scrubbed "How it works" (also played live on the site with @remotion/player) */}
    <Composition id="TapStory" component={withFonts(TapStory)} durationInFrames={STORY.duration} fps={FPS} width={1080} height={1080} />
    {/* Instagram / TikTok reel with music + effects, and an effects-only mix */}
    <Composition id="Promo" component={withFonts(Promo, 'promo.wav')} durationInFrames={PROMO.duration} fps={FPS} width={1080} height={1920} />
    <Composition id="PromoNoMusic" component={withFonts(Promo, 'promo-nomusic.wav')} durationInFrames={PROMO.duration} fps={FPS} width={1080} height={1920} />
  </>
)
