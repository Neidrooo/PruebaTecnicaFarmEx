export async function createUser(data) {
  const response = await fetch("http://localhost:5098/api/Usuario", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(JSON.stringify(data));
  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(responseData.message || "Error al enviar el formulario");
  }
  return responseData;
}
