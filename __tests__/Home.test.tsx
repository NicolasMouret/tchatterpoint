import Home from '@/app/page';
import { render, screen } from '@testing-library/react';

describe('Home', () => {
  it('should have a heading', () => {
    render(<Home />);
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Accueil');
  });
});