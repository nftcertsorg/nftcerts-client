export const getNfts = async (address) => {
  const headers = new Headers();
  headers.append("accept", "application/json");
  headers.append(
    "X-API-Key",
    "9PUeQPv8oeofJAPIKs1fgqWQr5TKfy98ioY0FCFAvkd88q4adMzdrZYy6zFFb9T3"
  );

  console.log("fetching");

  const chain = "mumbai";
  const format = "decimal";

  const res = await fetch(
    `https://deep-index.moralis.io/api/v2/${address}/nft?chain=${chain}&format=${format}`,
    {
      method: "GET",
      headers: headers,
      redirect: "follow",
    }
  );
  const json = await res.json();
  return json;
};

export const getIpfsMetadata = async (uri) => {
  console.log(uri)
  try {
    const res = await fetch(uri);
    const json = await res.json();
    return json;
  } catch (e) { console.error(e) }
};
