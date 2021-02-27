var userGetters = {
    getAddresses: function (billing, criteria) {
        var addresses = billing.addresses;
        if (!criteria || !Object.keys(criteria).length) {
            return addresses;
        }
        var entries = Object.entries(criteria);
        return billing.addresses.filter(function (address) { return entries.every(function (_a) {
            var key = _a[0], value = _a[1];
            return address[key] === value;
        }); });
    },
    getDefault: function (billing) { return billing.addresses.find(function (address) { return address.isDefault; }); },
    getTotal: function (billing) { return billing.addresses.length; },
    getPostCode: function (address) { return address ? address.zipCode : ''; },
    getStreetName: function (address) { return address ? address.streetName : ''; },
    getStreetNumber: function (address) { return address ? address.apartment : ''; },
    getCity: function (address) { return address ? address.city : ''; },
    getFirstName: function (address) { return address ? address.firstName : ''; },
    getLastName: function (address) { return address ? address.lastName : ''; },
    getCountry: function (address) { return address ? address.country : ''; },
    getPhone: function (address) { return address ? address.phoneNumber : ''; },
    getEmail: function (address) { return address ? address.email : ''; },
    getProvince: function (address) { return address ? address.state : ''; },
    getCompanyName: function (address) { return address ? address.company : ''; },
    getTaxNumber: function (address) { return address ? address.taxId : ''; },
    getId: function (address) { return address ? address.id : ''; },
    getApartmentNumber: function (address) { return address ? address.apartment : ''; },
    isDefault: function (address) { return address ? address.isDefault : false; }
};
export default userGetters;
//# sourceMappingURL=userBillingGetters.js.map