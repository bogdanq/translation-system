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

App();
