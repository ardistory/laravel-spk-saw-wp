import { useTheme } from "@/components/themeProvider.js";
import { Button } from "@/components/ui/button.js";
import { Moon, Sun } from "lucide-react";

const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();

    return (
        <Button size={'icon'} onClick={() => setTheme((theme === 'light') ? 'dark' : (theme === 'dark') ? 'light' : null)}>
            {(theme === 'light') ? <Sun /> : (theme === 'dark') ? <Moon /> : null}
        </Button>
    );
};

export default ThemeSwitcher;