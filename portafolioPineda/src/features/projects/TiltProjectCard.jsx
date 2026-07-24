import { motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import Tilt from 'react-parallax-tilt'

import useMediaQuery from '../../shared/hooks/useMediaQuery.jsx'
import ProjectCardBack from './ProjectCardBack.jsx'
import ProjectCardFront from './ProjectCardFront.jsx'

export default function TiltProjectCard({
  project,
  index,
  onOpenGallery,
}) {
  const reduceMotion = useReducedMotion()
  const desktopViewport = useMediaQuery('(min-width: 1024px)')
  const [flipped, setFlipped] = useState(false)

  const tiltEnabled = desktopViewport && !reduceMotion

  function showDetails() {
    setFlipped(true)
  }

  function showFront() {
    setFlipped(false)
  }

  return (
    <motion.li
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 28,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.5,
        delay: reduceMotion ? 0 : index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="min-w-0"
    >
      <Tilt
        tiltEnable={tiltEnabled}
        tiltMaxAngleX={6}
        tiltMaxAngleY={6}
        perspective={1100}
        scale={1.015}
        transitionSpeed={650}
        glareEnable={tiltEnabled}
        glareMaxOpacity={0.12}
        glareColor="#38bdf8"
        glarePosition="all"
        glareBorderRadius="1.5rem"
        reset
        className="h-full"
      >
        <motion.article
          aria-label={`Proyecto: ${project.title}`}
          animate={{
            rotateY: flipped ? 180 : 0,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative h-144 w-full"
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          <ProjectCardFront
            project={project}
            projectNumber={index + 1}
            active={!flipped}
            onShowDetails={showDetails}
            onOpenGallery={
              onOpenGallery
                ? () => onOpenGallery(project)
                : undefined
            }
          />

          <ProjectCardBack
            project={project}
            active={flipped}
            onReturn={showFront}
          />
        </motion.article>
      </Tilt>
    </motion.li>
  )
}