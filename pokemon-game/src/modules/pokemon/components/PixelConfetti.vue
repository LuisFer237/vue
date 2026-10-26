<template>
  <canvas ref="canvasRef" class="pixel-confetti" aria-hidden="true"></canvas>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

interface Particle {
  x: number
  y: number
  size: number
  color: string
  vx: number
  vy: number
  stepTimer: number
  age: number
  lifetime: number
}

// Paleta de colores estilo Pokémon Game Boy Color
const COLORS = ['#f83800', '#00b800', '#008888', '#fcb000', '#f878f8', '#0088f8']
const PIXEL_SIZE = 6
const PARTICLE_COUNT = 80
const SWAY_STEP_FRAMES = 4
// Velocidad de caída en px por frame: entre MIN y MIN + RANGE
const MIN_FALL_SPEED = 1.5
const FALL_SPEED_RANGE = 2
// Vida de cada partícula en frames (a 60 fps: de 1.5 a 3 s)
const MIN_LIFETIME_FRAMES = 90
const LIFETIME_RANGE_FRAMES = 90
// Fracción final de la vida en la que se desvanece, y pasos de opacidad (look pixel-art)
const FADE_FRACTION = 0.4
const ALPHA_STEPS = 4

const canvasRef = ref<HTMLCanvasElement | null>(null)

let animationFrameId = 0
let particles: Particle[] = []
let cleanup: (() => void) | undefined

const createParticle = (width: number, height: number): Particle => ({
  x: Math.random() * width,
  y: Math.random() * height,
  // Bloques de 1x1 o 2x2 píxeles
  size: (Math.floor(Math.random() * 2) + 1) * PIXEL_SIZE,
  color: COLORS[Math.floor(Math.random() * COLORS.length)] ?? '#f83800',
  vx: (Math.random() - 0.5) * 1.5,
  vy: Math.random() * FALL_SPEED_RANGE + MIN_FALL_SPEED,
  stepTimer: 0,
  age: 0,
  lifetime: MIN_LIFETIME_FRAMES + Math.random() * LIFETIME_RANGE_FRAMES,
})

const snapToPixel = (value: number) => Math.floor(value / PIXEL_SIZE) * PIXEL_SIZE

// Opacidad escalonada: 1 durante casi toda la vida y cae en pasos al final
const getAlpha = ({ age, lifetime }: Particle) => {
  const remaining = 1 - age / lifetime
  const alpha = Math.min(1, remaining / FADE_FRACTION)
  return Math.ceil(alpha * ALPHA_STEPS) / ALPHA_STEPS
}

onMounted(() => {
  const canvas = canvasRef.value
  const ctx = canvas?.getContext('2d')
  if (!canvas || !ctx) return

  const resizeCanvas = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    // Sin suavizado para mantener el aspecto pixel-art
    ctx.imageSmoothingEnabled = false
  }

  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
  cleanup = () => {
    cancelAnimationFrame(animationFrameId)
    window.removeEventListener('resize', resizeCanvas)
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  particles = Array.from({ length: PARTICLE_COUNT }, () =>
    createParticle(canvas.width, canvas.height),
  )

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles = particles.flatMap((particle) => {
      const age = particle.age + 1
      if (age >= particle.lifetime || particle.y > canvas.height) return []

      const stepTimer = particle.stepTimer + 1
      // Movimiento paso a paso para simular bajo framerate retro
      const x = stepTimer % SWAY_STEP_FRAMES === 0 ? particle.x + particle.vx : particle.x
      const next = { ...particle, x, y: particle.y + particle.vy, stepTimer, age }

      ctx.globalAlpha = getAlpha(next)
      ctx.fillStyle = next.color
      ctx.fillRect(snapToPixel(next.x), snapToPixel(next.y), next.size, next.size)
      return [next]
    })
    ctx.globalAlpha = 1

    // Ya no queda confeti: detener el loop
    if (particles.length === 0) return

    animationFrameId = requestAnimationFrame(animate)
  }

  animate()
})

onBeforeUnmount(() => cleanup?.())
</script>

<style scoped>
.pixel-confetti {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 50;
}
</style>
