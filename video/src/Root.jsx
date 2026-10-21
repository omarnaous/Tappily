import { Audio, Composition, staticFile } from 'remotion'
import { useFonts } from './fx.jsx'
import { FPS, HERO_DURATION, PROMO } from './timing.js'
import { HeroLoop, Promo } from './scenes/Compositions.jsx'
import { IndustryStill } from './scenes/Industry.jsx'

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
    {/* Stills for the website's "Every place people tap" cards */}
    {['restaurant', 'retail', 'salon', 'hotel'].map((id) => (
      <Composition key={id} id={`Industry-${id}`} component={withFonts(() => <IndustryStill id={id} />)} durationInFrames={1} fps={FPS} width={1080} height={1350} />
    ))}
    {/* Instagram / TikTok reel with music + effects, and an effects-only mix */}
    <Composition id="Promo" component={withFonts(Promo, 'promo.wav')} durationInFrames={PROMO.duration} fps={FPS} width={1080} height={1920} />
    <Composition id="PromoNoMusic" component={withFonts(Promo, 'promo-nomusic.wav')} durationInFrames={PROMO.duration} fps={FPS} width={1080} height={1920} />
  </>
)
