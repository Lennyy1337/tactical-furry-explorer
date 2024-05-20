"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { downloadUrl } from "download.js";
import { useRouter } from "next/navigation";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import { categories } from "@/lib/categories";

export default function Home() {
  const [pics, setPics] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('animals.birb');

  const router = useRouter();
  useEffect(() => {
    getPics();
  }, []);

  async function getPics() {
    try {
      setLoading(true);
      setError(null);

      const url = `https://v2.yiff.rest/${selectedCategory}/?notes=disabled&amount=5`;
      console.log(selectedCategory)
      if (loading) {
        return;
      }
      const response = await axios.get(url);
      const data = response.data;
      const fetchedPics = data.images.map((image: any) => image.url);
      setPics(fetchedPics);
    } catch (error) {
      if (attempts >= 3) {
        console.error("Error fetching pictures:", error);
        setError("Failed to fetch images. Please try again.");
        setPics([]);
        return;
      }
      setAttempts(attempts + 1);
      setTimeout(getPics, 2000);
    } finally {
      setAttempts(0);
      setLoading(false);
    }
  }

  function ImageCard({ url }: { url: string }) {
    function downloadpic() {
      downloadUrl(url, url);
    }

    async function getFullImage() {
      const imageUrl = url;

      const regex = /\/([^/]+)$/;

      const match = imageUrl.match(regex);
      console.log(imageUrl);
      console.log(match);
      const filenameWithExtension = match ? match[1] : null;

      const filename = filenameWithExtension
        ? filenameWithExtension.split(".")[0]
        : null;

      router.push("/images/" + filename + `?url=${imageUrl}`);
    }

    return (
      <div
        className="w-80 h-80 bg-white rounded-xl m-5 transition-all ease-in-out hover:scale-105"
        style={{
          backgroundImage: `url(${url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "transform 0.3s ease-in-out",
        }}
        onLoad={() => setImageLoaded(true)}
      >
        <button
          onClick={getFullImage}
          className="border-2 m-2 border-black rounded-xl p-2"
        >
          Full screen
        </button>
        {/* Content */}
      </div>
    );
  }

  function SkeletonLoader() {
    return (
      <div
        className={`w-80 h-80 bg-gray-300 rounded-xl m-5 animate-pulse ${
          imageLoaded ? "hidden" : ""
        }`}
      ></div>
    );
  }

  async function handleRegenerateClick() {
    if (clicked) {
      return;
    }
    setLoading(true);
    setClicked(true);
    setTimeout(async () => {
      await getPics();
      setClicked(false);
    }, 1000);
  }

  return (
    <>
      <div className="max-w-screen flex flex-col bg-black min-w-screen md:h-screen">
        <div className="w-full text-center">
          <h1 className="m-12 text-center text-bold text-3xl">Tactical furry explorer</h1>
          <Select label="Category" className="dark w-1/2" defaultSelectedKeys={["animals.birb"]} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setSelectedCategory(event.target.value)}>
            {categories.map((category) => (
              <SelectItem key={category.db} value={category.db} className="dark">
                {category.name}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div className="flex flex-wrap justify-center">
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            pics.map((url, index) => <ImageCard key={index} url={url} />)
          )}
        </div>
        <button
          onClick={handleRegenerateClick}
          className="border-4 border-green-700 md:w-1/2 w-full rounded-xl shadow-sm text-center justify-center self-center py-2 hover:bg-green-900 transition-all ease-in-out"
        >
          Regenerate images
        </button>
      </div>
    </>
  );
}
