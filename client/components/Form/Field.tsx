export class InputFieldAttributes {
  onChange: (event: any) => void;
  type: string;
  placeHolder: string;
  value: any;
  id: string;

  constructor({ onChange, type, placeHolder, value = "", id }: any) {
    this.onChange = onChange;
    this.type = type;
    this.placeHolder = placeHolder;
    this.value = value;
    this.id = id;
  }
}

export class TextAreaFieldAttributes {
  onChange: (event: any) => void;
  placeHolder: string;
  id: string;

  constructor({ onChange, placeHolder, id }: any) {
    this.onChange = onChange;
    this.placeHolder = placeHolder;
    this.id = id;
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
  const { value, onChange, type, placeHolder, id } = attributes;
  return (
    <input
      id={id}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeHolder}
    />
  );
};

export const TextAreaField = ({
  attributes,
}: {
  attributes: TextAreaFieldAttributes;
}) => {
  const { onChange, placeHolder, id } = attributes;
  return <textarea id={id} onChange={onChange} placeholder={placeHolder} />;
};

export const ImageField = ({
  attributes,
}: {
  attributes: ImageFieldAttiributes;
}) => {
  const { onChange, type } = attributes;
  return <input onChange={onChange} type={type} />;
};
