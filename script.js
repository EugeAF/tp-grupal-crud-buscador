let contenido = document.querySelector('#container');
let tecnologia = JSON.parse(localStorage.getItem('contenido')) || [];

let myModal = new bootstrap.Modal(document.getElementById('edicionModal'), {
    keyboard: false
})

let myModal1 = new bootstrap.Modal(document.getElementById('exampleModal'), {
    keyboard: false
})

function listarContenido() {
    contenido.innerHTML = '';

    tecnologia.forEach(function (item, index) {
        contenido.innerHTML += `
        <tr>
                <th scope="row">${index}</th>
                <td>${item.modelo}</td>
                <td>${item.estado}</td>
                <td><img src="${item.imagen}" class="w-25"></img></td>
                <td>$${item.precio}</td>
                <td>
                    <button type="button" class="btn btn-secondary w-100 mb-2" onclick="setEditModal(${index})" data-bs-toggle="modal" >Editar</button>
                    <button class="btn btn-danger w-100 mb-2" onclick="eliminarProducto(${index})">Eliminar</button>
                </td>
            </tr>
        `
    });
}

listarContenido()

function agregarProducto() {
    //limpieza de campos
    let formAgregarProducto = document.querySelector('#crearModal');
    let modelo = document.querySelector('#Modelo').value;
    let estado = document.querySelector('#Estado').value;
    let imagen = document.querySelector('#Imagen').value;
    let precio = document.querySelector('#Precio').value;
    //Validacion de campos vacios
    if (modelo != "" && estado != "" && imagen != "" && precio != "") {
        tecnologia.push({
            modelo: modelo,
            estado: estado,
            imagen: imagen,
            precio: precio
        });
        localStorage.setItem('contenido', JSON.stringify(tecnologia));
        let formAgregarProducto = document.querySelector('#crearModal');
        formAgregarProducto.reset();
        listarContenido();
        myModal1.hide();
    } else { (alert("Completar campos antes de guardar")) }
}
function eliminarProducto(index) {
    let confirmar = confirm("Esta seguro de eliminar?");
    if (confirmar) {
        tecnologia.splice(index, 1);
        listarContenido();
        localStorage.setItem('contenido', JSON.stringify(""));
    }
}


let editarProducto = function () {

    let modelo = document.querySelector('#editarModelo').value;
    let estado = document.querySelector('#editarEstado').value;
    let imagen = document.querySelector('#editarImagen').value;
    let precio = document.querySelector('#editarPrecio').value;
    let index = event.target.dataset.index;
    //Validacion
    if (modelo != "" && estado != "" && imagen != "" && precio != "") {

        tecnologia[index] = {
            modelo: modelo,
            estado: estado,
            imagen: imagen,
            precio: precio
        }

        localStorage.setItem('contenido', JSON.stringify(tecnologia));

        listarContenido();
        myModal.hide();
    } else (alert("Completar Campo"))
}



function setEditModal(index) {
    let editBtn = document.getElementById("EditBTN");
    editBtn.setAttribute("data-index", index);


    document.querySelector('#editarModelo').value = tecnologia[index].modelo;
    document.querySelector('#editarEstado').value = tecnologia[index].estado;
    document.querySelector('#editarImagen').value = tecnologia[index].imagen;
    document.querySelector('#editarPrecio').value = tecnologia[index].precio;
    myModal.show();
}

listarContenido();

const buscarProducto = () => {
    const word = document.querySelector('#busqueda').value;

    tecnologia = JSON.parse(localStorage.getItem('contenido')) || [];
    tecnologia = tecnologia.filter(elemento => elemento.modelo.includes(word) || elemento.precio == word);

    listarContenido();
}