import React, {useState} from "react";

import CardItem from "../../items/CardItem";
import {Input} from "antd";
const ListProduct = ({ listProduct, category }) => {
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);

  const renderProducts = () => {
    if (from === 0 && to === 0) {
      return listProduct
    }

    return listProduct.filter((item) => (Number(item.price)- ((Number(item.price) * (item.discount / 100)))) > from
        && (Number(item.price)- ((Number(item.price) * (item.discount / 100)))) < to);
  }

  return (
    <div className="container">
      <div className="mt-5 product_of_category">
        <div className="row">
          <div className="col">
            <h5>{category?.name || 'Điện thoại'}</h5>
          </div>
          <div className="col">
            Giá từ:
            <Input
                size="small"
                style={{ borderRadius: "10px", width: "100px" }}
                value={from}
                onChange={(e) => setFrom(e.target.value)}
            />
            đến:
            <Input
                size="small"
                style={{ borderRadius: "10px", width: "100px" }}
                value={to}
                onChange={(e) => setTo(e.target.value)}
            />
          </div>
          <div className="col select_sort"></div>
        </div>
        <hr className="mt-4 mb-4" />
        <div className="">
          {renderProducts().map((item) => (
            <CardItem
              link={`/product-detail/${item.id}`}
              key={item.id}
              id={item.id}
              image={item.image}
              name={item.name}
              price={item.price}
              categoryName={item.categoryName}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListProduct;
