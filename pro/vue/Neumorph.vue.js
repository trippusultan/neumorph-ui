// Neumorph UI — Vue 3 ports (plain JS, no build step needed for the component defs).
// Requires styles.css + neumorph-pro.css on the page. Register globally or import per-component.
import { defineComponent, h } from 'vue';

export const NeuButton = defineComponent({
  props: { gold: Boolean, sm: Boolean },
  setup(props, { slots }) {
    return () => h('button', { class: `btn ${props.gold ? 'btn--gold' : ''} ${props.sm ? 'btn--sm' : ''}` }, slots.default?.());
  },
});

export const NeuCard = defineComponent({
  setup(_, { slots }) {
    return () => h('div', { class: 'neu card' }, slots.default?.());
  },
});

export const NeuInput = defineComponent({
  props: { modelValue: [String, Number] },
  setup(props, { attrs }) {
    return () => h('input', { class: 'field', ...attrs });
  },
});

export const NeuToggle = defineComponent({
  data: () => ({ on: false }),
  template: `<div class="toggle" :class="{ on }" @click="on = !on"></div>`,
});

export const NeuModal = defineComponent({
  props: { open: Boolean },
  template: `<div v-if="open" class="modal-backdrop"><div class="modal"><slot/></div></div>`,
});

export const NeuSidebar = defineComponent({
  props: { items: { type: Array, default: () => [] }, active: { type: Number, default: 0 } },
  template: `<div class="sidebar neu">
    <div v-for="(it,i) in items" :key="i" class="nav-item" :class="{ active: i === active }">{{ it }}</div>
  </div>`,
});

export default { NeuButton, NeuCard, NeuInput, NeuToggle, NeuModal, NeuSidebar };
