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
                console.log("Trying Creating order");
                console.log("stripeData", stripeData);
                console.log("cart", cart);
                console.log(
                    "Current User",
                    currentUser ? currentUser._id : "Unknown"
                );
                const res = await publicRequest
                    .post("/orders", {
                        userId: currentUser ? currentUser._id : "Unknown",
                        products: [
                            cart.products.map((item) => ({
                                productId: item._id,
                                quantity: item._quantity,
                            })),
                        ],
                        amount: cart.total,
                        address: stripeData.billing_details.address,
                    })
                    .then((data) => console.log("order res Data", data))
                    .catch((err) => console.log("Error or request", err));
                // .then((data) => console.log("OrderRes Data", data));
                setOrderId(res.data._id);
                // console.log("Order created", orderId);
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
