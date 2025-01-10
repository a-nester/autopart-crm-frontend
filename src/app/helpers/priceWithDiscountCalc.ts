type Discount = {
    dateEnd: string,
    dateStart: string,
    type: string,
    value: number,
}

export const priceWithDiscountCalc = (price: number, discount: Discount) => {
    const { dateEnd, dateStart, type, value } = discount;
    const isDiscountPeriod = new Date(dateStart) < new Date() && new Date < new Date(dateEnd);
    if (isDiscountPeriod) {
        
        if (type === "percent") {
            const totalPrice = price - (price / 100 * value);
            return totalPrice;
        } else {
            const totalPrice = price - value;
            return totalPrice;
        }
    } else return price;

}