document.getElementById('resetPassword').addEventListener('submit', function(e) {
    e.preventDefault();

    const password1 = document.getElementById('password1').value;
    const password2 = document.getElementById('password2').value;
    const token = document.getElementById('tokentmp').value;

    
    if (password1 !== password2) {
        Swal.fire({
            title: 'Error!',
            text: 'Las contraseñas no coinciden.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return; 
    }

    const bodyRequest = {
        newPassword: password1,
        token: token
    }

    resetPasswordRequest(bodyRequest);
});

function resetPasswordRequest(body) {
    fetch(`/api/auth/reset-password?token=${body.token}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(handleResponse)
    .catch(handleError);
}

function handleResponse(data) {
    if (data.status === "success") {
        showSuccessAlert('Se ha cambiado la contraseña correctamente.', '/login');
    } else if (data.code === 404) {
        showErrorAlert(data.message || 'Ocurrió un error desconocido.', data.code === 404 ? '/reset' : null);
    } else {
        showErrorAlert(data.message || 'Ocurrió un error desconocido.');
    }
}

function handleError(error) {
    showErrorAlert(error.toString());
}

function showSuccessAlert(message, redirectUrl) {
    Swal.fire({
        title: '¡Éxito!',
        text: message,
        icon: 'success',
        confirmButtonText: 'OK'
    }).then((result) => {
        if (result.isConfirmed && redirectUrl) {
            window.location.replace(redirectUrl);
        }
    });
}

function showErrorAlert(message, redirectUrl) {
    Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
        confirmButtonText: 'OK'
    }).then((result) => {
        if (result.isConfirmed && redirectUrl) {
            console.log(result);
            window.location.replace(redirectUrl);
        }
    });
}
