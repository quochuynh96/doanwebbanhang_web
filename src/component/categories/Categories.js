import { useParams } from "react-router";

import ListProduct from "./ListProduct/ListProduct";
import NavBar from "./NavBar/NavBar";
import { useEffect, useState } from "react";
import {getAllCategories, getAllProduct} from "../../common/api/getData";

const Categories = () => {
  const [listProduct, setListProduct] = useState([]);
  const [category, setCategory] = useState([]);

  const param = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      const categories = await getAllCategories();
      setCategory(categories.filter((c) => c.slug === param.id)[0]);
      const categoriesData = await getAllProduct();

      const products = categoriesData.filter((p) => p.category === param.id);
      setListProduct(products);
    };
    fetchProducts();
  }, [param]);

  return (
    <>
      <NavBar />
      <ListProduct category={category} listProduct={listProduct} />
    </>
  );
};

export default Categories;
