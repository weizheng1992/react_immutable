import styles from './index.less'

const NoData=({title='还没有数据哦',info='',mainStyle,contentStyle,titleStyle,infoStyle})=>(
    <div className={styles.noData} style={mainStyle}>
        <div className={styles.content} style={contentStyle}>
            <img src={require('../../img/Bitmap.png')}/>
            <div className={styles.title} style={titleStyle}>{title}</div>
            <div className={styles.info} style={infoStyle}>{info}</div>
        </div>
    </div>
)

export default NoData;