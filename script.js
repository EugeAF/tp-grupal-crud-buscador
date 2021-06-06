let contenido = document.querySelector('#container');
let tecnologia = JSON.parse(localStorage.getItem('contenido')) || [];

function listarContenido(){
    contenido.innerHTML = '';

    tecnologia.forEach(function(item,index){
        contenido.innerHTML += `
        <tr>
                <th scope="row">${index}</th>
                <td>${item.modelo}</td>
                <td>
                    <button type="button" class="btn btn-secondary" onclick="setEditModal(${index})" data-bs-toggle="modal" data-bs-target="#exampleModal2">Editar</button>
                    <button class="btn btn-danger" onclick="eliminarProducto(${index})">Eliminar</button>
                </td>
                <td>${item.estado}</td>
                <td><img src="${item.imagen}"></img></td>
                <td>${item.precio}</td>
            </tr>
        `
    });
}

listarContenido()

function agregarProducto() {
    let modelo = document.querySelector('#Modelo').value;
    let estado = document.querySelector('#Estado').value;
    let imagen = document.querySelector('#Imagen').value;
    let precio = document.querySelector('#Precio').value;

    tecnologia.push({
        modelo: modelo,
        estado: estado,
        imagen: imagen,
        precio: precio
    });
    localStorage.setItem('contenido', JSON.stringify(tecnologia));
    listarContenido();
}

function eliminarProducto(index){
    tecnologia.splice(index, 1);
    listarContenido();
    localStorage.setItem('contenido', JSON.stringify(""));
}



let editarProducto = function () {
    let modelo = document.querySelector('#editarModelo').value;
    let estado = document.querySelector('#editarEstado').value;
    let imagen = document.querySelector('#editarImagen').value;
    let precio = document.querySelector('#editarPrecio').value;
    let index = event.target.dataset.index;

            tecnologia[index] = {
            modelo: modelo,
            estado: estado,
            imagen: imagen,
            precio: precio
        }

        localStorage.setItem('contenido', JSON.stringify(tecnologia));

        listarContenido();
    }

    function setEditModal(index) {
        let editBtn = document.getElementById("EditBTN");
        editBtn.setAttribute("data-index", index);
    
        document.querySelector('#editarModelo').value = tecnologia[index].modelo;
        document.querySelector('#editarEstado').value = tecnologia[index].estado;
        document.querySelector('#editarImagen').value = tecnologia[index].imagen;
        document.querySelector('#editarPrecio').value = tecnologia[index].precio;

    }

listarContenido();