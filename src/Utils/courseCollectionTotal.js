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

  console.log( "getCourseCollectionTotal" , data)

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