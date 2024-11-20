import PropTypes from "prop-types";
import Card from "../Card/Card";

export default function CardList({ products }) {
  return (
    <>
      {products?.map((prod, index) => (
        <Card product={prod} index={index} key={prod.id ?? index} />
      ))}
      {products.length <= 0 && <p>No Product Found.</p>}
    </>
  );
}

CardList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};
