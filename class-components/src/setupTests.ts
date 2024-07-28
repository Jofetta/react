import * as matchers from '@testing-library/jest-dom/matchers';
import { beforeAll, expect } from 'vitest';
import { server } from './test/node';

expect.extend(matchers);

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
