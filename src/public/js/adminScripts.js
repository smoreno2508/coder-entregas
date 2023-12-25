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
            console.log(producto.data);
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
    console.log(data);
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
            const { title,  status, category, description, price, thumbnail, stock } = data.data;

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

