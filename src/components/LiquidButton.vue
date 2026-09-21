<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'default', // 'default', 'primary', 'success', 'error', 'gold', 'glass'
    validator: (val) => ['default', 'primary', 'success', 'error', 'gold', 'glass'].includes(val)
  },
  type: {
    type: String,
    default: 'button'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'md' // 'sm', 'md', 'lg'
  }
})

defineEmits(['click'])

const isPressed = ref(false)
const isHovered = ref(false)

function onMouseDown() {
  if (!props.disabled) isPressed.value = true
}

function onMouseUp() {
  isPressed.value = false
}

function onMouseLeave() {
  isPressed.value = false
  isHovered.value = false
}

function onMouseEnter() {
  if (!props.disabled) isHovered.value = true
}
</script>

<template>
  <div 
    :class="[
      'metal-wrapper',
      `variant-${variant}`,
      `size-${size}`,
      { 'is-pressed': isPressed || active, 'is-hovered': isHovered, 'is-disabled': disabled }
    ]"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    @mouseleave="onMouseLeave"
    @mouseenter="onMouseEnter"
    @touchstart="onMouseDown"
    @touchend="onMouseUp"
    @touchcancel="onMouseLeave"
  >
    <!-- Capa interior con gradiente reflectivo -->
    <div class="metal-inner"></div>

    <!-- Capa Liquid Glass Refraction -->
    <div class="liquid-glass-layer"></div>

    <!-- Botón interactivo principal -->
    <button
      :type="type"
      :disabled="disabled"
      class="metal-button"
      @click="$emit('click', $event)"
    >
      <!-- Efecto de brillo / Shine Effect -->
      <span class="shine-sweep" :class="{ 'shine-active': isPressed || active }"></span>
      
      <span class="button-content">
        <slot />
      </span>
    </button>
  </div>
</template>

<style scoped>
.metal-wrapper {
  position: relative;
  display: inline-flex;
  border-radius: 14px;
  padding: 1.5px;
  cursor: pointer;
  user-select: none;
  transition: all 250ms cubic-bezier(0.1, 0.4, 0.2, 1);
  transform: translateY(0) scale(1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.metal-wrapper.is-hovered {
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.14);
  transform: translateY(-1px) scale(1.01);
}

.metal-wrapper.is-pressed {
  transform: translateY(2px) scale(0.98);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.18);
}

.metal-wrapper.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* Capa interior metálica */
.metal-inner {
  position: absolute;
  inset: 1px;
  border-radius: 12px;
  transition: all 250ms cubic-bezier(0.1, 0.4, 0.2, 1);
  pointer-events: none;
}

/* Capa Liquid Glass */
.liquid-glass-layer {
  position: absolute;
  inset: 0;
  border-radius: 14px;
  pointer-events: none;
  box-shadow: 
    inset 2px 2px 1px -1px rgba(255, 255, 255, 0.7),
    inset -2px -2px 1px -1px rgba(0, 0, 0, 0.3),
    inset 0 0 4px rgba(255, 255, 255, 0.2);
  z-index: 5;
}

/* Botón base */
.metal-button {
  position: relative;
  z-index: 10;
  margin: 1px;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 11px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: var(--font-sans, system-ui, sans-serif);
  font-weight: 700;
  letter-spacing: 0.3px;
  overflow: hidden;
  transition: all 250ms cubic-bezier(0.1, 0.4, 0.2, 1);
}

.button-content {
  position: relative;
  z-index: 15;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

/* Tamaños */
.size-sm .metal-button {
  height: 34px;
  padding: 0 14px;
  font-size: 0.85rem;
}

.size-md .metal-button {
  height: 44px;
  padding: 0 20px;
  font-size: 0.95rem;
}

.size-lg .metal-button {
  height: 50px;
  padding: 0 26px;
  font-size: 1.05rem;
}

/* Efecto Shine Sweep */
.shine-sweep {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent);
  transform: translateX(-100%);
  transition: transform 0.5s ease;
  pointer-events: none;
  z-index: 12;
}

.metal-wrapper:hover .shine-sweep {
  transform: translateX(100%);
}

/* ============================================================ */
/* VARIANTES DE COLOR METÁLICO & LIQUID GLASS                   */
/* ============================================================ */

/* 1. DEFAULT: Dark Titanium Metal */
.variant-default {
  background: linear-gradient(to bottom, #4b5563, #111827);
}
.variant-default .metal-inner {
  background: linear-gradient(to bottom, #374151, #1f2937, #111827);
}
.variant-default .metal-button {
  background: linear-gradient(to bottom, #2d3748, #1a202c);
  color: #ffffff;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.8);
}

/* 2. PRIMARY: Cobalt Blue Metal */
.variant-primary {
  background: linear-gradient(to bottom, #60a5fa, #1e3a8a);
}
.variant-primary .metal-inner {
  background: linear-gradient(to bottom, #3b82f6, #1d4ed8, #1e40af);
}
.variant-primary .metal-button {
  background: linear-gradient(to bottom, #2563eb, #1d4ed8);
  color: #ffffff;
  text-shadow: 0 -1px 0 rgba(30, 58, 138, 1);
}

/* 3. SUCCESS: Emerald Chrome */
.variant-success {
  background: linear-gradient(to bottom, #6ee7b7, #065f46);
}
.variant-success .metal-inner {
  background: linear-gradient(to bottom, #10b981, #047857, #064e3b);
}
.variant-success .metal-button {
  background: linear-gradient(to bottom, #059669, #047857);
  color: #ffffff;
  text-shadow: 0 -1px 0 rgba(6, 78, 59, 1);
}

/* 4. ERROR / RED: Ruby Steel */
.variant-error {
  background: linear-gradient(to bottom, #fca5a5, #991b1b);
}
.variant-error .metal-inner {
  background: linear-gradient(to bottom, #ef4444, #b91c1c, #7f1d1d);
}
.variant-error .metal-button {
  background: linear-gradient(to bottom, #dc2626, #991b1b);
  color: #ffffff;
  text-shadow: 0 -1px 0 rgba(127, 29, 29, 1);
}

/* 5. GOLD: Royal Brass Metal */
.variant-gold {
  background: linear-gradient(to bottom, #fde047, #854d0e);
}
.variant-gold .metal-inner {
  background: linear-gradient(to bottom, #eab308, #a16207, #713f12);
}
.variant-gold .metal-button {
  background: linear-gradient(to bottom, #ca8a04, #a16207);
  color: #ffffff;
  text-shadow: 0 -1px 0 rgba(113, 63, 18, 1);
}

/* 6. GLASS: Pure Liquid Glass */
.variant-glass {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.2));
  backdrop-filter: blur(12px);
}
.variant-glass .metal-inner {
  background: rgba(255, 255, 255, 0.4);
}
.variant-glass .metal-button {
  background: rgba(255, 255, 255, 0.7);
  color: #111827;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.8);
}
</style>
