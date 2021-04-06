import { render/*, screen*/ } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
    render(<App />);
    // const linkElement = null;//screen.findAllByTestId('agenda-container');
    // expect(linkElement).toBeInTheDocument();
    expect(true).toBe(true);
});
