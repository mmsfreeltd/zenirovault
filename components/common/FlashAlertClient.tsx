"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, AlertCircle, CheckCircle2, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";

const iconMap = {
  info: <Info className="h-5 w-5" />,
  success: <CheckCircle2 className="h-5 w-5" />,
  warning: <TriangleAlert className="h-5 w-5" />,
  error: <AlertCircle className="h-5 w-5" />,
};

type FlashMessage = {
  message: string;
  type: "error" | "success" | "info" | "warning";
};

export function FlashAlertClient({ flash }: { flash: FlashMessage }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 5000); // auto-dismiss after 5s
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="animate-fade-in transition-opacity duration-500 w-full my-2">
      <Alert variant={flash.type}>
        {iconMap[flash.type]}
        <AlertTitle className="capitalize">{flash.type}</AlertTitle>
        <AlertDescription>{flash.message}</AlertDescription>
      </Alert>
    </div>
  );
}
