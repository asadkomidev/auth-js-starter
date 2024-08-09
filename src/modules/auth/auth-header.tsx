import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  title?: string;
  description?: string;
};

export default function AuthHeader({ title, description }: Props) {
  return (
    <CardHeader className="w-full px-0">
      {title && <CardTitle>{title}</CardTitle>}
      {description && (
        <CardDescription className="text-xs">{description}</CardDescription>
      )}
    </CardHeader>
  );
}
