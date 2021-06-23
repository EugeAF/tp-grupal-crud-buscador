const cardIndex = document.querySelector('#newCard');
const traerStorage = JSON.parse(localStorage.getItem('contenido')) || [];
const myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
  keyboard: false
})


const nombre = document.querySelector('#nombre').value;
const apellido = document.querySelector('#apellido').value;
const email = document.querySelector('#email').value;
const password1 = document.querySelector('#password1').value;
const password2 = document.querySelector('#password2').value;
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];



function mostrarStorage() {
  traerStorage.forEach(function (item) {
    cardIndex.innerHTML += `
            <div class="card col-3 ms-2 mb-2" style="width: 18rem;">
              <img src="${item.imagen}" class="card-img-top w-100 mt-2" alt="...">
              <div class="card-body">
                <h5 class="card-title">${item.modelo}</h5>
                <p class="card-text">${item.estado}</p>
                <p>${item.precio}</p>
              </div>
            </div>`
  }
  );
}

//mostrarStorage();

function guardar() {
  const nombre = document.querySelector('#nombre').value;
  const apellido = document.querySelector('#apellido').value;
  const email = document.querySelector('#email').value;
  const password1 = document.querySelector('#password1').value;
  const password2 = document.querySelector('#password2').value;
  if (password1 == password2) {
    usuarios.push({
      nombre: nombre,
      apellido: apellido,
      email: email,
      password1: password1,
      password2: password2
    });
  } else { alert("Fallo validacion de Contraseña") }
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

function ingreso() {
  const emaila = document.querySelector('#emaila').value;
  const passworda = document.querySelector('#passworda').value;
  let usuarioavalidar = usuarios.findIndex(usuario => usuario.email == emaila && usuario.password1 == passworda);
  let superusuario = "admin";
  console.log(usuarioavalidar);

  if (emaila != "" && passworda != "") {
    if (superusuario == emaila) {
      //validacion de adminsitrador
      window.location = "admin.html";
    } else if (usuarioavalidar != "-1") {
      //window.location="index.html";
      //alert("Redireccionado");
      myModal.hide()
      mostrarStorage();

    } else {
      alert("Primero debes validar tu email");

    }
  }else{
    alert('Campos requeridos');
  }

}