import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { URL_CODER } from "../../assets/javascript/urlManager";

function ProductAdmin(props) {
  let [productNav, setProductNav] = useState("view");

  const productNavChanger = (page) => {
    setProductNav((productNav = page));
  };
  return (
    <div className="row p-4">
      <div className="col-12">
        <div className="row py-2">
          <button
            onClick={() => productNavChanger("view")}
            className={`btn btn-outline-primary w-auto ${
              productNav === "view" ? "active" : ""
            }`}
          >
            View All
          </button>
          <button
            onClick={() => productNavChanger("new")}
            className={`btn btn-outline-primary w-auto mx-2 ${
              productNav === "new" ? "active" : ""
            }`}
          >
            Add New Product
          </button>
          <button
            onClick={() => productNavChanger("stats")}
            className={`btn btn-outline-primary w-auto mx-2 ${
              productNav === "stats" ? "active" : ""
            }`}
          >
            View Stats
          </button>
        </div>
        <div className="row">
          {productNav === "new" ? (
            <NewProduct data={{ categories: props.data.categories }} />
          ) : productNav === "stats" ? (
            "stats"
          ) : (
            <ViewProducts data={props.data.products} />
          )}
        </div>
      </div>
    </div>
  );
}

const ViewProducts = (props) => {
  return (
    <>
      {props.data.length === 0
        ? "Nothing new"
        : props.data.map((product) => (
            <Link
              to={`/boutique/produit/${URL_CODER(product.titre)}`}
              className="col-2 p-2 m-2 shadow rounded"
            >
              <img
                className="rounded bordered"
                src={`/assets/images/products/${product.image}`}
                width={"99%"}
                alt={`katogue produit ${product.titre}`}
              />
              <p className="mt-2">{product.titre}</p>
            </Link>
          ))}
    </>
  );
};

const NewProduct = (props) => {
  const sendFormData = (e) => {
    const label_input = document.getElementsByName("label")[0].value;
    const image_input = document.getElementsByName("image")[0].value;

    axios
      .post("http://localhost:9000/api/v1/categories/create", {
        label: label_input,
        image: "default.jpg",
      })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  return (
    <div className="col-12">
      <div className="row d-flex justify-content-center align-items-center">
        <form
          id="form"
          method="POST"
          className="col-6 shadow py-4 px-5 rounded"
        >
          <h5>Create a new Product</h5>
          <div className="row mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Product Title"
              name="label"
              required
            />
          </div>

          <div className="row mt-4">
            <label
              for="cat_img"
              className="w-auto d-flex justify-content-center align-items-center "
            >
              Product Image
            </label>
            <input
              name="image"
              type="file"
              className="form-control col"
              placeholder="Categorie Label"
              required={true}
            />
          </div>

          <div className="row mt-4">
            <select className="form-control">
              <option value={"null"}>Select Categorie</option>
              {props.data.categories.map((categorie) => (
                <option value={categorie["_id"]}>{categorie.label}</option>
              ))}
            </select>
          </div>

          <div className="row mt-4 d-flex justify-content-end align-items-center">
            <input
              type="submit"
              className="form-control btn-primary w-auto px-5"
              value={"Create New Categorie"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default ProductAdmin;
