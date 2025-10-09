import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";



export function PaymentForm({ book, user, onSuccess, onCancel }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    try {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: book.price }),
      });
      const { client_secret } = await res.json();

      const card = elements.getElement(CardElement);
      const { error, paymentIntent } = await stripe.confirmCardPayment(client_secret, {
        payment_method: { card },
      });

      if (error) {
        toast.error(error.message);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        const payment = {
          _id: Date.now().toString(),
          bookId: book._id,
          bookTitle: book.title,
          userEmail: user.email,
          amount: book.price,
          paidAt: new Date().toISOString(),
        };
        const existing = JSON.parse(localStorage.getItem("payments")) || [];
        existing.push(payment);
        localStorage.setItem("payments", JSON.stringify(existing));

        toast.success("Payment successful!");
        onSuccess();
      }
    } catch (err) {
      toast.error("Payment failed. Try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex bg-white/20 pb-5 flex-col gap-4">
      <CardElement className="p-3 border text-base-content rounded-md mb-4" />
      <div className="flex justify-center gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2  bg-gray-800 text-white rounded-lg "
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
        >
          Pay Now
        </button>
      </div>
    </form>
  );
}