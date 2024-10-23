export const filterDate = (allData, startDate, endDate) => {
  var resultExpenseData = allData?.filter(
    (a) =>
      a?.date?.slice(0, 10) >= startDate && a?.date?.slice(0, 10) <= endDate
  );

  return resultExpenseData;
};

export const matchingData = (allData, property, value) => {
  let filterData = allData?.filter((data) => data[property] === value);

  return filterData;
};
