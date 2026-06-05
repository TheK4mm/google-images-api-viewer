import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from './SearchBar';

describe('<SearchBar />', () => {
  it('submits the current value when the form is submitted', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<SearchBar value="gatos" onChange={() => {}} onSubmit={onSubmit} onClear={() => {}} />);

    await user.click(screen.getByRole('button', { name: /buscar/i }));
    expect(onSubmit).toHaveBeenCalledOnce();
  });

  it('disables the submit button when the value is empty', () => {
    render(<SearchBar value="" onChange={() => {}} onSubmit={() => {}} onClear={() => {}} />);
    expect(screen.getByRole('button', { name: /buscar/i })).toBeDisabled();
  });

  it('shows a clear button only when there is text', () => {
    const { rerender } = render(
      <SearchBar value="" onChange={() => {}} onSubmit={() => {}} onClear={() => {}} />,
    );
    expect(screen.queryByRole('button', { name: /limpiar/i })).toBeNull();

    rerender(<SearchBar value="x" onChange={() => {}} onSubmit={() => {}} onClear={() => {}} />);
    expect(screen.getByRole('button', { name: /limpiar/i })).toBeInTheDocument();
  });
});
