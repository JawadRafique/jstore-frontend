import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";

const Container = styled.div`
    display: flex,
    align-items: center,
    justify-content: space-between,
    height: 80px;
    background: #000;
    color: #ffffff;
    ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
    padding: 1rem 3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;

const Logo = styled.h1`
    cursor: pointer;
    font-weight: bold;
    color: #fff;
    decoration: none;
    ${mobile({ fontSize: "24px" })};
`;
const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
    const quantity = useSelector((state) => state.cart.quantity);
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <Logo>J STORE</Logo>
                    </Link>
                </Left>
                <Right>
                    <MenuItem>REGISTER</MenuItem>
                    <MenuItem>SIGN IN</MenuItem>
                    <Link to="/cart">
                        <MenuItem>
                            <Badge badgeContent={quantity} color="primary">
                                <ShoppingCartOutlined />
                            </Badge>
                        </MenuItem>
                    </Link>
                </Right>
            </Wrapper>
        </Container>
    );
};

export default Navbar;
