export const buildFormikFormData = (values: { [id: string]: any }) => {
  const formData = new FormData();
  Object.keys(values).forEach((key) => formData.append(key, values[key]));
  return formData;
};
