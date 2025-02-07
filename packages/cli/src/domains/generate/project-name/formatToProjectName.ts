/** Formats received string value into a project name. */
const formatToProjectName = (value: string) => {
  return value.toLowerCase().replace(/\s+/g, "-");
};

export default formatToProjectName;
