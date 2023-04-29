import React, { useEffect, useState } from "react";

export default function UpdateTab({ setTabs, setProducts }) {
  const [allProducts, setAllProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("");
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState("");
  const [updateDetails, setUpdateDetails] = useState({});
  const [showAll, setShowAll] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
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
      });
  }, []);

  // update button click
  const handleUpdate = (id) => {
    setShowAll(!showAll);
    setShowDetails(!showDetails);
    allProducts?.find((product) => {
      if (product._id === id) {
        setUpdateDetails(product);
      }
    });
  };

  // update product
  const handleUpdateProduct = (e) => {
    //start time
    const time = Date.now();
    e.preventDefault();
    setLoading(true);
    fetch(`http://localhost:5000/api/products/${updateDetails?._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?._id) {
          fetch("http://localhost:5000/api/products?limit=1")
            .then((res) => res.json())
            .then((data) => setProducts(data));
          setTabs("products");
          setLoading(false);
          // end time in milliseconds
          const time2 = Date.now() - time;
          console.log(`${time2} milliseconds takes to update the product`);
          //   setShowAll(true);
          //   setShowDetails(false);
        }
      });
  };

  return (
    <div>
      {showAll && (
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
      )}

      <div>
        {showAll && (
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
              {/* products with filtering */}
              {allProducts
                ?.filter((product) => {
                  if (search === "") {
                    return product;
                  } else if (
                    product.title
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
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                        onClick={() => handleUpdate(product?._id)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
      {
        // Update form
        showDetails && (
          <div className="mt-4">
            <h2 className="text-center text-2xl mb-3">Update the Product</h2>
            <form onSubmit={handleUpdateProduct}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Title"
                  value={updateDetails?.title}
                  onChange={(e) =>
                    setUpdateDetails({
                      ...updateDetails,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="brand"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Brand"
                  value={updateDetails?.brand}
                  onChange={(e) =>
                    setUpdateDetails({
                      ...updateDetails,
                      brand: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Price"
                  value={updateDetails?.price}
                  onChange={(e) =>
                    setUpdateDetails({
                      ...updateDetails,
                      price: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="thumbnail"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Thumbnail
                </label>
                <img
                  // show the image from e.target.files[0]
                  src={updateDetails?.thumbnail}
                  alt={updateDetails?.title || ""}
                  className="w-48 mb-4"
                />
                <input
                  type="file"
                  name="thumbnail"
                  id="thumbnail"
                  hidden
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Thumbnail"
                  onChange={(e) => {
                    setLoading(true);
                    // upload the image to imgbb
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
                        setUpdateDetails({
                          ...updateDetails,
                          thumbnail: data.data.display_url,
                        });
                      })
                      .catch((err) => console.log(err))
                      .finally(() => setLoading(false));
                  }}
                />
                <label htmlFor="thumbnail" className="flex items-center gap-4">
                  <div className="border w-max p-8">
                    <svg
                      fill="#1C2033"
                      width="52"
                      height="52"
                      version="1.1"
                      id="lni_lni-cloud-upload"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 64 64"
                      style={{
                        enableBackground: "new 0 0 64 64",
                      }}
                      xml:space="preserve"
                    >
                      <g>
                        <path
                          d="M34.6,27.1c-0.6-0.6-1.4-0.9-2.2-0.9c0,0,0,0,0,0c-0.8,0-1.6,0.3-2.2,0.9L25.5,32c-0.9,0.9-0.8,2.3,0.1,3.2
		c0.9,0.9,2.3,0.8,3.2-0.1l1.5-1.5v7.7c0,1.2,1,2.3,2.3,2.3c1.2,0,2.3-1,2.3-2.3v-7.7l1.5,1.5c0.4,0.5,1,0.7,1.6,0.7
		c0.6,0,1.1-0.2,1.6-0.6c0.9-0.9,0.9-2.3,0.1-3.2L34.6,27.1z"
                        />
                        <path
                          d="M57.3,23.6c-2.7-2.9-6.4-4.8-10.3-5.5c-2.2-3.4-5.4-5.9-9.1-7.2c-1.7-0.6-3.7-1-5.8-1c-9.4,0-17.2,7.2-17.8,16.3
		C7.2,27.1,1.8,33,1.8,40.1c0,7.7,6.3,13.9,14.1,13.9c0,0,0,0,0,0h27.8c10.2,0,18.6-8.1,18.6-18.1C62.3,31.4,60.5,27,57.3,23.6z
		 M43.7,49.6H16c-5.5,0-9.7-4.2-9.7-9.4c0-5.3,4.3-9.4,9.7-9.4h0.5c1.2,0,2.3-1,2.3-2.3v-1c0-7.2,6-13,13.3-13c1.6,0,3,0.2,4.3,0.7
		c3.1,1,5.7,3.2,7.3,6.1c0.4,0.6,1,1.1,1.7,1.1c3.3,0.3,6.5,1.9,8.7,4.3c2.4,2.6,3.7,5.9,3.7,9.3C57.8,43.5,51.4,49.6,43.7,49.6z"
                        />
                      </g>
                    </svg>
                  </div>
                  <p>upload a new thumbNail</p>
                </label>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  cols="30"
                  rows="10"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Description"
                  value={updateDetails?.description}
                  onChange={(e) => {
                    setUpdateDetails({
                      ...updateDetails,
                      description: e.target.value,
                    });
                  }}
                />
              </div>

              <button className="bg-blue-500 text-white py-2 px-4 rounded">
                Update
              </button>
            </form>
          </div>
        )
      }
    </div>
  );
}
