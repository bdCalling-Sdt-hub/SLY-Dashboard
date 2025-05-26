import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const demoProducts = [
    {
        id: 1,
        name: 'Samsung phone',
        price: 0.2,
        image: 'https://i.ibb.co/zN6PzYZ/iphone.jpg', // Replace with your own image if needed
    },
    {
        id: 2,
        name: 'Samsung phone',
        price: 0.2,
        image: 'https://i.ibb.co/zN6PzYZ/iphone.jpg',
    },
    {
        id: 3,
        name: 'Samsung phone',
        price: 0.2,
        image: 'https://i.ibb.co/zN6PzYZ/iphone.jpg',
    },
];

const UploadProducts = () => {
    const [products, setProducts] = useState(demoProducts);

    const handleDelete = (id) => {
        setProducts(products.filter(product => product.id !== id));
    };

    const handleEdit = (id) => {
        alert(`Edit product with ID: ${id}`);
    };

    return (
        <div className="p-4  min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="flex items-center gap-2 font-medium text-2xl">
                    <FaArrowLeft /> List off all products <span className="text-gray-500">({products.length})</span>
                </h2>
                <Link to={'/upload-products/add'} className="bg-[#0077b5] text-white px-5 py-2 rounded-full font-medium hover:bg-[#005f94] transition">
                    Add Product
                </Link>
            </div>

            {/* Product List */}
            <div className="space-y-4">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="flex justify-between items-center border border-blue-200 rounded-md p-3 bg-white"
                    >
                        {/* Left */}
                        <div className="flex items-center gap-4">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-16 h-16 rounded object-cover"
                            />
                            <div>
                                <h3 className="text-lg font-semibold">{product.name}</h3>
                                <p className="text-gray-600">${product.price}</p>
                            </div>
                        </div>

                        {/* Right: Delete + Edit */}
                        <div className="flex flex-col gap-5 items-end ">
                            <button
                                onClick={() => handleDelete(product.id)}
                                className="text-black text-lg"
                                title="Delete"
                            >
                                <RiDeleteBin6Line />
                            </button>
                            <Link to={`/upload-products/${product.id}`}
                                className="bg-red-600 text-white px-6 py-2 rounded-full text-base hover:bg-red-700"
                            >
                                Edit
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UploadProducts;
