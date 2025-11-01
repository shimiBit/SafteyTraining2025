
import { render, screen } from '@testing-library/react';
import { TrainingDisplay } from './TrainingDisplay';

describe('TrainingDisplay', () => {
  it('renders a single list when there are blank lines between list items', () => {
    const markdownContent = `
* list item 1

* list item 2
* list item 3
    `;
    render(<TrainingDisplay content={markdownContent} />);
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);

    const lists = screen.getAllByRole('list');
    expect(lists).toHaveLength(1);
  });
});
