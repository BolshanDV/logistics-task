<template>
  <div class="d-flex flex-row ga-2">
    <div class="flex-1-1-0">
      <v-text-field
        v-model.number="localPrice"
        label="Цена"
        type="number"
        placeholder="Введите цену"
        :rules="[priceAndQtyValidation]"
      />
    </div>
    <div class="flex-1-1-0">
      <v-text-field
        v-model.number="localQty"
        label="Кол-во"
        type="number"
        placeholder="Введите количество"
        :rules="[priceAndQtyValidation]"
      />
    </div>
    <div class="flex-1-1-0">
      <v-text-field
        v-model.number="localAmount"
        label="Сумма"
        type="number"
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
import { ref, watch, computed } from 'vue';
import { debounce } from '@/utils/debounce';

const dataStore = useDataStore();

const localPrice = ref(dataStore.price);
const localQty = ref(dataStore.qty);
const localAmount = ref(dataStore.amount);

const lastChangedField = ref<string | null>(null);

// Валидация
const priceAndQtyValidation = (value: number): string | boolean =>
  value <= 0 ? 'Значение должно быть больше нуля' : true;

const isSubmitDisabled = computed(() => dataStore.price <= 0 || dataStore.qty <= 0);

// Отправка с задержкой
const debouncedSubmitData = debounce(() => {
  if (dataStore.price > 0 && dataStore.qty > 0) {
    dataStore.submitData();
  } else {
    console.log('Неверные значения');
  }
}, 300);

const updatePrice = debounce((val: number) => {
  dataStore.price = val;
}, 300);

const updateQty = debounce((val: number) => {
  dataStore.qty = val;
}, 300);

const updateAmount = debounce((val: number) => {
  dataStore.amount = val;
}, 300);

watch([localPrice, localQty, localAmount], ([price, qty, amount], [oldPrice, oldQty, oldAmount]) => {
  if (price !== oldPrice) {
    lastChangedField.value = 'price';
    updatePrice(price);
  }
  if (qty !== oldQty) {
    lastChangedField.value = 'qty';
    updateQty(qty);
  }
  if (amount !== oldAmount) {
    lastChangedField.value = 'amount';
    updateAmount(amount);
  }
});

watch(
  () => [dataStore.price, dataStore.qty, dataStore.amount],
  debounce(() => {
    if (lastChangedField.value === 'price' || lastChangedField.value === 'qty') {
      dataStore.amount = parseFloat((dataStore.price * dataStore.qty).toFixed(2));
    } else if (lastChangedField.value === 'amount' && dataStore.qty !== 0) {
      dataStore.price = parseFloat((dataStore.amount / dataStore.qty).toFixed(2));
    }

    localPrice.value = dataStore.price;
    localQty.value = dataStore.qty;
    localAmount.value = dataStore.amount;
  }, 300)
);
</script>
