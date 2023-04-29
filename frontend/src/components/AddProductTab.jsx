import React, { useState } from "react";

export default function AddProductTab({ setTabs, setProducts }) {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  // add product to database
  const handleAdd = (e) => {
    const time = new Date();
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const brand = e.target.brand.value;
    const price = e.target.price.value;

    const data = {
      title,
      description,
      brand,
      price,
      thumbnail: image,
    };

    fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        fetch("http://localhost:5000/api/products?limit=1")
          .then((res) => res.json())
          .then((data) => {
            setProducts(data);
            setLoading(false);
          });
        setTabs("products");
        const time2 = new Date() - time;
        console.log(`Time: ${time2}ms taken to add the product`);
      });
  };
  return (
    <div>
      <div className="text-center">
        <h1 className="text-2xl font-bold">Add Product</h1>

        <form className="mt-4 max-w-md mx-auto" onSubmit={handleAdd}>
          <div className="flex flex-col gap-2">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              className="border border-gray-400 p-2 rounded"
              required
            />

            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              className="border border-gray-400 p-2 rounded"
              required
            ></textarea>

            <label htmlFor="brand">Brand</label>
            <input
              type="text"
              name="brand"
              id="brand"
              className="border border-gray-400 p-2 rounded"
              required
            />

            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              className="border border-gray-400 p-2 rounded"
              required
            />

            <label htmlFor="image">Image</label>
            <input
              type="file"
              name="image"
              id="image"
              className="border border-gray-400 p-2 rounded"
              required
              onChange={(e) => {
                setLoading(true);
                // upload image to imgbb
                const file = e.target.files[0];
                const formData = new FormData();
                formData.append("image", file);
                formData.append("key", "e8bd382a9941074ccfa1c75f93a728fd");
                fetch("https://api.imgbb.com/1/upload", {
                  method: "POST",
                  body: formData,
                })
                  .then((res) => res.json())
                  .then((data) => {
                    setImage(data?.data?.url);
                  })
                  .catch((err) => console.log(err))
                  .finally(() => setLoading(false));
              }}
            />

            <button
              className="bg-yellow-200 px-4 py-2 rounded"
              type="submit"
              disabled={loading ? true : false}
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
