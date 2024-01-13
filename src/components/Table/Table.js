import React from "react";

import "./Table.css";

const Table = (props) => {
  const deleteDish = (deletedOrder) => {
    props.deleteOrder(deletedOrder);
  };

  return (
    <div className="table">
      <h2>Table {props.tableNumber}</h2>
      <ul className="orderList">
        {props.orderDetails.map((order) => {
          return (
            <li key={order.id} className="list">
              Dish: {order.dish}, Price: {order.price}
              <button className="delete-btn" onClick={() => deleteDish(order)}>
                Delete Order
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Table;
