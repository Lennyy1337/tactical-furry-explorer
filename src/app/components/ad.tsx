import Link from "next/link";
import { useEffect, useState } from "react";

interface Ad {
  message: string;
  link: string;
  linkText: string;
}

const ads: Ad[] = [
  {
    message: "DM Alienconn if you are a femboy - ",
    link: "https://discord.com/users/549558201733873664",
    linkText: "Alienconn",
  },
  {
    message: "Free furry porn at",
    link: "https://discord.gg/pAVMsAp85M",
    linkText: "Verve Solutions",
  },
  {
    message: "Made by",
    link: "https://discord.com/users/551819471149465631",
    linkText: "lenny :3",
  },
  {
    message: "Dm sammy for free e sex (9inch+ dick only) - ",
    link: "https://discord.com/users/1230939562537390110",
    linkText: "Sammy",
  },
  {
    message: "🎉  Younger then 14? Hit up fredrino on discord! 🎉",
    link: "",
    linkText: "",
  },
];

export default function AdComponent() {
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null);

  useEffect(() => {
    const randomAd = ads[Math.floor(Math.random() * ads.length)];
    setSelectedAd(randomAd);
  }, []);

  if (!selectedAd) return null;

  return (
    <footer className="w-full h-12 bg-gray-800">
      <h1 className="text-white text-center font-bold md:text-3xl text-xl m-auto">
        {selectedAd.message}{" "}
        <Link
          href={selectedAd.link}
          className="underline hover:decoration-red-800"
        >
          {selectedAd.linkText}
        </Link>
      </h1>
    </footer>
  );
}
