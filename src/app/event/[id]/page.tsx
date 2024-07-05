// This file has been sourced from: /Users/betich/code/work/Creatorsgarten/Oknize/src/pages/event/[id]/index.tsx
import Components from './components';

function getServerSideProps({ params }: { params: { id: string } }) {
    return {
        props: {
            id: params.id,
        },
    };
}
export default async function Page(props: any) {
    return <Components {...props} />;
}
