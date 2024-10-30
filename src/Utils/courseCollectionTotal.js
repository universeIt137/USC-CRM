import axios from "axios";

export const getCourseCollectionData = async () => {
  try {
    const response = await axios.get(
      "https://uiti-crm-server.vercel.app/leads?admission=true&admissionStatus=true"
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const getCourseCollectionTotal = (data, startDate, endDate) => {

  console.log(`startDate is ${startDate} and endDate is ${endDate}`);

  console.log(`data is ${data} `);


  let totalOne = 0;
  let totalTwo = 0;
  let totalThree = 0;


  data?.forEach((item) => {
    // First installment date check
    if (
      item.firstInstallmentDate >= startDate &&
      item.firstInstallmentDate <= endDate
    ) {
      totalOne += item.firstInstallment || 0;
    }
    
    // Second installment date check
    if (
      item.secondInstallmentDate >= startDate &&
      item.secondInstallmentDate <= endDate
    ) {
      totalTwo += item.secondInstallment || 0;
    }
    
    // Third installment date check
    if (
      item.thirdInstallmentDate >= startDate &&
      item.thirdInstallmentDate <= endDate
    ) {
      totalThree += item.thirdInstallment || 0;
    }
  });

  const totalCollection = totalOne + totalTwo + totalThree;
  return totalCollection;
};


export const getCourseExtraTotalMoney = (data) => {
  let totalOne = 0;
  let totalTwo = 0;
  let totalThree = 0;

  data?.forEach((item) => {
    if (item.firstInstallment) totalOne += item.firstInstallment;
    if (item.secondInstallment) totalTwo += item.secondInstallment;
    if (item.thirdInstallment) totalThree += item.thirdInstallment;
  });

  const totalCollection = totalOne + totalTwo + totalThree;

  return totalCollection;
};


export const getCourseByCollectionDate = (data) => {
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