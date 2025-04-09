<template>
  <div class="d-flex flex-row ga-2">
    <div class="flex-1-1-0">
      <v-text-field
        v-model.number="dataStore.price"
        label="Цена"
        type="number"
        placeholder="Введите цену"
        :rules="[priceAndQtyValidation]"
      />
    </div>
    <div class="flex-1-1-0">
      <v-text-field
        v-model.number="dataStore.qty"
        label="Кол-во"
        type="number"
        placeholder="Введите количество"
        :rules="[priceAndQtyValidation]"
      />
    </div>
    <div class="flex-1-1-0">
      <v-text-field
        v-model.number="dataStore.amount"
        label="Сумма"
        readonly
        placeholder="Рассчитанная сумма"
      />
    </div>

    <div class="d-flex align-center">
      <v-btn
        color="primary"
        @click="debouncedSubmitData"
        :disabled="isSubmitDisabled || dataStore.isLoading"
      >
        Отправить данные
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../stores/useDataStore';
import { ref, watch } from 'vue';
import { debounce } from '@/utils/debounce';

const dataStore = useDataStore();

const priceAndQtyValidation = (value: number): string | boolean => {
  return value <= 0 ? 'Значение должно быть больше нуля' : true;
};

const isSubmitDisabled = ref<boolean>(true);

const updateSubmitButtonState = (): void => {
  isSubmitDisabled.value = dataStore.price <= 0 || dataStore.qty <= 0;
};

watch(() => dataStore.price, updateSubmitButtonState);
watch(() => dataStore.qty, updateSubmitButtonState);

const debouncedSubmitData = debounce(() => {
  if (dataStore.price > 0 && dataStore.qty > 0) {
    dataStore.submitData();
  } else {
    console.log('Invalid values');
  }
}, 300);
</script>
