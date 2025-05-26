

import React, { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const UploadProductsEdit = () => {
    const [onHomePage, setOnHomePage] = useState(false);
    const [productType, setProductType] = useState("regular");
    const [productImage, setProductImage] = useState(null);

    const handleImageChange = (e) => {
        setProductImage(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Product uploaded!");
        // handle form logic here...
    };

    return (
        <div className=" min-h-screen p-6">
            {/* Header */}
            <Link to={"/upload-products"} className="flex items-center gap-2 text-xl font-semibold mb-6">
                <FaAngleLeft /> Edit Product
            </Link>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-[#00649a2c] p-6 rounded-lg border"
            >
                {/* Left Column */}
                <div className="space-y-4">
                    <div>
                        <label className="block font-medium mb-1">Product Title</label>
                        <input className="w-full border rounded px-3 py-2" placeholder="Type product title" />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Product Category</label>
                        <input className="w-full border rounded px-3 py-2" placeholder="Type product category" />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Product Price</label>
                        <input className="w-full border rounded px-3 py-2" placeholder="Type product price" />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Product Order Number</label>
                        <input className="w-full border rounded px-3 py-2" placeholder="Type product order number" />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Product Description</label>
                        <textarea
                            rows={3}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Type product description"
                        ></textarea>
                    </div>
                    {/* Toggle switch */}
                    <div className="flex items-center gap-3">
                        <label className="font-medium">On Home Page</label>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={onHomePage}
                                onChange={() => setOnHomePage(!onHomePage)}
                            />
                            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition-all"></div>
                            <span className="ml-3 text-sm"></span>
                        </label>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                    <div>
                        <label className="block font-medium mb-1">Product Sub-title</label>
                        <input className="w-full border rounded px-3 py-2" placeholder="Type product sub-title" />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Product Max Price</label>
                        <input className="w-full border rounded px-3 py-2" placeholder="Type product max price" />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Required SKU</label>
                        <input className="w-full border rounded px-3 py-2" placeholder="SKU required for" />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Product Type</label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="productType"
                                    value="regular"
                                    checked={productType === "regular"}
                                    onChange={(e) => setProductType(e.target.value)}
                                />
                                Regular
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="productType"
                                    value="offer"
                                    checked={productType === "offer"}
                                    onChange={(e) => setProductType(e.target.value)}
                                />
                                Offer
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="productType"
                                    value="both"
                                    checked={productType === "both"}
                                    onChange={(e) => setProductType(e.target.value)}
                                />
                                Both
                            </label>
                        </div>
                    </div>
                    {/* Upload */}
                    <div>
                        <label className="block font-medium mb-1">Product Image</label>
                        <label className="flex items-center justify-center border-2 border-dashed border-blue-400 py-6 px-4 rounded cursor-pointer hover:bg-blue-50">
                            <input type="file" onChange={handleImageChange} className="hidden" />
                            <span className="text-blue-600 flex items-center gap-2"><IoCloudUploadOutline className="text-2xl" /> Upload a Image</span>
                        </label>
                        {productImage && <p className="text-sm mt-1">{productImage.name}</p>}
                    </div>
                </div>

                {/* Upload Button */}
                <div className="md:col-span-2 flex justify-end">
                    <button
                        type="submit"
                        className="bg-[#0077b5] hover:bg-[#005f94] text-white font-semibold px-8 py-2 rounded"
                    >
                        Upload
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UploadProductsEdit;
