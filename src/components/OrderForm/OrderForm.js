import React, { useState } from "react";

import "./OrderForm.css";

const OrderForm = (props) => {
  const [id, setId] = useState("");
  const [dish, setDish] = useState("");
  const [price, setPrice] = useState("");
  const [table, setTable] = useState("Table 1");

  const idChangeHnadler = (event) => {
    setId(event.target.value);
  };
  const dishChangeHandler = (event) => {
    setDish(event.target.value);
  };
  const priceChangeHandler = (event) => {
    setPrice(event.target.value);
  };
  const tableChangeHandler = (event) => {
    setTable(event.target.value);
  };

  const addToBillHandler = (event) => {
    event.preventDefault();

    const orderData = {
      dish,
      price,
      table,
    };
    if (localStorage.getItem(id) !== null) {
      alert("Please enter unique Id");
      return;
    }
    localStorage.setItem(id, JSON.stringify(orderData));
    props.addOrderData({ ...orderData, id: id });
    setDish("");
    setPrice("");
    setId("");
    setTable("Table 1");
  };

  return (
    <form className="form">
      <input
        className="inputField"
        type="number"
        placeholder="unique ID"
        value={id}
        onChange={idChangeHnadler}
      />
      <input
        className="inputField"
        type="text"
        placeholder="Choose dish"
        value={dish}
        onChange={dishChangeHandler}
      />
      <input
        className="inputField"
        type="number"
        placeholder="Choose price"
        value={price}
        onChange={priceChangeHandler}
      />
      <label>Choose Table</label>
      <select
        className="inputField"
        onChange={tableChangeHandler}
        value={table}
      >
        <option value="Table 1">Table 1</option>
        <option value="Table 2">Table 2</option>
        <option value="Table 3">Table 3</option>
      </select>
      <button className="btn" onClick={addToBillHandler}>
        Add to bill
      </button>
    </form>
  );
};

export default OrderForm;
