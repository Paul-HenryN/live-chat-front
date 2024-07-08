"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { graphql } from "@/gql";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const FormSchema = z.object({
  username: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
});

const LOGIN = graphql(/* GraphQL */ `
  mutation login($authInput: AuthInput!) {
    login(authInput: $authInput) {
      access_token
    }
  }
`);

export default function LoginPage() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { setUser } = useAuth();
  const router = useRouter();

  const [login, { loading }] = useMutation(LOGIN);

  const onSubmit = ({ username, password }: z.infer<typeof FormSchema>) => {
    login({
      variables: { authInput: { password, username } },
      onCompleted: () => {
        setUser({
          id: "test",
          username,
          creationDate: Date.now().toLocaleString(),
        });

        router.push("/conversations");
      },
      onError: (error) => {
        form.setError("root", { message: error.message });
      },
    });
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="hidden bg-muted lg:block">
        <img
          src="https://picsum.photos/1200/800"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>

      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {form.formState.errors.root?.message && (
                <div className="mt-2 text-sm text-red-500">
                  {form.formState.errors.root?.message}
                </div>
              )}

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

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "loading..." : "Login"}
                </Button>
              </div>

              <div className="mt-4 text-center text-sm">
                Not registered yet?{" "}
                <Link href="/signup" className="underline">
                  Sign up
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
