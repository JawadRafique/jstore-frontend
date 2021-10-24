import { Badge, Menu } from "@material-ui/core";
import {
    AccountCircleOutlined,
    ShoppingCartOutlined,
} from "@material-ui/icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/userRedux";

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

const UserName = styled.h3`
    margin-left: 0.5rem;
    ${mobile({ display: "none" })};
`;

const UserProfile = styled.div`
    cursor: pointer;
    display: flex;
    position: relative;
`;

const LogoutButton = styled.h3`
    position: absolute;
    top: 35px;
    background: white;
    color: #000000;
    width: 100%;
    z-index: 3;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid;
`;

const Navbar = () => {
    const quantity = useSelector((state) => state.cart.quantity);
    const user = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    console.log("user", user);

    const handleLogout = () => {
        dispatch(logoutUser());
        setOpen(false);
    };
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <Logo>J STORE</Logo>
                    </Link>
                </Left>
                <Right>
                    {user ? (
                        <UserProfile onClick={() => setOpen(!open)}>
                            <AccountCircleOutlined />
                            <UserName>
                                {user.data.username.toUpperCase()}
                            </UserName>
                            {open && (
                                <LogoutButton onClick={handleLogout}>
                                    Logout
                                </LogoutButton>
                            )}
                        </UserProfile>
                    ) : (
                        <>
                            <MenuItem>REGISTER</MenuItem>
                            <MenuItem>SIGN IN</MenuItem>
                        </>
                    )}
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
