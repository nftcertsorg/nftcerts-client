const CHAIN = "mumbai";
const FORMAT = "decimal";
const API_KEY =
  "9PUeQPv8oeofJAPIKs1fgqWQr5TKfy98ioY0FCFAvkd88q4adMzdrZYy6zFFb9T3";

const getHeaders = () => {
  const headers = new Headers();
  headers.append("accept", "application/json");
  headers.append("X-API-Key", API_KEY);
  return headers;
};

export const getNfts = async (address) => {
  const res = await fetch(
    `https://deep-index.moralis.io/api/v2/${address}/nft?chain=${CHAIN}&format=${FORMAT}`,
    {
      method: "GET",
      headers: getHeaders(),
    }
  );
  const json = await res.json();
  return json;
};

export const getNft = async (address, tokenId) => {
  const res = await fetch(
    `https://deep-index.moralis.io/api/v2/nft/${address}/${tokenId}?chain=${CHAIN}&format=${FORMAT}`,
    {
      method: "GET",
      headers: getHeaders(),
    }
  );
  const json = await res.json();
  return json;
};

export const searchNft = async (value, fieldName) => {
  const res = await fetch(
    `https://deep-index.moralis.io/api/v2/nft/search?chain=${CHAIN}&q=${value}&filter=${fieldName}`,
    {
      method: "GET",
      headers: getHeaders(),
    }
  );
  const json = await res.json();
  return json;
};


export const getEnsNameFromAddress = async (address) => {

    var myHeaders = new Headers();
    myHeaders.append("x-api-key", "xxepTPEGhzDKka6SviMo0qBf7vYegU5e49df1lvcBK2CHeAyZIw5OctPY3v2A6nW");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    console.log({address})



    const res = await fetch(`https://deep-index.moralis.io/api/v2/resolve/${address}/reverse`, requestOptions)


    return await res.json();

};



export const getAddressFromEns = async (name) => {

    var myHeaders = new Headers();
    myHeaders.append("x-api-key", "xxepTPEGhzDKka6SviMo0qBf7vYegU5e49df1lvcBK2CHeAyZIw5OctPY3v2A6nW");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };


    console.log({name})
    const res = await fetch(`https://deep-index.moralis.io/api/v2/resolve/${name}`, requestOptions)


    return await res.json();

};


export const getIpfsMetadata = async (uri) => {
  const res = await fetch(uri);
  const json = await res.json();
  return json;
};
