import {
  getPages,
  getTotalResultsSize,
  getTotalPages,
  getNextPage,
  getPrevPage,
  getCurrentPage,
  getResultsSize,
  getResultsPerPage
} from '../../src/helpers';

jest.mock('prismic-javascript');

describe('[prismic] helpers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns pages from document', () => {
    expect(getPages('doc1' as any, null as any)).toEqual('doc1');
    expect(getPages(null as any, null as any)).toEqual([]);

    expect(getPages({ uid: 'test-id' } as any, 'test-id')).toEqual({ uid: 'test-id' });
    expect(getPages({ uid: 'test-id' } as any, 'test-id-x')).toEqual(null);

    expect(getPages([{ uid: 'test-id-1' }, { uid: 'test-id-2' }] as any, 'test-id-1')).toEqual({ uid: 'test-id-1' });
    expect(getPages([{ uid: 'test-id-1' }, { uid: 'test-id-2' }] as any, 'test-id-x')).toEqual(null);
  });

  it('returns total results size', () => {
    expect(getTotalResultsSize(null)).toEqual(0);
    expect(getTotalResultsSize({ total_results_size: 50 } as any)).toEqual(50); // eslint-disable-line
  });

  it('returns total pages', () => {
    expect(getTotalPages(null)).toEqual(0);
    expect(getTotalPages({ total_pages: 45 } as any)).toEqual(45); // eslint-disable-line
  });

  it('returns next page', () => {
    expect(getNextPage(null)).toEqual(null);
    expect(getNextPage({} as any)).toEqual(null);
    expect(getNextPage({ next_page: 4 } as any)).toEqual(4); // eslint-disable-line
  });

  it('returns prev page', () => {
    expect(getPrevPage(null)).toEqual(null);
    expect(getPrevPage({} as any)).toEqual(null);
    expect(getPrevPage({ prev_page: 1 } as any)).toEqual(1); // eslint-disable-line
  });

  it('returns current page', () => {
    expect(getCurrentPage(null)).toEqual(0);
    expect(getCurrentPage({ page: 3 } as any)).toEqual(3); // eslint-disable-line
  });

  it('returns results per page', () => {
    expect(getResultsPerPage(null)).toEqual(0);
    expect(getResultsPerPage({ results_per_page: 100 } as any)).toEqual(100); // eslint-disable-line
  });

  it('returns results size', () => {
    expect(getResultsSize(null)).toEqual(0);
    expect(getResultsSize({ results_size: 144 } as any)).toEqual(144); // eslint-disable-line
  });

  it('returns results size', () => {
    expect(getResultsSize(null)).toEqual(0);
    expect(getResultsSize({ results_size: 144 } as any)).toEqual(144); // eslint-disable-line
  });
});
