'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
    const [subscription, setSubscription] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchSubscription = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_DATA_API}/api/subscription/${process.env.NEXT_PUBLIC_SMTP_MAIL}`); // Example API endpoint
                const data = await response.json();
                const user = data[0];
                setSubscription(user);
                // Check if the subscription has expired
                if (user && user.endDate && new Date(user.endDate) < new Date()) {
                    // Redirect to renewal page if subscription is expired
                    router.push('/renewal');
                }
            } catch (error) {
                console.log(error)
            }
        };
        fetchSubscription();
    }, [router]);

    return (
        <SubscriptionContext.Provider value={subscription}>
            {children}
        </SubscriptionContext.Provider>
    );
};

export const useSubscription = () => useContext(SubscriptionContext);
