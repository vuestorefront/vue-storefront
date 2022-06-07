const isUrlMatchingRule = (url: string, rule: string): boolean => new RegExp(`^${rule.replace(/\*/g, '.*')}$`).test(url);

export default isUrlMatchingRule;
