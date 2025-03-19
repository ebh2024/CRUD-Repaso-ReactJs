import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
    // Estado para almacenar los productos
    const [products, setProducts] = useState(() => {
        // Obtener productos guardados en localStorage
        const saved = localStorage.getItem("products");
        return saved
            ? JSON.parse(saved)
            : [
                { id: 1, nombre: "Monitor", precio: 250, stock: 10 },
                { id: 2, nombre: "Teclado", precio: 50, stock: 25 },
                { id: 3, nombre: "Mouse", precio: 30, stock: 40 },
            ];
    });

    // Estado para almacenar el nuevo producto o el producto en edición
    const [newProduct, setNewProduct] = useState({
        id: null,
        nombre: "",
        precio: "",
        stock: "",
    });

    // Estado para controlar si se está editando un producto
    const [isEditing, setIsEditing] = useState(false);
    // Estado para almacenar mensajes de error
    const [error, setError] = useState("");

    // Efecto para guardar los productos en localStorage cuando cambian
    useEffect(() => {
        localStorage.setItem("products", JSON.stringify(products));
    }, [products]);

    // Manejar cambios en los inputs del formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    // Validar los inputs del formulario
    const validateInputs = () => {
        if (!newProduct.nombre.trim()) {
            setError("El nombre es obligatorio.");
            return false;
        }
        if (isNaN(newProduct.precio) || newProduct.precio <= 0) {
            setError("El precio debe ser un número positivo.");
            return false;
        }
        if (isNaN(newProduct.stock) || newProduct.stock < 0) {
            setError("El stock debe ser un número mayor o igual a 0.");
            return false;
        }
        setError("");
        return true;
    };

    // Agregar un nuevo producto
    const addProduct = () => {
        if (validateInputs()) {
            setProducts([
                ...products,
                {
                    ...newProduct,
                    id: Math.max(0, ...products.map((p) => p.id)) + 1,
                },
            ]);
            setNewProduct({ id: null, nombre: "", precio: "", stock: "" });
        }
    };

    // Editar un producto existente
    const editProduct = (product) => {
        setNewProduct(product);
        setIsEditing(true);
    };

    // Guardar los cambios de un producto editado
    const saveEdit = () => {
        if (validateInputs()) {
            setProducts(
                products.map((p) =>
                    p.id === newProduct.id ? newProduct : p
                )
            );
            setNewProduct({ id: null, nombre: "", precio: "", stock: "" });
            setIsEditing(false);
        }
    };

    // Eliminar un producto
    const deleteProduct = (id) => {
        setProducts(products.filter((p) => p.id !== id));
    };

    // Eliminar todos los productos
    const deleteAllProducts = () => {
        setProducts([]);
    };

    return (
        <div>
            <h1>Inventario de Productos</h1>
            {/* Formulario */}
            <div>
                <input
                    name="nombre"
                    placeholder="Nombre"
                    value={newProduct.nombre}
                    onChange={handleInputChange}
                />
                <input
                    name="precio"
                    type="number"
                    placeholder="Precio"
                    value={newProduct.precio}
                    onChange={handleInputChange}
                />
                <input
                    name="stock"
                    type="number"
                    placeholder="Cantidad"
                    value={newProduct.stock}
                    onChange={handleInputChange}
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
                {isEditing ? (
                    <button onClick={saveEdit}>Guardar Cambios</button>
                ) : (
                    <button onClick={addProduct}>Agregar Producto</button>
                )}
            </div>

            {/* Lista de productos */}
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.nombre} - ${product.precio} - {product.stock} en stock
                        <button onClick={() => editProduct(product)}>Editar</button>
                        <button onClick={() => deleteProduct(product.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
            <button onClick={deleteAllProducts}>Eliminar Todos</button>
        </div>
    );
}

export default App;
