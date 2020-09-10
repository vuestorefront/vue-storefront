import { Review } from '../../types';

export default async function addReview(): Promise<Review> {
  return Promise.resolve({
    offset: 0,
    limit: 5,
    count: 2,
    total: 2,
    averageRating: 4,
    ratingsDistribution: {
      1: 0,
      2: 0,
      3: 0,
      4: 1,
      5: 0
    },
    results: [
      {
        id: '1',
        version: 1,
        createdAt: (new Date()).toDateString(),
        lastModifiedAt: (new Date()).toDateString(),
        authorName: 'Jane D.Smith',
        text: 'I was looking for a bright light for the kitchen but wanted some item more modern than a strip light. this one is perfect, very bright and looks great. I can\'t comment on interlation as I had an electrition instal it. Would recommend',
        rating: 4
      }
    ]
  });
}
