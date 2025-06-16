export const opciones: string[] = ["React", "Frontend", "JavaScript", "HTML", "CSS", "Node.js", "Typescript"];

export function filtrarOpciones(input: string, tagsSeleccionadas: string[]): string[] {
  return opciones.filter(option =>
    option.toLowerCase().includes(input.toLowerCase()) &&
    !tagsSeleccionadas.includes(option)
  );
}