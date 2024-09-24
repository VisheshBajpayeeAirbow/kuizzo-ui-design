"use client";
import { useState, useEffect } from "react";
import Script from "next/script";
import Button from "@/components/ui/Atoms/Button";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { IPlanDetails } from "@/features/paymentSlice/paymentSlice";
import { useRouter } from "next/navigation";
import { PATHS } from "@/constants";
import { authRedirection } from "@/utils";
import { useSession } from "next-auth/react";
const Checkout = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("0");
  const [currency, setCurrency] = useState("INR");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const session = useSession();
  const planDetails: IPlanDetails = useSelector(
    (state: RootState) => state.payment.planDetails
  );

  // selected plan details from pricing page
  const { title, subTitle, redirectLink, price, perks } = planDetails;

  // orderId is created to process the payment and for storing payment details in the database
  const createOrderId = async () => {
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount:
            parseFloat(
              planDetails.price === "Free" ? "1" : String(planDetails.price)
            ) * 100,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data.orderId;
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };
  // payment process function that takres care of the payment that will take place

  const processPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const orderId: string = await createOrderId();
      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount:
          parseFloat(
            planDetails.price === "Free" ? "1" : String(planDetails.price)
          ) * 100,
        currency: currency,
        name: "Kuizzo Testing",
        description: "Kuizzo testing payment gateway",
        order_id: orderId,
        handler: async function (response: any) {
          const data = {
            orderCreationId: orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          const result = await fetch("/api/verify-payment", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
          });
          const res = await result.json();
          console.log("PAYMENT RESPONSE: ", res);
          if (res.isOk) {
            toast.success("Payment Successful");
            router.push(authRedirection(session.data?.user.role));
          } else {
            alert(res.message);
            toast.error(res.message);
          }
        },

        // TODO: add these fields from session in future when these details are required to be stored in database
        // prefill: {
        //   name: name,
        //   email: email,
        // },
        theme: {
          color: "#7F56D9", // Main theme color
          backdrop_color: "#171717", // Color of the backdrop
          hide_topbar: false, // Whether to hide the topbar
          hide_billing_address: true, // Whether to hide billing address
          // hide_payment_methods: ["card", "netbanking"], // Payment methods to hide
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", function (response: any) {
        alert(response.error.description);
      });
      paymentObject.open();
    } catch (error) {
      console.log(error);
    }
  };

  // * this effect makes sure that pricing data exists only then it will load the page else it will redirect it to pricing page
  useEffect(() => {
    if (
      title.length === 0 &&
      subTitle.length === 0 &&
      redirectLink.length === 0 &&
      String(price).length === 0 &&
      perks.length === 0
    ) {
      router.push(PATHS.pricing);
    }
  }, []);

  return (
    <>
      <section className="lg:w-[1400px] md:w-[90%] md:mx-auto">
        <form
          className="flex flex-col gap-6 w-full sm:w-80"
          onSubmit={processPayment}
        >
          <h1 className="text-4xl  font-caladea text-center">Order Summary</h1>
          <div className="flex items-center justify-center">
            <div className="flex flex-col space-y-[1.125rem] bg-card-background rounded-[1.125rem] mb-[2rem] p-8 w-1/3 hover:shadow-lg hover:shadow-app-purple hover:scale-105 transition ease-in-out hover:bg-background-app duration-300 border-app-purple border-2 hover:border-1">
              <h1 className="font-caladea text-xl text-app-purple flex justify-between">
                <span>Selected Plan: </span>
                <span className="text-heading">
                  {planDetails.title.split(" ")[0]}
                </span>
              </h1>
              <h1 className="font-caladea text-xl text-app-purple flex justify-between">
                <span>Description: </span>
                <span className="text-heading"> {planDetails.subTitle}</span>
              </h1>
              <h1 className="font-caladea text-xl text-app-purple flex justify-between">
                <span>Price: </span>
                <span className="text-heading"> {planDetails.price}</span>
              </h1>

              <div className="border border-app-purple"></div>

              <h1 className="font-caladea text-xl text-app-purple flex justify-between">
                <span>Total Amount:</span>{" "}
                <span className="text-heading">
                  <span>₹</span>
                  {planDetails.price === "Free" ? "0" : planDetails.price}{" "}
                </span>
              </h1>
              <Button btnColor="purple" type="submit">
                Purchase Plan
              </Button>
            </div>
          </div>
        </form>
      </section>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v2/checkout.js"
      />
    </>
  );
};

export default Checkout;
