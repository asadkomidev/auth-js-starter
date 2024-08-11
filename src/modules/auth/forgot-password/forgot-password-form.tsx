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

import AuthHeader from "../auth-header";
import { Loader2 } from "lucide-react";
import {
  forgotPasswordSchema,
  ForgotPasswordSchemaType,
} from "@/schema/auth/forgot-password-schema";
import { forgotPasswordAction } from "@/actions/auth/forgot-password-action";
import { toast } from "sonner";

type Props = {
  setOpen: (value: boolean) => void;
};

export default function ForgotPasswordForm({ setOpen }: Props) {
  const form = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { formState } = form;

  async function onSubmit(values: ForgotPasswordSchemaType) {
    const response = await forgotPasswordAction(values);
    if (response.success) {
      toast.success("Email sent successfully");
      setOpen(false);
    } else {
      switch (response.statusCode) {
        case 400:
          toast.error("Invalid email");
          break;
        case 401:
          toast.error(response.error);
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
      <AuthHeader
        title="Forgot Password"
        description="Enter your email address to reset your password"
      />

      <div className="">
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit(onSubmit)();
            }}
            className="w-full space-y-8"
            id="forgot-password-form"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email"
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
                form="forgot-password-form"
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
    </div>
  );
}
