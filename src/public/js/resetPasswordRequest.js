document.getElementById('resetPasswordForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;

    fetch(`/api/auth/reset/${email}`)
    .then(response => response.json())
    .then(data => {
        if (data.code === 404) {
            Swal.fire({
                title: 'Error',
                text: 'El usuario no se encuentra registrado.',
                icon: 'error'
            });
        }else{
            Swal.fire({
                title: '¡Correo enviado!',
                text: 'Revisa tu correo electrónico para restablecer tu contraseña.',
                icon: 'success'
            }).then((result) => {
                if(result.isConfirmed) window.location.replace('/');
            });
        }
    })
    .catch(error => {
        Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al procesar tu solicitud.',
            icon: 'error'
        });
    });
    
});
