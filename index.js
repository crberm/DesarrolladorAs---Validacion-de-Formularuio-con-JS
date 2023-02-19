const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = { //expresiones regulares para realizar las validaciones
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos. NO NUMEROS
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	password: /^.{2,8}$/, // 2 a 8 digitos.
}

//valores que representan si un campo es valido o no
//cuando se hagan las validaciones, estos campos pasan a ser "true"
const campos = {
	nombre: false,
	correo: false,
	password: false
}

const validarFormulario = (e) => {
	//identificar el campo 
	switch (e.target.name){
		case "nombre": //se ejecuta si el nombre es "nombre" 
			//expresion a comprobar es la de nombre + acceder al input con e.target + nombre del campo sera nombre
			validarCampo(expresiones.nombre, e.target, "nombre");
		break;
			
		case "correo": //se ejecuta si el nombre es "correo"
			validarCampo(expresiones.correo, e.target, "correo");
		break;

		case "password": //se ejecuta si el nombre es "password"
			validarCampo(expresiones.password, e.target, "password");
			//funcion "validarPassword2" para que al cambiar la password1, aparezca error de no coinciden las passwords
			validarPassword2();
		break;

		case "password2": //se ejecuta si el nombre es "password2"
			validarPassword2();
		break;
	}  
}

//crear funcion "validarCampo" para comprobar que los valores introducidos por usuario sean validos
//para comprobar cada campo, se le pasan a la funcion tres valores: expresion regular, input y el campo
const validarCampo  = (expresion, input, campo) =>{
	if(expresion.test(input.value)){ //acceder al valor que tenemos en el input y comprobarlo con la expresion
		//quitar la clase "formulario__grupo-incorrecto" cuando se rectifiquen los valores del campo
		document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-incorrecto");
		document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-incorrecto-imagen-error");
		
		//añadir la clase "formulario__grupo-correcto" 
		document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-correcto");
		document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-correcto-imagen-success");

		//quitar el mensaje de error
		document.querySelector(`#grupo__${campo} .formulario__input-error`) .classList.remove("formulario__input-error-activo");


		//acceder al campo y comprobar si la expresion es valida. En ese caso, cambiar el campo a true
		campos[campo] =true;

	} else {
		//marca el input como incorrecto y añade la clase "formulario__grupo-incorrecto" (definido en css)
		document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-incorrecto");
		document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-incorrecto-imagen-error");
	
		//marca el input como correcto y elimina la clase "formulario__grupo-correcto" (definido en css)
		document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-correcto");
		document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-correcto-imagen-success");
		
		//añadir el mensaje de error
		document.querySelector(`#grupo__${campo} .formulario__input-error`) .classList.add("formulario__input-error-activo");

		//si la validacion no es correcta, cambiar el campo a false
		campos[campo] = false;
	}
}

//crear funcion "validarPassword2" para comprobar si las dos contraseñas son iguales
const validarPassword2 = () => {
	//primero accedemos a los dos elementos de "clave"
	const inputPassword1 = document.getElementById("password");
	const inputPassword2 = document.getElementById("password2");

	//despues creamos condicional para comprobar si son iguales los valores
	if(inputPassword1.value !== inputPassword2.value){
		document.getElementById("grupo__password2").classList.add("formulario__grupo-incorrecto");
		document.getElementById("grupo__password2").classList.add("formulario__grupo-incorrecto-imagen-error");
	
		document.getElementById("grupo__password2").classList.remove("formulario__grupo-correcto");
		document.getElementById("grupo__password2").classList.remove("formulario__grupo-correcto-imagen-success");
		
		document.querySelector("#grupo__password2 .formulario__input-error") .classList.add("formulario__input-error-activo");
	
		//acceder al campo password y comprobar que la expresion sea valida
		campos['password'] = false;

	} else {
		document.getElementById("grupo__password2").classList.remove("formulario__grupo-incorrecto");
		document.getElementById("grupo__password2").classList.remove("formulario__grupo-incorrecto-imagen-error");
	
		document.getElementById("grupo__password2").classList.add("formulario__grupo-correcto");
		document.getElementById("grupo__password2").classList.add("formulario__grupo-correcto-imagen-success");
		
		document.querySelector("#grupo__password2 .formulario__input-error") .classList.remove("formulario__input-error-activo");

		//si la validacion es correcta, cambiar el campo a true
		campos["password"] = true;
	}
}




//funcion se ejecuta en cada input de la pagina
inputs.forEach((input) => {
	input.addEventListener("keyup", validarFormulario); //cuando usuario presiona una tecla, se ejecuta la funcion validarFormulario 
	input.addEventListener("blur", validarFormulario); //si se hace clic fuera el campo, también se hace la validacion
})



//cuando el usuario presione enviar, ejecutar la funcion para que se validen los campos y se reinicien (vacios)
formulario.addEventListener("submit", (e)=>{
	e.preventDefault(); //no pasa nada al pulsar "enviar" (no cambie la url)

	if(campos.nombre && campos.correo && campos.password) {
		//al pulsar en enviar, si todos los campos son correctos se reestablece el formulario 
		formulario.reset();
		//si todo es correcto, mandar un mensaje
		alert("La inscripción se ha realizado correctamente");

		//quitar la imagen y el subrayado verde de correcto
		document.querySelectorAll(".formulario__grupo-correcto").forEach((icono) => {
			icono.classList.remove("formulario__grupo-correcto");
		})
		document.querySelectorAll(".formulario__grupo-correcto-imagen-success").forEach((icono2) => {
			icono2.classList.remove("formulario__grupo-correcto-imagen-success");
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
		}, 5000);
	}
});

