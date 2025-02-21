const generateChartData = (days: number) => {
  return Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - i));

    return {
      date: date.toISOString().split("T")[0],
      desktop: Math.floor(Math.random() * 100),
      mobile: Math.floor(Math.random() * 100),
    };
  });
};

export { generateChartData };
