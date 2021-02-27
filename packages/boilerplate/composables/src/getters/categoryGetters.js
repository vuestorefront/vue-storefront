var itemToTree = function (category) {
    return {
        label: category.name,
        slug: category.slug,
        items: category.items.map(itemToTree),
        isCurrent: false
    };
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export var getCategoryTree = function (category) {
    if (category) {
        return itemToTree(category);
    }
    return {};
};
var categoryGetters = {
    getTree: getCategoryTree
};
export default categoryGetters;
//# sourceMappingURL=categoryGetters.js.map