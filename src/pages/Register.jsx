import { ArrowBack } from "@material-ui/icons";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { userRegistration } from "../redux/apiCalls";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
            rgba(255, 255, 255, 0.5),
            rgba(255, 255, 255, 0.5)
        ),
        url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
            center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    max-width: 360px;
    padding: 20px;
    background-color: white;
    ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
    margin-bottom: 8px;
`;

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`;

const Input = styled.input`
    width: 80%;
    // margin: 0px 10px 20px 0px;
    padding: 10px;
    ${mobile({ width: "90%" })}
`;

const Agreement = styled.span`
    font-size: 12px;
    margin: 20px 0px;
`;

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
`;

const HomeButton = styled.a`
    opacity: 0.5;
    display: flex;
    align-items: center;
    font-size: 1rem;
    margin-bottom: 8px;
`;

const ErrorContainer = styled.div`
    margin-top: 8px;
    width: 50%;
`;

const ErrorMessage = styled.span`
    color: red;
    font-size: 16px;
    margin-top: 4px;
`;

const InputContainer = styled.div`
    margin-top: 8px;
    margin-bottom: 8px;
    width: 100%;
    ${mobile({ width: "100%" })}
`;

const InputTitle = styled.h5`
    font-weight: 400;
    padding-bottom: 8px;
`;

const Register = () => {
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    console.log(watch("example")); // watch input value by passing the name of it

    const onSubmit = async (data) => {
        const registerUser = await JSON.stringify(data);
        console.log("registerUser", registerUser);
        await userRegistration(dispatch, registerUser);
    };

    return (
        <Container>
            <Wrapper>
                <Link to="/">
                    <HomeButton>
                        <ArrowBack /> Home
                    </HomeButton>
                </Link>
                <Title>CREATE AN ACCOUNT</Title>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputContainer>
                        <InputTitle>User Name</InputTitle>
                        <Input
                            placeholder="username"
                            name="username"
                            {...register("username", {
                                required: "User Name Required",
                                minLength: {
                                    value: 6,
                                    message: "Must be 6 characters long",
                                },
                            })}
                        />
                        {errors.username && (
                            <ErrorContainer>
                                <ErrorMessage>
                                    {errors.username.message}
                                </ErrorMessage>
                            </ErrorContainer>
                        )}
                    </InputContainer>
                    <InputContainer>
                        <InputTitle>Email</InputTitle>
                        <Input
                            type="email"
                            placeholder="email"
                            name="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: "Email is invalid",
                                },
                            })}
                            // onChange={handleInputChange}
                        />
                        {errors.email && (
                            <ErrorContainer>
                                <ErrorMessage>
                                    {errors.email.message}
                                </ErrorMessage>
                            </ErrorContainer>
                        )}
                    </InputContainer>
                    <InputContainer>
                        <InputTitle>Password</InputTitle>

                        <Input
                            type="password"
                            placeholder="password"
                            name="password"
                            {...register("password", {
                                required: "You must specify a password",
                                minLength: {
                                    value: 8,
                                    message:
                                        "Password must have at least 8 characters",
                                },
                                pattern: {
                                    value: "(?=.*d)(?=.*[A-Z])(?=.*W)",
                                    message:
                                        "Password must have 1 uppercase, 1 lowercase & 1 number",
                                },
                            })}
                            //     minLength={4}
                            //     pattern="((?=.*\d)(?=.*[A-Z])(?=.*\W).{8,8})"
                            //     title="* Must be : 8 characters long,
                            // 1 uppercase & 1 lowercase character, and
                            // 1 number "
                            //     onChange={handleInputChange}
                        />
                        {errors.password && (
                            <ErrorContainer>
                                <ErrorMessage>
                                    {errors.password.message}
                                </ErrorMessage>
                            </ErrorContainer>
                        )}
                    </InputContainer>
                    <Agreement>
                        By creating an account, I consent to the processing of
                        my personal data in accordance with the
                        <b>PRIVACY POLICY</b>
                    </Agreement>
                    <Button type="submit">CREATE</Button>
                </Form>
            </Wrapper>
        </Container>
    );
};

export default Register;
