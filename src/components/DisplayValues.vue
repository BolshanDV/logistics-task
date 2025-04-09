<template>
  <div class="d-flex flex-row ga-2">
    <div>
      <label>Цена: {{ dataStore.price }}</label>
    </div>
    <div>
      <label>Кол-во: {{ dataStore.qty }}</label>
    </div>
    <div>
      <label>Сумма: {{ dataStore.amount }}</label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../stores/useDataStore';

const dataStore = useDataStore();
</script>
