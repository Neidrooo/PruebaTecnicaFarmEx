export async function fetchPerfiles() {
  const response = await fetch("http://localhost:5098/api/Perfil");
  if (!response.ok) {
    throw new Error("Error al cargar los perfiles");
  }
  return await response.json();
}
