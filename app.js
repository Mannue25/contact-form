
// Validar un contact form desde el DOM

// Variables
// desabilitar el botón de enviar.
const enviar = document.getElementById('submit_btn');
const enviarEmail = document.getElementById('seed-form')
const formulario = document.getElementById('formulario')
const resetBtn = document.getElementById('submit_resetbtn')
// variables para campos.
const nombre = document.querySelector('#name');
const correo = document.querySelector('#email')
const mensaje = document.querySelector('#mensaje');



// Expresión regular.

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// Event Listener.
eventListeners();
function eventListeners(){ 
// cuando la app arranque.
  document.addEventListener('DOMContentLoaded', iniciarApp);

  // Campos del form.

  nombre.addEventListener('blur', validarForm)
  correo.addEventListener('blur', validarForm)
  mensaje.addEventListener('blur', validarForm)

  // reiniicar el formulario.
  resetBtn.addEventListener('click', resetearFomulario);

  formulario.addEventListener('submit', enviarTrueEmail)

}
// Funciones

// Desabilita el botón enviar.
function iniciarApp(){
  enviar.disabled = true;
}

// Valida el formulario.

function validarForm(e) {


if(e.target.value.length > 0) {
  // Elimina los errores
  const error = document.querySelector('p.error');
 if(error){
  error.remove();
 }
 // console.log('Hay Algo')
 e.target.classList.remove('border', 'border-danger') 
 e.target.classList.add('border', 'border-success')
} else {
  e.target.classList.remove('border', 'border-success')
  e.target.classList.add('border', 'border-danger')
  // llamar función Mostrar Error.
mostrarError('All fields are required');

}
if(e.target.type === 'email'){

  if(er.test(e.target.value)){ 
    const error = document.querySelector('p.error');
    if(error){
     error.remove();
    }
    // console.log('Hay Algo')
    e.target.classList.remove('border', 'border-danger') 
    e.target.classList.add('border', 'border-success')
 //mostrarError('Incorrect Email');
  } else{
    e.target.classList.remove('border', 'border-success')
    e.target.classList.add('border', 'border-danger')
    // llamar función Mostrar Error.
  mostrarError('Incorrect Email');
  }
}

if(er.test(correo.value) && nombre.value !== '' && mensaje.value !== ''){
  enviar.disabled = false;
} 
}

function mostrarError(mensaje){
 const mensajeError = document.createElement('p');
 mensajeError.textContent = mensaje;
 mensajeError.classList.add('bg-danger', 'text-white', 'text-center', 'h-50', 'p-2', 'ml-auto', 'error')
const errores = document.querySelectorAll('.error')
if(errores.length === 0) {
  enviarEmail.appendChild(mensajeError)
}
}

function enviarTrueEmail(e) {
  e.preventDefault();
  
  //Mostrar Spinner

  const spinner = document.querySelector('#spinner')
  spinner.style.display = 'flex'

  // Después de 3 segundos.
  setTimeout(()=> {
    spinner.style.display = 'none'

    // Mensaje que se envío correctamente
    const parrafo = document.createElement('p');
    parrafo.textContent = 'The message was sent successfully';
    parrafo.classList.add('bg-success', 'text-white', 'text-center', 'h-50', 'p-2', 'ml-auto')
    //inserta el parrafo antes del spinner
    formulario.appendChild(parrafo)

    setTimeout(() => {
      parrafo.remove();

      resetearFomulario()
    }, 5000)

  }, 3000)
  }

  function resetearFomulario(){
   
    formulario.reset();
    iniciarApp();
  }