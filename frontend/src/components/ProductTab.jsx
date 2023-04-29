// import React, { useEffect } from "react";

// export default function ProductTab({
//   loading,
//   setLoading,
//   products,
//   setProducts,
// }) {
//   // next
//   const handleNext = () => {
//     setLoading(true);
//     fetch(
//       `http://localhost:5000/api/products?page=${
//         Number(products.skip) + 1
//       }&&limit=1`
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         setProducts(data);
//         setLoading(false);
//       });
//   };

//   // back
//   const handleBack = () => {
//     setLoading(true);
//     fetch(
//       `http://localhost:5000/api/products?page=${
//         Number(products.skip) - 1
//       }&&limit=1`
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         setProducts(data);
//         setLoading(false);
//       });
//   };
//   return (
//     <div>
//       <div className="text-center">
//         {/* products */}
//         {products?.data?.map((p, i) => {
//           return (
//             <div key={i} className="bg-gray-100 p-4 rounded">
//               <h2 className="text-xl font-bold my-2">
//                 Product Name: {p.title}
//               </h2>
//               <p className="text-gray-500">Description: {p.description}</p>

//               <p className="text-gray-700 mt-2">Brand: {p.brand}</p>
//               <p className="text-gray-700 mt-2">Price: ${p.price}</p>

//               {!loading ? (
//                 <div className="flex justify-center mt-4 mb-6">
//                   <img src={p?.thumbnail} />
//                 </div>
//               ) : (
//                 <div className="text-center my-4 mt-8">
//                   <h1 className="text-2xl font-bold">Loading...</h1>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* pagination button*/}
//       <div className="mt-4 flex justify-center">
//         <button
//           className="bg-yellow-200 px-4 py-2 rounded disabled:bg-yellow-100"
//           disabled={products.skip === 0 ? true : false}
//           onClick={handleBack}
//         >
//           {"<"} Previous
//         </button>
//         <button
//           className="bg-yellow-200 px-4 py-2 rounded ml-2 disabled:bg-yellow-100"
//           onClick={handleNext}
//           disabled={products.total === products.skip + 1 ? true : false}
//         >
//           Next {">"}
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useEffect } from "react";

export default function ProductTab({
  loading,
  setLoading,
  products,
  setProducts,
}) {
  // next
  const handleNext = () => {
    setLoading(true);
    fetch(
      `http://localhost:5000/api/products?page=${
        Number(products.skip) + 1
      }&&limit=1`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  };

  // back
  const handleBack = () => {
    setLoading(true);
    fetch(
      `http://localhost:5000/api/products?page=${
        Number(products.skip) - 1
      }&&limit=1`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  };

  // first
  const handleFirst = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/products?page=0&&limit=1")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  };

  // last
  const handleLast = () => {
    setLoading(true);
    const lastPage = Math.floor(products.total - 1);
    fetch(`http://localhost:5000/api/products?page=${lastPage}&&limit=1`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="text-center">
        {/* products */}
        {products?.data?.map((p, i) => {
          return (
            <div key={i} className="bg-gray-100 p-4 rounded">
              <h2 className="text-xl font-bold my-2">
                Product Name: {p.title}
              </h2>
              <p className="text-gray-500">Description: {p.description}</p>

              <p className="text-gray-700 mt-2">Brand: {p.brand}</p>
              <p className="text-gray-700 mt-2">Price: ${p.price}</p>

              {!loading ? (
                <div className="flex justify-center mt-4 mb-6">
                  <img src={p?.thumbnail} />
                </div>
              ) : (
                <div className="text-center my-4 mt-8">
                  <h1 className="text-2xl font-bold">Loading...</h1>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* pagination button*/}
      <div className="mt-4 flex justify-center">
        <button
          className="bg-yellow-200 px-4 py-2 rounded disabled:bg-yellow-100"
          disabled={products.skip === 0 ? true : false}
          onClick={handleFirst}
        >
          {"<<"} First
        </button>
        <button
          className="bg-yellow-200 px-4 py-2 rounded ml-2 disabled:bg-yellow-100"
          disabled={products.skip === 0 ? true : false}
          onClick={handleBack}
        >
                  {"<"} Previous
        </button>
        <button
          className="bg-yellow-200 px-4 py-2 rounded ml-2 disabled:bg-yellow-100"
          onClick={handleNext}
          disabled={products.total === products.skip + 1 ? true : false}
        >
          Next {">"}
        </button>
        <button
          className="bg-yellow-200 px-4 py-2 rounded ml-2 disabled:bg-yellow-100"
          onClick={handleLast}
          disabled={products.total === products.skip + 1 ? true : false}
        >
          Last {">>"}
        </button>
      </div>
    </div>
  );
}

