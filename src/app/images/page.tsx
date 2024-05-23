"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { downloadUrl } from "download.js";
import { useRouter } from "next/navigation";
import { Select, SelectItem } from "@nextui-org/select";
import { categories } from "@/lib/categories";
import AdComponent from "../components/ad";

export default function Home() {
  const [pics, setPics] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("animals.birb");

  const router = useRouter();

  useEffect(() => {
    const savedCategory = localStorage.getItem("savedsession");
    if (savedCategory && savedCategory !== "null") {
      setSelectedCategory(savedCategory);
    }
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      getPics();
    }
  }, [selectedCategory]);

  async function getPics() {
    try {
      setLoading(true);
      setError(null);
      if (localStorage.getItem("savedsession") === "null") {
        localStorage.removeItem("savedsession");
      }

      localStorage.setItem("savedsession", selectedCategory);
      const url = `https://v2.yiff.rest/${selectedCategory}/?notes=disabled&amount=4`;

      const response = await axios.get(url);
      const data = response.data;
      const fetchedPics = data.images.map((image: any) => image.url);
      setPics(fetchedPics);
    } catch (error) {
      if (attempts >= 1) {
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
      const filenameWithExtension = match ? match[1] : null;
      const filename = filenameWithExtension ? filenameWithExtension.split(".")[0] : null;

      localStorage.setItem("savedsession", selectedCategory);
      router.push("/images/" + filename + `?url=${imageUrl}`);
    }

    return (
      <div
        className="max-sm:w-80 max-sm:h-80 w-[23rem] h-96 bg-white rounded-xl m-5 transition-all ease-in-out hover:scale-105"
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
          className="border-2 m-2 border-black rounded-xl p-2 text-black"
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
      <div className="max-w-screen flex flex-col bg-black min-w-screen md:h-screen dark xl:max-h-screen justify-between">
        <div className="w-full text-center">
          <h1 className="m-12 text-center text-bold text-3xl">
            Tactical furry explorer
          </h1>
          <Select
            label="Category"
            className="dark w-1/2"
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              setSelectedCategory(event.target.value);
            }}
            selectedKeys={[selectedCategory]}
          >
            {categories.map((category) => (
              <SelectItem
                key={category.db}
                value={category.db}
                className="dark "
              >
                {category.name}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div className="flex flex-wrap justify-center">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
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
        <AdComponent/>
      </div>
    </>
  );
}
