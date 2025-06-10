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
            <button onclick="AbrirModalEditar(${persona.id}, '${persona.Nombre}', '${persona.Apellido}', ${persona.Edad}, '${persona.Correo}')">Editar</button>
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


//Proceso para Editar reguistros
const modalEditar = document.getElementById("modalEditar"); //Modal
const btnCerrarEditar = document.getElementById("btnCerrarEditar");//X Para crrar

//EventeLitener para Cerrar el Modal sw Editar
btnCerrarEditar.addEventListener("click", ()=>{
    modalEditar.close(); //Cerrar modalEditar
});

function AbrirModalEditar(id, nombre, apellido, edad, correo){
    document.getElementById("idEditar").value = id; //El id Esta oculto, pero debe estar presente
    document.getElementById("nombreEditar").value = nombre;
    document.getElementById("apellidoEditar").value = apellido;
    document.getElementById("edadEditar").value = edad;
    document.getElementById("emailEditar").value = correo;
    
    modalEditar.showModal(); 
}

document.getElementById("frmEditarIntegrante").addEventListener("submit", async e => {
    e.preventDefault(); //Evitamos que los datos e envien de nmedianto

    const id = document.getElementById("idEditar").value;
    const Nombre = document.getElementById("nombreEditar").value.trim();
    const Apellido = document.getElementById("apellidoEditar").value.trim();
    const Edad = document.getElementById("edadEditar").value.trim();
    const Correo = document.getElementById("emailEditar").value.trim();

    if(!id || !Nombre || !Apellido || !Edad || !Correo ){
        alert("No sea TONOTO complete todos los campos");
        return;
    }

    const respuesta = await fetch(`${API_URL}/${id}`, {
        method: 'PUT', 
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({Edad, Correo, Nombre, Apellido})
    });

    if(respuesta.ok){
        alert("Reguistro Actualizado Correctamente");
        modalEditar.close();
        ObtenerPersonas();
    }else{
        alert("Error al Actualizar");
    }
    
});



