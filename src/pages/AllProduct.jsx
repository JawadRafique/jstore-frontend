import styled from "styled-components";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useState } from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";

const Wrapper = styled.div``;

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Filter = styled.div`
    margin: 20px;
    ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
    ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
    ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const AllProduct = () => {
    const classes = useStyles();

    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState("newest");

    const handleFilters = (e) => {
        const value = e.target.value;
        setFilters({
            ...filters,
            [e.target.name]: value.toLowerCase(),
        });
    };

    return (
        <Wrapper>
            <Navbar />
            <Container>
                <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                    className={classes.FilterContainer}
                >
                    <Grid item>
                        <Filter>
                            <FilterText>Filter Products:</FilterText>
                            <Select name="color" onChange={handleFilters}>
                                <Option disabled selected>
                                    Color
                                </Option>
                                <Option>White</Option>
                                <Option>Black</Option>
                                <Option>Red</Option>
                                <Option>Blue</Option>
                                <Option>Yellow</Option>
                                <Option>Green</Option>
                            </Select>
                            <Select name="size" onChange={handleFilters}>
                                <Option disabled selected>
                                    Size
                                </Option>
                                <Option>XS</Option>
                                <Option>S</Option>
                                <Option>M</Option>
                                <Option>L</Option>
                                <Option>XL</Option>
                            </Select>
                        </Filter>
                    </Grid>
                    <Grid item>
                        <Filter>
                            <FilterText>Sort Products:</FilterText>
                            <Select onChange={(e) => setSort(e.target.value)}>
                                <Option value="newest">Newest</Option>
                                <Option value="asc">Price (asc)</Option>
                                <Option value="desc">Price (desc)</Option>
                            </Select>
                        </Filter>
                    </Grid>
                </Grid>
            </Container>
            <Products filters={filters} sort={sort} />
            <Newsletter />
            <Footer />
        </Wrapper>
    );
};

const useStyles = makeStyles({
    FilterContainer: {
        border: "1px solid",
        marginBottom: "2rem",
        marginTop: "2rem",
    },
});

export default AllProduct;
