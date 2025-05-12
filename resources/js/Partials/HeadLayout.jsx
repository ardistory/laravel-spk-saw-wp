import { Head } from "@inertiajs/react";

const HeadLayout = ({ title }) => {
    return (
        <Head title={title}>
            <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        </Head>
    );
};

export default HeadLayout;