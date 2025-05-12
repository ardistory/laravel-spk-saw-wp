import { router } from "@inertiajs/react";

export default function Root() {
    return (
        <div>
            {router.visit(route('login'))}
        </div>
    );
}
