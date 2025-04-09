import { defineStore } from 'pinia';
import { ref, computed, onMounted } from 'vue';

interface Data {
  price: number;
  qty: number;
  amount: number;
}

export const useDataStore = defineStore('data', () => {
  const price = ref<number>(0);
  const qty = ref<number>(0);
  const counter = ref<number>(0);
  const amount = computed<number>(() => price.value * qty.value);

  const isLoading = ref<boolean>(false);
  const events = ref<string[]>([]);
  const localStorageData = ref<string>('');

  // Отправка данных (с имитацией задержки)
  const submitData = async (): Promise<void> => {
    const data: Data = {
      price: price.value,
      qty: qty.value,
      amount: amount.value,
    };

    events.value.unshift(`Отправка данных: ${JSON.stringify(data)}`);
    isLoading.value = true;

    setTimeout(() => {
      const success = amount.value % 2 === 0;
      const backendResponse = success ? '{success: true}' : '{success: false}';
      events.value.unshift(`Ответ от бэкэнда: ${backendResponse}`);

      if (success) {
        localStorage.setItem('data', JSON.stringify(data));
        localStorageData.value = JSON.stringify(data);
        events.value.unshift(`localStorage обновлен: ${JSON.stringify(data)}`);
      } else {
        events.value.unshift(`Ошибка при сохранении данных.`);
      }

      counter.value++;
      isLoading.value = false;
    }, 1000);
  };

  onMounted(() => {
    loadLocalStorage();
  });

  const loadLocalStorage = (): void => {
    const data = localStorage.getItem('data');
    localStorageData.value = data ? data : '{}';
  };

  return {
    price,
    qty,
    counter,
    amount,
    isLoading,
    events,
    localStorageData,
    submitData,
  };
});
