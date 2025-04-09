<template>
  <div v-if="!!dataStore.events.length" class="d-flex flex-column">
    <v-divider></v-divider>
    <h3>События:</h3>
    <div class="events-container d-flex flex-column flex-grow-1">
      <ul>
        <li v-for="(event, index) in dataStore.events" :key="index">{{ event }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '@/stores/useDataStore';

const dataStore = useDataStore();
</script>

<style scoped>
.events-container {
  height: 300px;
  overflow-y: scroll;
}
</style>
