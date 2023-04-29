import React, { useEffect, useState } from "react";

export default function SeachTab() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data?.data);
        // all branding in the products
        if (data?.data?.length > 0) {
          const brandsArray = [];
          const brands = data?.data?.filter((product) => {
            if (!brandsArray.includes(product.brand)) {
              brandsArray.push(product.brand);
            }
          });

          setBrands(brandsArray);
        }
        setLoading(false);
      });
  }, []);
  return (
    <div>
      {/* make a table with search */}
      <div className="flex justify-between items-center mb-4">
        <select
          className="p-3"
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
          className="p-3 "
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
          className="border border-gray-400 p-2 rounded float-right "
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="border border-gray-400 p-2">Title</th>
              <th className="border border-gray-400 p-2">Description</th>
              <th className="border border-gray-400 p-2">Brand</th>
              <th className="border border-gray-400 p-2">Price</th>
              <th className="border border-gray-400 p-2">Image</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center">
                  Loading...
                </td>
              </tr>
            ) : allProducts?.filter((product) => {
                if (search === "") {
                  return product;
                } else if (
                  product.title.toLowerCase().includes(search.toLowerCase()) ||
                  product.description
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  product.brand.toLowerCase().includes(search.toLowerCase())
                ) {
                  return product;
                }
              }).length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  No products found
                </td>
              </tr>
            ) : (
              // all products after filtering
              allProducts
                ?.filter((product) => {
                  if (search === "") {
                    return product;
                  } else if (
                    product.title
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    product.description
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
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
                  // product
                  <tr key={product._id}>
                    <td className="border border-gray-400 p-2">
                      {product.title}
                    </td>
                    <td className="border border-gray-400 p-2">
                      {product.description}
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
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
