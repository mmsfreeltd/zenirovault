/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { ClientType, TicketWithReplies, TransactionType } from '@/types';
import axios from 'axios';
import { createContext, useContext, useState, useEffect } from 'react';

// Define context type
export type UserContextType = {
  client: ClientType | null;
  tickets: TicketWithReplies[];
  transactions: TransactionType[];
  loading: boolean;
  error: string | null;
  updateClient: (data: Partial<ClientType>, runDB?: boolean) => void;
  sendEmail: (subject: string, message: string) => Promise<void>;
  replyToTicket: (ticketId: number, message: string) => Promise<void>;
};

// Create context with default values
const UserContext = createContext<UserContextType>({
  client: null,
  tickets: [],
  transactions: [],
  loading: true,
  error: null,
  updateClient: () => {},
  sendEmail: async () => {},
  replyToTicket: async () => {},
});

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);

// Provider component
export const AuthUserProvider = ({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId: string;
}) => {
  const [client, setClient] = useState<ClientType | null>(null);
  const [tickets, setTickets] = useState<TicketWithReplies[]>([]);
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch user data
  useEffect(() => {
    if (!userId) return;

    const controller = new AbortController();
    const { signal } = controller;

    async function fetchClient() {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(`/api/user/profile/${userId}`, { signal });
        if (res.status !== 200) {
          throw new Error(
            `Failed to fetch your account: ${res.status} ${res.statusText}`
          );
        }
        const data: ClientType = await res.data;
        setClient(data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchClient();
    return () => {
      controller.abort();
    };
  }, [userId]);

  // Function to update client data
  const updateClient = async (
    data: Partial<ClientType>,
    runDB: boolean = true
  ) => {
    setClient((prev: any) => {
      if (!prev) return null;
      return { ...prev, ...data };
    });
    // In a real app, make an API call to update data
    if (runDB) {
      try {
        const res = await axios.post(`/api/user/profile/${userId}`, data);
      } catch {}
    }
  };

  // Function to send email to the client
  const sendEmail = async (subject: string, message: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    // In a real app, make an API call to send email
    // Example: await fetch('/api/email', { method: 'POST', body: JSON.stringify({ userId, subject, message }) })
    // console.log("Email sent:", { userId, subject, message });
  };

  // Function to reply to a ticket
  const replyToTicket = async (ticketId: number, message: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Update local state with the new reply
    setTickets((prevTickets) =>
      prevTickets.map((ticket) => {
        if (ticket.id === ticketId) {
          return {
            ...ticket,
            replies: [
              ...ticket.replies,
              {
                id:
                  Math.max(...ticket.replies.map((r: { id: any }) => r.id), 0) +
                  1,
                message,
                date: new Date(),
                isAdmin: true,
                ticket_id: ticketId,
              },
            ],
          };
        }
        return ticket;
      })
    );
  };
  const value = {
    client,
    tickets,
    transactions,
    loading,
    error,
    updateClient,
    sendEmail,
    replyToTicket,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
