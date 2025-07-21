<template>
  <div>
    <transition :name="transition">
      <div
        tabindex="0"
        class="vld-overlay is-active is-full-page"
        v-show="isActive"
        :aria-busy="isActive"
        aria-label="Loading"
      >
        <div class="vld-background" @click.prevent="cancel"></div>
        <div class="vld-icon">
          <slot name="before" />
          <slot name="default">
            <div class="d-flex flex-column justify-content-center align-items-center">
              <h2 v-if="loadingMessage">{{ loadingMessage }}</h2>
              <svg viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" width="64" height="64" stroke="#000">
                <g fill="none" fill-rule="evenodd">
                  <g transform="translate(1 1)" stroke-width="2">
                    <circle stroke-opacity=".25" cx="18" cy="18" r="18" />
                    <path d="M36 18c0-9.94-8.06-18-18-18">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 18 18"
                        to="360 18 18"
                        dur="0.8s"
                        repeatCount="indefinite"
                      />
                    </path>
                  </g>
                </g>
              </svg>
            </div>
          </slot>
          <slot name="after" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
const props = defineProps({
  isActive: {
    type: Boolean,
    required: true
  },
  transition: {
    type: String,
    default: 'fade'
  },
  loadingMessage: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['cancel'])

function cancel() {
  emit('cancel')
}
</script>

<style  scoped>
.vld-overlay {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  align-items: center;
  display: none;
  justify-content: center;
  overflow: hidden;
  z-index: 9999;
}

.vld-overlay.is-active {
  display: flex;
}

.vld-overlay.is-full-page {
  z-index: 9999;
  position: fixed;
}

.vld-overlay .vld-background {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  background: #fff;
  opacity: 0.5;
}

.vld-overlay .vld-icon,
.vld-parent {
  position: relative;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
