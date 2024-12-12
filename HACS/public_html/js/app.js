/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

// Conexión al backend usando fetch API (o Axios)
const connectToBackend = async () => {
    const response = await fetch("https://tu-backend.com/api/endpoint");
    const data = await response.json();
    console.log(data);
};

// Llama a la función al cargar la página
window.onload = connectToBackend;

