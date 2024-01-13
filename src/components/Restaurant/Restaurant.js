import React, { useState } from "react";

import "./Restaurant.css";
import OrderForm from "../OrderForm/OrderForm";
import Table from "../Table/Table";

const Restaurant = () => {
  const [table1, setTable1] = useState([]);
  const [table2, setTable2] = useState([]);
  const [table3, setTable3] = useState([]);

  const handleOrderData = (orderData) => {
    if (orderData.table === "Table 1") {
      setTable1((prevData) => [...prevData, orderData]);
    } else if (orderData.table === "Table 2") {
      setTable2((prevData) => [...prevData, orderData]);
    } else {
      setTable3((prevData) => [...prevData, orderData]);
    }
  };

  const deleteOrderHandler = (deletedOrder) => {
    if (deletedOrder.table === "Table 1") {
      const updatedOrder = table1.filter(
        (order) => order.id !== deletedOrder.id
      );
      setTable1(updatedOrder);
    } else if (deletedOrder.table === "Table 2") {
      const updatedOrder = table2.filter(
        (order) => order.id !== deletedOrder.id
      );
      setTable2(updatedOrder);
    } else {
      const updatedOrder = table3.filter(
        (order) => order.id !== deletedOrder.id
      );
      setTable3(updatedOrder);
    }
  };

  return (
    <div>
      <OrderForm addOrderData={handleOrderData} />
      <Table
        tableNumber={1}
        orderDetails={table1}
        deleteOrder={deleteOrderHandler}
      />
      <Table
        tableNumber={2}
        orderDetails={table2}
        deleteOrder={deleteOrderHandler}
      />
      <Table
        tableNumber={3}
        orderDetails={table3}
        deleteOrder={deleteOrderHandler}
      />
    </div>
  );
};
export default Restaurant;
