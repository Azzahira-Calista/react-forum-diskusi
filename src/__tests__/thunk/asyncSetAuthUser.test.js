/* eslint-disable no-undef */
import { asyncSetAuthUser } from '../../states/authUser/action';
import { ActionType } from '../../states/authUser/action';
import api from '../../utils/api';
import configureMockStore from 'redux-mock-store';

// Try different ways to import thunk
import * as reduxThunk from 'redux-thunk';

jest.mock('../../utils/api');

// Extract the thunk middleware
const thunk = reduxThunk.default || reduxThunk.thunk || reduxThunk;
const mockStore = configureMockStore([thunk]);

/**
 * Skenario:
 * - Fungsi asyncSetAuthUser dipanggil dengan email dan password
 * - Fungsi login dari API dikembalikan dengan token palsu ('fake-token')
 * - Fungsi getOwnProfile dari API dikembalikan dengan data user palsu (fakeUser)
 * - Fungsi dispatch harus dipanggil dengan action tipe SET_AUTH_USER
 * - Payload action harus berisi properti authUser dengan data user palsu
 */

describe('asyncSetAuthUser', () => {
  it('dispatches SET_AUTH_USER on successful login', async () => {
    const fakeUser = { id: 'user-1', name: 'User' };
    api.login.mockResolvedValue('fake-token');
    api.getOwnProfile.mockResolvedValue(fakeUser);

    const store = mockStore({});

    await store.dispatch(asyncSetAuthUser({ email: 'admin@mail.com', password: 'admin123' }));

    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: ActionType.SET_AUTH_USER,
      payload: {
        authUser: fakeUser,
      },
    });
  });
});