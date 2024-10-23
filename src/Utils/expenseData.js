import axios from "axios";

export const getAllExpenseData = async () => {
  let response;
  try {
    response = await axios.get(
      "https://demo-usc-crm-software.vercel.app/expense"
    );
    // console.log(response);
  } catch (error) {
    console.error(error);
  }

  let sortingData = [...response?.data?.expenses];

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

export const getExpenseTotal = (data) => {
  var totalAmount = 0;
  for (var i = 0; i < data.length; i++) {
    totalAmount += data[i].amount;
  }
  return totalAmount;
};
