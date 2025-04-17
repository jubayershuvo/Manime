import axios from "axios";
import { createHash } from "crypto";

export async function getImageUrl(name: string): Promise<{ image?: string | null; name?: string | null }> {
  try {
    let searchRes;

    try {
      // Try English first
      searchRes = await axios.get("https://www.wikidata.org/w/api.php", {
        params: {
          action: "wbsearchentities",
          search: name,
          language: "en",
          format: "json",
          origin: "*",
        },
      });

      if (!searchRes.data.search?.[0]) throw new Error("No result in English");
    } catch {
      // Fallback to translated Bengali name
      const namebn = await axios.get(`/api/translate?text=${name}&from=en&to=bn`);
      const bnName = namebn.data.translated;
      console.log(bnName);

      searchRes = await axios.get("https://www.wikidata.org/w/api.php", {
        params: {
          action: "wbsearchentities",
          search: bnName,
          language: "en",
          format: "json",
          origin: "*",
        },
      });
    }

    const entityId = searchRes.data.search?.[0]?.id;
    if (!entityId) return { image: null };

    const entityRes = await axios.get(`https://www.wikidata.org/wiki/Special:EntityData/${entityId}.json`);
    const claims = entityRes.data.entities?.[entityId]?.claims;
    const imageFile = claims?.P18?.[0]?.mainsnak?.datavalue?.value;

    if (!imageFile) return { image: null };

    const fileName = imageFile.replace(/ /g, "_");
    const md5 = createHash("md5").update(fileName).digest("hex");
    const imageUrl = `https://upload.wikimedia.org/wikipedia/commons/${md5[0]}/${md5[0]}${md5[1]}/${fileName}`;

    return { image: imageUrl, name };
  } catch (err: any) {
    console.error("Image fetch error:", err.message);
    return { image: null, name };
  }
}
