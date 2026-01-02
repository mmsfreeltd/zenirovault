"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import {
  TicketCheck,
  Clock,
  AlertCircle,
  CircleCheck,
  CircleDashed,
  CircleAlert,
  Send,
  MessageSquare,
  Loader2,
} from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useUser } from "@/context/AuthUserContext";

type Reply = {
  id: number;
  ticket_id: number;
  message: string;
  isAdmin: boolean;
  date: string;
};
type TicketWithReplies = {
  id: number;
  subject: string;
  message: string;
  user_id: number;
  status: "open" | "closed" | "pending";
  date: string;
  replies: Reply[];
};

export default function TicketsTab({ userId }: { userId: number }) {
  const [tickets, setTickets] = useState<TicketWithReplies[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selected, setSelected] = useState<TicketWithReplies | null>(null);
  const [newSubject, setNewSubject] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const { client } = useUser();
  // fetch tickets
  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get<TicketWithReplies[]>(
        `/api/user/tickets?user_id=${userId}`
      );
      setTickets(res.data);
    } catch {
      setError("Could not load tickets.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    load();
  }, []);

  // create ticket
  const create = async () => {
    if (!newSubject.trim() || !newMessage.trim()) return;
    try {
      await axios.post("/api/user/tickets", {
        user_id: userId,
        subject: newSubject,
        message: newMessage,
      });
      toast.success("Ticket created");
      setNewSubject("");
      setNewMessage("");
      await load();
    } catch {
      toast.error("Failed to create ticket");
    }
  };

  // reply to selected ticket
  const reply = async () => {
    if (!selected || !replyText.trim()) return;
    setSending(true);
    try {
      await axios.post(`/api/user/tickets/${selected.id}/replies`, {
        message: replyText,
        isAdmin: false,
      });
      toast.success("Reply sent");
      setReplyText("");
      await load();
    } catch {
      toast.error("Reply failed");
    } finally {
      setSending(false);
    }
  };

  const getIcon = (s: string) => {
    if (s === "open") return <AlertCircle className="text-amber-500" />;
    if (s === "pending") return <CircleDashed className="text-blue-500" />;
    if (s === "closed") return <CircleCheck className="text-green-500" />;
    return <CircleAlert />;
  };
  const BadgeFor = ({ s }: { s: string }) => (
    <Badge variant="outline">{s}</Badge>
  );

  if (!client) return null;
  if (loading) return <div>Loading…</div>;
  if (error) return <div className="text-red-600 p-4">{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/*–––– Open Ticket Button + Modal ––––*/}
      <div className="md:col-span-1">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full mb-4">
              <MessageSquare className="mr-1" /> Open New Ticket
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Open New Ticket</DialogTitle>
              <DialogDescription>
                Ask our support team anything
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Subject"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
              />
              <Textarea
                placeholder="Your message…"
                rows={4}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button
                onClick={create}
                disabled={!newSubject.trim() || !newMessage.trim()}
              >
                <MessageSquare className="mr-1" /> Submit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Tickets List */}
        <Card className="h-full">
          <CardHeader>
            <CardTitle>
              <TicketCheck className="mr-2" /> My Tickets
            </CardTitle>
          </CardHeader>
          <CardContent>
            {tickets.length > 0 ? (
              <div className="space-y-3">
                {tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    onClick={() => setSelected(ticket)}
                    className={`p-3 border rounded-md cursor-pointer transition-all hover:border-primary ${
                      selected?.id === ticket.id
                        ? "border-primary bg-primary/5"
                        : "border-border"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm flex items-center gap-2">
                        {getIcon(ticket.status as string)}
                        <span className="line-clamp-1">{ticket.subject}</span>
                      </h4>
                      <BadgeFor s={ticket.status as string} />
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span> {new Date(ticket.date).toISOString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <CircleAlert className="h-10 w-10 text-muted-foreground/40 mb-2" />
                <h3 className="font-medium">No Tickets Found</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  This user hasnt created any support tickets.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/*–– Selected Ticket & Conversation ––*/}
      <div className="md:col-span-2">
        <Card className="h-full">
          {selected ? (
            <>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-medium flex items-center gap-2">
                      {selected.subject}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Clock className="h-3 w-3" />
                      <span>{new Date(selected.date).toLocaleString()}</span>
                      <BadgeFor s={selected.status as string} />
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // This would update the ticket status in a real implementation
                      toast.success(
                        `Ticket marked as ${
                          selected.status === "closed" ? "open" : "closed"
                        }`
                      );
                    }}
                  >
                    {selected.status === "closed"
                      ? "Reopen Ticket"
                      : "Close Ticket"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Original ticket message */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8 mt-0.5">
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {client.f_name?.charAt(0)}
                        {client.l_name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {client.f_name} {client.l_name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {selected.date}
                        </span>
                      </div>
                      <div className="p-3 bg-muted rounded-md text-sm">
                        {selected.message}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message thread */}
                {selected.replies.length > 0 && (
                  <>
                    <Separator />
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full"
                      defaultValue="replies"
                    >
                      <AccordionItem value="replies" className="border-none">
                        <AccordionTrigger className="py-2 text-sm font-medium">
                          Conversation ({selected.replies.length})
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 mt-2">
                            {selected.replies.map((reply) => (
                              <div
                                key={reply.id}
                                className="flex items-start gap-3"
                              >
                                <Avatar className="h-8 w-8 mt-0.5">
                                  <AvatarFallback
                                    className={
                                      reply.isAdmin
                                        ? "bg-primary/10 text-primary"
                                        : "bg-blue-100 text-blue-600"
                                    }
                                  >
                                    {reply.isAdmin
                                      ? "AD"
                                      : `${client.f_name?.charAt(0)}`}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">
                                      {reply.isAdmin
                                        ? "Admin"
                                        : `${client.f_name} ${client.l_name}`}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                      {reply.date}
                                    </span>
                                  </div>
                                  <div
                                    className={`p-3 rounded-md text-sm ${
                                      reply.isAdmin
                                        ? "bg-primary/5 border border-primary/10"
                                        : "bg-muted"
                                    }`}
                                  >
                                    {reply.message}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </>
                )}

                {/* Reply input */}
                {selected.status !== "closed" && (
                  <div className="pt-2 space-y-3">
                    <h4 className="text-sm font-medium">Reply to Ticket</h4>
                    <Textarea
                      placeholder="Type your reply here..."
                      className="min-h-[100px]"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-muted-foreground">
                        This reply will be sent to the user email
                      </div>
                      <Button
                        className="gap-2"
                        onClick={reply}
                        disabled={!replyText.trim() || sending}
                      >
                        {sending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Send className="h-4 w-4" />
                        )}
                        Send Reply
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center p-10 h-full text-center">
              <TicketCheck className="h-12 w-12 text-muted-foreground/40 mb-4" />
              <h3 className="text-lg font-medium">No Ticket Selected</h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-md">
                Select a ticket from the list to view details and reply to the
                {`user's`} queries.
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
