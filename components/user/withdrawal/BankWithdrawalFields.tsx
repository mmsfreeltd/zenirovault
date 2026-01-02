// components/user/BankWithdrawalFields.tsx
"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export interface BankDetails {
  bankName: string;
  beneName: string;
  accountNumber: string;
  routingNumber: string;
}

interface Props {
  details: BankDetails;
  onChangeField: (field: keyof BankDetails, value: string) => void;
}

export function BankWithdrawalFields({ details, onChangeField }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="bank_name">Bank Name</Label>
        <Input
          id="bank_name"
          value={details.bankName}
          onChange={(e) => onChangeField("bankName", e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="bene_name">Beneficiary Name</Label>
        <Input
          id="bene_name"
          value={details.beneName}
          onChange={(e) => onChangeField("beneName", e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="account_number">Account Number</Label>
        <Input
          id="account_number"
          value={details.accountNumber}
          onChange={(e) => onChangeField("accountNumber", e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="routing_number">Routing Number</Label>
        <Input
          id="routing_number"
          value={details.routingNumber}
          onChange={(e) => onChangeField("routingNumber", e.target.value)}
          required
        />
      </div>
    </div>
  );
}
