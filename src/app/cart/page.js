"use client";

import { useSelector, useDispatch } from "react-redux";
import { MdDelete } from "react-icons/md";

export default function CartSummaryList() {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="container-fluid mt-4">
      <h2 className="listsize mb-3">Cart Summary</h2>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead className="table-light">
              <tr>
                <th>Product</th>
                <th className="text-center">Qty</th>
                <th className="text-end">Price</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td className="text-center">{item.qty}</td>
                  <td className="text-end">${(item.price * item.qty).toFixed(2)}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-danger btn-sm d-none d-md-inline-block"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                    <button
                      className="btn btn-danger btn-sm d-inline-block d-md-none"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="d-flex justify-content-end mt-3">
        <h4>Total: ${total.toFixed(2)}</h4>
      </div>
    </div>
  );
}
