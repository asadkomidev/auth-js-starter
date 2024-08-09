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

  const { formState } = form;

  async function onSubmit(values: SignInSchemaType) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(values);

    const response = await signInAction(values);
    if (response.success) {
      toast.success("Signed in successfully");
      router.push("/");
    } else {
      switch (response.statusCode) {
        case 401:
          toast.error("Invalid email or password");
          break;
        case 500:
          toast.error("Internal server error");
          break;
        default:
          toast.error("An unexpected error occurred");
          break;
      }
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-8 w-full space-y-8"
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
