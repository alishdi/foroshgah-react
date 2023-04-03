import React, { useContext } from "react";
import { BsBag } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import "./Cart.css";
import { useRef } from "react";
import productsContext from "../../Contexts/ProductsContext";

export default function Cart() {
  const contextData = useContext(productsContext);
const ref=useRef()

  const TotalPrice = () => {
    let sum = 0;
    contextData.userCart.forEach(price => {
      sum += price.count * price.price
    })
    return sum
  }
  const productCount = (product) => {
    let newUserCart = contextData.userCart.map((bagProduct) => {
      if (bagProduct.title === product.title) {
        bagProduct.count = ref.current.value;
      }
      return bagProduct;
    });

    contextData.setUserCart(newUserCart);
  }


  return (
    <aside className={`${contextData.isShowCart ? "active" : ""} bag-sidebar`}>


      <h3 className="bag-title">
        <span>
          <BsBag />
          Bag
        </span>
        <span>
          <AiOutlineClose
            className="close-icon"
            onClick={() => contextData.setIsShowCart(false)}
          />
        </span>
      </h3>
      <div className="row bag-wrapper">
        {contextData.userCart.map((product) => (
          <div className="col-12 mt-5" key={product.id}>
            <div className="card py-3 px-3">
              <div className="col-12 text-center">
                <img
                  src="/images/1.jpg"
                  alt="Product Image"
                  className="cart-img-top w-75"
                />
              </div>
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <p className="card-text">{product.title}</p>
                <p className="price">{product.price}$</p>
                <br />
                <a href="#" className="btn btn-danger">
                  Buy
                </a>
                <a
                  href="#"
                  className="btn btn-outline-dark mt-3 text-capitalize"
                >
                  More Information
                </a>
                {/* <p className="number">{product.count}</p> */}
                {/* <input className="number">{product.count}/> */}
                <input type="number" ref={ref} className="numbers" value={product.count} onChange={() => productCount(product)} />
                <button className="btn btn-danger w-100" onClick={() => {
                  let filterd = contextData.userCart.filter(prop => prop.id != product.id)
                  contextData.setUserCart(filterd)
                }}>Remove Product</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {
        contextData.userCart.length ? (
          <div className="alert alert-success mt-5">
            <h3>Total Price : {TotalPrice()}</h3>
          </div>
        ) :
          ('')
      }
      {
        contextData.userCart.length ?
          (
            <button className="btn btn-danger mt-4 w-100" onClick={() => {
              contextData.setUserCart([])
            }}>
              Remove All
            </button>
          ) :
          ('')
      }

    </aside>
  );
}
