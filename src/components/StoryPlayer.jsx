import { useEffect, useRef } from 'react'
import { Player } from '@remotion/player'
import { TapStory } from '../../video/src/scenes/Compositions.jsx'

export default function StoryPlayer({ frame }) {
  const ref = useRef(null)
  useEffect(() => {
    ref.current?.seekTo(frame)
  }, [frame])
  return (
    <Player
      ref={ref}
      component={TapStory}
      durationInFrames={150}
      fps={30}
      compositionWidth={1080}
      compositionHeight={1080}
      style={{ width: '100%', height: '100%' }}
      controls={false}
      clickToPlay={false}
      doubleClickToFullscreen={false}
      spaceKeyToPlayOrPause={false}
      initialFrame={frame}
    />
  )
}
