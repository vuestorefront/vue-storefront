export const getAgnosticStatusCode = (obj: unknown, ...keys: string[]) => {
	if (Array.isArray(obj)) {
  	for (let o of obj) {    
    	if (getAgnosticStatusCode(o, ...keys)) {
      	return getAgnosticStatusCode(o, ...keys)
      }
    }
  } else if (obj && typeof obj === 'object') {  
    for (let key of Object.keys(obj)) {
      if (keys.includes(key)) {
        return obj[key]
      } else {
      	if (getAgnosticStatusCode(obj[key], ...keys)) {
        	return getAgnosticStatusCode(obj[key], ...keys)
        }
      }
    }
  }
  return null
}