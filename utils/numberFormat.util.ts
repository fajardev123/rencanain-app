export const formatIDR = new Intl.NumberFormat("id-ID");

export const toFormatIDR = (num: string | number = 0) => {
  if (typeof num == "string") {
    return formatIDR.format(parseInt(num));
  } else if (typeof num == "number") {
    return formatIDR.format(num);
  } else {
    return 0;
  }
};
