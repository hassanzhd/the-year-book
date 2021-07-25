export class InputFieldAttributes {
  onChange: (event: any) => void;
  type: string;
  placeHolder: string;

  constructor({ onChange, type, placeHolder }: any) {
    this.onChange = onChange;
    this.type = type;
    this.placeHolder = placeHolder;
  }
}

export class TextAreaFieldAttributes {
  onChange: (event: any) => void;
  placeHolder: string;

  constructor({ onChange, placeHolder }: any) {
    this.onChange = onChange;
    this.placeHolder = placeHolder;
  }
}

export class ImageFieldAttiributes {
  onChange: any;
  type: any;

  constructor({ onChange, type }: any) {
    this.onChange = onChange;
    this.type = type;
  }
}

export const InputField = ({
  attributes,
}: {
  attributes: InputFieldAttributes;
}) => {
  const { onChange, type, placeHolder } = attributes;
  return <input onChange={onChange} type={type} placeholder={placeHolder} />;
};

export const TextAreaField = ({
  attributes,
}: {
  attributes: TextAreaFieldAttributes;
}) => {
  const { onChange, placeHolder } = attributes;
  return <textarea onChange={onChange} placeholder={placeHolder} />;
};

export const ImageField = ({
  attributes,
}: {
  attributes: ImageFieldAttiributes;
}) => {
  const { onChange, type } = attributes;
  return <input onChange={onChange} type={type} />;
};
