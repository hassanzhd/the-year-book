export const getStyleString = (...styles: string[]): string => {
  let resultantStyle: string = "";

  styles.forEach((value: string) => {
    resultantStyle += ` ${value}`;
  });

  return resultantStyle;
};
