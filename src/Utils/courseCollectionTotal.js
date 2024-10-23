import axios from "axios";

export const getCourseCollectionData = async () => {
  let response;
  try {
    response = await axios.get(
      "https://demo-usc-crm-software.vercel.app/leads?admission=true&admissionStatus=true"
    );
  } catch (error) {
    console.error(error);
  }

  return response?.data;
};

export const getCourseCollectionTotal = (data) => {
  var resultProductDataFrist = data?.filter((a) => a.fristInstallment);
  var resultProductDataTwo = data?.filter((a) => a.secondInstallment);
  var resultProductDataThird = data?.filter((a) => a.thirdInstallment);

  var totalOne = 0;
  for (var tsOne = 0; tsOne < resultProductDataFrist?.length; tsOne++) {
    totalOne += resultProductDataFrist?.[tsOne]?.fristInstallment;
  }
  var totalTwo = 0;
  for (var tsTwo = 0; tsTwo < resultProductDataTwo?.length; tsTwo++) {
    totalTwo += resultProductDataTwo?.[tsTwo]?.secondInstallment;
  }
  var totalThree = 0;
  for (var tsThree = 0; tsThree < resultProductDataThird?.length; tsThree++) {
    totalThree += resultProductDataThird?.[tsThree]?.thirdInstallment;
  }
  const totalColloction = totalOne + totalTwo + totalThree;

  return totalColloction;
};
