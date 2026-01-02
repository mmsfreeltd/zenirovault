"use client";

import { Input } from "@/components/ui/input";
import { useUser } from "@/context/AuthUserContext";
import { Check, Pencil, DivideIcon as LucideIcon } from "lucide-react";
import { ClientType } from "@/types";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface FieldProps {
  label: string;
  value: string | number;
  icon: typeof LucideIcon;
  canUpdate?: boolean;
  fieldName?: keyof ClientType;
}

export const FieldUpdater = ({
  label,
  value,
  icon: Icon,
  canUpdate,
  fieldName,
}: FieldProps) => {
  const { client, updateClient, loading } = useUser();
  const [editMode, setEditMode] = useState(false);
  const [fieldValue, setFieldValue] = useState(value.toString());
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!fieldName) return;
    setSaving(true);
    updateClient({ [fieldName]: fieldValue });
    setSaving(false);
    setEditMode(false);
  };

  const renderInput = () => {
    const commonProps = {
      value: fieldValue,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setFieldValue(e.target.value),
      disabled: saving,
      className: "h-8",
    };

    switch (fieldName) {
      case "dob":
        return <Input type="date" {...commonProps} />;
      case "phone":
        return <Input type="tel" {...commonProps} />;
      case "email":
        return <Input type="email" {...commonProps} />;
      default:
        return typeof value === "number" ? (
          <Input type="number" {...commonProps} />
        ) : (
          <Input type="text" {...commonProps} />
        );
    }
  };

  if (!client) return null;

  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 rounded-md bg-muted p-2">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="space-y-1 flex-1">
        <Label className="text-xs text-muted-foreground">{label}</Label>
        {canUpdate && editMode ? (
          <div className="flex items-center gap-2">
            {renderInput()}
            <button
              onClick={handleSave}
              disabled={saving}
              className="text-green-600 hover:underline text-sm"
            >
              <Check className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <p className="font-medium">{loading ? "Loading..." : value}</p>
            {canUpdate && (
              <button
                onClick={() => setEditMode(true)}
                className="text-xs text-muted-foreground hover:underline"
              >
                <Pencil className="w-3 h-3" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
