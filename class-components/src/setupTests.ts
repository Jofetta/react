import * as matchers from '@testing-library/jest-dom/matchers';
import { beforeAll, expect } from 'vitest';
import { server } from './test/node';
import { vi } from 'vitest';
import { NextRouter } from 'next/router';

type MockRouter = Partial<NextRouter>;

expect.extend(matchers);

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

const mockRouter = {
  route: '/',
  pathname: '/',
  query: {},
  asPath: '/',
  push: vi.fn() as unknown as NextRouter['push'],
  replace: vi.fn() as unknown as NextRouter['replace'],
  isFallback: false,
};

export const useRouter = vi.fn(() => mockRouter);

vi.mock('next/router', () => ({
  useRouter,
  useRouterMock: (customValues: MockRouter) => {
    useRouter.mockImplementation(() => ({
      ...mockRouter,
      ...customValues,
    }));
  },
  useRouterReset: () => {
    useRouter.mockImplementation(() => mockRouter);
  },
}));
