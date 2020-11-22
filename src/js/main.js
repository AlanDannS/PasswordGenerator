(function(){

    // Variables y Objetos

    let app = document.getElementById('app');
    let inputCaracteres = document.getElementById('numero-caracteres');
    let inputContraseña = document.getElementById('input-password');
    let nomBtn = ['btn-simbolos', 'btn-numeros', 'btn-mayusculas'];
    
    
    let configuracion = {
    caracteres: parseInt(inputCaracteres.value),
    simbolos: true,
    numeros: true,
    mayusculas: true,
    minusculas: true
    };

    let caracteres = {
        simbolos: '! # $ % & ( ) * + , - . / : ; < = > ? @ [ ] ^ _` { | } ~',
        numeros: '0 1 2 3 4 5 6 7 8 9',
        mayusculas: 'A B C D E F G H I J K L M N Ñ O P Q R S T U V W X Y Z',
        minusculas: 'a b c d e f g h i j k l m n ñ o p q r s t u v w x y z'
    };

    // Eventos

    // Evento para evitar que se recarge la pagina
    app.addEventListener('submit', (e)=>{
        e.preventDefault();
    });

    // Sumamos 1 a el numero de caracteres
    app.elements.namedItem('btn-mas-uno').addEventListener('click',()=>{
        configuracion.caracteres++;
        inputCaracteres.value = configuracion.caracteres;
    });

    // Restamos 1 al numero de caracteres
    app.elements.namedItem('btn-menos-uno').addEventListener('click',()=>{
        if (configuracion.caracteres > 1){
            configuracion.caracteres--;
            inputCaracteres.value = configuracion.caracteres;
        } 
    });
    
    // Funciones
    //Copiar
    inputContraseña.addEventListener('click',()=>{
        copiarPasword();
    });
    // Boton simbolos
    boton('btn-simbolos').addEventListener('click', ()=>{
        btnToggle(boton('btn-simbolos'));
        configuracion.simbolos = !configuracion.simbolos;
    })
    
    // Boton numero
    boton('btn-numeros').addEventListener('click', ()=>{
        btnToggle(boton('btn-numeros'));
        configuracion.numeros = !configuracion.numeros;
    });

    // Boton mayusculas
    boton('btn-mayusculas').addEventListener('click',()=>{
        btnToggle(boton('btn-mayusculas'));
        configuracion.mayusculas = !configuracion.mayusculas;
    });

    boton('btn-generar').addEventListener('click', ()=>{
        generarPassword();
    });

    function boton(nombreBoton){
        return app.elements.namedItem(nombreBoton);
    }

    function btnToggle(elemento){
        elemento.classList.toggle('false');
        elemento.childNodes[0].classList.toggle('fa-check');
        elemento.childNodes[0].classList.toggle('fa-times');
    };

    function generarPassword(){
        let caracteresFinales = '';
        let password = '';

        for(propiedad in configuracion){
            if(configuracion[propiedad] == true){
                caracteresFinales += caracteres[propiedad] + ' ';
                // console.log(caracteresFinales)
            }
        }
        //console.log(caracteresFinales)
        // trim permite eliminar espacios al principio y al final
        caracteresFinales = caracteresFinales.trim();
        // Divide la cadena en un arreglo
        caracteresFinales = caracteresFinales.split(' ');

        // console.log(caracteresFinales)
        for (let i = 0 ; i < configuracion.caracteres ; i++){
            password += caracteresFinales[Math.floor(Math.random() * caracteresFinales.length)]
            // caracteresFinales[Math.random]
        }
        
        inputContraseña.value = password;
    }

    function copiarPasword(){
        inputContraseña.select();
        document.execCommand('copy')
        document.getElementById('alerta-copiado').classList.add('active')

        setTimeout(()=>{
            document.getElementById('alerta-copiado').classList.remove('active')
        }, 2000)
    }

    generarPassword();

}())