/* eslint-disable no-undef */
import threadsReducer from '../../states/threads/reducer';
import { ActionType } from '../../states/threads/action';

/**
 * Skenario:
 * - threadsReducer menerima state awal berupa array kosong
 * - Diberikan action dengan tipe RECEIVE_THREADS dan payload array of threads
 * - Reducer harus mengembalikan state berupa array threads dari payload
 */

describe('threadsReducer', () => {
  it('should return threads when given RECEIVE_THREADS', () => {
    const initialState = [];
    const action = {
      type: 'threads/receive',
      payload: [{ id: 'thread-Np47p4jhUXYhrhRn', title: 'Bagaimana pengalamanmu belajar Redux?' }],
    };


    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual([{ id: 'thread-Np47p4jhUXYhrhRn', title: 'Bagaimana pengalamanmu belajar Redux?' }]);
  });
});
