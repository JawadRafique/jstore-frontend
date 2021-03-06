import { Add, Remove } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { publicRequest } from "../RequestMethods";
import { mobile } from "../responsive";

import { addProduct } from "../redux/cartRedux";

const Container = styled.div``;

const Wrapper = styled.div`
    max-width: 1280px;
    padding-left: 24px;
    padding-right: 24px;
    margin: 3rem auto;
    display: flex;
    ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
    flex: 1;
    padding: 2rem;
`;

const Image = styled.img`
    width: 100%;
    height: 420px;
    object-fit: contain;
    ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
    flex: 1;
    padding: 2rem 3rem;
    border: 1px solid;
    ${mobile({ padding: "10px" })};
`;

const Title = styled.h1`
    font-weight: 600;
    font-size: 3rem;
`;

const Desc = styled.p`
    margin: 20px 0px;
    font-size: 1.25rem;
`;

const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`;

const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
    display: flex;
    align-items: center;
`;

const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`;

const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    margin: 0px 5px;
    cursor: pointer;
`;

const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`;

const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`;

const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: #000;
    color: #fff;
    cursor: pointer;
    font-weight: 500;
`;

const Product = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];

    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await publicRequest.get("/products/find/" + id);
                setProduct(res.data);
                setColor(res.data.color[0]);
                setSize(res.data.size[0]);
            } catch (error) {
                console.log("Something went Wrong", "Error: ", error);
            }
        };
        getProduct();
    }, [id]);

    const handleQuantity = (type) => {
        if (type === "dec") {
            quantity > 1 && setQuantity(quantity - 1);
        } else {
            setQuantity(quantity + 1);
        }
    };

    const handleAddToCart = () => {
        dispatch(addProduct({ ...product, quantity, color, size }));
    };

    return (
        <Container>
            <Navbar />
            <Wrapper>
                <ImgContainer>
                    <Image src={product.img} />
                </ImgContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Desc>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Donec venenatis, dolor in finibus malesuada, lectus
                        ipsum porta nunc, at iaculis arcu nisi sed mauris. Nulla
                        fermentum vestibulum ex, eget tristique tortor pretium
                        ut. Curabitur elit justo, consequat id condimentum ac,
                        volutpat ornare.
                    </Desc>
                    <Price>$ {product.price}</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color</FilterTitle>
                            {product.color?.map((c) => {
                                return (
                                    <FilterColor
                                        color={c}
                                        key={c}
                                        selected={0}
                                        onChange={() => setColor(c)}
                                    />
                                );
                            })}
                        </Filter>
                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <FilterSize>
                                {product.size?.map((s) => {
                                    return (
                                        <FilterSizeOption
                                            key={s}
                                            onChange={(e) =>
                                                setSize(e.target.value)
                                            }
                                        >
                                            {s}
                                        </FilterSizeOption>
                                    );
                                })}
                            </FilterSize>
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <Remove onClick={() => handleQuantity("dec")} />
                            <Amount>{quantity}</Amount>
                            <Add onClick={() => handleQuantity("inc")} />
                        </AmountContainer>
                        <Button onClick={handleAddToCart}>ADD TO CART</Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            <Newsletter />
            <Footer />
        </Container>
    );
};

export default Product;
