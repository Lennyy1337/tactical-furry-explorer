import Fullscreencard from "@/app/components/fullscreencard";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
  searchParams: { [url: string]: string | string[] | undefined };
};

export default function Page({ params }: { params: { id: string } }) {
  return <Fullscreencard params={params} />;
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {

  const url = searchParams.url;

  return {
    title: "The furry explorer - Image",
    openGraph: {
      images: [(url as any)],
    },
  };
}
