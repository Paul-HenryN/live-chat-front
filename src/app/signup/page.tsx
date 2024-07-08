"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { gql, useMutation, useQuery } from "@apollo/client";
import { graphql } from "@/gql";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const FormSchema = z
  .object({
    username: z.string().min(1, "Required"),
    password: z
      .string()
      .min(6, { message: "Your password must have at least 6 caracters" }),
    passwordConfirmation: z.string(),
  })
  .refine(
    ({ password, passwordConfirmation }) => password === passwordConfirmation,
    {
      message: "The password confirmation doesn't match",
      path: ["passwordConfirmation"],
    }
  );

const ADD_USER = graphql(/* GraphQL */ `
  mutation AddUser($newUserData: NewUserInput!) {
    addUser(newUserData: $newUserData) {
      id
      username
      creationDate
    }
  }
`);

export default function SignupPage() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
      passwordConfirmation: "",
    },
  });
  const router = useRouter();

  const [addUser, { loading }] = useMutation(ADD_USER);

  const onSubmit = ({ username, password }: z.infer<typeof FormSchema>) => {
    console.log(username);
    addUser({
      variables: { newUserData: { username, password } },
      onCompleted: () => {
        router.push("/login");
      },
    });
  };

  return (
    <main className="min-h-screen grid place-items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <Input {...field} />
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
                      <Input {...field} type="password" />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="passwordConfirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm password</FormLabel>
                      <Input {...field} type="password" />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "loading..." : "Create an account"}
                </Button>
              </div>

              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline">
                  Sign in
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
