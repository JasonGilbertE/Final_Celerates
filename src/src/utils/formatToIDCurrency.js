function formatToIDRCurrency(value) {
  const formattedValue = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);

  return formattedValue.replace("Rp", "Rp. ");
}

export default formatToIDRCurrency;
