import { morseCodeStrings as arr } from './enum';

const compareInput = (valueTyped: string) =>
  arr.some((v: string) => {
    return !!valueTyped.includes(v);
  });

export { compareInput };
