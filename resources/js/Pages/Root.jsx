import { router } from "@inertiajs/react";

export default function Root() {
    return (
        <>
            {router.visit(route('login'))}
        </>
    );
}
