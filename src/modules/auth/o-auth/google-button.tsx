import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/icons/google-icon";

type Props = {};

export default function GoogleButton({}: Props) {
  return (
    <Button variant="outline" className="w-full shadow-none">
      <GoogleIcon className="size-4 mr-2" />
      <span>Continue with Google</span>
    </Button>
  );
}
