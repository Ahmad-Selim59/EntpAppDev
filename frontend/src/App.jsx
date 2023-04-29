import React, { useEffect, useState } from "react";
import AddProductTab from "./components/AddProductTab";
import DeleteTab from "./components/DeleteTab";
import ProductTab from "./components/ProductTab";
import SeachTab from "./components/SeachTab";
import UpdateTab from "./components/UpdateTab";

function App() {
  const [tabs, setTabs] = useState("products");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/api/products?limit=1")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  // imgbb api key
  // e8bd382a9941074ccfa1c75f93a728fd

  return (
    <div className="max-w-4xl mx-auto mt-8 lg:mt-24 grid grid-cols-12 gap-4 p-4 lg:p-0">
      {/* tabs */}
      <div className=" flex flex-col gap-2 col-span-12 lg:col-span-4">
        <button
          className={` border border-b-gray-400 px-4 py-2 rounded hover:bg-yellow-200 active:border-b-gray-600 ${
            tabs === "products" ? "bg-yellow-200" : "bg-yellow-100"
          }`}
          onClick={() => setTabs("products")}
        >
          Products
        </button>
        <button
          className={` border border-b-gray-400 px-4 py-2 rounded hover:bg-yellow-200 active:border-b-gray-600 ${
            tabs === "add" ? "bg-yellow-200" : "bg-yellow-100"
          }`}
          onClick={() => setTabs("add")}
        >
          Add
        </button>
        <button
          className={` border border-b-gray-400 px-4 py-2 rounded hover:bg-yellow-200 active:border-b-gray-600 ${
            tabs === "delete" ? "bg-yellow-200" : "bg-yellow-100"
          }`}
          onClick={() => setTabs("delete")}
        >
          Delete
        </button>
        <button
          className={` border border-b-gray-400 px-4 py-2 rounded hover:bg-yellow-200 active:border-b-gray-600 ${
            tabs === "update" ? "bg-yellow-200" : "bg-yellow-100"
          }`}
          onClick={() => setTabs("update")}
        >
          Update
        </button>
        <button
          className={` border border-b-gray-400 px-4 py-2 rounded hover:bg-yellow-200 active:border-b-gray-600 ${
            tabs === "search" ? "bg-yellow-200" : "bg-yellow-100"
          }`}
          onClick={() => setTabs("search")}
        >
          Search
        </button>
      </div>
      <div className="col-span-12 lg:col-span-8">
        {/* products */}
        {tabs === "products" && (
          <ProductTab
            loading={loading}
            setLoading={setLoading}
            products={products}
            setProducts={setProducts}
          />
        )}
        {/* add */}
        {tabs === "add" && (
          <AddProductTab setProducts={setProducts} setTabs={setTabs} />
        )}
        {/* search */}
        {tabs === "search" && <SeachTab />}
        {/* delete */}
        {tabs === "delete" && (
          <DeleteTab setProducts={setProducts} setTabs={setTabs} />
        )}
        {/* update */}
        {tabs === "update" && (
          <UpdateTab setTabs={setTabs} setProducts={setProducts} />
        )}
      </div>
    </div>
  );
}

export default App;
