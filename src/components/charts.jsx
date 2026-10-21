// Small SVG chart primitives. Spec (dataviz skill): 2px lines, ~10% area wash, >=8px end dot with a
// 2px surface ring, columns <=24px with a 4px rounded data end and square baseline, hairline solid grid,
// text in ink tokens (never the series colour), hover tooltip on every mark.
import { useId, useState } from 'react'
import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

/** Line + area sparkline with an end dot. `values` drawn left->right. */
export function Sparkline({ values, width = 160, height = 48, color = 'var(--color-series-1)', label = (v) => v }) {
  const id = useId()
  const [hover, setHover] = useState(null)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const pad = 6
  const x = (i) => pad + (i / (values.length - 1)) * (width - pad * 2)
  const y = (v) => pad + (1 - (v - min) / (max - min || 1)) * (height - pad * 2)
  const line = values.map((v, i) => `${i ? 'L' : 'M'}${x(i)},${y(v)}`).join(' ')
  const area = `${line} L${x(values.length - 1)},${height} L${x(0)},${height} Z`
  const last = values.length - 1
  const h = hover ?? last
  return (
    <div className="relative" style={{ width, height }}>
      <svg width={width} height={height} className="overflow-visible" onMouseLeave={() => setHover(null)}>
        <defs>
          <clipPath id={`c${id}`}>
            <motion.rect
              x="0"
              y="0"
              height={height}
              initial={{ width: 0 }}
              whileInView={{ width }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease }}
            />
          </clipPath>
        </defs>
        <g clipPath={`url(#c${id})`}>
          <path d={area} fill={color} opacity="0.1" />
          <path d={line} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        </g>
        <motion.circle
          cx={x(h)}
          cy={y(values[h])}
          r="4"
          fill={color}
          stroke="var(--color-card)"
          strokeWidth="2"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
        />
        {values.map((v, i) => (
          <rect
            key={i}
            x={x(i) - width / values.length / 2}
            y="0"
            width={width / values.length}
            height={height}
            fill="transparent"
            onMouseEnter={() => setHover(i)}
          />
        ))}
      </svg>
      {hover != null && (
        <div
          className="pointer-events-none absolute -top-8 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink px-2 py-1 font-mono text-[11px] text-white"
          style={{ left: x(hover) }}
        >
          {label(values[hover], hover)}
        </div>
      )}
    </div>
  )
}

/** Mini column chart: one series, last (or `highlight`) column in the series colour, the rest de-emphasised. */
export function MiniColumns({ values, labels, width = 168, height = 56, highlight = values.length - 1, color = 'var(--color-series-1)', format = (v) => v }) {
  const [hover, setHover] = useState(null)
  const max = Math.max(...values)
  const gap = 4
  const bw = Math.min(16, (width - gap * (values.length - 1)) / values.length)
  const total = bw * values.length + gap * (values.length - 1)
  const ox = (width - total) / 2
  return (
    <div className="relative" style={{ width, height: height + 16 }}>
      <svg width={width} height={height} className="overflow-visible" onMouseLeave={() => setHover(null)}>
        <line x1="0" x2={width} y1={height} y2={height} stroke="var(--color-line)" strokeWidth="1" />
        {values.map((v, i) => {
          const h = Math.max(3, (v / max) * (height - 4))
          const x = ox + i * (bw + gap)
          return (
            <g key={i} onMouseEnter={() => setHover(i)}>
              <motion.path
                d={`M${x},${height} V${height - h + 4} q0,-4 4,-4 h${bw - 8} q4,0 4,4 V${height} Z`}
                fill={i === highlight || i === hover ? color : 'var(--color-de-emphasis)'}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.05, ease }}
                style={{ transformOrigin: `0px ${height}px`, transformBox: 'view-box' }}
              />
              <rect x={x - gap / 2} y="0" width={bw + gap} height={height} fill="transparent" />
            </g>
          )
        })}
      </svg>
      {labels && (
        <div className="absolute inset-x-0 flex font-mono text-[9.5px] text-muted" style={{ top: height + 4, paddingLeft: ox, gap }}>
          {labels.map((l, i) => (
            <span key={i} className="text-center" style={{ width: bw }}>
              {l}
            </span>
          ))}
        </div>
      )}
      {hover != null && (
        <div
          className="pointer-events-none absolute -top-7 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink px-2 py-1 font-mono text-[11px] text-white"
          style={{ left: ox + hover * (bw + gap) + bw / 2 }}
        >
          {format(values[hover], hover)}
        </div>
      )}
    </div>
  )
}
