import { useTheme } from "@/Components/ThemeProvider.js";
import { Button } from "@/Components/ui/button.js";
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