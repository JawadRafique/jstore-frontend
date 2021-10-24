import { Add, Remove } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userRequest } from "../RequestMethods";
import { useHistory } from "react-router";
import { emptyCart } from "../redux/cartRedux";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import { stripeApiKey } from "../constant.js";

const Key = stripeApiKey; // Stripe Public API key

const Container = styled.div``;

const Wrapper = styled.div`
    padding: 20px;
    ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`;

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`;

const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${(props) => props.type === "filled" && "none"};
    background-color: ${(props) =>
        props.type === "filled" ? "black" : "transparent"};
    color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
    ${mobile({ display: "none" })};
`;
const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0px 10px;
`;

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
    flex: 3;
`;

const Product = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`;

const Image = styled.img`
    width: 200px;
    object-fit: contain;
`;

const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
    ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
    ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
`;

const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
`;

const SummaryTitle = styled.h1`
    font-weight: 200;
`;

const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${(props) => props.type === "total" && "500"};
    font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
    cursor: pointer;
`;

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const [stripeToken, setStripeToken] = useState(null);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();

    const onToken = (token) => {
        setStripeToken(token);
    };

    useEffect(() => {
        const paymentRequest = async () => {
            setPaymentLoading(true);
            try {
                const res = await userRequest.post("/checkout/payment", {
                    tokenId: stripeToken.id,
                    amount: 400,
                });
                console.log("Payment Response", res);
                history.push("/success", { stripeData: res.data, cart });
                dispatch(emptyCart());
            } catch (error) {
                setPaymentLoading(false);
            }
        };
        stripeToken && cart.total > 0 && paymentRequest();
    }, [stripeToken, cart.total, history]);

    return (
        <>
            {paymentLoading ? (
                <CircularProgress />
            ) : (
                <Container>
                    <Navbar />
                    <Wrapper>
                        <Title>YOUR BAG</Title>
                        <Top>
                            <Link to="/products/">
                                <TopButton>CONTINUE SHOPPING</TopButton>
                            </Link>
                            <TopTexts>
                                <TopText>Shopping Bag(2)</TopText>
                                <TopText>Your Wishlist (0)</TopText>
                            </TopTexts>
                            {/* <TopButton type="filled">CHECKOUT NOW</TopButton> */}
                        </Top>
                        <Bottom>
                            <Info>
                                {cart.products.map((item) => {
                                    return (
                                        <>
                                            <Product>
                                                <ProductDetail>
                                                    <Image src={item.img} />
                                                    <Details>
                                                        <ProductName>
                                                            <b>Product:</b>
                                                            {item.title}
                                                        </ProductName>
                                                        <ProductId>
                                                            <b>ID:</b>{" "}
                                                            {item._id}
                                                        </ProductId>
                                                        <ProductColor
                                                            color={item.color}
                                                        />
                                                        <ProductSize>
                                                            <b>Size:</b>{" "}
                                                            {item.size}
                                                        </ProductSize>
                                                    </Details>
                                                </ProductDetail>
                                                <PriceDetail>
                                                    <ProductAmountContainer>
                                                        {/* <Remove /> */}
                                                        <ProductAmount>
                                                            Quantity:{" "}
                                                            {item.quantity}
                                                        </ProductAmount>
                                                        {/* <Add /> */}
                                                    </ProductAmountContainer>
                                                    <ProductPrice>
                                                        Cost: $
                                                        {item.price *
                                                            item.quantity}
                                                    </ProductPrice>
                                                </PriceDetail>
                                            </Product>
                                            <Hr />
                                        </>
                                    );
                                })}
                            </Info>
                            <Summary>
                                <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                                <SummaryItem>
                                    <SummaryItemText>Subtotal</SummaryItemText>
                                    <SummaryItemPrice>
                                        $ {cart.total}
                                    </SummaryItemPrice>
                                </SummaryItem>
                                <SummaryItem>
                                    <SummaryItemText>
                                        Estimated Shipping
                                    </SummaryItemText>
                                    <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                                </SummaryItem>
                                <SummaryItem>
                                    <SummaryItemText>
                                        Shipping Discount
                                    </SummaryItemText>
                                    <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                                </SummaryItem>
                                <SummaryItem type="total">
                                    <SummaryItemText>Total</SummaryItemText>
                                    <SummaryItemPrice>
                                        $ {cart.total}
                                    </SummaryItemPrice>
                                </SummaryItem>
                                <StripeCheckout
                                    name="J Store"
                                    billingAddress
                                    shippingAddress
                                    description={`Your Total is $${cart.total}`}
                                    amount={cart.total * 100}
                                    token={onToken}
                                    stripeKey={Key}
                                    zipCode={false}
                                >
                                    <Button>CHECKOUT NOW</Button>
                                </StripeCheckout>
                            </Summary>
                        </Bottom>
                    </Wrapper>
                    <Footer />
                </Container>
            )}
        </>
    );
};

export default Cart;
