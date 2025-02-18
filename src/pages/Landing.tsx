
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  phone: z.string().optional(),
  userType: z.enum(["user", "worker"]),
});

export default function Landing() {
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      phone: "",
      userType: "user",
    },
  });

  const handleAuth = async (values: z.infer<typeof formSchema>, isLogin: boolean) => {
    try {
      if (isLogin) {
        await signIn(values.email, values.password);
      } else {
        const userCredential = await signUp(values.email, values.password);
        // Create user profile in Firestore
        await setDoc(doc(db, "users", userCredential.user.uid), {
          email: values.email,
          userType: values.userType,
          phone: values.phone,
          createdAt: new Date(),
        });
      }
      toast({
        title: isLogin ? "Login successful" : "Account created successfully",
        description: "Welcome to Mella!",
      });
      navigate("/home");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "An error occurred during authentication",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-green-500/10 transform -skew-y-6" />
      <div className="absolute bottom-0 right-0 w-full h-32 bg-green-500/10 transform skew-y-6" />
      
      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="text-center">
          <img 
            src="/lovable-uploads/mella-logo.png" 
            alt="Mella Logo" 
            className="mx-auto w-32 h-32 mb-4"
          />
          <h1 className="text-4xl font-bold mb-2 text-green-800">Welcome to Mella</h1>
          <p className="text-green-600">Your trusted emergency response platform</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-green-50">
            <TabsTrigger value="login" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">Login</TabsTrigger>
            <TabsTrigger value="signup" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Enter your credentials to access your account</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit((values) => handleAuth(values, true))} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your email" className="border-green-200 focus:border-green-500" {...field} />
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
                            <Input type="password" placeholder="Enter your password" className="border-green-200 focus:border-green-500" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">Login</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>Enter your details to get started</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit((values) => handleAuth(values, false))} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your email" className="border-green-200 focus:border-green-500" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your phone number" className="border-green-200 focus:border-green-500" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="userType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Type</FormLabel>
                          <div className="flex gap-4">
                            <Button
                              type="button"
                              variant={field.value === "user" ? "default" : "outline"}
                              className={field.value === "user" ? "bg-green-500" : ""}
                              onClick={() => form.setValue("userType", "user")}
                            >
                              Regular User
                            </Button>
                            <Button
                              type="button"
                              variant={field.value === "worker" ? "default" : "outline"}
                              className={field.value === "worker" ? "bg-green-500" : ""}
                              onClick={() => form.setValue("userType", "worker")}
                            >
                              Service Provider
                            </Button>
                          </div>
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
                            <Input type="password" placeholder="Create a password" className="border-green-200 focus:border-green-500" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">Sign Up</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <footer className="fixed bottom-0 w-full p-4 text-center bg-white/80 backdrop-blur-sm">
        <p className="text-sm text-green-600">Made by Tech Space ET</p>
      </footer>
    </div>
  );
}
