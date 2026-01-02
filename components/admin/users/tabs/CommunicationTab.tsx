"use client";

import { useActionState, useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Send, User, Mail, Loader2 } from "lucide-react";
import { sendClientEmail } from "@/server/actions/clients";
// import { format } from "date-fns";

export default function CommunicationTab() {
  const { client } = useUser();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  // const [sending, setSending] = useState(false);

  // Mock email history data
  // const emailHistory = [
  //   {
  //     id: 1,
  //     subject: "Account Verification Successful",
  //     snippet:
  //       "Thank you for completing your verification process. Your account has been fully verified and you now have access to all features...",
  //     date: "2023-06-01T10:30:00Z",
  //     read: true,
  //   },
  // ];

  const [state, action, isPending] = useActionState(sendClientEmail, {
    success: false,
    message: "",
  });

  // show toast and clear on success
  useEffect(() => {
    if (!state.message) return;
    toast[state.success ? "success" : "error"](state.message);
    if (state.success) {
      setSubject("");
      setMessage("");
    }
  }, [state]);

  if (!client) return null;

  // Handle sending email
  // const handleSendEmail = async () => {
  //   if (!subject.trim() || !message.trim()) {
  //     toast.error("Please provide both subject and message");
  //     return;
  //   }

  //   setSending(true);
  //   try {
  //     await sendEmail(subject, message);
  //     toast.success("Email sent successfully");
  //     setSubject("");
  //     setMessage("");
  //   } catch {
  //     toast.error("Failed to send email");
  //   } finally {
  //     setSending(false);
  //   }
  // };

  return (
    <div className="space-y-6">
      {/* Compose Email */}
      <Card>
        <form action={action}>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium">Send Email</CardTitle>
            <CardDescription>
              Compose and send an email to the user
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Hidden user_id */}
            <input type="hidden" name="user_id" value={client.id} />

            {/* Recipient Info */}
            <div className="bg-muted p-3 rounded-md">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">
                  {client.f_name} {client.l_name}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{client.email}</span>
              </div>
            </div>

            {/* Email Fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Enter email subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Compose your message here..."
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="resize-none"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              All emails are saved to the communication history
            </div>
            <Button
              type="submit"
              disabled={isPending || !subject.trim() || !message.trim()}
              className="gap-2"
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              Send Email
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* Communication History */}
      {/* <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">
            Communication History
          </CardTitle>
          <CardDescription>Previous emails sent to this user</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {emailHistory.map((email) => (
              <></>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="ml-auto">
            View All Communications
          </Button>
        </CardFooter>
      </Card> */}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// function MailBox({ email: any }) {
//   return (
//     <div
//       key={email.id}
//       className={`p-4 border rounded-md transition-colors ${
//         email.read ? "border-border" : "border-primary bg-primary/5"
//       }`}
//     >
//       <div className="flex items-start justify-between gap-4">
//         <div className="space-y-1">
//           <h4 className="font-medium flex items-center gap-2">
//             {!email.read && (
//               <span className="h-2 w-2 rounded-full bg-primary" />
//             )}
//             {email.subject}
//           </h4>
//           <p className="text-sm text-muted-foreground line-clamp-2">
//             {email.snippet}
//           </p>
//         </div>
//         <div className="flex items-center gap-2">
//           <CalendarClock className="h-4 w-4 text-muted-foreground" />
//           <span className="text-xs text-muted-foreground whitespace-nowrap">
//             {format(new Date(email.date), "MMM d, yyyy")}
//           </span>
//         </div>
//       </div>
//       <div className="flex justify-end mt-2">
//         <Button variant="ghost" size="sm" className="h-8 gap-1">
//           <CheckCircle className="h-3.5 w-3.5" />
//           {email.read ? "Read" : "Mark as Read"}
//         </Button>
//       </div>
//     </div>
//   );
// }
