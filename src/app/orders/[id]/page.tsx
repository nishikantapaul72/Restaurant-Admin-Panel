"use client";
import { useOrders } from "@/hooks/useOrders";
import { Order } from "@/types/orders";
import jsPDF from "jspdf";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { use, useEffect, useState } from "react";

export default function OrderDetails({ params }: { params: Promise<{ id: string }> }) {
    const { fetchOrderById } = useOrders();
    const [order, setOrder] = useState<Order | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // Unwrap params using React.use()
    const { id } = use(params);
    useEffect(() => {
        const loadOrder = async () => {
            try {
                const fetchedOrder = await fetchOrderById(Number(id)); // Convert string to number
                setOrder(fetchedOrder);
            } catch (err) {
                setError("Failed to load order details");
            } finally {
                setLoading(false);
            }
        };
        loadOrder();
    }, [id, fetchOrderById]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
        });
    };


    const generatePDF = (order: Order) => {
        const doc = new jsPDF();
        const lineHeight = 10;
        let yPos = 20;

        doc.setFontSize(20);
        doc.text(`Order #${order.id} Details`, 20, yPos);
        yPos += lineHeight * 2;

        doc.setFontSize(14);
        doc.text("Customer Information:", 20, yPos);
        yPos += lineHeight;
        doc.setFontSize(12);
        doc.text(`Name: ${order.customer.name}`, 20, yPos);
        yPos += lineHeight;
        doc.text(`Email: ${order.customer.email}`, 20, yPos);
        yPos += lineHeight * 1.5;

        doc.setFontSize(14);
        doc.text("Order Items:", 20, yPos);
        yPos += lineHeight;
        doc.setFontSize(12);

        order.items.forEach((item) => {
            doc.text(
                `${item.name} - $${item.price.toFixed(2)} x ${item.quantity} = $${(
                    item.price * item.quantity
                ).toFixed(2)}`,
                20,
                yPos
            );
            yPos += lineHeight;
        });
        yPos += lineHeight * 0.5;

        doc.text(`Total: $${order.total.toFixed(2)}`, 20, yPos);
        yPos += lineHeight;
        doc.text(`Status: ${order.status}`, 20, yPos);
        yPos += lineHeight;
        doc.text(`Created At: ${formatDate(order.createdAt)}`, 20, yPos);

        doc.save(`order-${order.id}.pdf`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;
    if (!order) return <div>Order not found</div>;

    return (
        <div className="space-y-6 p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Order #{order.id} Details</h1>
                <Button
                    icon="pi pi-arrow-left"
                    label="Back"
                    onClick={() => router.push("/orders")}
                />
            </div>
            <div className="flex justify-end mb-4">
                <Button
                    icon="pi pi-download"
                    className="p-button-secondary"
                    onClick={() => generatePDF(order)}
                    tooltip="Download PDF"
                />
            </div>
            <div className="space-y-4">
                <div>
                    <h3 className="font-bold">Customer Info</h3>
                    <p>Name: {order.customer.name}</p>
                    <p>Email: {order.customer.email}</p>
                </div>
                <div>
                    <h3 className="font-bold">Order Items</h3>
                    <ul className="list-disc pl-5">
                        {order.items.map((item, index) => (
                            <li key={index}>
                                {item.name} - ${item.price.toFixed(2)} x {item.quantity} = $
                                {(item.price * item.quantity).toFixed(2)}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold">Total</h3>
                    <p>${order.total.toFixed(2)}</p>
                </div>
                <div>
                    <h3 className="font-bold">Status</h3>
                    <p>{order.status}</p>
                </div>
                <div>
                    <h3 className="font-bold">Created At</h3>
                    <p>{formatDate(order.createdAt)}</p>
                </div>
            </div>
        </div>
    )
}