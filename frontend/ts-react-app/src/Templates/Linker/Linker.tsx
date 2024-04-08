import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';

export default function Linker(props: {path: string, children?: any}){

    const goto = useNavigate();
    const dest = (path: string) => goto(path);
    return(
        <Button onClick={()=>{dest(props.path)}} children={props.children}/>
    );

}