import { ref } from 'vue'

export const servicioSeleccionado = ref(null)

export function seleccionarServicio(servicio) {
  servicioSeleccionado.value = servicio
}

export function limpiarSeleccion() {
  servicioSeleccionado.value = null
}
