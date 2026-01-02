// components/user/copy-trading/ExpertCard.tsx
"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import QRCode from "react-qr-code";
import { useCopiedExperts } from "@/hooks/useCopiedExperts";
import { ExpertType } from "@/types";
import { useUser } from "@/context/AuthUserContext";

interface Props {
  expert: ExpertType;
}

export default function ExpertCard({ expert }: Props) {
  const [showPay, setShowPay] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { copiedIds, reload } = useCopiedExperts();
  const already = copiedIds.includes(expert.id);
  const { client } = useUser();

  if (!client) return null;
  const handleCopy = async () => {
    setIsProcessing(true);
    try {
      const res = await axios.post("/api/user/copy-trader", {
        user_id: client.id,
        expert_id: expert.id,
      });
      if (res.data.success) {
        toast.success("Now copying “" + expert.expert_name + "”");
        await reload();
      } else {
        toast.error(res?.data?.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to copy");
    } finally {
      setIsProcessing(false);
    }
  };

  const onCopyAddress = async () => {
    await navigator.clipboard.writeText(String(expert.payment_address));
    toast.success("Address copied");
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{expert.expert_name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>Win rate: {expert.expert_win}</div>
          <div>Profit share: {expert.profit_share}</div>
          <div>Country: {expert.country}</div>
          {expert.expert_pic && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={expert.expert_pic}
              alt=""
              className="w-full h-40 object-cover rounded"
            />
          )}
        </CardContent>
        <CardFooter>
          <Button
            variant={already ? "outline" : "secondary"}
            onClick={() => {
              if (already) return;
              if (expert.needPayment) setShowPay(true);
              else handleCopy();
            }}
            disabled={isProcessing || already}
          >
            {already
              ? "Already Copying"
              : isProcessing
              ? "Processing…"
              : "Copy Signals"}
          </Button>
        </CardFooter>
      </Card>

      {expert.needPayment == 1 && (
        <Dialog open={showPay} onOpenChange={setShowPay}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Payment Required</DialogTitle>
              <DialogDescription>
                {expert.payment_desc}
                <br />
                <strong>Address:</strong> {expert.payment_address}
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col items-center space-y-4 p-4">
              {/* QR code */}
              <QRCode value={expert.payment_address as string} size={128} />

              {/* Copy button */}
              <Button variant="outline" onClick={onCopyAddress}>
                Copy Address
              </Button>
            </div>

            <DialogFooter className="space-x-2">
              <Button variant="secondary" onClick={() => setShowPay(false)}>
                Cancel
              </Button>
              <Button onClick={handleCopy} disabled={isProcessing}>
                {isProcessing ? "Confirming…" : "I Paid, Continue"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
