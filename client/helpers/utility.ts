export class StateWrapper {
  state: any;
  setter: any;

  constructor([__state, __setter]: [__state: any, __setter: any]) {
    this.state = __state;
    this.setter = __setter;
  }
}

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
