import axios from "axios";

export async function getImageUrl(
  name: string
): Promise<{ image?: string | null; name?: string | null }> {
  try {
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_SEARCH_API_KEY;
    const CX = process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CX;

    const res = await axios.get("https://www.googleapis.com/customsearch/v1", {
      params: {
        key: API_KEY,
        cx: CX,
        q: name,
      },
    });

    const result = res.data.items?.find((item: any) => {
      return (
        item.pagemap?.metatags?.[0]?.["og:image"] ||
        item.pagemap?.cse_image?.[0]?.src
      );
    });

    if (result) {
      const image =
        result.pagemap?.metatags?.[0]?.["og:image"] ||
        result.pagemap?.cse_image?.[0]?.src;

      const finalName =
        result.pagemap?.metatags?.[0]?.["og:title"] || result.title;

      return { image, name: finalName };
    }

    return { image: null, name };
  } catch (err: any) {
    console.error("Image fetch error:", err.message);
    return { image: null, name };
  }
}



// import axios from "axios";

// export async function getImageUrl(
//   name: string
// ): Promise<{ image?: string | null; name?: string | null }> {
//   try {
//     const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_SEARCH_API_KEY;
//     const CX = process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CX;

//     const res = await axios.get("https://www.googleapis.com/customsearch/v1", {
//       params: {
//         key: API_KEY,
//         cx: CX,
//         q: name,
//       },
//     });

//     return res.data;
//   } catch (err: any) {
//     console.error("Image fetch error:", err.message);
//     return { image: null, name };
//   }
// }
