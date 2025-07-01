import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SuccessPage = () => {
    const [params] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const transactionId = params.get("transactionId");
        if (!transactionId) return;

        const confirmPayment = async () => {
        try {
            const res = await axios.post("http://localhost:5000/api/payment/update-status", {
            transactionId,
            status: "completed"
            });

            alert("Payment successful! Your ticket is confirmed.");
            navigate(`/ticket/${res.data.ticket}`);
        } catch (err) {
            console.error("Ticket confirmation error:", err);
            alert("Payment succeeded but could not confirm ticket.");
        }
        };

        confirmPayment();
    }, []);

    return (
        <div className="p-4">
        <h2>Thank you for your purchase!</h2>
        </div>
    );
};

export default SuccessPage;
