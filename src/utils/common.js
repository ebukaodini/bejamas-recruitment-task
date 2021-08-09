
const formatCurrency = (currency) => {
  switch (currency) {
    case 'USD':
      return '$';
    case 'EUR':
      return '€';
    case 'GBP':
      return '￡'
    case 'NGN':
      return '₦'
    default:
      return '$';
  }
}

const pexelsBaseUrl = "https://images.pexels.com/photos";

export { formatCurrency, pexelsBaseUrl }
