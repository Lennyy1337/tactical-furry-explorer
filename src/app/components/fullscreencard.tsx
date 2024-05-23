"use client";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

interface Props {
  params: {
    id: string;
  };
}

export default function Fullscreencard(props: Props) {
  const [data, setData] = useState<any | null>(null);
  const [attempts, setAttempts] = useState<number>(0);
  const navigation = useRouter();

  async function getImage() {
    try {
      const url = `https://v2.yiff.rest/images/${props.params.id}.json`;

      const responseData = (await axios.get(url)).data;

      if (!responseData.success) {
        navigation.push("/images");
        return;
      }

      setData(responseData.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data.success === false && attempts < 3) {
          setAttempts(attempts + 1);
          setTimeout(getImage, 2000);
        } else {
          navigation.push("/images");
        }
      }
    }
  }

  useEffect(() => {
    getImage();
  }, [props.params.id]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      {data && (
        <div className="relative w-screen max-w-screen max-h-screen overflow-hidden rounded-lg shadow-xl">
          <div className="flex flex-col h-full">
            <div className="overflow-hidden md:w-screen md:h-screen flex justify-center">
              <Image
                src={data.url}
                alt="Image"
                width={data.width}
                height={data.height}
                layout="responsive"
                objectFit="contain"
                className="rounded-lg md:h-screen md:w-screen "
                style={{ maxWidth: "130vh"}}
                
              />
            </div>
            <div className="absolute bottom-0 right-0 bg-gray-800/30 text-white p-4 backdrop-blur-xl rounded-xl m-2">
              {data.artists && data.artists[0] && (
                <p className="text-right">Artist: {data.artists[0]}</p>
              )}
              <p>Category: {data.category}</p>
              {data.sources && data.sources[0] && (
                <p>
                  Source:{" "}
                  <span className="underline hover:text-red-900 cursor-pointer">
                    <Link href={data.sources[0]}>
                      {data.sources[0]}
                    </Link>
                  </span>
                </p>
              )}
              <div className="text-right mt-4">
                <Link href="#" onClick={function(){window.close()}}>
                  <span className="border-2 border-red-900 rounded-xl p-1 transition-all ease-in-out hover:-translate-x-1 hover:bg-red-900 cursor-pointer">
                    Go back
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
