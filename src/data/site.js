// Single source of truth for store content. Edit prices, policies and copy here.
const BASE = import.meta.env.BASE_URL

export const asset = (p) => `${BASE}${p}`

export const contact = {
  phoneDisplay: '76 693 639',
  phoneIntl: '96176693639',
  instagram: 'tapilly.lb',
  instagramUrl: 'https://www.instagram.com/tapilly.lb/',
  country: 'Lebanon',
}

export const whatsappLink = (text = '') => `https://wa.me/${contact.phoneIntl}${text ? `?text=${encodeURIComponent(text)}` : ''}`

export const PRICE = 25
export const CURRENCY = '$'
export const FREE_DELIVERY_FROM = 3 // tags per order

export const categories = [
  { id: 'all', label: 'All tags' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'social', label: 'Social' },
  { id: 'ordering', label: 'Menu & ordering' },
  { id: 'payments', label: 'Payments' },
]

export const formats = [
  { id: 'stand', label: 'Acrylic stand', note: 'For counters & tables' },
  { id: 'card', label: 'NFC card', note: 'Pocket / wall / menu' },
]

// `theme` drives the rendered product visual (see components/ProductVisual.jsx)
export const products = [
  {
    id: 'google-review',
    name: 'Google Review Tag',
    short: 'Turn happy customers into 5-star reviews.',
    category: 'reviews',
    badge: 'Bestseller',
    icon: 'google',
    headline: 'Loved your visit?',
    cta: 'Tap to leave a Google review',
    theme: { a: '#4285F4', b: '#34A853', c: '#FBBC05', d: '#EA4335', bg: '#ffffff', fg: '#0b1430', stripe: 'google' },
    bullets: ['Opens your Google review box directly', 'More reviews = higher ranking on Google Maps', 'Works on iPhone & Android — no app'],
  },
  {
    id: 'instagram',
    name: 'Instagram Follow Tag',
    short: 'One tap to your profile. Grow followers on the spot.',
    category: 'social',
    badge: 'Popular',
    icon: 'instagram',
    headline: 'Follow us on Instagram',
    cta: 'Tap your phone here',
    theme: { a: '#FEDA75', b: '#FA7E1E', c: '#D62976', d: '#4F5BD5', bg: '#ffffff', fg: '#1a1030', stripe: 'insta' },
    bullets: ['Opens your profile in the Instagram app', 'No searching for your @handle', 'Perfect next to the cashier'],
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Chat Tag',
    short: 'Start a conversation instantly — orders, bookings, support.',
    category: 'social',
    icon: 'whatsapp',
    headline: 'Chat with us',
    cta: 'Tap to message on WhatsApp',
    theme: { a: '#25D366', b: '#128C7E', c: '#075E54', d: '#DCF8C6', bg: '#f3fff7', fg: '#06301f', stripe: 'solid' },
    bullets: ['Opens a chat with a pre-filled message', 'Great for deliveries and bookings', 'No saving numbers'],
  },
  {
    id: 'tiktok',
    name: 'TikTok Follow Tag',
    short: 'Turn foot traffic into TikTok followers.',
    category: 'social',
    icon: 'tiktok',
    headline: 'Find us on TikTok',
    cta: 'Tap to follow',
    theme: { a: '#25F4EE', b: '#FE2C55', c: '#000000', d: '#ffffff', bg: '#0b0b0f', fg: '#ffffff', stripe: 'tiktok' },
    bullets: ['Opens your TikTok profile', 'Boost reach on every visit', 'Bold black finish'],
  },
  {
    id: 'menu',
    name: 'Digital Menu Tag',
    short: 'Your menu, one tap away. No QR codes.',
    category: 'ordering',
    badge: 'Restaurants',
    icon: 'menu',
    headline: 'Here is our menu',
    cta: 'Tap to view & order',
    theme: { a: '#E9C46A', b: '#C9A14A', c: '#1b1712', d: '#f5ead2', bg: '#16130f', fg: '#f5ead2', stripe: 'gold' },
    bullets: ['Links to any online menu or ordering page', 'Update your menu without reprinting', 'Elegant for tables & bars'],
  },
  {
    id: 'whish',
    name: 'Whish Payment Tag',
    short: 'Make paying you effortless.',
    category: 'payments',
    icon: 'wallet',
    headline: 'Pay with Whish',
    cta: 'Tap to pay',
    theme: { a: '#FF3D6E', b: '#C2185B', c: '#5a0a2a', d: '#ffe3ec', bg: '#ffffff', fg: '#3a0a1c', stripe: 'solid' },
    bullets: ['Opens your Whish payment details', 'Faster checkout, fewer mistakes', 'Ideal for shops & freelancers'],
  },
  {
    id: 'facebook',
    name: 'Facebook Page Tag',
    short: 'Likes, reviews and check-ins in one tap.',
    category: 'social',
    icon: 'facebook',
    headline: 'Like our page',
    cta: 'Tap to visit us on Facebook',
    theme: { a: '#0866FF', b: '#0a4fc4', c: '#002a6e', d: '#e7f0ff', bg: '#ffffff', fg: '#06183d', stripe: 'solid' },
    bullets: ['Opens your Facebook page', 'Collect recommendations', 'Clean, branded finish'],
  },
  {
    id: 'custom',
    name: 'Custom Link Tag',
    short: 'Any link you want: website, location, Wi-Fi, booking.',
    category: 'ordering',
    badge: 'Flexible',
    icon: 'link',
    headline: 'Tap to connect',
    cta: 'Website · Location · Booking',
    theme: { a: '#0855D6', b: '#3D7BFF', c: '#0f2347', d: '#dbe7ff', bg: '#0f2347', fg: '#ffffff', stripe: 'brand' },
    bullets: ['Programmed with any URL you choose', 'Reprogram anytime, for free', 'Your logo & colors on request'],
  },
]

export const pricing = [
  {
    id: 'single',
    name: 'Single',
    tags: 1,
    blurb: 'Try it on your counter.',
    features: ['1 programmed NFC tag', 'Choose any platform', 'Stand or card format', 'Free reprogramming'],
  },
  {
    id: 'starter',
    name: 'Starter',
    tags: 3,
    blurb: 'Reviews + social, covered.',
    popular: true,
    features: ['3 programmed NFC tags', 'Mix any platforms', 'Free delivery in Lebanon', 'Custom business name', 'Free reprogramming'],
  },
  {
    id: 'business',
    name: 'Business',
    tags: 6,
    blurb: 'Every table, every counter.',
    features: ['6 programmed NFC tags', 'Mix any platforms', 'Free delivery in Lebanon', 'Your logo & brand colors', 'Priority setup', 'Free reprogramming'],
  },
]

export const steps = [
  { n: '01', title: 'Tap', text: 'Your customer holds their phone near the Tapilly tag. No app, no camera, no typing.' },
  { n: '02', title: 'Connect', text: 'Their phone instantly opens your Google review, Instagram, menu, WhatsApp or payment page.' },
  { n: '03', title: 'Done', text: 'They review, follow, order or pay in seconds — while they are still in front of you.' },
]

export const industries = [
  { title: 'Restaurants & cafés', text: 'Menus, reviews and Instagram on every table.', img: 'images/ig-restaurant.jpg' },
  { title: 'Retail & shops', text: 'Followers and payments right at the counter.', img: 'images/ig-shop.jpg' },
  { title: 'Salons & gyms', text: 'Bookings and reviews after every session.', img: 'images/ig-stop-searching.jpg' },
  { title: 'Hotels & venues', text: 'Wi-Fi, menus and directions in one tap.', img: 'images/ig-menu-one-tap.jpg' },
]

export const instagramPosts = [
  'ig-shop.jpg',
  'ig-grow-instagram.jpg',
  'ig-how-it-works.jpg',
  'ig-stop-searching.jpg',
  'ig-business-one-tap.jpg',
  'ig-menu-one-tap.jpg',
].map((f) => `images/${f}`)

export const faqs = [
  {
    q: 'What is an NFC tag?',
    a: 'NFC (Near Field Communication) is the same technology used for contactless payments. A Tapilly tag stores a link — when a phone touches it, the phone opens that link instantly. No battery, no charging, no app.',
  },
  {
    q: 'Does it work with every phone?',
    a: 'It works with all iPhones from iPhone XS onwards and virtually every modern Android phone with NFC turned on (it is on by default on most devices).',
  },
  {
    q: 'Do my customers need to download an app?',
    a: 'No. They simply tap the tag with their phone and the link opens in their browser or in the right app (Google Maps, Instagram, WhatsApp…).',
  },
  {
    q: 'Can I change the link later?',
    a: 'Yes. Changed your menu, your Instagram handle or want to point the tag somewhere else? Message us and we reprogram it for free.',
  },
  {
    q: 'How much does it cost?',
    a: 'Every Tapilly tag is $25 — programmed, ready to use, and with your business name on it. No subscriptions and no monthly fees.',
  },
  {
    q: 'How do I order and pay?',
    a: 'Add your tags to the cart and send the order on WhatsApp. We confirm your links and design with you, then deliver anywhere in Lebanon. Pay cash on delivery or via Whish.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Most orders are programmed and delivered within 2–4 working days across Lebanon. Need it sooner? Tell us in your order and we will do our best.',
  },
  {
    q: 'Can you put my logo on the tag?',
    a: 'Yes. Add your logo and brand colors in the order notes. Branded designs are included on Business packs and available on request for smaller orders.',
  },
]
