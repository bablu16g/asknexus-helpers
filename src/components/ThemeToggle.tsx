
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme-provider";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("relative overflow-hidden rounded-full", className)}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className={cn(
        "h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all",
        theme === "dark" ? "opacity-0 rotate-90 scale-0" : "opacity-100"
      )} />
      <Moon className={cn(
        "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all",
        theme === "dark" ? "opacity-100 rotate-0 scale-100" : "opacity-0"
      )} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
