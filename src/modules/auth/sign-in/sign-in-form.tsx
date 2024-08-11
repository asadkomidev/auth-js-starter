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
import { useRouter } from "next/navigation";
import { signInSchema, SignInSchemaType } from "@/schema/auth/sign-in-schema";
import { Loader2 } from "lucide-react";
import { signInAction } from "@/actions/auth/sign-in-action";
import { toast } from "sonner";
import ForgotPasswordButton from "../forgot-password/forgot-password-button";

type Props = {};

function SignInForm({}: Props) {
  const router = useRouter();
  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { formState, setError } = form;

  async function onSubmit(values: SignInSchemaType) {
    const response = await signInAction(values);
    if (response.success) {
      toast.success("Signed in successfully");
      window.location.href = "/";
    } else {
      switch (response.statusCode) {
        case 401:
          toast.error(response.error);
          break;
        case 500:
        default:
          toast.error("Internal Server Error");
          break;
      }
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-4 w-full space-y-8"
        id="sign-in-form"
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
  );
}

export default SignInForm;
