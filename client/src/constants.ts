interface IheaderItem {
  name: string;
  link: string;
}
interface selectOption {
  value: string;
  label: string;
}

const headerItems: IheaderItem[] = [
  {
    name: "home",
    link: "/",
  },
  {
    name: "Compress",
    link: "compress",
  },
  {
    name: "docs",
    link: "docs",
  },
];

const libraryOptions: selectOption[] = [
  { value: "tensorflow", label: "Tensorflow" },
  { value: "pytorch", label: "Pytorch" },
  { value: "caffe2", label: "Caffe2" },
  { value: "yandex catboost", label: "Yandex CatBoost" },
  { value: "chainer", label: "Chainer" },
  { value: "cognitive toolkit", label: "Cognitive Toolkit" },
  { value: "coreml", label: "CoreMl" },
  { value: "Optimum", label: "optimum" },
  { value: "keras", label: "Keras" },
];

const compressionOptions: selectOption[] = [
  { value: "quantization", label: "Quantization" },
  { value: "prunning", label: "Prunning" },
  { value: "distillation", label: "Distillation" },
];

export { headerItems, libraryOptions, compressionOptions };
