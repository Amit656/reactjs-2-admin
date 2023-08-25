<template>
  <div class="flex items-center gap-2">
    <AtomsInput
      :id="id"
      :name="name"
      type="checkbox"
      :class="class"
      :value=value
    />
    <AtomsText
      tag="label"
      :content="label"
    />
  </div>
</template>

<script setup>
defineProps({
  id: { type: String, required: true },
  name: { type: String, required: true },
  class: { type: String, required: true },
  value: { type: Number, required: true },
  label: { type: String, default: null },
});
</script>

<style lang="scss" scoped>

</style>
