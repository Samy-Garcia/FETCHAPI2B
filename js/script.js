//URL de la API - Endpoint
const API_URL = "https://retoolapi.dev/BuWOdF/Expo";

//Funcion para llamara a la API y traer el JSON
async function ObtenerPersonas() {
    //Obtener la respuesta del servidor 
    const res = await fetch(API_URL); //Obtener datos de la API

    //Convertir la respuesta del servidor a formato JSON
    const data = await res.json();

    CrearTabla(data); //Enviamos el JSON a la funcion "CrearTabla"
}

//Funcion que creara las filas de las tablas en base a los reguistros de la API

function CrearTabla(datos){//"Datos" respresenta al JSON que viene de la api
    //se llama "tbody" dentro de la tabla con id "tabla"
    const tabla = document.querySelector("#tabla tbody");

    //Para inyectar codigo HTML usamos "innerHTML"
    tabla.innerHTML = ""; //Vaciamos el contenido de la tabla
    
    datos.forEach(persona => {
        tabla.innerHTML += `
        <tr>
            <td>${persona.id}</td>
            <td>${persona.Nombre}</td>
            <td>${persona.Apellido}</td>
            <td>${persona.Edad}</td>
            <td>${persona.Correo}</td>
        <td> 
            <button>Editar</button>
            <button onClick="eliminarRegistros(${persona.id})">Eliminar</button>
        </td>
        </tr>
        `
    });
}

ObtenerPersonas();






//Proceso para agregar un nuevo Reguistro
const modal = document.getElementById("modalAgregar");//cuadrado de dialogo
const btnAgregar = document.getElementById("btnAbrirModal"); //+ para abrir 
const btnCerrar = document.getElementById("btnCerrarModal"); // X para Cerrar

btnAgregar.addEventListener("click", ()=>{
    modal.showModal();//Abrir modal
});

btnCerrar.addEventListener("click", ()=>{
    modal.close();//Cerrar modal
});


//Agregar nuevo integrante desde el formulario
document.getElementById("frmAgregarIntegrante").addEventListener("submit", async e => {
    e.preventDefault();//"e" Rpresenta al evento Submit - Evita qUe eL formulario se envie

    //Capturamos los valores del formulario
    const Nombre = document.getElementById("nombre").value.trim();
    const Apellido = document.getElementById("apellido").value.trim();
    const Edad = document.getElementById("edad").value.trim();
    const Correo = document.getElementById("email").value.trim();

    if(!Nombre || !Apellido || !Correo || !Edad){
        alert("Complete todos los campos");
        return; //Evita que el codigo siga ejecutando
    }

    const respresenta = await fetch(API_URL, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({Nombre, Apellido, Edad, Correo})
    });

    if(respresenta.ok){
        alert("El registro fue agregado correctamente");

        //Limpiar el formulario
        document.getElementById("frmAgregarIntegrante").reset();

        //Cerrar Formulario
        modal.close();

        //Recargar la tabla

        ObtenerPersonas();
    }
    else{
        alert("Hubo un error al Agregar")
    }
}); //Fin del formulario



//Para eliminar Registros
async function eliminarRegistros(id) {  //Se pide ID para borrar
    if(confirm("¿Estas seguro de borrar este registros?")){
        await fetch(`${API_URL}/${id}`,{method: 'DELETE'});

        ObtenerPersonas(); //PARA TENER LA LISTA ACTUALIZADA
    }
}

//TQM profesor

//amo a una linda niña "A"