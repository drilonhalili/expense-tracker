import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GithubIcon } from "lucide-react"
import { Globe } from "lucide-react"
import { Link } from "@tanstack/react-router"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              to="/forgot-password"
              className="text-sm underline-offset-4 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Input id="password" type="password" required />
        </div>

        <Button type="submit" className="w-full">
          Login
        </Button>

        <DividerWithText>Or continue with</DividerWithText>

        <Button variant="outline" className="flex items-center w-full gap-2">
          <GithubIcon className="w-4 h-4" />
          Login with GitHub
        </Button>

        <Button
          variant="outline"
          className="flex items-center w-full gap-2"
          onClick={() => (window.location.href = "/api/login")}
        >
          <Globe className="w-4 h-4" />
          Login with Google
        </Button>
      </div>

      <p className="text-sm text-center text-muted-foreground">
        Don’t have an account?{" "}
        <Link
          to="/register"
          className="underline underline-offset-4 hover:text-primary"
        >
          Sign up
        </Link>
      </p>
    </form>
  )
}

function DividerWithText({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative my-4 text-sm text-center text-muted-foreground">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t" />
      </div>
      <span className="relative px-2 bg-background">{children}</span>
    </div>
  )
}
