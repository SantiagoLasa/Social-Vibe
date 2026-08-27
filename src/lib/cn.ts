// Join condicional de clases — suficiente para este proyecto, sin dependencias.
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}
