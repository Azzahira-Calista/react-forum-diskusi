/* eslint-disable camelcase */
/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import ThreadItem from '../../components/ThreadItem';

// Store palsu hanya untuk test
const mockStore = configureStore({
  reducer: {
    // tambahkan reducer lain jika dibutuhkan oleh komponen
    authUser: (state = null) => state,
  },
});

const fakeUsers = [
  { id: 'user-1', name: 'User', avatar: null },
];

const fakeThread = {
  id: 'thread-1',
  title: 'Judul Thread',
  body: 'Isi thread',
  totalComments: 0,
  upVotesBy: [],
  downVotesBy: [],
  ownerId: 'user-1',
  category: 'umum',
  createdAt: new Date().toISOString(),
};

const renderWithProviders = (component) => {
  return render(
    <Provider store={mockStore}>
      <MemoryRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        {component}
      </MemoryRouter>
    </Provider>
  );
};

/**
 * Skenario:
 * - Komponen ThreadItem diberikan props thread dan users
 * - authUser disediakan dari store Redux (walaupun nilainya null dalam test ini)
 * - Komponen dirender di dalam routing context dan Redux provider
 * - Komponen harus menampilkan judul dan isi dari thread
 */

test('menampilkan judul dan isi thread', () => {
  renderWithProviders(<ThreadItem thread={fakeThread} users={fakeUsers} />);

  expect(screen.getByText(/judul thread/i)).toBeInTheDocument();
  expect(screen.getByText(/isi thread/i)).toBeInTheDocument();
});
