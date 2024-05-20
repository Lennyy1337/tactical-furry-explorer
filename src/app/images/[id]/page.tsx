"use client";
import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page({ params }: { params: { id: string } }) {
  const [data, setData] = useState<any | null>({});
  const [attempts, setAttempts] = useState<number>(0);
  const router = useRouter();

  async function getImage() {
    try {
      const url = `https://v2.yiff.rest/images/${params.id}.json`;

      const data = (await axios.get(url)).data;

      if (!data.success) {
        router.push("/images");
      }

      setData(data.data);
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response!.data.success == false) {
          if (!e.response!.data.success) {
            if (attempts >= 3) {
              router.push("/images");
              return;
            }
            setAttempts(attempts + 1);
            setTimeout(getImage, 2000);
          }
        }
      }
    }
  }

  useEffect(() => {
    getImage();
  }, [params.id]);

  return (
    <>
      {data.url ? (
        <div className="max-w-screen max-h-screen flex bg-black min-h-screen min-w-screen md:overflow-hidden max-sm:overflow-scroll">
          <div className="flex flex-wrap justify-center w-full items-center md:overflow-hidden max-sm:overflow-scroll">
            <div
              className={`w-11/12 h-full bg-gray-900 shadow-xl overflow-hidden shadow-gray-900 bg-cover rounded-xl transition-all ease-in-out text-center flex flex-col justify-end md:overflow-hidden max-sm:overflow-scroll`}
              style={{
                backgroundImage: `url(${data!.url})`,
                backgroundPosition: "center",
                transition: "transform 0.3s ease-in-out",
              }}
            >
              <div className="bg-gray-800 w-full h-auto backdrop-blur-lg text-bold text-3xl flex flex-col space-y-2">
                <div className="flex flex-row justify-between mx-6 mt-4">
                  {data.artists[0] && (
                    <h1 className="m-2 text-right">
                      Artist: {data.artists[0]}
                    </h1>
                  )}
                  <Link
                    href={"/images"}
                    className="m-2 border-2 border-red-900 rounded-xl p-1 w-1/3 transition-all ease-in-out hover:-translate-x-1 hover:bg-red-900"
                  >
                    Go back
                  </Link>
                </div>
                <div className="flex flex-row justify-between mx-6 text-pretty text-left">
                  <h1 className="m-2">Category: {data.category}</h1>
                  {data.sources[0] && (
                    <h1 className="m-2">
                      Source:{" "}
                      <Link
                        href={data.sources[0]}
                        className="underline hover:decoration-red-900 transition-all ease-in-out"
                      >
                        {data.sources[0]}
                      </Link>
                    </h1>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
