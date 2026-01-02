"use client";

import Link from "next/link";
import { format } from "date-fns";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface Simulation {
  id: number;
  name: string;
  starting_balance: number;
  current_balance: number;
  date_created: string; // ISO
}

export function SimulationCard({ sim }: { sim: Simulation }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{sim.name}</CardTitle>
        <CardDescription>
          Created {format(new Date(sim.date_created), "yyyy-MM-dd")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div>
          <span className="font-medium">Start Bal:</span>{" "}
          {sim.starting_balance.toLocaleString(undefined, {
            style: "currency",
            currency: "USD",
          })}
        </div>
        <div>
          <span className="font-medium">Current Bal:</span>{" "}
          {sim.current_balance.toLocaleString(undefined, {
            style: "currency",
            currency: "USD",
          })}
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/user/simulations/${sim.id}`}>
          <Button size="sm">View &amp; Trade</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
