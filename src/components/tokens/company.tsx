const getCompanyCurrencyFromLocalStorage = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem('currency');
    }
    return null;
};

export default getCompanyCurrencyFromLocalStorage;