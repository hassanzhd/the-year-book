export const getStyleString = (...styles: string[]): string => {
  let resultantStyle: string = "";

  styles.forEach((value: string) => {
    resultantStyle += ` ${value}`;
  });

  return resultantStyle;
};

export const isEmptyHandler = (
  __value: string | number | File | undefined,
  __errorMessage: string
): boolean => {
  if (__value) {
    return true;
  }
  throw new Error(__errorMessage);
};
