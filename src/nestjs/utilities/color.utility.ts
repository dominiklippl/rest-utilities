type ColorTextFn = (text: string) => string;

const isColorAllowed = () => !process.env.NO_COLOR;
const colorIfAllowed = (colorFn: ColorTextFn) => (text: string) =>
  isColorAllowed() ? colorFn(text) : text;

export const colors = {
  blue: colorIfAllowed((text: string) => `\x1b[34m${text}\x1B[0m`),
  bg_blue: colorIfAllowed((text: string) => `\x1b[44m${text}\x1B[0m`),
  bg_green: colorIfAllowed((text: string) => `\x1b[42m${text}\x1B[0m`),
};
