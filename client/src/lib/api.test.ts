import { describe, expect, it } from 'vitest';
import { buildImagesQuery } from './api';

describe('buildImagesQuery', () => {
  it('encodes spaces and special characters in the query', () => {
    const qs = buildImagesQuery('perros y gatos', 0);
    const params = new URLSearchParams(qs);
    expect(params.get('q')).toBe('perros y gatos');
    // Raw query string must be URL-encoded (no literal spaces).
    expect(qs).not.toContain(' ');
    expect(qs).toContain('q=perros+y+gatos');
  });

  it('includes the page number', () => {
    const params = new URLSearchParams(buildImagesQuery('cats', 3));
    expect(params.get('page')).toBe('3');
  });

  it('appends only the filters that are set', () => {
    const params = new URLSearchParams(
      buildImagesQuery('cats', 0, { safe: 'off', size: 'l', color: 'blue' }),
    );
    expect(params.get('imgsz')).toBe('l');
    expect(params.get('image_color')).toBe('blue');
    expect(params.get('safe')).toBe('off');
    expect(params.get('image_type')).toBeNull();
  });
});
