const levenshteinDistance = (a: string, b: string): number => {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  if (a[0] === b[0]) return levenshteinDistance(a.substring(1), b.substring(1));

  return (
    1 +
    Math.min(
      levenshteinDistance(a, b.substring(1)),
      levenshteinDistance(a.substring(1), b),
      levenshteinDistance(a.substring(1), b.substring(1))
    )
  );
};

const countFrequencies = (str: string): Record<string, number> => {
  const freq: Record<string, number> = {};
  for (let i = 0; i < str.length; i += 1) {
    const c = str[i] as keyof typeof freq;
    freq[c] = (freq[c] || 0) + 1;
  }
  return freq;
};

const cosineSimilarity = (
  freq1: Record<string, number>,
  freq2: Record<string, number>
): number => {
  const words = Array.from(
    new Set(Object.keys(freq1).concat(Object.keys(freq2)))
  );
  let dotProduct = 0;
  let norm1 = 0;
  let norm2 = 0;
  for (const word of words) {
    dotProduct += (freq1[word] || 0) * (freq2[word] || 0);
    norm1 += (freq1[word] || 0) ** 2;
    norm2 += (freq2[word] || 0) ** 2;
  }
  return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
};

export const isCloseEnough = (
  inputStr: string,
  targetStr: string,
  threshold = 0.8
): boolean => {
  // Compute Levenshtein distance
  const distance = levenshteinDistance(inputStr, targetStr);
  if (distance <= threshold * targetStr.length) {
    return true;
  }

  // Compute cosine similarity
  const inputFreq = countFrequencies(inputStr);
  const targetFreq = countFrequencies(targetStr);
  const cosineSim = cosineSimilarity(inputFreq, targetFreq);
  if (cosineSim >= threshold) {
    return true;
  }

  return false;
};
