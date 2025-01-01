"use client"
export function ImageCard({ url }: { url: string }) {
    const getFullImage = () => {
      const regex = /\/([^/]+)$/;
      const match = url.match(regex);
      const filenameWithExtension = match ? match[1] : null;
      const filename = filenameWithExtension ? filenameWithExtension.split(".")[0] : null;
  
      window.open("/images/" + filename + `?url=${url}`, "_blank");
    };
  
    return (
      <div
        className="max-sm:w-80 max-sm:h-80 w-[23rem] h-96 bg-white rounded-xl m-5 transition-all ease-in-out hover:scale-105"
        style={{
          backgroundImage: `url(${url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <button
          onClick={getFullImage}
          className="border-2 m-2 border-black rounded-xl p-2 text-black"
        >
          Full screen
        </button>
      </div>
    );
  }
  