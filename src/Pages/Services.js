import React from "react";
import axios from "axios";



function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement("script");
		script.src = src;
		script.onload = () => {
			resolve(true);
		};
		script.onerror = () => {
			resolve(false);
		};
		document.body.appendChild(script);
	});
}

async function displayRazorpay() {
	const res = await loadScript(
		"https://checkout.razorpay.com/v1/checkout.js"
	);

	if (!res) {
		alert("Razorpay SDK failed to load. Are you online?");
		return;
	}

	// creating a new order
	const result = await axios.post("http://localhost:5000/orders");

	if (!result) {
		alert("Server error. Are you online?");
		return;
	}

	// Getting the order details back
	const { amount, id: order_id, currency } = result.data;

	const options = {
		key: "rzp_test_Ku2hwcluU4Bk3Y", // Enter the Key ID generated from the Dashboard
		amount: amount.toString(),
		currency: currency,
		name: "Soumya Corp.",
		description: "Test Transaction",
		order_id: order_id,
		handler: async function (response) {
			const data = {
				orderCreationId: order_id,
				razorpayPaymentId: response.razorpay_payment_id,
				razorpayOrderId: response.razorpay_order_id,
				razorpaySignature: response.razorpay_signature,
			};

			const result = await axios.post("http://localhost:5000/success", data);

			alert(result.data.msg);
		},
		prefill: {
			name: "Soumya Dey",
			email: "SoumyaDey@example.com",
			contact: "9999999999",
		},
		notes: {
			address: "Soumya Dey Corporate Office",
		},
		theme: {
			color: "#61dafb",
		},
	};

	const paymentObject = new window.Razorpay(options);
	paymentObject.open();
}





export const Services = () => {
	return (
		<div className="services">
			<p>GeeksforGeeks Services</p>
		</div>
	);
};

export const ServicesOne = () => {
	return (
		<div className="services">
			<p>GeeksforGeeks Service1</p>



			<div>Buy React now!</div>
			<button onClick={displayRazorpay}>
				Pay ₹500
			</button>

		</div>
	);
};

export const ServicesTwo = () => {
	return (
		<div className="services">
			<p>GeeksforGeeks Service2</p>
		</div>
	);
};

export const ServicesThree = () => {
	return (
		<div className="services">
			<p>GeeksforGeeks Service3</p>
		</div>
	);
};
