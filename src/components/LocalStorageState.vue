<template>
  <div class="mt-4 pl-5">
    <label>Состояние localStorage:</label>
    <pre>{{ dataStore.localStorageData }}</pre>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../stores/useDataStore';

const dataStore = useDataStore();
</script>
