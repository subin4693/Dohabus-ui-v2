import React from "react";

const CheckoutCard = ({ setShowCheckoutCard }) => {
    return (
        <div className="fixed inset-0 flex justify-center items-center">
            <div className="bg-white p-10 shadow-xl rounded-sm z-20">
                <div className="flex justify-center items-center">
                    <div>
                        <img src="" className="w-full h-full object-cover" />
                    </div>
                    <div>Tour: asdfa, Description: description</div>
                </div>
            </div>

            <div
                className="bg-black fixed opacity-70 inset-0"
                onClick={() => setShowCheckoutCard(false)}
            ></div>
        </div>
    );
};

export default CheckoutCard;
