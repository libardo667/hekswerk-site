import {expect} from '@playwright/test';

export const publicRoutes = [
  '/',
  '/work',
  '/work/brief',
  '/work/selected-work',
  '/research',
  '/about',
  '/contact',
  '/privacy',
];

export async function blockExternalAssets(page) {
  await page.route(/https:\/\/hekswerk-intake\.levi-020\.workers\.dev\/.*/, (route) => route.abort('blockedbyclient'));
}

export async function expectKeyboardFocus(page, locator) {
  await page.locator('body').click({position: {x: 2, y: 2}});
  for (let index = 0; index < 40; index += 1) {
    await page.keyboard.press('Tab');
    if (await locator.evaluate((node) => node === document.activeElement)) break;
  }
  await expect(locator).toBeFocused();
  const focus = await locator.evaluate((node) => {
    const style = getComputedStyle(node);
    return {
      focusVisible: node.matches(':focus-visible'),
      outlineStyle: style.outlineStyle,
      outlineWidth: style.outlineWidth,
      boxShadow: style.boxShadow,
    };
  });
  expect(focus.focusVisible).toBe(true);
  expect(
    (focus.outlineStyle !== 'none' && focus.outlineWidth !== '0px') || focus.boxShadow !== 'none',
    `Expected a visible focus indicator, got ${JSON.stringify(focus)}`,
  ).toBe(true);
}

export async function contrastRatio(locator) {
  return locator.evaluate((node) => {
    function rgba(value) {
      const parts = value.match(/[\d.]+/g)?.map(Number) || [];
      return {r: parts[0] || 0, g: parts[1] || 0, b: parts[2] || 0, a: parts.length > 3 ? parts[3] : 1};
    }
    function composite(foreground, background) {
      return {
        r: foreground.r * foreground.a + background.r * (1 - foreground.a),
        g: foreground.g * foreground.a + background.g * (1 - foreground.a),
        b: foreground.b * foreground.a + background.b * (1 - foreground.a),
        a: 1,
      };
    }
    function backgroundFor(element) {
      let current = element;
      let result = {r: 255, g: 255, b: 255, a: 1};
      const layers = [];
      while (current) {
        const color = rgba(getComputedStyle(current).backgroundColor);
        if (color.a > 0) layers.push(color);
        current = current.parentElement;
      }
      for (const layer of layers.reverse()) result = composite(layer, result);
      return result;
    }
    function luminance(color) {
      const channels = [color.r, color.g, color.b].map((channel) => {
        const value = channel / 255;
        return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
      });
      return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
    }
    const background = backgroundFor(node);
    const foreground = composite(rgba(getComputedStyle(node).color), background);
    const light = Math.max(luminance(background), luminance(foreground));
    const dark = Math.min(luminance(background), luminance(foreground));
    return (light + 0.05) / (dark + 0.05);
  });
}
