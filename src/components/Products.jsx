import { Container, Grid } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";

// const Container = styled.div`
//     padding: 20px;
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: space-between;
// `;

const Button = styled.button`
    width: 220px;
    padding: 10px;
    font-size: 20px;
    background-color: transparent;
    cursor: pointer;
    margin: 2rem 0.5rem;
`;

const TagHeading = styled.h1`
    font-size: 3rem;
    padding-bottom: 1.25rem;
`;

const HeadingContainer = styled.div`
    margin: 2rem 0.5rem;
`;

const Products = ({ cat, filters, sort, homePage }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(
                    cat
                        ? `https://api-jstore-app.herokuapp.com/products/?category=${cat}`
                        : `https://api-jstore-app.herokuapp.com/products/`
                );
                setProducts(res.data);
            } catch (error) {}
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
            {homePage && (
                <HeadingContainer>
                    <TagHeading>POPULAR PRODUCTS</TagHeading>
                    <hr></hr>
                </HeadingContainer>
            )}
            <Grid container alignItems="center" justifyContent="center">
                {cat ? (
                    <>
                        {filteredProducts.length < 1 ? (
                            <h3>No Products</h3>
                        ) : (
                            filteredProducts.map((item) => (
                                <Grid item>
                                    <Product item={item} key={item.id} />
                                </Grid>
                            ))
                        )}
                    </>
                ) : (
                    products.slice(0, 8).map((item) => (
                        <Grid item>
                            <Product item={item} key={item.id} />
                        </Grid>
                    ))
                )}
            </Grid>
            {homePage && (
                <Grid container alignItems="center" justifyContent="center">
                    <Link to={`/products/`}>
                        <Button>See All</Button>
                    </Link>
                </Grid>
            )}
        </Container>
    );
};

export default Products;
