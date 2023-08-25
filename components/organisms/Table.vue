<template>
  <div>
    <table>
      <thead>
        <tr>
          <th
            v-for="header in headers"
            :key="header"
          >
            {{ header }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="row in rows"
          :key="row.id"
        >
          <td
            v-for="column in columns"
            :key="column"
          >
            {{ row[column] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  headers: { type: Array, required: true },
  rows: { type: Array, required: true },
  columns: { type: Array, required: true },
});
</script>

<style lang="scss" scoped>

</style>
