


import styles from './index.less'
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
export default class Index extends React.Component{
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
      }
ƒ    
    render(){
        return(
            <div className={styles.main}>
                <ul>
                    <li>实打实大所</li>
                </ul>
            </div>
        )
    }
}