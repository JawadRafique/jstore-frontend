import { Container, Grid } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";

// const Container = styled.div`
//     padding: 20px;
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: space-between;
// `;

const TagHeading = styled.h1`
    font-size: 3rem;
    padding-bottom: 1.25rem;
`;

const HeadingContainer = styled.div`
    margin: 2rem 0.5rem;
`;

const Products = ({ cat, filters, sort }) => {
    console.log("cat", cat, "filters", filters, "sort", sort);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(
                    cat
                        ? `http://localhost:5000/api/v1/products/?category=${cat}`
                        : `http://localhost:5000/api/v1/products/`
                );
                setProducts(res.data);
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        };
        getProducts();
    }, [cat]);

    useEffect(() => {
        cat &&
            setFilteredProducts(
                products.filter((item) =>
                    Object.entries(filters).every(([key, value]) =>
                        item[key].includes(value)
                    )
                )
            );
    }, [products, cat, filters]);
    console.log("filteredProducts", filteredProducts);
    useEffect(() => {
        if (sort === "newest") {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => a.createdAt - b.createdAt)
            );
        } else if (sort === "asc") {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => a.price - b.price)
            );
        } else {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => b.price - a.price)
            );
        }
    }, [sort]);

    return (
        <Container>
            <HeadingContainer>
                <TagHeading>POPULAR PRODUCTS</TagHeading>
                <hr></hr>
            </HeadingContainer>
            <Grid container alignItems="center" justifyContent="center">
                {cat
                    ? filteredProducts.map((item) => (
                          <Grid item>
                              <Product item={item} key={item.id} />
                          </Grid>
                      ))
                    : products.slice(0, 8).map((item) => (
                          <Grid item>
                              <Product item={item} key={item.id} />
                          </Grid>
                      ))}
            </Grid>
        </Container>
    );
};

export default Products;
