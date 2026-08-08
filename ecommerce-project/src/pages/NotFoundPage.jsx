import { Header } from "../components/Header";

export function NotFoundPage({cart}) {
    return(
        <>
            <Header cart={cart} />
            <p>Page not found</p>
        </>
    );
}``