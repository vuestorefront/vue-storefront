import { Review } from '../../types';

export default async function getReview(): Promise<Review> {
  return Promise.resolve({
    offset: 0,
    limit: 5,
    count: 1,
    total: 1,
    averageRating: 4,
    ratingsDistribution: [
      {
        rate: 1,
        count: 0
      },
      {
        rate: 2,
        count: 0
      },
      {
        rate: 3,
        count: 0
      },
      {
        rate: 4,
        count: 1
      },
      {
        rate: 5,
        count: 0
      }
    ],
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
