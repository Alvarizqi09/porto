export const getLocalizedText = (field, locale) => {
  if (!field) return "";
  if (typeof field === "string") return field;
  return field[locale] || field.id || field.en || "";
};
