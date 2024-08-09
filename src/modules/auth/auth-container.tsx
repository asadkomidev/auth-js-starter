import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export default function AuthContainer({ children, className }: Props) {
  return (
    <Card
      className={cn(
        "mx-auto mb-32 h-full w-full max-w-[400px] shadow-none",
        className,
      )}
    >
      <CardContent>{children}</CardContent>
    </Card>
  );
}
