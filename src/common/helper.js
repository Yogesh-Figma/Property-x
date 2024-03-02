class Helper {
  static roundToTwo = (num) => {
    return +(Math.round(num + "e+2") + "e-2");
  }

  // Simple function
  static currencyFormatter = value => {
    if(value == null) {
      value = 0
    }
    
    const units = ['K', 'L', 'CR'];

    let unitIndex = 0;
    if (value > 1000) {
      value = value / 1000;
    }

    let scaledValue = value;

    while (scaledValue >= 100 && unitIndex < units.length - 1) {
      unitIndex += 1;
      scaledValue /= 100;
    }

    return `₹${Helper.roundToTwo(scaledValue)}${units[unitIndex]}`;
  };

    // Simple function
    static sqftSizeFormatter = value => {
      return `${value||0} sq. ft.`;
    };

    // Simple function
    static pricePerSqftFormatter = value => {
      return `${Helper.currencyFormatter(value)}/sq. ft.`;
    };

    static indianCurrencyFormatter = (value) => {
      return Number(value).toLocaleString('en-IN', {
        maximumFractionDigits:2,
        style:'currency',
        currency:'INR'
      })
    } 

}

export default Helper;