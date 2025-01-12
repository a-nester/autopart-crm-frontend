import { Discount } from "@/types/types";


export const priceWithDiscountCalc = (price: number | null, discount: Discount | null) => {
    if (discount !== null) {
        const { dateEnd, dateStart, type, value } = discount;
        const isDiscountPeriod = new Date(dateStart) < new Date() && new Date < new Date(dateEnd);
        if (isDiscountPeriod && price !== null) {
            if (type === "percent") {
                const totalPrice = price - (price / 100 * value);
                return totalPrice;
            } else {
                const totalPrice = price - value;
                return totalPrice;
            }
        } else return price;
    } else return price;
}