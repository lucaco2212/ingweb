<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: 'TecnoSoporte Ñuble'
  },
  fontSizeClass: {
    type: String,
    default: ''
  }
})

// Mapeo de tipos de animaciones (8 físicas diferentes)
const animationClasses = [
  'anim-rubber-band',
  'anim-hinge',
  'anim-squash-jump',
  'anim-falling',
  'anim-elastic-slide',
  'anim-impact-shake',
  'anim-pop',
  'anim-levitate'
]

// Estado reactivo para rastrear qué letras están activas
const activeLetters = ref({})

// Separa el texto en palabras y luego en letras para permitir un wrapping responsivo adecuado
const words = computed(() => {
  return props.text.split(' ').map(word => word.split(''))
})

function triggerAnimation(letterIndex) {
  // Activa la animación
  activeLetters.value[letterIndex] = true

  // Se remueve después de 1.2 segundos para permitir reanimar al volver a pasar el cursor
  setTimeout(() => {
    activeLetters.value[letterIndex] = false
  }, 1200)
}

// Cálculo del índice global para asignar diferentes animaciones cíclicas
let globalCounter = 0
function getGlobalIndex(wordIndex, letterIndex) {
  let count = 0
  for (let w = 0; w < wordIndex; w++) {
    count += words.value[w].length
  }
  return count + letterIndex
}
</script>

<template>
  <div class="dancing-container select-none">
    <div 
      v-for="(word, wIdx) in words" 
      :key="wIdx" 
      class="dancing-word"
    >
      <span
        v-for="(letter, lIdx) in word"
        :key="`${wIdx}-${lIdx}`"
        :class="[
          'dancing-letter',
          fontSizeClass,
          { [animationClasses[getGlobalIndex(wIdx, lIdx) % animationClasses.length]]: activeLetters[getGlobalIndex(wIdx, lIdx)] }
        ]"
        @mouseenter="triggerAnimation(getGlobalIndex(wIdx, lIdx))"
        @click="triggerAnimation(getGlobalIndex(wIdx, lIdx))"
      >
        {{ letter }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.dancing-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.35em;
  perspective: 1000px;
  user-select: none;
}

.dancing-word {
  display: inline-flex;
  white-space: nowrap;
}

.dancing-letter {
  display: inline-block;
  font-family: var(--font-display, 'Outfit', sans-serif);
  font-weight: 800;
  color: var(--color-neutral, #111827);
  font-size: 3.2rem;
  line-height: 1.15;
  cursor: pointer;
  transform-style: preserve-3d;
  will-change: transform;
  transition: color 0.2s ease;
}

.dancing-letter:hover {
  color: var(--color-primary, #FF0F67);
}

@media (min-width: 768px) {
  .dancing-letter {
    font-size: 4.2rem;
  }
}

@media (max-width: 480px) {
  .dancing-letter {
    font-size: 2.3rem;
  }
}

/* 1. Rubber Band */
.anim-rubber-band {
  animation: rubberBand 0.8s ease-in-out;
  transform-origin: center center;
  z-index: 10;
}
@keyframes rubberBand {
  0% { transform: scaleX(1) scaleY(1); }
  30% { transform: scaleX(1.25) scaleY(0.75); }
  40% { transform: scaleX(0.75) scaleY(1.25); }
  50% { transform: scaleX(1.15) scaleY(0.85); }
  65% { transform: scaleX(0.95) scaleY(1.05); }
  75% { transform: scaleX(1.05) scaleY(0.95); }
  100% { transform: scaleX(1) scaleY(1); }
}

/* 2. The Hinge */
.anim-hinge {
  animation: hingeAnim 1.1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-origin: bottom left;
  z-index: 10;
}
@keyframes hingeAnim {
  0% { transform: rotate(0deg) translateY(0); }
  25% { transform: rotate(55deg) translateY(6px); }
  50% { transform: rotate(35deg) translateY(-2px); }
  75% { transform: rotate(50deg) translateY(3px); }
  100% { transform: rotate(0deg) translateY(0); }
}

/* 3. Squash and Jump */
.anim-squash-jump {
  animation: squashJump 0.7s ease-out;
  transform-origin: bottom center;
  z-index: 10;
}
@keyframes squashJump {
  0% { transform: scaleY(1) translateY(0); }
  30% { transform: scaleY(0.6) translateY(15px); }
  60% { transform: scaleY(1.25) translateY(-35px); }
  85% { transform: scaleY(0.9) translateY(4px); }
  100% { transform: scaleY(1) translateY(0); }
}

/* 4. Falling 3D */
.anim-falling {
  animation: falling3D 1.2s ease-out;
  transform-origin: 50% 80%;
  z-index: 10;
}
@keyframes falling3D {
  0% { transform: perspective(600px) rotateX(0deg) scale(1); }
  30% { transform: perspective(600px) rotateX(180deg) scale(1.15); }
  60% { transform: perspective(600px) rotateX(240deg) scale(1.05); }
  100% { transform: perspective(600px) rotateX(360deg) scale(1); }
}

/* 5. Elastic Slide */
.anim-elastic-slide {
  animation: elasticSlide 0.8s ease-in-out;
  transform-origin: center center;
  z-index: 10;
}
@keyframes elasticSlide {
  0% { transform: translateX(0); }
  25% { transform: translateX(-18px); }
  50% { transform: translateX(12px); }
  75% { transform: translateX(-6px); }
  100% { transform: translateX(0); }
}

/* 6. Impact Shake */
.anim-impact-shake {
  animation: impactShake 0.5s linear;
  transform-origin: center center;
  z-index: 10;
}
@keyframes impactShake {
  0% { transform: translate(0, 0) rotate(0deg); }
  20% { transform: translate(-5px, -2px) rotate(-2deg); }
  40% { transform: translate(5px, 2px) rotate(2deg); }
  60% { transform: translate(-4px, -1px) rotate(-1deg); }
  80% { transform: translate(2px, 1px) rotate(1deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
}

/* 7. Pop Scale */
.anim-pop {
  animation: popScale 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-origin: center center;
  z-index: 10;
}
@keyframes popScale {
  0% { transform: scale(1); }
  50% { transform: scale(1.45); }
  100% { transform: scale(1); }
}

/* 8. Levitate */
.anim-levitate {
  animation: levitateAnim 1.1s ease-in-out;
  transform-origin: center center;
  z-index: 10;
}
@keyframes levitateAnim {
  0% { transform: translateY(0) scale(1); text-shadow: 0 0 0 rgba(0,0,0,0); }
  50% { transform: translateY(-28px) scale(1.12); text-shadow: 0 16px 16px rgba(0,0,0,0.18); }
  100% { transform: translateY(0) scale(1); text-shadow: 0 0 0 rgba(0,0,0,0); }
}
</style>
