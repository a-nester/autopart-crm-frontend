import { Trip } from "@/types/types";

export default function tripCalc(tripData: Trip, usdPrice: number, fuelPrice: number) {

    //   driver[0],
    //       truck: truck[0],
    //       loadingPlace: load,
    //       loadDate: loadDate ? dayjs(loadDate).valueOf() : null,
    //       unloadingPlace: unload,
    //       rangeTo: rangeTo,
    //       range: range,
    //       price: price,
    //       currency: currency[0] || 'USD',
    //       payment_Form: paymentForm[0],
    //       dispetcher_id: dispetcher._id || 0,
    //       dispetcher_fee: dispFee,
    //       dispetcher_Currency: dispFeeCurrency[0],
    //       weight,

    const { weight, range, rangeTo, price = 0, currency, dispetcher_fee = 0, dispetcher_Currency } = tripData;
    
    const totalDistance = rangeTo + range;
    
    const fuelCalc = (weight: number, range: number, rangeTo: number) => {
    const calculatedFuel =
      (25 + (15 / 23500) * weight) * (range / 100) + 25 * (rangeTo / 100);
    return calculatedFuel;
  };
    const totalFuel = Math.ceil(fuelCalc(weight, range, rangeTo));

    const driverSalary = {
        value: price * 0.15,
        currency
    }


    const totalEarnings = () => {
        let coef = 1;
        let disp_coef = 1;
        if (currency !== 'ГРН') {
            coef = usdPrice;
        }
        if (dispetcher_Currency !== 'ГРН') {
            disp_coef = usdPrice;
        }
        const total = Math.ceil(price * coef - dispetcher_fee * disp_coef - driverSalary.value * coef - totalFuel * fuelPrice * 5/6);
        return total;
    }


    const calculatedData = {
        totalDistance,
        totalFuel,
        driverSalary,
        totalEarnings: totalEarnings(),
        totalEaringsCurrency: 'ГРН'
    }
    return calculatedData;
}