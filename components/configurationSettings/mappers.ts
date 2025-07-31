function mapNumber(
  data: string | number,
  multiplier: number,
  to: "string" | "number",
) {
  let dataNumber: number;
  if (typeof data === "string") {
    dataNumber = Number(data);
    if (isNaN(dataNumber)) throw new Error("not a number");
  } else {
    dataNumber = data;
  }
  const result = multiplier * dataNumber;
  switch (to) {
    case "number":
      return result;
    case "string":
      return result.toString();
  }
}
export function multiplyToString(data: string | number, multiplier: number) {
  return mapNumber(data, multiplier, "string") as string;
}
