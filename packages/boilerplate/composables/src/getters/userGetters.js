/* istanbul ignore file */
export var getUserFirstName = function (user) { return (user === null || user === void 0 ? void 0 : user.firstName) || ''; };
export var getUserLastName = function (user) { return (user === null || user === void 0 ? void 0 : user.lastName) || ''; };
export var getUserFullName = function (user) { return user ? user.firstName + " " + user.lastName : ''; };
export var getUserEmailAddress = function (user) { return (user === null || user === void 0 ? void 0 : user.email) || ''; };
var userGetters = {
    getFirstName: getUserFirstName,
    getLastName: getUserLastName,
    getFullName: getUserFullName,
    getEmailAddress: getUserEmailAddress
};
export default userGetters;
//# sourceMappingURL=userGetters.js.map