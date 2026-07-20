document.getElementById("registroForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const mensajeDiv = document.getElementById("mensaje");

    mensajeDiv.style.color = "black";
    mensajeDiv.textContent = "Enviando datos...";

    try {
        const peticion = await fetch(`${API_URL}/usuarios/registrar`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nombre, email })
        });

        const resultado = await peticion.json();

        if (peticion.ok) {
            mensajeDiv.style.color = "green";
            mensajeDiv.textContent = "¡Datos guardados con éxito en la base de datos!";
            document.getElementById("registroForm").reset();
        } else {
            mensajeDiv.style.color = "red";
            mensajeDiv.textContent = "Error: " + (resultado.message || "No se pudo registrar.");
        }
    } catch (error) {
        mensajeDiv.style.color = "red";
        mensajeDiv.textContent = "Error de red al conectar con el servidor.";
        console.error(error);
    }
});