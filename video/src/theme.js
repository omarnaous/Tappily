import { siGoogle, siInstagram, siWhatsapp } from 'simple-icons'

export const FONT = { display: "'Bricolage Grotesque Variable', sans-serif", sans: "'Inter Variable', sans-serif" }

export const BRAND = { navy: '#0f2347', blue: '#0855d6', blue2: '#3d7bff', ink: '#070d1f', paper: '#f6f5f1' }

// Stage is designed at 1080x1350 and scaled into every format.
export const STAGE = { w: 1080, h: 1350 }

// Fork & knife glyph (24x24), drawn here so the video has no icon-font dependency.
const UTENSILS =
  'M5 2a1 1 0 0 1 1 1v6a2 2 0 0 0 1 1.73V3a1 1 0 1 1 2 0v7.73A2 2 0 0 0 10 9V3a1 1 0 1 1 2 0v6a4 4 0 0 1-3 3.87V21a1 1 0 1 1-2 0v-8.13A4 4 0 0 1 4 9V3a1 1 0 0 1 1-1Zm13 0a1 1 0 0 1 1 1v18a1 1 0 1 1-2 0v-6h-2a1 1 0 0 1-1-1V8c0-3.31 1.79-6 4-6Z'

export const CHANNELS = [
  {
    id: 'google',
    label: 'Google Reviews',
    action: 'Tap → leave a 5★ review',
    headline: 'More Google reviews.',
    icon: siGoogle.path,
    iconColor: '#4285F4',
    bg: 'radial-gradient(120% 90% at 70% 20%, #5b8cff 0%, #2a5cf2 45%, #1638b8 100%)',
    accent: ['#4285F4', '#EA4335', '#FBBC05', '#34A853', '#ffffff'],
    face: { bg: '#ffffff', fg: '#0b1430', stripe: 'linear-gradient(90deg,#4285F4 0 25%,#EA4335 25% 50%,#FBBC05 50% 75%,#34A853 75%)', badge: '#ffffff', glyph: '#4285F4', ring: '#4285F4' },
    title: 'Loved your visit?',
    sub: 'Tap your phone to leave us a review',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    action: 'Tap → follow instantly',
    headline: 'More followers.',
    icon: siInstagram.path,
    iconColor: '#ffffff',
    bg: 'linear-gradient(135deg, #8a3ab9 0%, #e1306c 45%, #fd7e34 100%)',
    accent: ['#FEDA75', '#FA7E1E', '#D62976', '#ffffff'],
    face: { bg: '#ffffff', fg: '#1a1030', stripe: 'linear-gradient(90deg,#FEDA75,#FA7E1E,#D62976,#962FBF,#4F5BD5)', badge: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fd5949 45%, #d6249f 60%, #285AEB 90%)', glyph: '#ffffff', ring: '#D62976' },
    title: 'Follow us on Instagram',
    sub: 'Tap your phone here',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    action: 'Tap → start a chat',
    headline: 'More orders.',
    icon: siWhatsapp.path,
    iconColor: '#ffffff',
    bg: 'radial-gradient(120% 90% at 30% 15%, #4fe08f 0%, #1fb866 45%, #0b7f45 100%)',
    accent: ['#25D366', '#DCF8C6', '#ffffff', '#128C7E'],
    face: { bg: '#f2fff7', fg: '#06301f', stripe: 'linear-gradient(90deg,#25D366,#128C7E)', badge: 'linear-gradient(135deg,#25D366,#128C7E)', glyph: '#ffffff', ring: '#25D366' },
    title: 'Chat with us',
    sub: 'Tap to message us instantly',
  },
  {
    id: 'menu',
    label: 'Digital Menu',
    action: 'Tap → open the menu',
    headline: 'Faster menus.',
    icon: UTENSILS,
    iconColor: '#1b140c',
    bg: 'radial-gradient(120% 90% at 65% 20%, #ffd166 0%, #f5a524 45%, #c8650a 100%)',
    accent: ['#E9C46A', '#F4A261', '#ffffff', '#C9A14A'],
    face: { bg: '#17120d', fg: '#f5ead2', stripe: 'linear-gradient(90deg,#E9C46A,#C9A14A)', badge: 'linear-gradient(135deg,#F2D27A,#C9A14A)', glyph: '#1b140c', ring: '#E9C46A' },
    title: 'Here is our menu',
    sub: 'Tap to view & order',
  },
]

export const BUSINESS = 'The Daily Bites' // fictional demo business shown on the phone screens
