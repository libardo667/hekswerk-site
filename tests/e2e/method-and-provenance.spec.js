import {expect, test} from '@playwright/test';
import {blockExternalAssets} from './helpers';

test.beforeEach(async ({page}) => {
  await blockExternalAssets(page);
});

test('homepage discloses AI-assisted, human-accountable delivery', async ({page}) => {
  await page.goto('/');
  await expect(
    page.getByText('I build with AI coding agents under my direction and review, and I am accountable', {
      exact: false,
    }),
  ).toBeVisible();
});

test('work page states how the work is built and the AI data boundary', async ({page}) => {
  await page.goto('/work');
  await expect(page.getByText('How the work is built', {exact: false}).first()).toBeVisible();
  await expect(
    page.getByText('I do not send your passwords, production data, or confidential records to AI tools', {
      exact: false,
    }),
  ).toBeVisible();
});

test('about page discloses the AI-assisted working method', async ({page}) => {
  await page.goto('/about');
  await expect(
    page.getByText('I build with AI coding agents that run under my direction and review', {exact: false}),
  ).toBeVisible();
});

test('selected work labels the true provenance of every case', async ({page}) => {
  await page.goto('/work/selected-work');
  await expect(page.getByText('Hand-written by Levi.', {exact: false})).toBeVisible();
  await expect(page.getByText("Built by directing AI coding agents under Levi's review.", {exact: false})).toHaveCount(
    3,
  );
});
