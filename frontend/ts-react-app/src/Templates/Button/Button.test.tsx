import { fireEvent, render } from "@testing-library/react"
import Button from "./Button"

describe('Button template', () => {
    it('Button text renders properly', () => {
        const { getByText } = render(<Button onClick={()=>{}}>Title</Button>);
        expect(getByText('Title')).toBeInTheDocument();
    });

    it('Button properly runs onClick function', () => {
        const mockClick = jest.fn();

        const { getByText } = render(<Button onClick={()=>{mockClick()}}>Click me!</Button>);

        const button = getByText('Click me!');
        fireEvent.click(button);
        expect(mockClick).toHaveBeenCalledTimes(1);
    })
})