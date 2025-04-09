export const debounce = <T>(fn: (arg: T) => void, delay: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (arg: T) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(arg), delay);
  };
};
