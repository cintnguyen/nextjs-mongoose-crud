import { render, screen } from '@testing-library/react';
import RecipesList from '../components/RecipesList';

describe('RecipesList component', () => {
    it('renders with a provided name', () => {
      render(<Recipeslist recipes={[{_id:1, name:"recipe1", description:"d1"}]} />);
      const recipeOneText = screen.getByText(/recipe1/i);
      expect(recipeOneText).toBeInTheDocument();
    });
  
    // it('renders with "Guest" if no name is provided', () => {
    //   render(<Greeting />);
    //   const greetingText = screen.getByText(/Hello, Guest!/i);
    //   expect(greetingText).toBeInTheDocument();
    // });
  });