const convertCategoriesToOptions = (arr: any[]) => {
  return arr.map((cat) => ({
    label: cat.name,
    value: cat.id,
    children: cat.children,
  }));
  //   return convertedArr;
};

export default convertCategoriesToOptions;
