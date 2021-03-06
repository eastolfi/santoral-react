import { render, screen } from '@testing-library/react';

import App from './App';

// https://www.freecodecamp.org/news/testing-react-hooks/
// https://www.algolia.com/ref/docsearch/?utm_source=docsearch&utm_medium=link&utm_term=footer&utm_campaign=

test('renders learn react link', () => {
    render(<App />);

    const appContainer = screen.getByTestId('app-container');

    expect(appContainer).toBeInTheDocument();
});
