import axios from "axios";


export const getAllCollection = async () => {
  try {
    const response = await axios.get(
      "https://uiti-crm-server.vercel.app/collection"
    );

    if (!response?.data?.collection) {
      console.error("কোনো collection ডেটা পাওয়া যায়নি।");
      return []; 
    }

    const sortingData = [...response.data.collection].sort((a, b) =>
      a?.date?.slice(0, 10).localeCompare(b?.date?.slice(0, 10))
    );

    return sortingData;

  } catch (error) {
    console.error("Collection ডেটা আনতে সমস্যা:", error);
    return []; 
  }
};


export const getTotalAmountFilterCollection = (data) => {
  var totalSum = 0;
  for (var ts = 0; ts < data?.length; ts++) {
    totalSum += data[ts]?.amount;
  }

  return totalSum;
};
