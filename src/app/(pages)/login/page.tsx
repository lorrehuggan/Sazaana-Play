import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
    return (
        <div className="grid h-screen w-screen grid-cols-1 md:grid-cols-5">
            <div className="col-span-3 flex h-full items-center justify-center">
                <div className="mx-auto w-11/12 max-w-sm">
                    <h1 className="text-center text-4xl font-bold uppercase tracking-[-0.075rem]">
                        Sazaana
                    </h1>
                    <p className="mb-2 text-center tracking-wider text-muted-foreground">
                        Straight Forward Playlist
                        Builder
                    </p>
                    <form>
                        <Button
                            className="w-full"
                            asChild
                        >
                            <Link
                                href="/login/spotify"
                                className="flex items-center gap-2"
                            >
                                <svg
                                    className="fill-white"
                                    width="24"
                                    height="24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                >
                                    <path d="M19.098 10.638c-3.868-2.297-10.248-2.508-13.941-1.387-.593.18-1.22-.155-1.399-.748-.18-.593.154-1.22.748-1.4 4.239-1.287 11.285-1.038 15.738 1.605.533.317.708 1.005.392 1.538-.316.533-1.005.709-1.538.392zm-.126 3.403c-.272.44-.847.578-1.287.308-3.225-1.982-8.142-2.557-11.958-1.399-.494.15-1.017-.129-1.167-.623-.149-.495.13-1.016.624-1.167 4.358-1.322 9.776-.682 13.48 1.595.44.27.578.847.308 1.286zm-1.469 3.267c-.215.354-.676.465-1.028.249-2.818-1.722-6.365-2.111-10.542-1.157-.402.092-.803-.16-.895-.562-.092-.403.159-.804.562-.896 4.571-1.045 8.492-.595 11.655 1.338.353.215.464.676.248 1.028zm-5.503-17.308c-6.627 0-12 5.373-12 12 0 6.628 5.373 12 12 12 6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12z" />
                                </svg>
                                <span>
                                    Login with
                                    Spotify
                                </span>
                            </Link>
                        </Button>
                    </form>
                    <p className="mt-2 text-center text-xs text-muted-foreground">
                        By clicking continue, you
                        agree to our Terms of
                        Service and Privacy
                        Policy.
                    </p>
                </div>
            </div>
            <div className="col-span-2 hidden h-full p-4 md:block">
                <div className="relative h-full w-full overflow-hidden rounded-lg">
                    <Image
                        src="/images/hero.jpg"
                        alt="Playlist"
                        fill
                        priority
                        className="object-cover object-center"
                    />
                </div>
            </div>
        </div>
    );
}
