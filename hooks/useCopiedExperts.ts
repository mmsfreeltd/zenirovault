// hooks/useCopiedExperts.ts
"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export function useCopiedExperts() {
  const [copiedIds, setCopiedIds] = useState<number[]>([]);

  const load = async () => {
    try {
      const res = await axios.get<
        {
          subscriptionId: number;
          expert: { id: number };
        }[]
      >("/api/user/copied-experts");
      setCopiedIds(res.data.map((r) => r.expert.id));
    } catch {
      setCopiedIds([]);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return { copiedIds, reload: load };
}
