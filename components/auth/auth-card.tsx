import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DivideIcon as LucideIcon } from "lucide-react";

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  footer?: React.ReactNode;
  icon?: typeof LucideIcon;
  className?: string;
}

export function AuthCard({
  children,
  title,
  description,
  footer,
  icon: Icon,
  className,
}: AuthCardProps) {
  return (
    <Card
      className={cn(
        "w-full overflow-hidden border-none shadow-lg animate-in fade-in-50 duration-300",
        className
      )}
    >
      <CardHeader className="space-y-1 text-center">
        {Icon && (
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        )}
        <CardTitle className="text-2xl font-semibold tracking-tight">
          {title}
        </CardTitle>
        {description && (
          <CardDescription className="text-muted-foreground">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footer && (
        <CardFooter className="flex flex-col space-y-2">{footer}</CardFooter>
      )}
    </Card>
  );
}
