/* eslint-disable no-undef */
import { asyncGetThreads } from '../../states/threads/action';
import { ActionType } from '../../states/threads/action';
import api from '../../utils/api';
import { thunk } from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

jest.mock('../../utils/api');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

/**
 * Skenario:
 * - Fungsi asyncGetThreads dipanggil
 * - Mock API getThreads mengembalikan daftar thread palsu (fakeThreads)
 * - Fungsi dispatch harus dipanggil dengan action tipe RECEIVE_THREADS
 * - Payload dari action harus berisi daftar thread yang diberikan dari API
 */

describe('asyncReceiveThreads thunk', () => {
  it('should dispatch RECEIVE_THREADS when fetching threads successfully', async () => {
    const fakeThreads = [
      { id: 'thread-1', title: 'Thread Satu' },
      { id: 'thread-2', title: 'Thread Dua' },
    ];
    api.getThreads.mockResolvedValue(fakeThreads);

    const store = mockStore({});

    await store.dispatch(asyncGetThreads());

    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: ActionType.RECEIVE_THREADS,
      payload: fakeThreads,
    });
  });
});