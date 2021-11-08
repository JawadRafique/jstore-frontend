import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { userRequest, publicRequest } from "../RequestMethods";

const Success = () => {
    const location = useLocation();
    const stripeData = location.state.stripeData;
    const cart = location.state.cart;
    const currentUser = useSelector((state) => state.user.currentUser);
    const [orderId, setOrderId] = useState(null);

    useEffect(() => {
        const createOrder = async () => {
            try {
                const res = await publicRequest
                    .post("/orders", {
                        userId: !currentUser ? "Unknown" : currentUser._id,
                        products: cart.products,
                        amount: cart.total,
                        address: stripeData.billing_details.address,
                    })
                    .then()
                    .catch((err) => console.log("Error or request", err));
                await publicRequest
                    .post("/email")
                    .then(() => console.log("Email sent"));
                setOrderId(res.data._id);
            } catch {}
        };
        stripeData && createOrder();
    }, [cart, stripeData, currentUser]);

    orderId &&
        setTimeout(function () {
            window.location.replace("/");
        }, 5000);
    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {orderId
                ? `Order has been created successfully. Your order number is ${orderId}`
                : `Successfull. Your order is being prepared...`}
            <Link to="/">
                <button style={{ padding: 10, marginTop: 20 }}>
                    Go to Homepage
                </button>
            </Link>
        </div>
    );
};

export default Success;
