import { useState, useEffect } from "react";

const ORIGINAL_PRICE = 3000;
const DISCOUNT_PERCENT = 0.10;

export const useReferral = () => {
    const [isReferred, setIsReferred] = useState(false);

    useEffect(() => {
        // Check URL for "ref" parameter
        const params = new URLSearchParams(window.location.search);
        const ref = params.get("ref");

        if (ref) {
            setIsReferred(true);
            // Persist referral status for the session
            sessionStorage.setItem("ortimi_referral", "true");
        } else {
            // Check if already referred in this session
            const storedReferral = sessionStorage.getItem("ortimi_referral");
            if (storedReferral === "true") {
                setIsReferred(true);
            }
        }
    }, []);

    const discountedPrice = Math.round(ORIGINAL_PRICE * (1 - DISCOUNT_PERCENT));

    const getReferralLink = () => {
        const baseUrl = window.location.origin + window.location.pathname.replace(/\/$/, "");
        return `${baseUrl}/?ref=friend`;
    };

    return {
        isReferred,
        originalPrice: ORIGINAL_PRICE,
        discountedPrice,
        getReferralLink,
    };
};
