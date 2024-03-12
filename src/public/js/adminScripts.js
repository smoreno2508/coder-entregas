/***
 * funciones de productos
 */
function eliminarProducto(id) {

    Swal.fire({
        title: "¿Estás seguro?",
        text: "Una vez eliminado, no podrás recuperar este producto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminarlo!',
        cancelButtonText: 'No, cancelar',
        reverseButtons: true
    })
        .then((result) => {
            if (result.isConfirmed) {
                fetch(`/api/product/${id}`, { method: 'DELETE' })
                    .then(response => response.json())
                    .then(data => {
                        console.log("Producto eliminado:", data);
                        document.getElementById(`producto-${id}`).remove();
                        Swal.fire(
                            'Eliminado!',
                            'El producto ha sido eliminado.',
                            'success'
                        );
                    })
                    .catch(error => console.error('Error:', error));
            }
        });
}

function mostrarFormularioActualizarProducto(idProducto) {
    fetch(`/api/product/${idProducto}`)
        .then(response => response.json())
        .then(producto => {
            Swal.fire({
                title: 'Actualizar Producto',
                html:
                    `
                  <div class="mb-3">
                        <input class="form-control" type="text" name="title" placeholder="Title" id="title" value="${producto.data.title}">
                    </div>
                    <div class="mb-3">
                        <input type="checkbox" name="status" id="active" ${producto.data.status ? 'checked' : ''} > Active
                    </div>
                    <div class="mb-3">
                        <input class="form-control" type="text" name="category" placeholder="Category" id="category" value="${producto.data.category}">
                    </div>
                    <div class="mb-3">
                        <input class="form-control" type="text" name="description" placeholder="Description" id="description" value="${producto.data.description}">
                    </div>
                    <div class="mb-3">
                        <input class="form-control" type="number" name="price" placeholder="Price" id="price" value="${producto.data.price}">
                    </div>
                    <div class="mb-3">
                        <input class="form-control" type="url" name="thumbnail" placeholder="Thumbnail URL" id="thumbnail" value="${producto.data.thumbnail}">
                    </div>
                    <div class="mb-3">
                        <input class="form-control" type="number" name="stock" placeholder="Stock" id="stock" value="${producto.data.stock}">
                    </div>
                </div>
                 `,
                confirmButtonText: 'Actualizar',
                focusConfirm: false,
                preConfirm: () => {
                    const title = document.getElementById('title').value;
                    const status = document.getElementById('active').value;
                    const category = document.getElementById('category').value;
                    const description = document.getElementById('description').value;
                    const price = document.getElementById('price').value;
                    const thumbnail = document.getElementById('thumbnail').value;
                    const stock = document.getElementById('stock').value;

                    const statusFormated = status === 'on' ? true : false;
                    return { title, status: statusFormated, category, description, price, thumbnail, stock };
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    actualizarProducto(idProducto, result.value);
                }
            });
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire('Error', 'Hubo un problema al obtener los datos del producto.', 'error');
        });
}

function actualizarProducto(id, data) {
    fetch(`/api/product/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            Swal.fire('¡Éxito!', 'Producto actualizado correctamente.', 'success');
            const row = document.getElementById(`producto-${id}`);
            const { title, status, category, description, price, thumbnail, stock } = data.data;

            row.querySelector('.title').textContent = title;
            row.querySelector('.status').textContent = status;
            row.querySelector('.category').textContent = category;
            row.querySelector('.description').textContent = description;
            row.querySelector('.price').textContent = price;
            row.querySelector('.thumbnail').textContent = thumbnail;
            row.querySelector('.stock').textContent = stock;
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire('Error', 'Hubo un problema al actualizar el producto.', 'error');
        });
}

/**
 * fin funciones de productos
 */

/**
 * funciones de usuario
 */
function eliminarUsuario(id) {

    Swal.fire({
        title: "¿Estás seguro?",
        text: "Una vez eliminado, no podrás recuperar este usuario!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminarlo!',
        cancelButtonText: 'No, cancelar',
        reverseButtons: true
    })
        .then((result) => {
            if (result.isConfirmed) {
                fetch(`/api/user/${id}`, { method: 'DELETE' })
                    .then(response => response.json())
                    .then(data => {
                        console.log("usuario eliminado:", data);
                        document.getElementById(`usuario-${id}`).remove();
                        Swal.fire(
                            'Eliminado!',
                            'El usuario ha sido eliminado.',
                            'success'
                        );
                    })
                    .catch(error => console.error('Error:', error));
            }
        });
}


function mostrarFormularioActualizarUsuario(idUsuario) {
    fetch(`/api/user/${idUsuario}`)
        .then(response => response.json())
        .then(usuario => {
            Swal.fire({
                title: 'Actualizar Producto',
                html:
                    `
                   <div class="mb-3">
                        <input class="form-control" type="text" name="firstName" placeholder="firstName" id="firstName" value="${usuario.data.firstName}">
                    </div>
                    <div class="mb-3">
                        <input class="form-control" type="text" name="lastName" placeholder="lastName" id="lastName" value="${usuario.data.lastName}">
                    </div>
                    <div class="mb-3">
                        <input class="form-control" type="text" name="email" placeholder="email" id="email" value="${usuario.data.email}">
                    </div>
                    <div class="mb-3">
                        <input class="form-control" type="password" name="password" placeholder="password" id="password" value="${usuario.data.password}">
                    </div>
                    <div class="mb-3">
                        <select class="form-select" aria-label="role" id="role">
                            <option selected value="${usuario.data.role}">${usuario.data.role}</option>
                            <option value="ADMIN">ADMIN</option>
                            <option value="PREMIUM">PREMIUM</option>
                            <option value="CLIENT">CLIENT</option>
                        </select>
                    </div>
                </div>
                 `,
                confirmButtonText: 'Actualizar',
                focusConfirm: false,
                preConfirm: () => {
                    const firstName = document.getElementById('firstName').value;
                    const lastName = document.getElementById('lastName').value;
                    const email = document.getElementById('email').value;
                    const password = document.getElementById('password').value;
                    const role = document.getElementById('role').value;

                    return { email, firstName, lastName, password, role };
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    actualizarUsuario(idUsuario, result.value);
                }
            });
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire('Error', 'Hubo un problema al obtener los datos del producto.', 'error');
        });
}

function actualizarUsuario(id, data) {
    fetch(`/api/user/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(usuario => {
        Swal.fire('¡Éxito!', 'Usuario actualizado correctamente.', 'success');
        const row = document.getElementById(`usuario-${id}`);
        const { _id, firstName, lastName, email, role, isGithub, idCart} = usuario.data;
        
        row.querySelector('.idUser').textContent = _id;
        row.querySelector('.name').textContent = `${firstName} ${lastName}`;
        row.querySelector('.email').textContent = email;
        row.querySelector('.cartId').textContent = idCart || null;
        row.querySelector('.role').textContent = role;
        row.querySelector('.isGitHub').textContent = isGithub;

    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire('Error', 'Hubo un problema al actualizar el usuario.', 'error');
    });
}

/**
 * fin funciones de usuario
 */
