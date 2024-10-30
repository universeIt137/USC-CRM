import axios from "axios";

export const getAllCollection = async () => {
  let response;
  try {
    response = await axios.get(
      "https://uiti-crm-server.vercel.app/collection"
    );
    console.log(response?.data?.collection);
  } catch (error) {
    console.error(error);
  }

  let sortingData = [...response?.data?.collection];

  sortingData?.sort(function (a, b) {
    if (a?.date?.slice(0, 10) < b?.date?.slice(0, 10)) {
      return -1;
    }
    if (b?.date?.slice(0, 10) < a?.date?.slice(0, 10)) {
      return 1;
    }
    return 0;
  });

  return sortingData;
};

export const getTotalAmountFilterCollection = (data) => {
  var totalSum = 0;
  for (var ts = 0; ts < data?.length; ts++) {
    totalSum += data[ts]?.amount;
  }

  return totalSum;
};
