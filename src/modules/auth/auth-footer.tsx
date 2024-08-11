import Link from "next/link";

import { Button } from "@/components/ui/button";

type Props = {
  text?: string;
  label?: string;
  link: string;
};

export default function AuthFooter({ text, label, link }: Props) {
  return (
    <div className="pt-4 text-center">
      <div className="flex items-center justify-center gap-2">
        <p className="text-sm text-muted-foreground">{text}</p>
        <Button variant="link" className="p-0 text-sm" asChild>
          <Link href={link} className="text-sm">
            {label}
          </Link>
        </Button>
      </div>
    </div>
  );
}
