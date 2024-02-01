"use client";
import React, { FormEvent, useState } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSelector } from "react-redux";
import { RootState } from "@/(redux)/store";
import getStripe from "../stripe";

const PaymentSelection = () => {
  const cart = useSelector((state: RootState) => state.cart);

  const makepayment = async (e: FormEvent) => {
    const stripe = await getStripe();

    const checkoutSession = await axios.post(
      "http://localhost:3001/api/v1/paymentcheckout",
      {
        products: cart,
      }
    );
    const result = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result?.error) {
      alert(result.error.message);
    }
  };
  //

  const paymentMethods = [
    { id: "upi", name: "Upi" },
    { id: "creditCard", name: "Credit/Debit/Atm card" },
    { id: "Net", name: "NetBanking" },
    { id: "cod", name: "Cash On Delivery" },
  ];

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>
      <div className="space-y-2">
        <Accordion type="single" collapsible>
          {paymentMethods.map((method) => (
            <AccordionItem value={method.id} key={method.id}>
              <AccordionTrigger>{method.name}</AccordionTrigger>
              <AccordionContent>
                <button
                  onClick={makepayment}
                  className=" bg-blue-500 py-3 rounded-lg w-full"
                >
                  checkout
                </button>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default PaymentSelection;
