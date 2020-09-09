const getReview = () => {
  return {
    data: [
      {
        id: '1',
        version: 1,
        createdAt: (new Date()).toDateString(),
        lastModifiedAt: (new Date()).toDateString(),
        authorName: 'Jane D.Smith',
        text: 'I was looking for a bright light for the kitchen but wanted some item more modern than a strip light. this one is perfect, very bright and looks great. I can\'t comment on interlation as I had an electrition instal it. Would recommend',
        rating: 4
      },
      {
        id: '2',
        version: 1,
        createdAt: (new Date()).toDateString(),
        lastModifiedAt: (new Date()).toDateString(),
        authorName: 'Mari',
        text: 'Excellent light output from this led fitting. Relatively easy to fix to the ceiling,but having two people makes it easier, to complete the installation. Unable to comment on reliability at this time, but I am hopeful of years of use with good light levels. Excellent light output from this led fitting. Relatively easy to fix to the ceiling,',
        rating: 5
      }
    ],
    averageRating: 4.5,
    total: 2
  };
};

export default getReview;
