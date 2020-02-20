import transformQuery from '../src/composables/usePrismic/transformQuery';

describe('[prismic] transformQuery', () => {
  let query;

  it('should return "at" query', () => {
    query = transformQuery({
      at: {
        fragment: 'sample-fragment',
        value: 'sample-value'
      }
    });

    expect(query).toBe('[at(sample-fragment, "sample-value")]');
  });
  it('should return "not" query', () => {
    query = transformQuery({
      not: {
        fragment: 'sample-fragment',
        value: 'sample-value'
      }
    });

    expect(query).toBe('[not(sample-fragment, "sample-value")]');
  });
  it('should return "missing" query', () => {
    query = transformQuery({
      missing: {
        fragment: 'sample-fragment'
      }
    });

    expect(query).toBe('[missing(sample-fragment)]');
  });
  it('should return "has" query', () => {
    query = transformQuery({
      has: {
        fragment: 'sample-fragment'
      }
    });

    expect(query).toBe('[has(sample-fragment)]');
  });
  it('should return "any" query', () => {
    query = transformQuery({
      any: {
        fragment: 'sample-fragment',
        values: ['value1', 'value2']
      }
    });

    expect(query).toBe('[any(sample-fragment, ["value1","value2"])]');
  });
  it('should return "in" query', () => {
    query = transformQuery({
      in: {
        fragment: 'sample-fragment',
        values: ['value1', 'value2']
      }
    });

    expect(query).toBe('[in(sample-fragment, ["value1","value2"])]');
  });
  it('should return "fulltext" query', () => {
    query = transformQuery({
      fulltext: {
        fragment: 'sample-fragment',
        value: 'sample-value'
      }
    });

    expect(query).toBe('[fulltext(sample-fragment, "sample-value")]');
  });
  it('should return "similar" query', () => {
    query = transformQuery({
      similar: {
        documentId: '123',
        maxResults: 10
      }
    });

    expect(query).toBe('[similar("123", 10)]');
  });
  it('should return "date" queries', () => {
    const dateBefore = transformQuery({
      dateBefore: {
        fragment: 'sample-fragment',
        before: 1582022769901
      }
    });
    const dateAfter = transformQuery({
      dateAfter: {
        fragment: 'sample-fragment',
        after: (new Date('2020-02-18')).toDateString()
      }
    });
    const dateBetween = transformQuery({
      dateBetween: {
        fragment: 'sample-fragment',
        before: 1582022769901,
        after: (new Date('2020-02-18')).toDateString()
      }
    });

    expect(dateBefore).toBe('[date.before(sample-fragment, 1582022769901)]');
    expect(dateAfter).toBe('[date.after(sample-fragment, "Tue Feb 18 2020")]');
    expect(dateBetween).toBe('[date.between(sample-fragment, 1582022769901, "Tue Feb 18 2020")]');
  });
  it('should return "dateOfMonth" queries', () => {
    const dateBefore = transformQuery({
      dayOfMonthBefore: {
        fragment: 'sample-fragment',
        day: 10
      }
    });
    const dateAfter = transformQuery({
      dayOfMonthAfter: {
        fragment: 'sample-fragment',
        day: 10
      }
    });
    const date = transformQuery({
      dayOfMonth: {
        fragment: 'sample-fragment',
        day: 10
      }
    });

    expect(dateBefore).toBe('[date.day-of-month-before(sample-fragment, 10)]');
    expect(dateAfter).toBe('[date.day-of-month-after(sample-fragment, 10)]');
    expect(date).toBe('[date.day-of-month(sample-fragment, 10)]');
  });
  it('should return "dateOfMonth" queries', () => {
    const dateBefore = transformQuery({
      dayOfWeekBefore: {
        fragment: 'sample-fragment',
        day: 10
      }
    });
    const dateAfter = transformQuery({
      dayOfWeekAfter: {
        fragment: 'sample-fragment',
        day: 10
      }
    });
    const date = transformQuery({
      dayOfWeek: {
        fragment: 'sample-fragment',
        day: 10
      }
    });

    expect(dateBefore).toBe('[date.day-of-week-before(sample-fragment, 10)]');
    expect(dateAfter).toBe('[date.day-of-week-after(sample-fragment, 10)]');
    expect(date).toBe('[date.day-of-week(sample-fragment, 10)]');
  });
  it('should return "month" queries', () => {
    const dateBefore = transformQuery({
      monthBefore: {
        fragment: 'sample-fragment',
        month: 10
      }
    });
    const dateAfter = transformQuery({
      monthAfter: {
        fragment: 'sample-fragment',
        month: 10
      }
    });
    const date = transformQuery({
      month: {
        fragment: 'sample-fragment',
        month: 10
      }
    });

    expect(dateBefore).toBe('[date.month-before(sample-fragment, 10)]');
    expect(dateAfter).toBe('[date.month-after(sample-fragment, 10)]');
    expect(date).toBe('[date.month(sample-fragment, 10)]');
  });
  it('should return "year" query', () => {
    query = transformQuery({
      year: {
        fragment: 'sample-fragment',
        year: 2020
      }
    });

    expect(query).toBe('[date.year(sample-fragment, 2020)]');
  });
  it('should return "hour" queries', () => {
    const dateBefore = transformQuery({
      hourBefore: {
        fragment: 'sample-fragment',
        hour: 10
      }
    });
    const dateAfter = transformQuery({
      hourAfter: {
        fragment: 'sample-fragment',
        hour: 10
      }
    });
    const date = transformQuery({
      hour: {
        fragment: 'sample-fragment',
        hour: 10
      }
    });

    expect(dateBefore).toBe('[date.hour-before(sample-fragment, 10)]');
    expect(dateAfter).toBe('[date.hour-after(sample-fragment, 10)]');
    expect(date).toBe('[date.hour(sample-fragment, 10)]');
  });
  it('should return "gt" query', () => {
    query = transformQuery({
      gt: {
        fragment: 'sample-fragment',
        value: 10
      }
    });

    expect(query).toBe('[number.gt(sample-fragment, 10)]');
  });
  it('should return "lt" query', () => {
    query = transformQuery({
      lt: {
        fragment: 'sample-fragment',
        value: 10
      }
    });

    expect(query).toBe('[number.lt(sample-fragment, 10)]');
  });
  it('should return "inRange" query', () => {
    query = transformQuery({
      inRange: {
        fragment: 'sample-fragment',
        before: 5,
        after: 15
      }
    });

    expect(query).toBe('[number.inRange(sample-fragment, 5, 15)]');
  });
  it('should return "near" query', () => {
    query = transformQuery({
      near: {
        fragment: 'sample-fragment',
        latitude: 1000,
        longitude: 2000,
        radius: 15
      }
    });

    expect(query).toBe('[geopoint.near(sample-fragment, 1000, 2000, 15)]');
  });
  it('should return multiple queries', () => {
    query = transformQuery({
      lt: {
        fragment: 'sample-fragment',
        value: 15
      },
      gt: {
        fragment: 'sample-fragment',
        value: 5
      }
    });

    expect(Array.isArray(query)).toBeTruthy();
    expect(query.length).toBe(2);
    expect(query[0]).toBe('[number.lt(sample-fragment, 15)]');
    expect(query[1]).toBe('[number.gt(sample-fragment, 5)]');
  });
  it('should return undefined when unknown query', () => {
    query = transformQuery({
      unknown: {
        fragment: 'sample-fragment'
      }
    } as any);

    expect(query).toBeUndefined();
  });
});
