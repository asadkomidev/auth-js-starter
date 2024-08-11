"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  resetPasswordSchema,
  ResetPasswordSchemaType,
} from "@/schema/auth/reset-password-schema";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { resetPasswordAction } from "@/actions/auth/reset-password-action";
import { toast } from "sonner";

type Props = {
  email: string;
  token: string;
};

export default function ResetPasswordForm({ email, token }: Props) {
  const router = useRouter();
  const form = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { formState, setError } = form;

  async function onSubmit(values: ResetPasswordSchemaType) {
    const res = await resetPasswordAction(email, token, values);
    if (res.success) {
      router.push("/sign-in");
    } else {
      switch (res.statusCode) {
        case 400:
          toast.error("Invalid email");
          break;
        case 401:
          toast.error(res.error);
          break;
        case 500:
          toast.error("Internal server error");
          break;
        default:
          toast.error("Oops. Something went wrong");
          break;
      }
    }
  }
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-4 w-full space-y-8"
          id="sign-in-form"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      {...field}
                      className="shadow-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="confirmPassword"
                      {...field}
                      className="shadow-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="">
            <Button
              form="sign-in-form"
              type="submit"
              className="w-full"
              disabled={formState.isSubmitting}
            >
              {formState.isSubmitting && (
                <span className="">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                </span>
              )}
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
