// Beat sheet in frames (30 fps). Picture and sound/cues.json both read these numbers.
// One tap cycle = 90 frames = 6 beats at 120 BPM, so every tap lands on a beat.
export const FPS = 30
export const CYCLE = 90

// Inside one cycle
export const C = {
  enter: [0, 18], // phone glides in from the right
  lift: [18, 24], // anticipation: tiny lift before the move
  swoop: [24, 30], // drops onto the tag (ease in)
  tap: 30, // contact: ripple, flood, burst
  open: [31, 38], // lock screen -> app
  rise: [33, 52], // phone lifts off to the showcase position
  app: 38, // app micro-animation starts
  chipIn: 40,
  chipOut: 74,
  flip: [70, 86], // stand flips to the next channel
  exit: [72, 88], // phone leaves to the right (fully gone before the loop point)
}

// Hero loop: 4 channels, seamless at 360
export const HERO_DURATION = CYCLE * 4

// Promo reel: 4 taps then the end card
export const PROMO = { cycles: 4, end: CYCLE * 4, logo: CYCLE * 4 + 15, tagline: CYCLE * 4 + 40, cta: CYCLE * 4 + 58, duration: CYCLE * 4 + 135 }
