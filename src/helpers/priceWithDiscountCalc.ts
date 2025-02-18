import { Discount } from "@/types/types";

export const priceWithDiscountCalc = (price: number | null, discountObj: Discount | null, isPerioded?: boolean): number | null | undefined=> {
    // console.log("Price", price);
    // console.log("DiscounyObj", discountObj);
    
    
    
    if (!discountObj) {
        return price;
    }

    const { date_end, date_start, type, value } = discountObj;

    if (isPerioded === true) {
        if (discountObj !== null) {

        if (discountObj?.date_start !== null && discountObj?.date_end !== null) {
            // Перевірка на наявність дати та коректність формату
            if (!date_start || !date_end) {
                console.error("Invalid date format or undefined date:", { date_start, date_end });
                return price;  // Якщо дати невірні, повертаємо початкову ціну
            }

            // Перетворення формату дати "DD.MM.YYYY" в об'єкт Date
            const parseDate = (dateString: string): Date | null => {
                const [day, month, year] = dateString.split('.').map(Number);
                if (isNaN(day) || isNaN(month) || isNaN(year)) {
                    console.error("Invalid date values:", dateString);
                    return null;
                }
                return new Date(year, month - 1, day); // Місяць у Date починається з 0
            };
            
            const startDate = parseDate(date_start);
            const endDate = parseDate(date_end);
            

            // Якщо дати не валідні, повертаємо оригінальну ціну
            if (!startDate || !endDate) {
                return price;
            }

            // Перевірка періоду дії знижки
            const isDiscountPeriod = startDate <= new Date() && new Date() <= endDate;

            if (isDiscountPeriod && price !== null && value !== undefined) {
                if (type === "percent") {
                    const result = price - (price * value / 100);
                    return parseFloat(result.toFixed(2));
                } else {
                    const result = (price - value);
                    return parseFloat(result.toFixed(2));
                }
            }
        }
    }
        return price;
    }
    else {
        if (!price) {
            return price;
        }
        if (type === "percent" && value !== undefined) {
            // console.log(price);
            
                    const result = price - (price * value / 100);
                    return parseFloat(result.toFixed(2));
                } else if (value !== undefined) {
                    const result = (price - value);
                    return parseFloat(result.toFixed(2));
                }
    }
    
};
