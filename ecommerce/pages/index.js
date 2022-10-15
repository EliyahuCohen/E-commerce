import React from "react";
import { HeroBanner, FooterBanner, Product } from "../components/index";
import { client } from "../lib/client";

const index = ({ productsData, bannerData }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {productsData &&
          productsData.map((product) => {
            return <Product key={product._id} product={product} />;
          })}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
};

export const getServerSideProps = async () => {
  //and this function simplly replaces that useEffect that we had in React.js
  const bannerQuery = "*[_type == 'banner']";
  const productsQuery = "*[_type == 'product']"; //this is GROQ querying language and this says that give me everything from documents with a type of product
  const productsData = await client.fetch(productsQuery);
  const bannerData = await client.fetch(bannerQuery);
  return { props: { productsData, bannerData } };
};

export default index;
