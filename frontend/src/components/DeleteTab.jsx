import React, { useEffect, useState } from "react";

export default function DeleteTab({ setProducts, setTabs }) {
  const [allProducts, setAllProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data?.data);
        if (data?.data?.length > 0) {
          const brandsArray = [];
          const brands = data?.data?.filter((product) => {
            if (!brandsArray.includes(product.brand)) {
              brandsArray.push(product.brand);
            }
          });

          setBrands(brandsArray);
        }
      });
  }, []);

  // delete
  const handleDelete = (id) => {
    // start time in milliseconds
    const time = Date.now();

    fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "success") {
          const newProducts = allProducts.filter((product) => {
            return product._id !== id;
          });
          setAllProducts(newProducts);
          fetch("http://localhost:5000/api/products?limit=1")
            .then((res) => res.json())
            .then((data) => {
              setProducts(data);
              setTabs("products");
              // end time in milliseconds
              const time2 = Date.now() - time;
              console.log(`${time2} milliseconds takes to delete the product`);
            });
        }
      });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <select
          className="p-3 border"
          onChange={(e) => {
            setSort(e.target.value);
          }}
        >
          <option value="" hidden>
            Filter by price
          </option>
          <option value="low">Low to high</option>
          <option value="high">High to low</option>
        </select>

        <select
          className="p-3  border"
          onChange={(e) => {
            setBrand(e.target.value);
          }}
        >
          <option value="" hidden>
            Filter by brand
          </option>
          <option value="">All Brands</option>
          {brands?.map((brand) => (
            <option value={brand}>{brand}</option>
          ))}
        </select>

        <input
          type="text"
          className="border border-gray-400 p-2 rounded float-right"
          placeholder="Search by anything..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="border border-gray-400 p-2">Title</th>
              <th className="border border-gray-400 p-2">Brand</th>
              <th className="border border-gray-400 p-2">Price</th>
              <th className="border border-gray-400 p-2">Image</th>
              <th className="border border-gray-400 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {allProducts
              ?.filter((product) => {
                if (search === "") {
                  return product;
                } else if (
                  product.title.toLowerCase().includes(search.toLowerCase()) ||
                  product.brand.toLowerCase().includes(search.toLowerCase())
                ) {
                  return product;
                }
              })
              .filter((product) => {
                if (brand === "") {
                  return product;
                } else if (product.brand === brand) {
                  return product;
                } else {
                  return null;
                }
              })
              .filter((product) => {
                if (sort === "") {
                  return product;
                } else if (sort === "low") {
                  return allProducts.sort((a, b) => a.price - b.price);
                } else if (sort === "high") {
                  return allProducts.sort((a, b) => b.price - a.price);
                }
              })
              .map((product) => (
                // products
                <tr key={product._id}>
                  <td className="border border-gray-400 p-2">
                    {product.title}
                  </td>

                  <td className="border border-gray-400 p-2">
                    {product.brand}
                  </td>

                  <td className="border border-gray-400 p-2">
                    {product.price}
                  </td>
                  <td className="border border-gray-400 p-2">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-20"
                    />
                  </td>
                  <td className="border border-gray-400 p-2 text-center">
                    <button
                      className="bg-red-500 text-white py-2 px-4 rounded"
                      onClick={() => handleDelete(product?._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
