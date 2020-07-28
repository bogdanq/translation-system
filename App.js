const useTranslation = () => {
  const translation = () => {
    return "replaced";
  };

  return [translation];
};

const App = () => {
  const [__] = useTranslation();

  const a = __("Строка");
  const b = __("Строка 2");

  console.log(a, b);
};

const Foo2 = () => {
  const [__] = useTranslation();

  const a = __("Foo2 Строка");
  const b = __("Foo2 Строка 2");

  console.log(a, b);
};
