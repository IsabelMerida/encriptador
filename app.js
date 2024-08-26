const textArea = document.querySelector(".main__container-text-area");
const mensaje = document.querySelector(".mensaje");
const showImage = document.querySelector(".main__container-section-message");
const copyText = document.querySelector(".btn__copiar");

// La letra "e" es convertida para "enter"
// La letra "i" es convertida para "imes"
// La letra "a" es convertida para "ai"
// La letra "o" es convertida para "ober"
// La letra "u" es convertida para "ufat"

textArea.addEventListener("input", function() {
    textArea.value = eliminarAcentosYEspeciales(textArea.value);
});

function eliminarAcentosYEspeciales(texto) {
    // Eliminar acentos
    texto = texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Eliminar caracteres especiales (solo permitir letras, números y espacios)
    texto = texto.replace(/[^a-zA-Z0-9\s]/g, "");

    return texto;
}

function btnEncriptar() {
    const textoEncriptado = encriptar(textArea.value);
    mensaje.value = textoEncriptado;
    textArea.value = "";
    // mensaje.style.backgroundImage = "none";
    if (showImage.classList.contains("visible")) {
        showImage.classList.remove("visible");
        showImage.classList.add("hidden");
    }
    mensaje.classList.remove("hidden");
    mensaje.classList.add("visible");
    copyText.classList.remove("hidden");
    copyText.classList.add("visible");
    alert("¡Texto encriptado con éxito!");
}

function encriptar(stringEncriptado) {
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    stringEncriptado = stringEncriptado.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringEncriptado.includes(matrizCodigo[i][0])) {
            stringEncriptado = stringEncriptado.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1]);
        }
    }
    return stringEncriptado;
}

function btnDesencriptar() {
    const textoDesencriptado = desencriptar(textArea.value);
    mensaje.value = textoDesencriptado;
    textArea.value = "";
    alert("Texto desencriptado.")
}

function desencriptar(stringDesencriptado) {
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    stringDesencriptado = stringDesencriptado.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringDesencriptado.includes(matrizCodigo[i][1])) {
            stringDesencriptado = stringDesencriptado.replaceAll(matrizCodigo[i][1], matrizCodigo[i][0]);
        }
    }
    return stringDesencriptado;
}

function copiarAlPortapapeles() {
    const texto = mensaje.value;

    // Verificar si el mensaje no está vacío
    if (texto) {
        navigator.clipboard.writeText(texto)
            .then(() => {
                alert("Texto copiado al portapapeles");
            })
            .catch(err => {
                alert("Error al copiar el texto: " + err);
            });
    } else {
        alert("No hay texto para copiar");
    }
}