import { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/apiCalls";
import { Link } from "react-router-dom";
import { ArrowBack } from "@material-ui/icons";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
            rgba(255, 255, 255, 0.5),
            rgba(255, 255, 255, 0.5)
        ),
        url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
            center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 25%;
    padding: 20px;
    background-color: white;
    ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0;
    padding: 10px;
`;

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;
    &:disabled {
        color: green;
        cursor: not-allowed;
    }
`;

const OtherLink = styled.a`
    margin: 5px 0px;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
`;

const Error = styled.span`
    color: red;
`;

const HomeButton = styled.a`
    opacity: 0.5;
    display: flex;
    align-items: center;
    font-size: 1rem;
    margin-bottom: 8px;
`;

const Login = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const { isFetching, error } = useSelector((state) => state.user);

    const handleLogin = (e) => {
        e.preventDefault();
        userLogin(dispatch, { username, password });
    };

    return (
        <Container>
            <Wrapper>
                <Link to="/">
                    <HomeButton>
                        <ArrowBack /> Home
                    </HomeButton>
                </Link>
                <Title>SIGN IN</Title>
                <Form>
                    <Input
                        placeholder="username"
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <Error>Something went wrong ...</Error>}
                    <Button onClick={handleLogin} disabled={isFetching}>
                        LOGIN
                    </Button>
                    <OtherLink>DO NOT YOU REMEMBER THE PASSWORD?</OtherLink>
                    <OtherLink>CREATE A NEW ACCOUNT</OtherLink>
                </Form>
            </Wrapper>
        </Container>
    );
};

export default Login;
